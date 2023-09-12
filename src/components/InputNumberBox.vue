<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  props: {
    name: String,
    label: String,
    required: Boolean,
    disabled: { type: Boolean, default: false },
    modelValue: { type: Number, default: 0 }
  },
  methods: {
    handleInput(event: Event) {
      this.$emit("update:modelValue", (event.target as HTMLInputElement).value)
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
    <input
      type="number"
      :name="name"
      :id="'id-' + name"
      @input="handleInput"
      :required="required"
      :disabled="disabled"
      :value="modelValue"
    />
  </div>
</template>
