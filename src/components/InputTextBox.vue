<script lang="ts">
import { defineComponent, type PropType } from "vue"

type ValidTextInputType = "text" | "email" | "password"

export default defineComponent({
  props: {
    name: String,
    label: String,
    inputtype: { type: String as PropType<ValidTextInputType>, default: "text" },
    required: Boolean,
    disabled: { type: Boolean, default: false },
    modelValue: String
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
      :type="inputtype"
      :name="name"
      :id="'id-' + name"
      @input="handleInput"
      :disabled="disabled"
      :value="modelValue"
    />
  </div>
</template>
