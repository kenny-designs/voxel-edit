/**
 * Brush object used to determine how to paint voxels on the scene.
 */
class Brush {
  constructor(brush = "add") {
    this.setCurrentBrush(brush);
  }

  // Options for each brush
  static brushOptions = {
    add: "add",
    remove: "remove",
    paint: "paint",
  };

  /**
   * Sets the current brush to one of the available brush options.
   * @param {string} brushName
   */
  setCurrentBrush(brushName) {
    // Get the brush to set
    const brush = Brush.brushOptions[brushName];

    // If that brush exists, set it as current
    if (brush) {
      this.currentBrush = brush;
    }
  }
}

export default Brush;
