<script lang="ts">
import { defineComponent } from "vue"
import { RouterLink } from "vue-router"
import { mapActions, mapState } from "vuex"

export default defineComponent({
  components: {
    RouterLink
  },
  props: {
    title: String,
    url: String
  },
  computed: {
    ...mapState(["currentTab"]),
    isActive() {
      return this.currentTab == this.url
    }
  },
  methods: {
    ...mapActions(["updateCurrentTab"]),
    selectTab() {
      this.updateCurrentTab(this.url)
    }
  }
})
</script>

<template>
  <div class="tab-item" :class="{active: isActive}" ref="tab_item">
    <RouterLink :to="url" @click="selectTab">{{ title }}</RouterLink>
  </div>
</template>

<style>
.tabs > .tab-item {
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
  padding: 14px 10px 5px;
  margin-right: 5px;
  font-weight: 700;
  font-family: var(--font-primary);
  font-size: 18px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  position: relative;
  background-color: var(--quaternary-color);
}

.tab-item a,
.tab-item span {
  color: #fff;
  text-decoration: none;
}

.tabs > .tab-item.active {
  background-color: var(--primary-color);
  transition: all .5s;
}
.tabs > .tab-item.active a,
.tabs > .tab-item.active span
{
  color: var(--secondary-color);
}
</style>
