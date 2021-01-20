import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false,
    userPrivilegeLevel: 0,
    questions: [],
    questionCreators: [],
    answers: []
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
    setQuestions(state, questions) {
      state.questions = questions
    },
    setQuestionCreators(state, users) {
      state.questionCreators = users
    },
    setAnswers(state, answers) {
      state.answers = answers
    }

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
    setQuestions({ commit }, questions) {
      commit("setQuestions", questions)
    },
    setQuestionCreators({ commit }, questionCreators) {
      commit("setQuestionCreators", questionCreators)
    },
    setAnswers({ commit }, answers) {
      commit("setAnswers", answers)
    }
  },
  plugins: [createPersistedState()]
})
