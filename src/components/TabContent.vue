<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({})

</script>

<template>
  <div class="tab-content-header">
    <div class="tab-header-inputs center">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.tab-content-header {
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: var(--primary-color);
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.tab-header-inputs {
  display: flex;
  flex: 1;
  flex-direction: row;
  margin: 15px 10px 10px;
}

.tab-header-inputs.center {
  justify-content: center;
}
</style>
