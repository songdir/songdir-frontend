<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({})
</script>

<template>
  <div class="tabs">
    <slot></slot>
  </div>
</template>

<style scoped>
.tabs {
  margin-top: 20px;
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
}
</style>
