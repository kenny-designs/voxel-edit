/**
 * Brush object used to determine how to paint voxels on the scene.
 */
class Brush {
  /**
   * Creates a new brush object.
   * @param {string} [action="add"] Adding, removing, or painting voxels
   * @param {string} [type="single"] How to go about the actions
   */
  constructor(action = "add", type = "single") {
    this.setCurrentAction(action);
    this.setCurrentType(type);
  }

  // Options for each brush
  static brushOptions = {
    add: "add",
    remove: "remove",
    paint: "paint",
  };

  // Options for each brush type
  static brushTypes = {
    single: "single",
    extrude: "extrude",
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

  /**
   * Sets the current brush type to one of the available brush types.
   * @param {string} brushType
   */
  setCurrentType(brushType) {
    // Get the brush type to set
    const type = Brush.brushTypes[brushType];

    // If that type exists, set it as current
    if (type) {
      this.currentType = type;
    }
  }
}

export default Brush;
