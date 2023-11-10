<!-- eslint-disable no-unused-vars -->

<template>
  <div class="page-container">
    <div class="header">Fantasy Map Generator</div>
    <div class="content-container">
      <div class="generation-ui-container">
        <GenerationParameters
          :showAdvancedFeatures="showAdvancedFeatures"
          @updateParamValueEvent="updateParamValue"
          @updateMapDimensionsEvent="updateMapDimensions"
          @emitPreset="updatePreset"
        />
        <button id="show-advanced-parameters-button" @click="toggleShowAdvancedFeatures">
          {{ showAdvancedFeatures ? 'Hide' : 'Show' }} Advanced Features
        </button>
        <button class="advanced-feature" @click="generatePerlinNoise">Generate Perlin Noise</button>
        <button @click="generateColorMap">Generate Color Map</button>
        <a :href="dataUrl" download="map">
          <button :disabled="!dataUrl">Download</button>
        </a>
      </div>
      <div class="map-container">
        <canvas
          id="map"
          ref="canvasRef"
          :width="mapDimensions.width"
          :height="mapDimensions.height"
        ></canvas>
        <div class="scroll-container">
          <div class="scroll-buttons-container">
            <button :disabled="!dataUrl" @click="() => changeVerticalOffset(-1)">▲</button>
            <div>
              <button :disabled="!dataUrl" @click="() => changeHorizontalOffset(-1)">◀</button>
              <button :disabled="!dataUrl" @click="() => changeHorizontalOffset(1)">▶</button>
            </div>
            <button :disabled="!dataUrl" @click="() => changeVerticalOffset(1)">▼</button>
          </div>
          <NumericParameter
            name="Scroll Multiplier"
            :initialValue="scrollMultiplier"
            :min="0"
            @emitParameterValue="(newValue) => (scrollMultiplier = newValue.value)"
          />
        </div>
      </div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
import { createNoiseMap, drawPerlinNoise, drawColorMap } from '@/scripts/util.js'
import { PRESETS } from './constants/terrainColorPresets'
import GenerationParameters from './components/GenerationParameters.vue'
import NumericParameter from './components/parameters/NumericParameter.vue'

export default {
  data() {
    return {
      canvasRef: null,
      dataUrl: null,

      mapDimensions: { width: 600, height: 600 },
      generationParameters: {
        seed: 17345,
        scale: 100,
        octaves: 4,
        persistance: 0.5,
        lacunarity: 2,
        preset: PRESETS.STANDARD
      },

      offsetX: 0,
      offsetY: 0,
      offsetStep: 0.1,
      scrollMultiplier: 1,
      showAdvancedFeatures: false
    }
  },
  components: {
    GenerationParameters,
    NumericParameter
  },
  mounted() {
    this.canvasRef = this.$refs.canvasRef
  },
  methods: {
    generatePerlinNoise() {
      const noiseMap = createNoiseMap(
        this.canvasRef.width,
        this.canvasRef.height,
        this.generationParameters.seed,
        this.generationParameters.scale,
        this.generationParameters.octaves,
        this.generationParameters.persistance,
        this.generationParameters.lacunarity,
        this.offsetX,
        this.offsetY
      )
      drawPerlinNoise(this.canvasRef, noiseMap)
      this.populateDataUrl()
    },
    generateColorMap() {
      const noiseMap = createNoiseMap(
        this.canvasRef.width,
        this.canvasRef.height,
        this.generationParameters.seed,
        this.generationParameters.scale,
        this.generationParameters.octaves,
        this.generationParameters.persistance,
        this.generationParameters.lacunarity,
        this.offsetX,
        this.offsetY
      )
      drawColorMap(this.canvasRef, noiseMap, this.generationParameters.preset)
      this.populateDataUrl()
    },

    changeHorizontalOffset(directionValue) {
      this.offsetX += directionValue * this.offsetStep * this.scrollMultiplier
      this.generateColorMap()
    },
    changeVerticalOffset(directionValue) {
      this.offsetY += directionValue * this.offsetStep * this.scrollMultiplier
      this.generateColorMap()
    },
    populateDataUrl() {
      this.dataUrl = this.canvasRef.toDataURL('image/png', 1)
    },
    updateParamValue(updatedParameter) {
      this.generationParameters[updatedParameter.name.toLowerCase()] = updatedParameter.value
    },
    updateMapDimensions({ width, height }) {
      this.mapDimensions = { width, height }
    },
    updatePreset(preset) {
      this.generationParameters.preset = { ...preset }
    },
    toggleShowAdvancedFeatures() {
      this.showAdvancedFeatures = !this.showAdvancedFeatures
    }
  },
  computed: {
    advancedFeatureVisibility() {
      return this.showAdvancedFeatures ? 'visible' : 'hidden'
    }
  }
}
</script>

<style>
button {
  padding: 8px 16px;
  font-size: 24px;
  background-color: lightgray;
  color: black;
}

* {
  margin: 0;
  padding: 0;
  font-family: 'Courier New', Courier, monospace;
  color: black;
}

button:disabled {
  opacity: 0.4;
}
</style>

<style scoped>
#map {
  border: solid lightslategray 1px;
  margin: 8px;
  border-radius: 3%;
}

.page-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.content-container {
  display: flex;
  justify-content: center;
  flex: 1;
}

.content-container * {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  align-content: center;
  gap: 16px;
}

.generation-ui-container {
  flex: 1;
  padding: 24px;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eee;
  gap: 32px;
}

.map-container {
  flex: 3;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
}

.scroll-container {
  display: flex;
}

.scroll-buttons-container {
  display: flex;
  flex-direction: column;
  margin: 8px;
  padding: 16px;
}

.header {
  background-image: linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)),
    url('./assets/header_background.png');
}

.header,
.footer {
  padding: 16px;
  display: flex;
  font-size: 36px;
  font-weight: bold;
  align-items: center;
  justify-content: center;
}

.footer {
  background-color: slategray;
}

.advanced-feature {
  visibility: v-bind(advancedFeatureVisibility);
}
</style>
