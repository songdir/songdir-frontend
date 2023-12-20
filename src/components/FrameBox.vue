<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({})

</script>

<template>
  <div class="frame">
    <div class="frame-header">
      <slot name="header"></slot>
    </div>
    <div class="frame-body">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.frame {
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: var(--bs-white);
  border-radius: 10px;
  max-width: 40%;
  margin: 0 auto 10px auto;
}

.frame.large {
  max-width: 85%;
}
.frame.full {
  width: 100%;
  max-width: 100%;
}
.frame.success {
  background-color: #d4e5c9;
}
.frame.error {
  background-color: #f7b4b4;
}
.frame.warning {
  background-color: #f7c29c;
}

.frame > .frame-header {
  padding: 10px;
  width: 100%;
}

.frame > .frame-body {
  padding: 0 10px;
  height: fit-content;
  overflow: hidden;
  width: 100%;
}
</style>
