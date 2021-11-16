import Vue from "vue";
import { auth, db, googleProvider, storage } from "@/firebase/config";

const state = function() {
  return {
    userName: null,
    userEmail: null,
    userId: null,
    userBio: null,
    userProfileImg: null,
    favorites: {},
    isLoading: false,
    currentUser: null,
  };
};

const getters = {
  myFavoriteStories(state, _, rootState) {
    const stories = rootState.story.stories;
    return stories.filter((story) => {
      return state.favorites[story.id] === true;
    });
  },
};

const actions = {
  async userRegister({ dispatch, commit }, registerData) {
    try {
      commit("changeLoadingState", true);
      // 創建帳戶並將user資訊存入firestore
      const res = await auth.createUserWithEmailAndPassword(
        registerData.userEmail,
        registerData.userPassword
      );

      await res.user.updateProfile({
        displayName: registerData.userName,
      });

      const userId = res.user.uid;

      await db
        .collection("users")
        .doc(userId)
        .set({
          name: registerData.userName,
          email: registerData.userEmail,
          favorites: {},
          profileImg:
            "https://firebasestorage.googleapis.com/v0/b/yustory-ded59.appspot.com/o/other%2Fdefault-avatar.png?alt=media&token=ec118c77-c2d9-46e3-a731-0657875703b7",
        });

      dispatch("getUserData", userId);
      commit("changeLoadingState", false);
      return res;
    } catch (err) {
      commit("changeLoadingState", false);
      throw new Error(err.message);
    }
  },

  async userLogin({ commit }, userData) {
    try {
      commit("changeLoadingState", true);
      const res = await auth.signInWithEmailAndPassword(
        userData.userEmail,
        userData.userPassword
      );
      commit("changeLoadingState", false);
      return res;
    } catch (err) {
      commit("changeLoadingState", false);
      throw new Error(err.message);
    }
  },

  async userLogout({ commit }) {
    try {
      await auth.signOut();
      commit("clearUserData");
    } catch (err) {
      throw new Error(err.message);
    }
  },
  async resetPassword({ commit }, userEmail) {
    try {
      commit("changeLoadingState", true);
      await auth.sendPasswordResetEmail(userEmail);
      commit("changeLoadingState", false);
    } catch (err) {
      commit("changeLoadingState", false);
      throw new Error(err.message);
    }
  },
  async getUserData({ commit }, uid) {
    const res = await db
      .collection("users")
      .doc(uid)
      .get();
    const userData = { ...res.data(), userId: uid };
    commit("setUserData", userData);
  },
  async signInWithGoogle({ commit }) {
    try {
      commit("changeLoadingState", true);
      const { user } = await auth.signInWithPopup(googleProvider);

      // 將第三方 google所提供的user資料存到firestore
      const { email, displayName, photoURL } = user.providerData[0];
      await db
        .collection("users")
        .doc(user.uid)
        .set({
          email: email,
          name: displayName,
          profileImg: photoURL,
        });
      commit("changeLoadingState", false);
    } catch (err) {
      commit("changeLoadingState", false);
      throw new Error(err.message);
    }
  },
  async updateUserInfo({ commit, state }, userNewInfo) {
    const user = auth.currentUser;
    try {
      commit("changeLoadingState", true);
      await user.updateProfile({
        displayName: userNewInfo.userName,
      });
      await db
        .collection("users")
        .doc(state.userId)
        .update({
          name: userNewInfo.userName,
          bio: userNewInfo.userBio,
        });

      commit("updateUserInfo", userNewInfo);
      commit("changeLoadingState", false);
    } catch (err) {
      commit("changeLoadingState", false);
      throw new Error(err.message);
    }
  },
  async updateProfileImg({ commit, state, rootState }, avatar) {
    try {
      commit("changeLoadingState", true);

      const storageRef = storage.ref();
      const uploadPath = `profile/${state.userId}/avatar`;
      const uploadRef = storageRef.child(uploadPath);
      await uploadRef.put(avatar);
      const userProfileImg = await uploadRef.getDownloadURL();

      await db
        .collection("users")
        .doc(state.userId)
        .update({
          profileImg: userProfileImg,
        });

      // 此用戶發佈的故事的頭貼也要更新
      const storiesRef = await db
        .collection("stories")
        .where("userId", "==", `${state.userId}`)
        .get();

      storiesRef.docs.forEach(async (story) => {
        await story.ref.update({
          userProfileImg: userProfileImg,
        });
      });

      // 更新此用戶的所有留言頭貼
      const hasUserReplyStories = rootState.story.stories.filter((story) => {
        if (story.replies) {
          const replies = story.replies;
          let countUserReply = 0;
          for (let reply of replies) {
            if (reply.userId === state.userId) {
              reply.userProfileImg = userProfileImg;
              countUserReply++;
            }
          }
          if (countUserReply > 0) return true;
        }
      });

      hasUserReplyStories.forEach((story) => {
        story.userProfileImg = userProfileImg;
      });

      hasUserReplyStories.forEach(async (story) => {
        await db
          .collection("stories")
          .doc(story.id)
          .set(
            {
              replies: story.replies,
            },
            { merge: true }
          );
      });

      commit("changeLoadingState", false);
      commit("updateProfileImg", userProfileImg);
    } catch (err) {
      commit("changeLoadingState", false);
      throw new Error(err.message);
    }
  },
  async addToFavorites({ state, commit }, storyId) {
    try {
      await db
        .collection("users")
        .doc(state.userId)
        .update({
          [`favorites.${storyId}`]: true,
        });

      commit("addToFavorites", storyId);
    } catch (err) {
      throw new Error(err.message);
    }
  },
  async removeFromFavorites({ state, commit }, storyId) {
    try {
      await db
        .collection("users")
        .doc(state.userId)
        .update({});

      commit("removeFromFavorites", storyId);
    } catch (err) {
      throw new Error(err.message);
    }
  },
};

const mutations = {
  getCurrentUser(state, user) {
    state.currentUser = user;
  },
  setUserData(state, userData) {
    state.userEmail = userData.email;
    state.userName = userData.name;
    state.userId = userData.userId;
    state.userProfileImg = userData.profileImg;
    state.userBio = userData.bio;
    state.favorites = userData.favorites;
  },
  clearUserData(state) {
    state.userEmail = null;
    state.userName = null;
    state.userId = null;
    state.userProfileImg = null;
    state.userBio = null;
  },
  changeLoadingState(state, newLoadingState) {
    state.isLoading = newLoadingState;
  },
  updateUserInfo(state, userNewInfo) {
    state.userName = userNewInfo.userName;
    state.userBio = userNewInfo.userBio;
  },
  updateProfileImg(state, userProfileImg) {
    state.userProfileImg = userProfileImg;
  },
  addToFavorites(state, storyId) {
    //! Vue無法監測到obj屬性的添加or刪除，所以響應式會失效，這邊透過Vue.set method來幫我們達成資料響應式。
    if (state.favorites[storyId] === undefined) {
      Vue.set(state.favorites, storyId, true);
    } else {
      // 已添加到收藏後又移除，移除後又再添加到收藏的狀況
      state.favorites[storyId] = true;
    }
  },
  removeFromFavorites(state, storyId) {
    state.favorites[storyId] = false;
  },
};

export default { namespaced: true, state, getters, actions, mutations };
