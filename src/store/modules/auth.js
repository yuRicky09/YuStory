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

const getters = {
  getUserName(state) {
    return state.userName;
  },
};

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
      commit("changeLoadingState", false);
      throw new Error(err.message);
    }
  },

  async userLogout({ commit }) {
    try {
      await auth.signOut();
      commit("clearUserData");
    } catch (err) {
      throw Error(err.message);
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
          userEmail: email,
          userName: displayName,
          userProfileImg: photoURL,
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
          userName: userNewInfo.userName,
          userBio: userNewInfo.userBio,
        });

      commit("updateUserInfo", userNewInfo);
      commit("changeLoadingState", false);
    } catch (err) {
      commit("changeLoadingState", false);
      throw Error(err.message);
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
    state.userProfileImg = userData.userProfileImg;
    state.userBio = userData.userBio;
  },
  clearUserData(state) {
    state.userEmail = null;
    state.userPassword = null;
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
};

export default { namespaced: true, state, getters, actions, mutations };
