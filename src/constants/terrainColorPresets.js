import { COLORS } from './colors'

// Preset color values for different terrain height ranges. Each preset is an
// object, where the object's properties are the max height of a specific
// terrain color, and the value of each property is the color value for that
// terrain type.

export const PRESETS = {
  EARTH: {
    0.5: COLORS.BLUE,
    1.0: COLORS.GREEN
  },
  STANDARD: {
    0.5: COLORS.BLUE,
    0.55: COLORS.SAND,
    0.65: COLORS.GREEN,
    0.7: COLORS.DARK_GREEN,
    0.8: COLORS.DARK_BROWN,
    0.9: COLORS.BROWN,
    1.0: COLORS.WHITE
  },
  GRAYSCALE: {
    0.5: COLORS.DARKER_GRAY,
    0.6: COLORS.DARK_GRAY,
    0.7: COLORS.GRAY,
    0.8: COLORS.LIGHT_GRAY,
    0.9: COLORS.LIGHTER_GRAY,
    1.0: COLORS.WHITE
  },
  MESA: {
    0.5: COLORS.TAN,
    0.6: COLORS.RUST,
    0.7: COLORS.DARK_RUST,
    1.0: COLORS.RED_BROWN
  },
  DESERT: {
    0.1: COLORS.BLUE,
    0.11: COLORS.GREEN,
    0.65: COLORS.SAND,
    1.0: COLORS.LIGHT_SAND
  },
  JUNGLE: {
    0.5: COLORS.DARK_GREEN,
    0.7: COLORS.GREEN,
    1.0: COLORS.LIGHT_GREEN
  },
  TROPICAL: {
    0.65: COLORS.BLUE,
    0.8: COLORS.SAND,
    1.0: COLORS.DARK_GREEN
  }
}
