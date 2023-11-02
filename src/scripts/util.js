//Code from Don Park via https://gist.github.com/donpark/1796361
import { perlin2, seed } from './perlin.js'

export function randomNoise(canvas, xOrigin, yOrigin, width, height, alpha) {
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

export function perlinNoise(canvas, scale) {
  var ctx = canvas.getContext('2d')

  seed(Math.random())

  var image = ctx.createImageData(canvas.width, canvas.height)
  var data = image.data

  for (var x = 0; x < canvas.width; x++) {
    for (var y = 0; y < canvas.height; y++) {
      var value = (perlin2(x / scale, y / scale) + 1) / 2.0

      value *= 256

      var cell = (x + y * canvas.width) * 4
      data[cell] = data[cell + 1] = data[cell + 2] = value
      data[cell + 3] = 255 // alpha.
    }
  }
  ctx.putImageData(image, 0, 0)
}
