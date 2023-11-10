<template>
  <div>
    <label :for="'perlin-noise-' + name.toLowerCase()">{{ name }}:</label>
    <input
      v-model.number="value"
      :id="'perlin-noise-' + name.toLowerCase()"
      size="10"
      :min="min"
      :max="max"
      :step="step || 1"
      inputmode="numeric"
      type="number"
      @input="emitInputDetected"
      @change="
        () => {
          clampInput()
          emitParamValue()
        }
      "
    />
  </div>
</template>

<script>
import { clamp } from '@/scripts/util.js'

export default {
  name: 'NumericParameter',
  props: {
    name: String,
    initialValue: Number,
    min: {
      type: Number,
      default: -Infinity
    },
    max: {
      type: Number,
      default: Infinity
    },
    step: Number
  },
  data() {
    return {
      value: this.initialValue
    }
  },
  emits: ['emitParameterValue', 'valueChanged'],
  methods: {
    clampInput() {
      this.value = clamp(this.value, this.min, this.max)
    },
    emitParamValue() {
      this.$emit('emitParameterValue', { name: this.name, value: this.value })
    },
    emitInputDetected() {
      this.$emit('inputDetected')
    }
  }
}
</script>

<style scoped></style>
