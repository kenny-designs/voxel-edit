/**
 * Internal representation of the ColorPalette React component.
 * Used to track each color of the voxels within the scene.
 */
class ColorPalette {
  constructor(colors = null, selectedColor = 0) {
    if (colors) {
      this.colors = colors;
    } else {
      this.initializeColorArray();
    }

    // The currently selected color
    this.selectedColor = 0;
  }

  /**
   * Initializes an array of colors for the color palette. Creates
   * 128 colors that are all grey by default.
   */
  initializeColorArray() {
    // Palette holds 128 colors by default
    this.colors = new Array(128);

    // Set all colors to a grey color by default
    for (let i = 0; i < this.colors.length; ++i) {
      this.colors[i] = new Color(0.5, 0.5, 0.5);
    }
  }

  /**
   * Sets the color at the given index to the given r, g, b values.
   * @param {number} index
   * @param {number} r
   * @param {number} g
   * @param {number} b
   */
  setColorAtIndex(index, r, g, b) {
    // If index out of range, return
    if (index < 0 || index >= this.colors.length) return;

    // Set the rgb values of the color
    this.colors[index].r = r;
    this.colors[index].g = g;
    this.colors[index].b = b;
  }

  /**
   * Returns the color at the given index.
   * @param {number} index
   * @returns {Color} The color at the index. Null if not found
   */
  getColorAtIndex(index) {
    // If index out of range, return
    if (index < 0 || index >= this.colors.length) return null;
    return this.colors[index];
  }

  /**
   * Returns the currently selected color.
   * @returns {Color}
   */
  getSelectedColor() {
    return this.colors[this.selectedColor];
  }

  /**
   * Returns the index of the selected color.
   * @returns {number}
   */
  getSelectedColorIndex() {
    return this.selectedColor;
  }
}

/**
 * Class that represents a single rgb color.
 */
class Color {
  constructor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }
}

export default ColorPalette;
