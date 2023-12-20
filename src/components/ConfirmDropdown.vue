<script lang="ts">
import { defineComponent } from "vue"

import ButtonBox from "./ButtonBox.vue"

export default defineComponent({
  components: {
    ButtonBox
  },
  emits: ["confirmYes", "confirmNo"],
  props: {
    yes: String,
    no: { type: String, default: "" }
  },
  data() {
    return {
      isActive: false
    }
  },
  methods: {
    toggleDropdown() {
      this.isActive = !this.isActive
    },
    confirmYes() {
      this.$emit("confirmYes")
    },
    confirmNo() {
      this.$emit("confirmNo")
      this.isActive = false
    }
  }
})
</script>

<template>
  <div class="dropdown">
    <button class="btn drop-btn" @click="toggleDropdown">
      <slot name="button"></slot>
    </button>
    <div class="dropdown-content" :class="{show: isActive}">
      <div class="dropdown-text">
        <slot name="confirm"></slot>
      </div>
      <ButtonBox color="btn-blue" @click="confirmYes">{{ yes }}</ButtonBox>
      <ButtonBox color="btn-secondary" v-if="no.length" @click="confirmNo">{{ no }}</ButtonBox>
    </div>
  </div>
</template>

<sytle scoped></sytle>
