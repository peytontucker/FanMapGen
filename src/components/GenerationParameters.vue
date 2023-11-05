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
      <label for="perlin-noise-scale">Scale:</label>
      <input
        @input="emitNoiseParams"
        type="range"
        min="1"
        max="200"
        v-model.number="parameters.find((parameter) => parameter.name === 'Scale').value"
        class="slider"
      />
      <input
        v-model.number="parameters.find((parameter) => parameter.name === 'Scale').value"
        id="perlin-noise-scale"
        size="10"
        inputmode="numeric"
        @input="emitNoiseParams"
      />
    </div>
    <div>
      <label for="perlin-noise-octaves">Octaves:</label>
      <input
        @input="emitNoiseParams"
        type="range"
        min="1"
        max="10"
        v-model.number="parameters.find((parameter) => parameter.name === 'Octaves').value"
        class="slider"
      />
      <input
        v-model.number="parameters.find((parameter) => parameter.name === 'Octaves').value"
        @input="emitNoiseParams"
        id="perlin-noise-octaves"
        size="10"
        inputmode="numeric"
      />
    </div>
    <div>
      <label for="perlin-noise-persistance">Persistance:</label>
      <input
        @input="emitNoiseParams"
        type="range"
        min="0"
        max="1"
        step="0.01"
        v-model.number="parameters.find((parameter) => parameter.name === 'Persistance').value"
        class="slider"
      />
      <input
        v-model.number="parameters.find((parameter) => parameter.name === 'Persistance').value"
        @input="emitNoiseParams"
        id="perlin-noise-persistance"
        size="10"
        inputmode="numeric"
      />
    </div>
    <div>
      <label for="perlin-noise-lacunarity">Lacunarity:</label>
      <input
        @input="emitNoiseParams"
        type="range"
        min="1"
        max="5"
        step="0.1"
        v-model.number="parameters.find((parameter) => parameter.name === 'Lacunarity').value"
        class="slider"
      />
      <input
        v-model.number="parameters.find((parameter) => parameter.name === 'Lacunarity').value"
        @input="emitNoiseParams"
        id="perlin-noise-lacunarity"
        size="10"
        inputmode="numeric"
      />
    </div>
    <div class="map-dimensions-container">
      <label for="map-width-input">Map width:</label>
      <input v-model.number="newWidth" id="map-width-input" size="10" inputmode="numeric" />

      <label for="map-height-input">Map height:</label>
      <input v-model.number="newHeight" id="map-height-input" size="10" inputmode="numeric" />
      <button
        :disabled="newHeight === mapHeight && newWidth === mapWidth"
        @click="emitMapDimensions"
      >
        Apply Changes
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GenerationParameters',
  data() {
    return {
      newWidth: 600,
      newHeight: 600,

      parameters: [
        { name: 'Seed', type: 'numeric', value: 17345 },
        { name: 'Scale', type: 'slider', value: 100, min: 1, max: 200 },
        { name: 'Octaves', type: 'slider', value: 4, min: 1, max: 10 },
        { name: 'Persistance', type: 'slider', value: 0.5, min: 0, max: 1 },
        { name: 'Lacunarity', type: 'slider', value: 2, min: 1, max: 5 }
      ]
    }
  },
  computed: {
    sliderParameters() {
      return this.parameters.filter((parameter) => parameter.type === 'slider')
    },
    parameterValues() {
      const object = Object.fromEntries(
        this.parameters.map((parameter) => [parameter.name.toLowerCase(), parameter.value])
      )
      return object
    }
  },
  methods: {
    emitMapDimensions() {
      this.$emit('updateMapDimensionsEvent', { width: this.newWidth, height: this.newHeight })
    },
    emitNoiseParams() {
      this.$emit('updateNoiseParamsEvent', this.parameterValues)
    }
  },
  emits: ['updateNoiseParamsEvent', 'updateMapDimensionsEvent']
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
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  align-content: center;
  gap: 16px;
}
</style>
