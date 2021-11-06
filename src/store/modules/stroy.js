import { storage, db, timestamp } from "@/firebase/config";
import { nanoid } from "nanoid";

const state = function() {
  return {
    storyCover: null,
    storyTitle: null,
    storyHTML: null,
    storyBrief: null,
    storyTags: [],
    storyImg: [],
    storyCreatedAt: null,
    isLoading: false,
    topToHeaderDistance: null,
    stories: [],
  };
};

const getters = {
  myStories(state, _2, rootState) {
    const userId = rootState.auth.userId;
    return state.stories.filter((story) => story.userId === userId);
  },
  fiveRecordsMyStories(state, _2, rootState) {
    const userId = rootState.auth.userId;
    return state.stories.filter((story) => story.userId === userId).slice(0, 5);
  },
};

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
      return imgDownLoadURL;
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
    { state, rootState, commit },
    { storyTitle, storyHTML, storyTags, storyBrief, storyCover }
  ) {
    try {
      commit("changeLoadingState", true);

      const userId = rootState.auth.userId;
      const userName = rootState.auth.userName;
      const userProfileImg = rootState.auth.userProfileImg;
      const storyImg = state.storyImg;
      const createdAt = timestamp();

      const docRef = await db.collection("stories").add({
        title: storyTitle,
        cover: storyCover,
        HTML: storyHTML,
        tags: storyTags,
        brief: storyBrief,
        img: storyImg,
        userId,
        userName,
        userProfileImg,
        createdAt,
      });

      commit("setPublishStory", {
        storyTitle,
        storyHTML,
        storyTags,
        storyBrief,
        storyCover,
        createdAt,
      });
      commit("changeLoadingState", false);
      return docRef.id;
    } catch (err) {
      commit("changeLoadingState", false);
      throw Error(err.message);
    }
  },
  async saveDraft(
    { state, rootState, commit },
    { storyTitle, storyHTML, storyTags, docId }
  ) {
    try {
      commit("changeLoadingState", true);
      const img = state.storyImg;
      const tags = storyTags;
      const title = storyTitle ? storyTitle : null;
      const HTML = storyHTML ? storyHTML : null;
      const userId = rootState.auth.userId;
      const createdAt = timestamp();
      let docRef;

      // doc已存在則更新，未存在則new一個doc並且回傳此doc的id
      if (docId) {
        await db
          .collection("drafts")
          .doc(docId)
          .update({ img, tags, title, HTML, createdAt });
      } else {
        docRef = await db
          .collection("drafts")
          .add({ img, tags, title, HTML, createdAt, userId });
      }
      commit("changeLoadingState", false);
      return docRef ? docRef.id : docId;
    } catch (err) {
      commit("changeLoadingState", false);
      throw new Error(err.message);
    }
  },
  async getAllStories({ commit }) {
    const storiesRef = db.collection("stories").orderBy("createdAt", "desc");
    storiesRef.onSnapshot((snap) => {
      const stories = [];
      snap.docs.forEach((doc) => {
        const story = { ...doc.data(), id: doc.id };
        stories.push(story);
      });
      commit("setAllStories", stories);
    });
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
  //! 備份的話應該是需要在本地也存比較好，發佈的時候要不要存在思考看看，這邊先暫且本地也存起來。
  setPublishStory(
    state,
    { storyTitle, storyHTML, storyTags, storyBrief, storyCover, createdAt }
  ) {
    state.storyTitle = storyTitle;
    state.storyHTML = storyHTML;
    state.storyTags = storyTags;
    state.storyBreif = storyBrief;
    state.storyCover = storyCover;
    state.storyCreatedAt = createdAt;
  },
  setTopToHeaderDistance(state, topToHeaderDistance) {
    state.topToHeaderDistance = topToHeaderDistance;
  },
  setAllStories(state, stories) {
    state.stories = stories;
  },
};

export default { namespaced: true, state, getters, actions, mutations };
