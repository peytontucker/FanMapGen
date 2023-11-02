/* eslint-disable no-unused-vars */
import { perlin2, seed } from './perlin.js'
import { COLORS } from '../constants/colors.js'

//Random Noise code from Don Park via https://gist.github.com/donpark/1796361
export function drawRandomNoise(canvas, xOrigin, yOrigin, width, height, alpha) {
  xOrigin = xOrigin || 0
  yOrigin = yOrigin || 0
  width = width || canvas.width
  height = height || canvas.height
  alpha = alpha || 255
  var canvasContext = canvas.getContext('2d'),
    //get the ImageData object that represents the underlying pixel data of an area of a <canvas> element.
    //The data property of an ImageData object contains a one-dimensional array, where each 4-element subsection
    // represents image data (RGBA) values for each pixel of the array
    random = Math.random,
    imageData = canvasContext.getImageData(xOrigin, yOrigin, width, height),
    pixelData = imageData.data,
    pixelDataLength = pixelData.length,
    i = 0

  //Iterate through all pixel data, incrementing by four each time to adjust RGBA values. When
  while (i < pixelDataLength) {
    //R = G = B = [random value between 0 and 255]. Alpha is either passed as an argument above or set to 255 in the absence of the argument.
    pixelData[i++] = pixelData[i++] = pixelData[i++] = (random() * 256) | 0
    pixelData[i++] = alpha
  }
  canvasContext.putImageData(imageData, xOrigin, yOrigin)
  return canvas
}

//Perlin Noise from Joseph Gentle https://github.com/josephg/noisejs
export function createNoiseMap(
  mapWidth,
  mapHeight,
  seedValue,
  scale,
  octaves,
  persistance,
  lacunarity
) {
  const noiseMap = [...Array(mapWidth)].map(() => Array(mapHeight))

  seed(seedValue)
  for (var y = 0; y < mapHeight; y++) {
    for (var x = 0; x < mapWidth; x++) {
      let amplitude = 1
      let frequency = 1
      let noiseHeight = 0

      for (let i = 0; i < octaves; i++) {
        let sampleX = (x / scale) * frequency
        let sampleY = (y / scale) * frequency

        var perlinValue = perlin2(sampleX, sampleY)
        noiseHeight += perlinValue * amplitude

        amplitude *= persistance
        frequency *= lacunarity
      }

      noiseMap[x][y] = (noiseHeight + 1) / 2
    }
  }

  return noiseMap
}

export function drawPerlinNoise(canvas, noiseMap) {
  var canvasContext = canvas.getContext('2d')

  var image = canvasContext.createImageData(canvas.width, canvas.height)
  var data = image.data

  for (var y = 0; y < canvas.height; y++) {
    for (var x = 0; x < canvas.width; x++) {
      let colorValue = noiseMap[x][y] * 256
      var cell = (x + y * canvas.width) * 4
      data[cell] = data[cell + 1] = data[cell + 2] = colorValue
      data[cell + 3] = 255
    }
  }
  canvasContext.putImageData(image, 0, 0)
}

export function drawColorMap(canvas, noiseMap) {
  var canvasContext = canvas.getContext('2d')
  var image = canvasContext.createImageData(canvas.width, canvas.height)
  var data = image.data

  for (var y = 0; y < canvas.height; y++) {
    for (var x = 0; x < canvas.width; x++) {
      const heightValue = noiseMap[x][y]
      let colorRgbObject

      if (heightValue < 0.5) {
        colorRgbObject = COLORS.BLUE
      } else if (heightValue < 0.55) {
        colorRgbObject = COLORS.SAND
      } else if (heightValue < 0.8) {
        colorRgbObject = COLORS.GREEN
      } else if (heightValue < 0.95) {
        colorRgbObject = COLORS.BROWN
      } else {
        colorRgbObject = COLORS.WHITE
      }

      var cell = (x + y * canvas.width) * 4
      data[cell] = colorRgbObject.red
      data[cell + 1] = colorRgbObject.green
      data[cell + 2] = colorRgbObject.blue
      data[cell + 3] = 255
    }
  }
  canvasContext.putImageData(image, 0, 0)
}
