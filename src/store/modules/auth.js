import { auth, db, googleProvider } from "@/firebase/config";

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
      throw new Error(err.message);
    }
  },

  async userLogout({ commit }) {
    try {
      await auth.signOut();
    } catch (err) {
      throw Error(err.message);
    }

    commit("clearUserData");
  },
  async getUserData({ commit }, userId) {
    const res = await db
      .collection("users")
      .doc(userId)
      .get();
    const userData = res.data();
    commit("setUserData", userData);
  },
  async signInWithGoogle() {
    try {
      await auth.signInWithPopup(googleProvider);
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
    state.userEmail = userData.userEmail;
    state.userPassword = userData.userPassword;
    state.userName = userData.userName;
    state.userId = userData.userId;
  },
  clearUserData(state) {
    console.log(state);
    state.userEmail = null;
    state.userPassword = null;
    state.userName = null;
    state.userId = null;
  },
  changeLoadingState(state, newLoadingState) {
    state.isLoading = newLoadingState;
  },
};

export default { namespaced: true, state, getters, actions, mutations };
