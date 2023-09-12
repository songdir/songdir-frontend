import { createStore } from "vuex"

const store = createStore({
  state() {
    return {
      backendHost: import.meta.env.VITE_BACKEND_HOST,
      accessToken: null,
      username: null,
      loggedIn: false,
      refreshTimeoutMinutes: 14 * 60 * 1000,
      currentTab: "/directory"
    }
  },
  mutations: {
    loginStart: state => state.loggedIn = true,
    updateAccessToken: (state, accessToken) => {
      state.accessToken = accessToken
    },
    updateUsername: (state, username) => {
      state.username = username
    },
    updateLoggedIn: (state, loggedIn) => {
      state.loggedIn = loggedIn
    },
    updateCurrentTab: (state, tabUrl) => {
      state.currentTab = tabUrl
    }
  },
  actions: {
    doLogin({ state, commit }, { token, username }) {
      commit("loginStart")
      localStorage.setItem("accessToken", token)
      localStorage.setItem("username", username)
      localStorage.setItem("loggedIn", "true")
      commit("updateAccessToken", token)
      commit("updateUsername", username)
      commit("updateLoggedIn", true)
    },
    doLogout({ state, commit }) {
      localStorage.removeItem("accessToken")
      localStorage.removeItem("username")
      localStorage.setItem("loggedIn", "false")
      commit("updateAccessToken", "")
      commit("updateUsername", "")
      commit("updateLoggedIn", false)
    },
    fetchLoggedIn({ commit }) {
      const loggedIn = localStorage.getItem("loggedIn")
      commit("updateLoggedIn", loggedIn == "true" ? true : false)
    },
    fetchAccessToken({ commit }) {
      commit("updateAccessToken", localStorage.getItem("accessToken"))
    },
    fetchUsername({ commit }) {
      commit("updateUsername", localStorage.getItem("username"))
    },
    updateCurrentTab({ commit }, tabUrl) {
      commit("updateCurrentTab", tabUrl)
    },
  }
})

export default store;
