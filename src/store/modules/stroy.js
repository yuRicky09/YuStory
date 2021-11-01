import { storage, db, timestamp } from "@/firebase/config";
import { nanoid } from "nanoid";

const state = function() {
  return {
    storyCover: null,
    storyTitle: null,
    storyHTML: null,
    storyTags: [],
    storyImg: [],
    storyCreatedAt: null,
    isLoading: false,
  };
};

const getters = {};

const actions = {
  async addStoryImg(
    { commit, rootState },
    { file, Editor, cursorLocation, resetUploader }
  ) {
    try {
      const storageRef = storage.ref();
      const imgUploadPath = `story/${rootState.auth.userId}/img/${nanoid()}`;
      const imgUploadRef = storageRef.child(imgUploadPath);
      await imgUploadRef.put(file);
      const imgDownLoadURL = await imgUploadRef.getDownloadURL();
      Editor.insertEmbed(cursorLocation, "image", imgDownLoadURL);
      resetUploader();

      commit("addStoryImg", { imgUploadPath, imgDownLoadURL });
    } catch (err) {
      throw Error(err.message);
    }
  },
  async addStoryCover({ rootState, commit }, storyCoverFile) {
    try {
      const userId = rootState.auth.userId;
      const storageRef = storage.ref();
      const coverUploadPath = `story/${userId}/cover/${nanoid()}`;
      const coverUploadRef = storageRef.child(coverUploadPath);
      await coverUploadRef.put(storyCoverFile);
      const coverDownloadURL = await coverUploadRef.getDownloadURL();
      commit("addStoryCover", { coverUploadPath, coverDownloadURL });
    } catch (err) {
      throw Error(err.message);
    }
  },
  async removeImg({ state, commit }, file) {
    try {
      const storageRef = storage.ref();
      // 刪除圖片時觸發的remove callback會給即將刪除的圖片的下載位置， 與所有圖片比對下載位置，相同則於storage刪除此圖片。
      const { imgUploadPath } = state.storyImg.find((img) => {
        return img.imgDownLoadURL === file;
      });

      const imgDeleteRef = storageRef.child(imgUploadPath);
      imgDeleteRef.delete();
      commit("removeImg", imgUploadPath);
    } catch (err) {
      throw Error(err.message);
    }
  },
  async publishStory(
    { state, rootState, dispatch, commit },
    { storyCoverFile, storyTitle, storyHTML, storyTags }
  ) {
    try {
      commit("changeLoadingState", true);

      await dispatch("addStoryCover", storyCoverFile);

      const userId = rootState.auth.userId;
      const storyCover = state.storyCover;
      const storyImg = state.storyImg;
      const createdAt = timestamp();

      const docRef = await db.collection("stories").add({
        storyTitle,
        storyCover,
        storyHTML,
        storyTags,
        userId,
        storyImg,
        createdAt,
      });

      commit("setPublishStory", {
        storyTitle,
        storyHTML,
        storyTags,
        createdAt,
      });
      commit("changeLoadingState", false);
      return docRef.id;
    } catch (err) {
      commit("changeLoadingState", false);
      throw Error(err.message);
    }
  },
};

const mutations = {
  changeLoadingState(state, newLoadingState) {
    state.isLoading = newLoadingState;
  },
  addStoryImg(state, img) {
    state.storyImg.push(img);
  },
  removeImg(state, imgUploadPath) {
    state.storyImg = state.storyImg.filter((img) => {
      return img.imgUploadPath !== imgUploadPath;
    });
  },
  addStoryCover(state, storyCover) {
    state.storyCover = storyCover;
  },
  //! 備份的話應該是需要在本地也存比較好，發佈的時候要不要存在思考看看，這邊先暫且本地也存起來。
  setPublishStory(state, { storyTitle, storyHTML, storyTags, createdAt }) {
    state.storyTitle = storyTitle;
    state.storyHTML = storyHTML;
    state.storyTags = storyTags;
    state.storyCreatedAt = createdAt;
  },
};

export default { namespaced: true, state, getters, actions, mutations };
