<template>
  <div>
    <label :for="'perlin-noise-' + name.toLowerCase()">{{ name }}:</label>
    <input
      @input="emitParamValue"
      type="range"
      :min="sliderMin"
      :max="sliderMax"
      :step="step"
      v-model.number="value"
      class="slider"
    />
    <input
      v-model.number="value"
      :id="'perlin-noise-' + name.toLowerCase()"
      :min="numericMin"
      :max="numericMax"
      size="10"
      inputmode="numeric"
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
import { clamp } from '../../scripts/util'

export default {
  name: 'SliderParameter',
  props: {
    name: {
      type: String,
      required: true
    },
    initialValue: {
      type: Number,
      required: true
    },
    sliderMin: {
      type: Number,
      required: true
    },
    sliderMax: {
      type: Number,
      required: true
    },
    numericMin: Number,
    numericMax: Number,
    step: Number
  },
  data() {
    return {
      value: this.initialValue
    }
  },
  emits: ['emitParameterValue'],
  methods: {
    clampInput() {
      this.value = clamp(this.value, this.numericMin, this.numericMax)
    },
    emitParamValue() {
      this.$emit('emitParameterValue', { name: this.name, value: this.value })
    }
  }
}
</script>

<style scoped></style>
