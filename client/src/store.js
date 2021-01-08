import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false,
    userPrivilegeLevel: 0,
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      if (token) {
        state.isUserLoggedIn = true
      } else {
        state.isUserLoggedIn = false
      }
    },
    setUser(state, user) {
      state.user = user
    },
    setPrivilegeLevel(state, user) {
      state.userPrivilegeLevel = user.privilegeLevel;
    },
  },
  actions: {
    setToken({ commit }, token) {
      commit("setToken", token)
    },
    setUser({ commit }, user) {
      commit("setUser", user)
    },
    setPrivilegeLevel({ commit }, user) {
      commit("setPrivilegeLevel", user)
    },
  }
})
