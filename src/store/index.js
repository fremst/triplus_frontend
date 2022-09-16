import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    //새로고침하면 없어짐
    loginUser: {
      id: null,
      pwd: "",
      auth: "",
      name: "",
      tel: "",
      gender: "",
      addr: "",
      email: "",
      bdate: "",
      regdate: "",
      active: ""
    },
    userId: localStorage.getItem("id"),
    token: localStorage.getItem("token")
  },
  getters: {},
  mutations: {
    loginInfo: function (state, payload) {
      state.loginUser = payload;
    },
    keepId: function (state, payload) {
      if (payload === 1) {
        //로그인
        state.userId = localStorage.getItem("id");
        state.token = localStorage.getItem("token");
      } else {
        //로그아웃
        state.userId = null;
        state.token = null;
        state.loginUser = null;
      }
    }
  },
  actions: {
    loginInfo: function (context, payload) {
      context.commit("loginInfo", payload);
    }
  },
  modules: {},
  plugins: [createPersistedState({})]
});
