<template>
  <div>
    <label :for="'perlin-noise-' + name.toLowerCase()">{{ name }}:</label>
    <select
      v-model.number="value"
      @change="emitParamValue"
      :id="'perlin-noise-' + name.toLowerCase()"
    >
      <option disabled value="">Please select one</option>
      <option v-for="preset in options" :value="preset.value" :key="preset">
        {{ preset.text }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'SelectParameter',
  props: {
    name: String,
    initialValue: Number,
    options: Array
  },
  data() {
    return {
      value: this.initialValue
    }
  },
  emits: ['emitParameterValue'],
  methods: {
    emitParamValue() {
      this.$emit('emitParameterValue', this.value)
    }
  }
}
</script>

<style scoped></style>
