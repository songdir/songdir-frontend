import { createStore } from "vuex"
import { isProxy, toRaw } from "vue"

import type Song from "@/lib/domain/Song"

const store = createStore({
  state() {
    return {
      backendHost: import.meta.env.VITE_BACKEND_HOST,
      accessToken: null,
      username: null,
      loggedIn: false,
      refreshTimeoutMinutes: 14 * 60 * 1000,
      currentTab: "/directory",
      openedSongs: {} as {[key: number]: Song},
      activeSong: undefined as Song | undefined
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
    },
    updateActiveSong(state, song: Song | undefined) {
      state.activeSong = song
    },
    updateOpenedSongs(state, song: Song) {
      state.openedSongs[song.id] = song
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
      commit("updateLoggedIn", loggedIn == "true")
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
    fetchActiveSong({ commit }) {
      const activeSongId = localStorage.getItem("activeSong") || ""
      const openedSongs = JSON.parse(localStorage.getItem("openedSongs") || "{}")
      commit("updateActiveSong", openedSongs[activeSongId])
    },
    addOpenedSong({ commit }, song: Song) {
      commit("updateOpenedSongs", song)
      commit("updateActiveSong", song)
      localStorage.setItem("openedSongs", JSON.stringify(this.state.openedSongs))
      localStorage.setItem("activeSong", song.id.toString())
    },
    selectActiveSong({ commit }, song_id: number) {
      localStorage.setItem("activeSong", song_id.toString())
      const openedSongs = this.state.openedSongs
      commit("updateActiveSong", openedSongs[song_id])
    },
  }
})

export default store;
