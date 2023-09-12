<script lang="ts">
import { defineComponent } from "vue";

const days = Array.from(Array(31).keys()).map(n => n + 1)
const months = Array.from(Array(12).keys()).map(n => n + 1)

export default defineComponent({
  props: {
    name: String,
    label: String,
    minYear: {
      type: Number,
      default: 1000
    },
    maxYear: {
      type: Number,
      default: 0
    },
    required: Boolean,
    modelValue: String
  },
  methods: {
    handleInput() {
      const paddedMonth = this.month.toString().padStart(2, '0')
      const paddedDay = this.month.toString().padStart(2, '0')
      const paddedHour = this.hour.toString().padStart(2, '0')
      const paddedMinute = this.minute.toString().padStart(2, '0')
      const datetimeValue = `${this.year}-${paddedMonth}-${paddedDay}T${paddedHour}:${paddedMinute}:00`
      this.$emit("update:modelValue", datetimeValue)
    }
  },
  beforeMount() {
    if (this.modelValue !== "") {
      //  Deserialize initial value
      const dateValue = new Date((this.modelValue as string))
      this.day = dateValue.getDate()
      this.month = dateValue.getMonth() + 1
      this.year = dateValue.getFullYear()
      this.hour = dateValue.getHours()
      this.minute = dateValue.getMinutes()
    }
    if (this.maxYear === 0) {
      const now = new Date()
      this.years = Array.from(Array(now.getFullYear() - this.minYear).keys())
                   .map(y => y + this.minYear + 1)
                   .sort((a, b) => b - a)
    } else {
      this.years = Array.from(Array(this.maxYear - this.minYear).keys())
                   .map(y => y + this.minYear + 1)
                   .sort((a, b) => b - a)
    }
  },
  data() {
    return {
      day: 1,
      month: 1,
      year: 2022,
      hour: 0,
      minute: 0,
      days: days,
      months: months,
      years: ([] as Array<number>),
    }
  }
})
</script>

<template>
  <div class="input-general input-date">
    <label class="input-label" :for="'id-' + name">
      {{ label }}
      <span v-show="required">*</span>
    </label>
    <div class="input-list">
      <select :name="name + '-day'" v-model="day" @change="handleInput">
        <option :key="day" v-for="day in days">{{day}}</option>
      </select>
      <span>/</span>
      <select :name="name + '-month'" v-model="month" @change="handleInput">
        <option :key="month" v-for="month in months">{{month}}</option>
      </select>
      <span>/</span>
      <select :name="name + '-year'" v-model="year" @change="handleInput">
        <option :key="year" v-for="year in years">{{year}}</option>
      </select>
      <input
        type="number"
        placeholder="HH"
        min="0"
        max="23"
        :name="name + '-hour'"
        v-model="hour"
        @input="handleInput"
      />
      <span>:</span>
      <input
        type="number"
        placeholder="MM"
        min="0"
        max="59"
        :name="name + '-minute'"
        v-model="minute"
        @input="handleInput"
      />
    </div>
  </div>
</template>
