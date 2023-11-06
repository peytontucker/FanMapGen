<!-- eslint-disable no-unused-vars -->
<script>
import { createNoiseMap, drawPerlinNoise, drawColorMap } from '@/scripts/util.js'
import { PRESETS } from './constants/terrainColorPresets'
import GenerationParameters from './components/GenerationParameters.vue'

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
      }
    }
  },
  components: {
    GenerationParameters
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
        this.generationParameters.lacunarity
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
        this.generationParameters.lacunarity
      )
      drawColorMap(this.canvasRef, noiseMap, this.generationParameters.preset)
      this.populateDataUrl()
    },
    populateDataUrl() {
      this.dataUrl = this.canvasRef.toDataURL('image/png', 1)
    },
    updateNoiseParams(updatedParameter) {
      this.generationParameters[updatedParameter.name.toLowerCase()] = updatedParameter.value
    },
    updateMapDimensions({ width, height }) {
      this.mapDimensions = { width, height }
    },
    updatePreset(preset) {
      this.generationParameters.preset = { ...preset }
    }
  }
}
</script>

<template>
  <div class="page-container">
    <div class="header">Fantasy Map Generator</div>
    <div class="content-container">
      <div class="generation-ui-container">
        <GenerationParameters
          @updateNoiseParamsEvent="updateNoiseParams"
          @updateMapDimensionsEvent="updateMapDimensions"
          @emitPreset="updatePreset"
        />
        <button @click="generatePerlinNoise">Generate Perlin Noise</button>
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
      </div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  font-family: 'Courier New', Courier, monospace;
  color: black;
}

button {
  padding: 8px 16px;
  font-size: 24px;
  background-color: lightgray;
  color: black;
}

button:disabled {
  opacity: 0.4;
}

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
  display: flex;
  justify-content: center;
  align-items: center;
}

.header {
  background-color: darkslategray;
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
</style>
