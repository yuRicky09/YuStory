import { storage, db, timestamp, arrayUnion } from "@/firebase/config";
import { nanoid } from "nanoid";

const state = function() {
  return {
    storyCover: null,
    storyTitle: null,
    storyHTML: null,
    storyBrief: null,
    storyTags: [],
    storyImg: [],
    replies: [],
    storyCreatedAt: null,
    isLoading: false,
    topToHeaderDistance: null,
    stories: [],
    drafts: [],
    currentStory: null,
    currentAuthor: null,
    unsubscribeStoriesId: null,
    unsubscribeDraftsId: null,
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
  fiveRecordsMyDrafts(state) {
    return state.drafts.slice(0, 5);
  },
  recentlyStories(state) {
    return state.stories.slice(0, 10);
  },
  recommendedTags(state) {
    let allTags = [];
    state.stories.forEach((story) => allTags.push(story.tags));
    // 去重複值
    allTags = new Set(allTags.flat());
    return Array.from(allTags).slice(0, 20);
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
      const matchingImg = state.storyImg.find((img) => {
        return img.imgDownLoadURL === file;
      });

      // 透過複製而非toolbar上傳的貼圖將不會存於storage，因此會拿不到imgUploadPath，所以要阻擋。
      if (!matchingImg) return;
      const imgDeleteRef = storageRef.child(matchingImg.imgUploadPath);
      imgDeleteRef.delete();
      commit("removeImg", matchingImg.imgUploadPath);
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
  async updateStory(
    { state, commit },
    { storyTitle, storyHTML, storyTags, storyBrief, storyCover, storyId }
  ) {
    try {
      commit("changeLoadingState", true);

      const createdAt = timestamp();
      const storyImg = state.storyImg;

      await db
        .collection("stories")
        .doc(storyId)
        .update({
          title: storyTitle,
          HTML: storyHTML,
          tags: storyTags,
          brief: storyBrief,
          cover: storyCover,
          img: storyImg,
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
    } catch (err) {
      commit("changeLoadingState", false);
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

      // doc已存在則更新，未存在則new一個doc並且回傳此doc的id，之後再按備份的話則都視為更新。
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
    try {
      commit("changeLoadingState", true);

      const storiesRef = db.collection("stories").orderBy("createdAt", "desc");
      const unsubscribeStoriesId = storiesRef.onSnapshot((snap) => {
        const stories = [];
        snap.docs.forEach((doc) => {
          const story = { ...doc.data(), id: doc.id };
          stories.push(story);
        });
        commit("setAllStories", stories);
      });

      commit("setUnsubscribeStoriesId", unsubscribeStoriesId);
      commit("changeLoadingState", false);
    } catch (err) {
      console.log(err);
    }
  },
  async getAllDrafts({ commit }, userId) {
    const draftsRef = db
      .collection("drafts")
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc");

    const unsubscribeDraftsId = draftsRef.onSnapshot((snap) => {
      const drafts = [];
      snap.docs.forEach((doc) => {
        const draft = { ...doc.data(), id: doc.id };
        drafts.push(draft);
      });
      commit("setAllDrafts", drafts);
    });
    commit("setUnsubscribeDraftsId", unsubscribeDraftsId);
  },
  async getCurrentStory({ commit }, storyId) {
    try {
      const res = await db
        .collection("stories")
        .doc(storyId)
        .get();

      const currentStory = { ...res.data(), id: storyId };
      commit("setCurrentStory", currentStory);

      return currentStory.userId;
    } catch (err) {
      console.log(err.message);
      throw new Error(err.message);
    }
  },
  async getCurrentAuthor({ dispatch, commit }, storyId) {
    try {
      commit("changeLoadingState", true);
      const userId = await dispatch("getCurrentStory", storyId);

      const res = await db
        .collection("users")
        .doc(userId)
        .get();

      const currentAuthor = res.data();
      commit("setCurrentAuthor", currentAuthor);
      commit("changeLoadingState", false);
    } catch (err) {
      commit("changeLoadingState", false);
      console.log(err.message);
      throw new Error(err.message);
    }
  },
  async addReply({ commit, state, rootState }, content) {
    try {
      const reply = {
        userId: rootState.auth.userId,
        userName: rootState.auth.userName,
        userProfileImg: rootState.auth.userProfileImg,
        createdAt: Date.now(),
        HTML: content,
        id: nanoid(),
      };
      console.log(reply);

      await db
        .collection("stories")
        .doc(state.currentStory.id)
        .update({
          replies: arrayUnion(reply),
        });

      commit("addReply", reply);
    } catch (err) {
      console.log(err);
    }
  },
  async unsubscribeAll(state) {
    state.unsubscribeDraftsId();
    state.unsubscribeStoriesId();
  },
};

const mutations = {
  changeLoadingState(state, newLoadingState) {
    state.isLoading = newLoadingState;
  },
  addStoryImg(state, img) {
    state.storyImg.push(img);
  },
  updateStoryImg(state, img) {
    state.storyImg = img;
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
  setAllDrafts(state, drafts) {
    state.drafts = drafts;
  },
  setCurrentStory(state, currentStory) {
    state.currentStory = currentStory;
  },
  setCurrentAuthor(state, currentAuthor) {
    state.currentAuthor = currentAuthor;
  },
  clearCurrentStory(state) {
    state.currentStory = null;
  },
  addReply(state, reply) {
    state.replies.push(reply);
  },
  setUnsubscribeStoriesId(state, id) {
    state.unsubscribeStoriesId = id;
  },
  setUnsubscribeDraftsId(state, id) {
    state.unsubscribeDraftsId = id;
  },
};

export default { namespaced: true, state, getters, actions, mutations };
