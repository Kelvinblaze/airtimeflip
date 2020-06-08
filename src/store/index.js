import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    isLoggedIn: false,
    user: []
  },
  getters: {
    isLoggedIn: state => state.isLoggedIn,
    token: state => state.token,
    user: state => state.user
  },
  mutations: {
    ADD_TOKEN(state, payload) {
      state.token = payload;
    },
    ADD_USER_DETAILS(state, payload) {
      state.user = payload;
    },
    IS_LOGGED_IN(state, payload) {
      state.isLoggedIn = payload;
    }
  },
  actions: {
    addToken({ commit }, payload) {
      commit("ADD_TOKEN", payload);
      commit("IS_LOGGED_IN", true);
    },
    addUser({ commit }, payload) {
      commit("ADD_USER_DETAILS", payload);
    }
  },
  modules: {}
});
