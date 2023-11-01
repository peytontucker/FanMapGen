//Code from Don Park via https://gist.github.com/donpark/1796361

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
    imageData = canvasContext.getImageData(xOrigin, yOrigin, width, height),
    random = Math.random,
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

export function perlinNoise(canvas, noise) {
  const newCanvas = document.createElement('canvas')

  newCanvas.width = canvas.width
  newCanvas.height = canvas.height

  noise = noise || randomNoise(newCanvas)
  var canvasContext = canvas.getContext('2d')
  canvasContext.save()

  /* Scale random iterations onto the canvas to generate Perlin noise. */
  for (var size = 4; size <= noise.width; size *= 2) {
    var x = (Math.random() * (noise.width - size)) | 0,
      y = (Math.random() * (noise.height - size)) | 0
    canvasContext.globalAlpha = 4 / size

    canvasContext.drawImage(noise, x, y, size, size, 0, 0, canvas.width, canvas.height)
  }

  canvasContext.restore()
  return canvas
}
