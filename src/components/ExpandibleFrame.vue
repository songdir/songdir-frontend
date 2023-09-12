<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  props: {
    expand: Boolean,
  },
  methods: {
    toggleExpanded() {
      this.isExpanded = !this.isExpanded
    }
  },
  data() {
    return {
      isExpanded: this.expand,
    }
  }
})

</script>

<template>
  <div class="expandible-frame" :class="{expanded: isExpanded}">
    <div class="expandible-header">
      <div class="header">
        <slot name="header"></slot>
      </div>
      <div class="rubber-band" @click="toggleExpanded"></div>
      <div class="actions">
        <slot name="actions"></slot>
      </div>
    </div>
    <div class="expandible-body">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.expandible-frame {
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: var(--bs-gray-400);
  border-radius: 10px;
  max-width: 600px;
  margin: 0 auto 10px auto;
}

.expandible-frame.large {
  max-width: 85%;
}

.expandible-frame > .expandible-header {
  display: flex;
  justify-content: space-between;
  padding: 5px 5px 5px 15px;
  width: 100%;
}
.expandible-header .header {
  flex: 1;
}
.expandible-header .rubber-band {
  flex: 1;
  cursor: pointer;
}
.expandible-header .actions {
  display: flex;
  justify-content: end;
  flex: 1;
}

.expandible-frame > .expandible-body {
  padding: 0;
  overflow: hidden;
  transition: max-height .3s;
  transition: padding .3s;
  width: 100%;
  max-height: 0;
}
.expandible-frame.expanded > .expandible-body {
  padding: 10px;
  max-height: fit-content;
}
</style>
