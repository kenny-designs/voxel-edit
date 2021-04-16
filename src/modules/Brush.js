/**
 * Brush object used to determine how to paint voxels on the scene.
 */
class Brush {
  /**
   * Creates a new brush object
   * @param {string} [brush="add"] Type of brush to use
   */
  constructor(brush = "add") {
    this.setCurrentAction(brush);
  }

  // Options for each brush
  static brushOptions = {
    add: "add",
    remove: "remove",
    paint: "paint",
  };

  /**
   * Sets the current brush action to one of the available brush options.
   * @param {string} brushAction
   */
  setCurrentAction(brushAction) {
    // Get the brush to set
    const brush = Brush.brushOptions[brushAction];

    // If that brush exists, set it as current
    if (brush) {
      this.currentBrush = brush;
    }
  }
}

export default Brush;
