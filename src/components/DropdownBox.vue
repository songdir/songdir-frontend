<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({})

</script>

<template>
  <div class="dropdown">
    <button class="btn drop-btn">
      <slot name="button"></slot>
    </button>
    <div class="dropdown-content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<sytle scoped></sytle>
