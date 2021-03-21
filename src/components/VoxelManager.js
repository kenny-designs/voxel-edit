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
    if (canvasRef) {
      this.voxelEditor = new VoxelEditor(canvasRef.current);
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

  render() {
    return (
      <GUIController
        onCanvasCreation={this.createVoxelWorld}
        onBrushChange={this.setCurrentBrush}
      />
    );
  }
}

export default VoxelManager;
