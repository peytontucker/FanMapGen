<template>
  <div>
    <label :for="'perlin-noise-' + name.toLowerCase()">{{ name }}:</label>
    <input
      @input="emitParamValue"
      type="range"
      :min="min"
      :max="max"
      :step="step || 1"
      v-model.number="value"
      class="slider"
    />
    <input
      v-model.number="value"
      id="perlin-noise-scale"
      size="10"
      inputmode="numeric"
      @input="emitNoiseParams"
    />
  </div>
</template>

<script>
export default {
  name: 'SliderParameter',
  props: {
    name: String,
    initialValue: Number,
    min: Number,
    max: Number,
    step: Number
  },
  data() {
    return {
      value: this.initialValue
    }
  },
  emits: ['updateParamValue'],
  methods: {
    emitParamValue() {
      this.$emit('updateParamValue', { name: this.name, value: this.value })
    }
  }
}
</script>

<style scoped>
.container {
  flex: 1;
  padding: 24px;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eee;
  gap: 32px;
}
.container * {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  align-content: center;
  gap: 16px;
}
</style>
