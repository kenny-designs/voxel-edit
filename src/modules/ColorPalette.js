/**
 * Internal representation of the ColorPalette React component.
 * Used to track each color of the voxels within the scene.
 *
 * @property {Array.<Color>} colors - Array containing all of the colors in the color palette
 * @property {number} selectedColor - The currently selected color from the colors array
 * @property {number} maxColors - The maximum number of colors that the colors array can hold
 */
class ColorPalette {
  constructor(colors = null, selectedColor = 0) {
    // Initialize the color array
    // @TODO: This doesn't necessarily work for passed in colors! Rework it
    this.colors = colors ? colors : [new Color(0.5176, 0.7843, 0.0902)];

    // The currently selected color
    this.selectedColor = selectedColor;

    // The VoxelWorld can only hold up to 255 colors
    this.maxColors = 128;
  }

  /**
   * Creates a new color array from the new one.
   * @param {Array} newColors
   */
  setNewColorsArray(newColors) {
    this.colors = newColors.map(({ r, g, b }) => new Color(r, g, b));
  }

  /**
   * Adds a new color to the end of the colors array. Red by default.
   * @param {number} [r = 1]
   * @param {number} [g = 0]
   * @param {number} [b = 0]
   */
  addColor(r = 1, g = 0, b = 0) {
    if (!this.isColorsFull()) {
      this.colors.push(new Color(r, g, b));
      this.selectedColor = this.colors.length - 1;
    }
  }

  /**
   * Checks if the colors array is full. True if it is. False otherwise.
   * @returns {boolean}
   */
  isColorsFull() {
    return this.colors.length >= this.maxColors;
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
   * Changes the currently selected color to another within the colors array.
   * @param {number} index
   */
  setSelectedColor(index) {
    // If index out of range, return
    if (index < 0 || index >= this.colors.length) return null;
    this.selectedColor = index;
  }

  /**
   * Returns the index of the selected color.
   * @returns {number}
   */
  getSelectedColorIndex() {
    return this.selectedColor;
  }

  /**
   * Returns the array of colors currently in the palette.
   * @returns {Array.Color}
   */
  getColorsArray() {
    return this.colors;
  }
}

/**
 * Class that represents a single rgb color with each component being from
 * 0 to 1.
 */
class Color {
  constructor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  /**
   * Returns a 0-255 value representation of the color.
   * @returns {Object}
   */
  getRGB255() {
    return { r: this.r * 255, g: this.g * 255, b: this.b * 255 };
  }
}

export default ColorPalette;
