import React from "react";
import GUIController from "./GUIController";
import VoxelEditor from "../modules/VoxelsEditor";

/**
 * The main driving component for the application. Sets up the rest of
 * the user interface and directly communicates with the Voxel.js module.
 * @extends React.Component
 */
class VoxelManager extends React.Component {
  constructor(props) {
    super(props);

    // The VoxelEditor itself that handles the 3D scene
    this.voxelEditor = null;
  }

  /**
   * Takes the given canvas Ref and renders the voxel world.
   * @param {Ref} canvasRef
   */
  createVoxelWorld = (canvasRef) => {
    if (!canvasRef) return;

    if (!this.voxelEditor) {
      this.voxelEditor = new VoxelEditor({ canvas: canvasRef.current });
    } else {
      const world = this.voxelEditor.world;
      this.voxelEditor = new VoxelEditor({ canvas: canvasRef.current, world });
    }
  };

  /**
   * Changes the brush currently being used.
   * @param {string} brushName - name of the brush to set
   */
  setCurrentBrush = (brushName) => {
    if (this.voxelEditor) {
      this.voxelEditor.brush.setCurrentBrush(brushName);
    }
  };

  /**
   * Returns color palette data from the VoxelWorld.
   * @returns {Array.Color}
   */
  onGetColorData = () => {
    // Return empty array if voxelEditor not ready
    if (!this.voxelEditor) return [];

    // Return colors from the world's color palette
    return this.voxelEditor.world.colorPalette.getColorsArray();
  };

  /**
   * Called whenever a new color is selected.
   * @param {number} index - Index of the changed color
   * @param {Object} color
   */
  onSelectedColorChange = (index, color) => {
    if (this.voxelEditor) {
      const { r, g, b } = color;

      // Adjust the color to be on a 0-1 range
      this.voxelEditor.onSelectedColorChange(index, r / 255, g / 255, b / 255);
    }
  };

  /**
   * Tells the VoxelEditor what color of voxel the user is placing/painting now.
   * @param {number} index
   */
  onNewSelectedColor = (index) => {
    if (this.voxelEditor) {
      this.voxelEditor.onNewSelectedColor(index);
    }
  };

  render() {
    return (
      <GUIController
        onCanvasCreation={this.createVoxelWorld}
        onBrushChange={this.setCurrentBrush}
        onGetColorData={this.onGetColorData}
        onSelectedColorChange={this.onSelectedColorChange}
        onNewSelectedColor={this.onNewSelectedColor}
      />
    );
  }
}

export default VoxelManager;
