<script lang="ts">
import axios from "axios"
import { mapState, mapActions } from "vuex"
import { defineComponent } from "vue"

import type Song from "../lib/domain/Song"

import { handleHttp, parseApiErrors } from "../lib"

export default defineComponent({
  data() {
    return {
      songs: [] as Song[],
    }
  },
  computed: {
    ...mapState(["backendHost", "accessToken"])
  },
  methods: {
    ...mapActions(["fetchAccessToken", "fetchLoggedIn", "doLogout", "updateErrors"]),
    handleTokenTimeout() {
      this.doLogout()
      this.$router.push("/login")
    },
  },
  async mounted() {
    this.fetchAccessToken()
    this.fetchLoggedIn()
    const songs_response = await handleHttp(async () => {
      const response = await axios.get(
        `${this.backendHost}/songs`,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.accessToken}`
          }
        }
      )
      this.songs = response.data.data
      return response
    })
    if (songs_response!.status == 440) {
      this.handleTokenTimeout()
    }
  }
})
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th>Título</th>
        <th>Artista</th>
        <th>Compositor</th>
        <th>Genero</th>
        <th>Album</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="song in songs" :key="song.id">
        <td>{{ song.title }}</td>
        <td>{{ song.artist }}</td>
        <td>{{ song.composer }}</td>
        <td>{{ song.genre }}</td>
        <td>{{ song.album }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
</style>