import { storage, db, timestamp } from "@/firebase/config";
import { nanoid } from "nanoid";

// 亂數排列 原理:從array最後一個元素開始，與他前面的任一位置的元素對換，下一輪則從倒數第二個位置開始，依此類推。
const shuffle = function(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};
const state = function() {
  return {
    //將圖片的增刪緩存於storyImg陣列，當按下備份or發佈後再上傳到db與storage。
    storyImg: [],
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
  recentlyStoriesForHome(_, getters) {
    return getters.recentlyStories.slice(0, 8);
  },
  popularStories(state) {
    const stories = [...state.stories];
    stories.sort((a, b) => {
      return b.hearts.length - a.hearts.length;
    });
    return stories;
  },
  popularStoriesTen(_, getters) {
    return getters.popularStories.slice(0, 10);
  },
  popularStoriesForHome(_, getters) {
    return getters.popularStories.slice(0, 8);
  },
  recommendedTags(state) {
    let allTags = [];
    state.stories.forEach((story) => allTags.push(story.tags));
    // 去重複值
    allTags = new Set(allTags.flat());
    const randomTags = shuffle(Array.from(allTags));
    return randomTags.slice(0, 20);
  },
  recommendedTagsForHome(_, getters) {
    return getters.recommendedTags.slice(0, 6);
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

      commit("changeLoadingState", true);
      await imgUploadRef.put(file);
      commit("changeLoadingState", false);
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
        hearts: [],
        userId,
        userName,
        userProfileImg,
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

      const currentAuthor = { ...res.data(), id: userId };
      commit("setCurrentAuthor", currentAuthor);
      commit("changeLoadingState", false);
    } catch (err) {
      commit("changeLoadingState", false);
      console.log(err.message);
      throw new Error(err.message);
    }
  },
  async addReply({ state, rootState }, content) {
    try {
      await db
        .collection("stories")
        .doc(state.currentStory.id)
        .collection("replies")
        .add({
          userId: rootState.auth.userId,
          userName: rootState.auth.userName,
          userProfileImg: rootState.auth.userProfileImg,
          createdAt: Date.now(),
          HTML: content,
        });
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
  setUnsubscribeStoriesId(state, id) {
    state.unsubscribeStoriesId = id;
  },
  setUnsubscribeDraftsId(state, id) {
    state.unsubscribeDraftsId = id;
  },
};

export default { namespaced: true, state, getters, actions, mutations };
