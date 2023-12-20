<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  props: {
    name: String,
    label: String,
    required: Boolean,
    disabled: { type: Boolean, default: false },
    modelValue: String
  },
  methods: {
    handleInput(event: Event) {
      const elem = (event.target as HTMLSelectElement)
      this.$emit("update:modelValue", elem.value)
    }
  }
})
</script>

<template>
  <div class="input-general" :class="{disabled: disabled}">
    <label class="input-label" :for="'id-' + name">
      {{ label }}
      <span v-show="required">*</span>
    </label>
    <select :id="'id-' + name" :name="name" @input="handleInput" :disabled="disabled">
      <slot></slot>
    </select>
  </div>
</template>
