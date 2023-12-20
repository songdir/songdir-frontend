<script lang="ts">
import { defineComponent } from "vue"
import axios from "axios"
import { mapActions, mapState } from "vuex"

import { handleHttp } from "../lib"
import type Song from "@/lib/domain/Song"

export default defineComponent({
  data() {
    return {
      song: {} as Song
    }
  },
  computed: {
    ...mapState(["backendHost", "accessToken", "openedSongs", "activeSong"]),
  },
  methods: {
    ...mapActions(["doLogout",
                   "addOpenedSong",
                   "selectActiveSong"]),
    handleTokenTimeout() {
      this.doLogout()
      this.$router.push("/login")
    },
  },
  async mounted() {
    if (this.activeSong?.id == this.$route.params.id) {
      this.song = {...this.activeSong}
    } else {
      const song_id = this.$route.params.id
      const song_response = await handleHttp(async () => {
        const response = await axios.get(
          `${this.backendHost}/song/${song_id}`,
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${this.accessToken}`
            }
          }
        )
        this.song = response.data.data
        this.addOpenedSong(this.song)
        return response
      })
      if (song_response == undefined || song_response!.status == 440) {
        this.handleTokenTimeout()
      }
    }
  }
})
</script>

<template>
  <div class="row tab-bar">
    <div class="tab" v-for="song in openedSongs" :key="song.id" v-on:click="selectActiveSong(song.id)">
      <div class="tab-title">
        {{ song.title }}
      </div>
      <div class="tab-action">
        <button type="button">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col text-align-right" style="max-width: 100px;">
      <p><strong>Título:</strong></p>
      <p><strong>Subtítulo:</strong></p>
      <p><strong>Artista:</strong></p>
      <p><strong>Album:</strong></p>
      <p><strong>Compositor:</strong></p>
      <p><strong>Genero:</strong></p>
      <p><strong>Tonalidad:</strong></p>
      <p><strong>Tempo:</strong></p>
      <p><strong>Año:</strong></p>
    </div>
    <div class="col" style="padding-left: 2px;">
      <p>&nbsp;{{ song.title }}</p>
      <p>&nbsp;{{ song.subtitle }}</p>
      <p>&nbsp;{{ song.artist }}</p>
      <p>&nbsp;{{ song.album }}</p>
      <p>&nbsp;{{ song.composer }}</p>
      <p>&nbsp;{{ song.genre }}</p>
      <p>&nbsp;{{ song.key }}</p>
      <p>&nbsp;{{ song.tempo }}</p>
      <p>&nbsp;{{ song.creation_year }}</p>
    </div>
  </div>
</template>

<style scoped>
</style>