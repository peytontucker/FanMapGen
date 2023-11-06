<template>
  <div class="container">
    <div>
      <label for="perlin-noise-seed">Seed:</label>
      <input
        v-model.number="parameters.find((parameter) => parameter.name === 'Seed').value"
        @input="emitNoiseParams"
        id="perlin-noise-seed"
        size="10"
        inputmode="numeric"
      />
    </div>
    <div>
      Preset:
      <select v-model="presetParameter.value" @change="emitPreset">
        <option disabled value="">Please select one</option>
        <option v-for="preset in presetParameterOptions" :value="preset.value" :key="preset">
          {{ preset.text }}
        </option>
      </select>
    </div>

    <SliderParameter
      v-for="parameter in sliderParameters"
      :key="parameter.name"
      :name="parameter.name"
      :initial-value="parameter.value"
      :min="parameter.min"
      :max="parameter.max"
      :step="parameter.step"
      @update-param-value="updateParameterValue"
    />

    <div class="map-dimensions-container">
      <label for="map-width-input">Map width:</label>
      <input
        v-model.number="newMapDimensions.width"
        @input="
          () => {
            newMapDimensions.changed = true
          }
        "
        id="map-width-input"
        size="10"
        inputmode="numeric"
      />

      <label for="map-height-input">Map height:</label>
      <input
        v-model.number="newMapDimensions.height"
        @input="
          () => {
            newMapDimensions.changed = true
          }
        "
        id="map-height-input"
        size="10"
        inputmode="numeric"
      />
      <button :disabled="!newMapDimensions.changed" @click="emitMapDimensionsAndToggleChanged">
        Apply Changes
      </button>
    </div>
  </div>
</template>

<script>
import { PRESETS } from '../constants/terrainColorPresets'
import SliderParameter from './parameters/SliderParameter.vue'

export default {
  name: 'GenerationParameters',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    SliderParameter
  },
  data() {
    return {
      newMapDimensions: { width: 600, height: 600, changed: false },

      parameters: [
        { name: 'Seed', type: 'numeric', value: 17345 },
        {
          name: 'Preset',
          type: 'select',
          value: PRESETS.STANDARD,
          options: Object.keys(PRESETS).map((preset) => ({
            text: preset.charAt(0) + preset.toLowerCase().slice(1),
            value: PRESETS[preset]
          }))
        },
        { name: 'Scale', type: 'slider', value: 100, min: 1, max: 200 },
        { name: 'Octaves', type: 'slider', value: 4, min: 1, max: 10 },
        { name: 'Persistance', type: 'slider', value: 0.5, min: 0, max: 1, step: 0.01 },
        { name: 'Lacunarity', type: 'slider', value: 2, min: 1, max: 5, step: 0.1 }
      ]
    }
  },
  computed: {
    sliderParameters() {
      return this.parameters.filter((parameter) => parameter.type === 'slider')
    },
    parameterValues() {
      return Object.fromEntries(
        this.parameters.map((parameter) => [parameter.name.toLowerCase(), parameter.value])
      )
    },
    presetParameter() {
      return this.parameters.find((parameter) => parameter.name === 'Preset')
    },
    presetParameterOptions() {
      return this.parameters.find((parameter) => parameter.name === 'Preset').options
    },
    updateParameterValue() {
      return (updatedParameter) => {
        this.parameters.find((parameter) => parameter.name === updatedParameter.name).value =
          updatedParameter.value
        this.emitNoiseParams()
      }
    }
  },
  methods: {
    emitMapDimensionsAndToggleChanged() {
      this.newMapDimensions.changed = false
      this.$emit('updateMapDimensionsEvent', {
        width: this.newMapDimensions.width,
        height: this.newMapDimensions.height
      })
    },
    emitNoiseParams() {
      this.$emit('updateNoiseParamsEvent', this.parameterValues)
    },
    emitPreset() {
      this.$emit('emitPreset', this.presetParameter.value)
    }
  },
  emits: ['updateNoiseParamsEvent', 'updateMapDimensionsEvent', 'emitPreset']
}
</script>

<style>
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
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  align-content: center;
  gap: 16px;
}
</style>
