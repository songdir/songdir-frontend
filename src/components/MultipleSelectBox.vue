<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  props: {
    name: String,
    label: String,
    required: Boolean,
    disabled: { type: Boolean, default: false },
    modelValue: Array<string>
  },
  methods: {
    handleInput(event: Event) {
      const elem = (event.target as HTMLSelectElement)
      var values = [] as Array<string>
      for (var option of elem.selectedOptions) {
        values.push(option.value)
      }
      this.$emit("update:modelValue", values)
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
    <select :id="'id-' + name" :name="name" @input="handleInput" multiple="false" :required="required" :disabled="disabled">
      <slot></slot>
    </select>
  </div>
</template>
