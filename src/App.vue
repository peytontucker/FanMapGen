<!-- eslint-disable no-unused-vars -->
<script>
import { createNoiseMap, drawPerlinNoise, drawRandomNoise, drawColorMap } from '@/scripts/util.js'
import * as presets from './constants/terrainColorPresets'
import GenerationParameters from './components/GenerationParameters.vue'

export default {
  data() {
    return {
      canvasRef: null,
      dataUrl: null,

      mapWidth: 600,
      mapHeight: 600,
      noiseParams: { seed: 17345, scale: 100, octaves: 4, persistance: 0.5, lacunarity: 2 }
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
        this.noiseParams.seed,
        this.noiseParams.scale,
        this.noiseParams.octaves,
        this.noiseParams.persistance,
        this.noiseParams.lacunarity
      )
      drawPerlinNoise(this.canvasRef, noiseMap)
      this.populateDataUrl()
    },
    generateColorMap() {
      const noiseMap = createNoiseMap(
        this.canvasRef.width,
        this.canvasRef.height,
        this.noiseParams.seed,
        this.noiseParams.scale,
        this.noiseParams.octaves,
        this.noiseParams.persistance,
        this.noiseParams.lacunarity
      )
      drawColorMap(this.canvasRef, noiseMap, presets.EARTH)
      this.populateDataUrl()
    },
    populateDataUrl() {
      this.dataUrl = this.canvasRef.toDataURL('image/png', 1)
    },
    updateNoiseParams(newNoiseParams) {
      this.noiseParams = { ...newNoiseParams }
    },
    updateMapDimensions({ width, height }) {
      this.mapWidth = width
      this.mapHeight = height
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
        />
        <button @click="generatePerlinNoise">Generate Perlin Noise</button>
        <button @click="generateColorMap">Generate Color Map</button>
        <a :href="dataUrl" download="map">
          <button :disabled="!dataUrl">Download</button>
        </a>
      </div>
      <div class="map-container">
        <canvas id="map" ref="canvasRef" :width="mapWidth" :height="mapHeight"></canvas>
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
