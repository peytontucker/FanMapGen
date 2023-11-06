<template>
  <div>
    <label :for="'perlin-noise-' + name.toLowerCase()">{{ name }}:</label>
    <input
      v-model.number="value"
      :id="'perlin-noise-' + name.toLowerCase()"
      size="10"
      inputmode="numeric"
      @input="emitParamValue"
    />
  </div>
</template>

<script>
export default {
  name: 'NumericParameter',
  props: {
    name: String,
    initialValue: Number
  },
  data() {
    return {
      value: this.initialValue
    }
  },
  emits: ['emitParameterValue'],
  methods: {
    emitParamValue() {
      this.$emit('emitParameterValue', { name: this.name, value: this.value })
    }
  }
}
</script>

<style scoped></style>
