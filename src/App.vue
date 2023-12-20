<script lang="ts">
import { defineComponent } from "vue"
import { RouterView } from "vue-router"
import { mapState, mapActions } from "vuex"

export default defineComponent({
  components: {
    RouterView
  },
  computed: {
    ...mapState(["loggedIn"])
  },
  methods: {
    ...mapActions(["fetchAccessToken", "fetchLoggedIn", "fetchActiveSong"])
  },
  mounted() {
    this.fetchAccessToken()
    this.fetchLoggedIn()
    this.fetchActiveSong()
  }
})
</script>

<template>
  <div v-if="loggedIn">
    <div class="container">
      <div class="row">
        <div class="col border-right" style="max-width: var(--bar-size);">
          <div class="vertical bar button">
            <div class="round-image">
              <img src="./public/images/colorful.png" alt="foto-perfil">
            </div>
          </div>
          <div class="vertical bar button">
            <a href="/directory">
              <i class="fa-solid fa-list"></i>
            </a>
          </div>
          <div class="vertical bar button">
            <a href="/details">
              <i class="fa-solid fa-compact-disc"></i>
            </a>
          </div>
          <div class="vertical bar button">
            <a href="/management">
              <i class="fa-solid fa-pen-to-square"></i>
            </a>
          </div>
        </div>
        <div class="col">
          <div class="row">
            <div class="col border-bottom bg-light-gray" style="max-height: var(--bar-size);"></div>
          </div>
          <div class="row">
            <div class="col">
              <RouterView />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <RouterView />
  </div>
</template>

<style scoped>
  /* Images and image containers */
  .round-image {
    width: 60%;
    height: 60%;
    overflow: hidden;
    border-radius: 50%;
  }
  .round-image img {
    width: auto;
    height: 100%;
  }
</style>