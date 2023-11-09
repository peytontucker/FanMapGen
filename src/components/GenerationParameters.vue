<template>
  <div class="container">
    <NumericParameter
      v-for="parameter in filterParameters('numeric')"
      :key="parameter.name"
      :name="parameter.name"
      :initial-value="parameter.value"
      @emit-parameter-value="emitParameterValue"
    />
    <SelectParameter
      v-for="parameter in filterParameters('select')"
      :key="parameter.name"
      :name="parameter.name"
      :initial-value="parameter.value"
      :options="parameter.options"
      @emit-parameter-value="emitPreset"
    />

    <SliderParameter
      v-for="parameter in filterParameters('slider')"
      :key="parameter.name"
      :name="parameter.name"
      :initial-value="parameter.value"
      :min="parameter.min"
      :max="parameter.max"
      :step="parameter.step"
      @emit-parameter-value="emitParameterValue"
    />

    <div class="map-dimensions-container">
      <div>
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
      </div>

      <div>
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
      </div>
      <button :disabled="!newMapDimensions.changed" @click="emitMapDimensionsAndToggleChanged">
        Apply Changes
      </button>
    </div>
    <button id="show-advanced-parameters-button" @click="toggleShowAdvancedParameters">
      {{ showAdvancedParameters ? 'Hide' : 'Show' }} Advanced Parameters
    </button>
  </div>
</template>

<script>
import { PRESETS } from '../constants/terrainColorPresets'
import SliderParameter from './parameters/SliderParameter.vue'
import NumericParameter from './parameters/NumericParameter.vue'
import SelectParameter from './parameters/SelectParameter.vue'

export default {
  name: 'GenerationParameters',
  components: {
    SliderParameter,
    NumericParameter,
    SelectParameter
  },
  data() {
    return {
      showAdvancedParameters: false,
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
        { name: 'Octaves', type: 'slider', value: 4, min: 1, max: 10, advanced: true },
        {
          name: 'Persistance',
          type: 'slider',
          value: 0.5,
          min: 0,
          max: 1,
          step: 0.01,
          advanced: true
        },
        { name: 'Lacunarity', type: 'slider', value: 2, min: 1, max: 5, step: 0.1, advanced: true }
      ]
    }
  },
  computed: {},
  methods: {
    filterParameters(type) {
      if (this.showAdvancedParameters) {
        return this.parameters.filter((parameter) => parameter.type === type)
      } else
        return this.parameters.filter((parameter) => parameter.type === type && !parameter.advanced)
    },
    toggleShowAdvancedParameters() {
      this.showAdvancedParameters = !this.showAdvancedParameters
    },
    emitMapDimensionsAndToggleChanged() {
      this.newMapDimensions.changed = false
      this.$emit('updateMapDimensionsEvent', {
        width: this.newMapDimensions.width,
        height: this.newMapDimensions.height
      })
    },
    emitPreset(value) {
      this.$emit('emitPreset', value)
    },
    emitParameterValue(updatedParameter) {
      this.$emit('updateParamValueEvent', updatedParameter)
    }
  },
  emits: ['updateParamValueEvent', 'updateMapDimensionsEvent', 'emitPreset']
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

#show-advanced-parameters-button {
  font-size: 16px;
}
</style>
