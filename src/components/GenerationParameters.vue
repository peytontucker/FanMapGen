<template>
  <div class="container">
    <NumericParameter
      v-for="parameter in filterParameters('numeric')"
      :key="parameter.name"
      :name="parameter.name"
      :initial-value="parameter.value"
      :min="parameter.min"
      :max="parameter.max"
      @emit-parameter-value="emitParameterValue"
    />
    <SelectParameter
      v-for="parameter in filterParameters('select')"
      :class="parameter.advanced ? 'advanced-feature' : ''"
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
      :sliderMin="parameter.sliderMin"
      :sliderMax="parameter.sliderMax"
      :numeric-min="parameter.numericMin || parameter.sliderMin"
      :numeric-max="parameter.numericMax || parameter.sliderMax"
      :step="parameter.step"
      @emit-parameter-value="emitParameterValue"
    />

    <div class="map-dimensions-container">
      <NumericParameter
        name="Map width"
        :initialValue="newMapDimensions.height"
        :min="50"
        :max="3840"
        @emitParameterValue="(newValue) => (this.newMapDimensions.width = newValue.value)"
        @input-detected="() => (this.newMapDimensions.changed = true)"
      />

      <NumericParameter
        name="Map height"
        :initialValue="newMapDimensions.height"
        :min="50"
        :max="2160"
        @emitParameterValue="(newValue) => (this.newMapDimensions.height = newValue.value)"
        @input-detected="() => (this.newMapDimensions.changed = true)"
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
import NumericParameter from './parameters/NumericParameter.vue'
import SelectParameter from './parameters/SelectParameter.vue'

export default {
  name: 'GenerationParameters',
  components: {
    SliderParameter,
    NumericParameter,
    SelectParameter
  },
  props: {
    showAdvancedFeatures: Boolean
  },
  data() {
    return {
      newMapDimensions: { width: 600, height: 600, changed: false },

      parameters: [
        { name: 'Seed', type: 'numeric', value: 17345, min: 0, max: 65535 },
        {
          name: 'Preset',
          type: 'select',
          value: PRESETS.STANDARD,
          options: Object.keys(PRESETS).map((preset) => ({
            text: preset.charAt(0) + preset.toLowerCase().slice(1),
            value: PRESETS[preset]
          }))
        },
        {
          name: 'Scale',
          type: 'slider',
          value: 100,
          slidersliderMin: 1,
          sliderMax: 200,
          numericMin: 0.001,
          numericMax: Infinity
        },
        {
          name: 'Octaves',
          type: 'slider',
          value: 4,
          sliderMin: 1,
          sliderMax: 10,
          numericMax: 20,
          advanced: true
        },
        {
          name: 'Persistance',
          type: 'slider',
          value: 0.5,
          sliderMin: 0,
          sliderMax: 1,
          step: 0.01,
          advanced: true
        },
        {
          name: 'Lacunarity',
          type: 'slider',
          value: 2,
          sliderMin: 1,
          sliderMax: 5,
          numericMax: Infinity,
          step: 0.1,
          advanced: true
        }
      ]
    }
  },
  computed: {},
  methods: {
    filterParameters(type) {
      if (this.showAdvancedFeatures) {
        return this.parameters.filter((parameter) => parameter.type === type)
      } else
        return this.parameters.filter((parameter) => parameter.type === type && !parameter.advanced)
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
