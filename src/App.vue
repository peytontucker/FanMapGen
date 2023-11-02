<script>
import { createNoiseMap, drawPerlinNoise, drawRandomNoise } from '@/scripts/util.js'

export default {
  data() {
    return {
      canvasRef: null,
      dataUrl: null,

      mapWidth: 600,
      mapHeight: 600,
      noiseParams: { scale: 50 },

      newWidth: 600,
      newHeight: 600,
      newNoiseParams: { scale: 50 }
    }
  },
  computed: {
    noiseParamsButtonIsDisabled() {
      return Object.keys(this.newNoiseParams).every(
        (key) => this.newNoiseParams[key] === this.noiseParams[key]
      )
    }
  },
  mounted() {
    this.canvasRef = this.$refs.canvasRef
  },
  methods: {
    generatePerlinNoise() {
      const noiseMap = createNoiseMap(
        this.canvasRef.width,
        this.canvasRef.height,
        this.noiseParams.scale
      )
      drawPerlinNoise(this.canvasRef, noiseMap)

      this.populateDataUrl()
    },
    generateRandomNoise() {
      drawRandomNoise(this.canvasRef)
      this.populateDataUrl()
    },
    populateDataUrl() {
      this.dataUrl = this.canvasRef.toDataURL('image/png', 1)
    },
    updateMapDimensions() {
      this.mapWidth = this.newWidth
      this.mapHeight = this.newHeight
    },
    updateNoiseParams() {
      this.noiseParams = { ...this.newNoiseParams }
    }
  }
}
</script>

<template>
  <div class="page-container">
    <div class="header">Fantasy Map Generator</div>
    <div class="content-container">
      <div class="generation-params-container">
        <div class="perlin-noise-params">
          <label for="perlin-noise-scale">Scale:</label>
          <input
            v-model="newNoiseParams.scale"
            id="perlin-noise-scale"
            size="10"
            inputmode="numeric"
          />
          <button :disabled="noiseParamsButtonIsDisabled" @click="updateNoiseParams">
            Apply Changes
          </button>
        </div>
        <div class="map-dimensions-container">
          <label for="map-width-input">Map width:</label>
          <input v-model="newWidth" id="map-width-input" size="10" inputmode="numeric" />

          <label for="map-height-input">Map height:</label>
          <input v-model="newHeight" id="map-height-input" size="10" inputmode="numeric" />
          <button
            :disabled="newHeight === mapHeight && newWidth === mapWidth"
            @click="updateMapDimensions"
          >
            Apply Changes
          </button>
        </div>

        <button @click="generatePerlinNoise">Generate Perlin Noise</button>
        <button @click="generateRandomNoise">Generate Random Noise</button>
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

.map-container {
  flex: 3;
  display: flex;
  justify-content: center;
  align-items: center;
}

.generation-params-container {
  flex: 1;
  padding: 24px;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eee;
  gap: 32px;
}

.generation-params-container * {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  align-content: center;
  gap: 16px;
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
