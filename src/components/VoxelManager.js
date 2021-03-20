import React from "react";
import GUIController from "./GUIController";
import Voxels from "../modules/Voxels";

/**
 * The main driving component for the application. Sets up the rest of
 * the user interface and directly communicates with the Voxel.js module.
 * @extends React.Component
 */
class VoxelManager extends React.Component {
  /**
   * Takes the given canvas Ref and renders the voxel world.
   * @param {Ref} canvasRef
   */
  createVoxelWorld(canvasRef) {
    if (canvasRef) {
      Voxels(canvasRef.current);
    }
  }

  /**
   * Sets the currently active brush.
   * @param {string} brushName - Name of the currently active brush
   */
  setActiveBrush(brushName) {
    console.log("Active brush is: ", brushName);
  }

  render() {
    return (
      <GUIController
        onCanvasCreation={this.createVoxelWorld}
        onBrushChange={this.setActiveBrush}
      />
    );
  }
}

export default VoxelManager;
