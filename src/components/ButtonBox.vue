<script lang="ts">
import { defineComponent, type PropType } from "vue";

export default defineComponent({
  props: {
    type: {
      type: String as PropType<"button" | "submit" | "reset" | undefined>,
      default: "button"
    },
    color: String,
    disabled: { type: Boolean, default: false },
  }
})

</script>

<template>
  <button :type="type" class="btn" :class="color" :disabled="disabled" @click="$emit('submit')">
    <span>
      <slot></slot>
    </span>
  </button>
</template>

<style scoped>
button:not(:disabled),
[type="button"]:not(:disabled),
[type="reset"]:not(:disabled),
[type="submit"]:not(:disabled) {
  cursor: pointer;
}
button[disabled] {
  color: var(--bs-gray-600);
  border-color: var(--bs-gray-600);
  background-color: var(--bs-gray-500);
}

.btn {
  padding: 5px 16px 5px 16px;
  box-sizing: border-box;
  border-radius: 20px;
  text-align: center;
  font-family: var(--font-primary);
}
.btn:hover {
  background-color: #8295a9;
}
.btn:active {
  background-color: #778899;
}

.btn span {
  font-size: 15px;
}

.btn-blue {
  color: #fff;
  background: var(--tertiary-color);
  border: 1px solid var(--tertiary-color);
  vertical-align: baseline;
}

.btn-secondary {
  color: var(--bs-black);
  border: 1px solid var(--bs-gray-200);
  background-color: var(--bs-gray-100);
}

</style>
