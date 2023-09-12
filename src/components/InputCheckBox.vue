<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    name: String,
    label: String,
    modelValue: Boolean
  },
  methods: {
    handleInput(event: Event) {
      this.$emit("update:modelValue", (event.target as HTMLInputElement).checked)
    }
  }
})
</script>

<template>
  <div class="input-general">
    <input type="checkbox" :name="name" :id="'id-' + name" @input="handleInput" :checked="modelValue" />
    <label class="input-label" :for="'id-' + name">
      {{ label }}
    </label>
  </div>
</template>
