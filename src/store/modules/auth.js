import { auth, db } from "@/firebase/config";

const state = function() {
  return {
    userName: null,
    userEmail: null,
    userPassword: null,
    userId: null,
    userBio: null,
    userProfileImg: null,
    isLoading: false,
    currentUser: null,
  };
};

const getters = {};

const actions = {
  async userRegister({ commit }, registerData) {
    try {
      commit("changeLodingState", true);
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
          userName: registerData.userName,
          userEmail: registerData.userEmail,
          userPassword: registerData.userPassword,
        });

      commit("changeLodingState", false);
      return res;
    } catch (err) {
      commit("changeLodingState", false);
      throw new Error(err.message);
    }
  },

  async getUserData({ commit }, userId) {
    const res = await db
      .collection("users")
      .doc(userId)
      .get();
    const userData = res.data();
    commit("setUserData", userData);
  },
};

const mutations = {
  getCurrentUser(state, user) {
    state.currentUser = user;
  },
  setUserData(state, userData) {
    state.userEmail = userData.userEmail;
    state.userPassword = userData.userPassword;
    state.userName = userData.userName;
    state.userId = userData.userId;
  },
  changeLodingState(state, newLoadingState) {
    state.isLoading = newLoadingState;
  },
};

export default { namespaced: true, state, getters, actions, mutations };
