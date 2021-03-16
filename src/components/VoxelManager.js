import React from "react";
import GUIController from "./GUIController";

/**
 * The main driving component for the application. Sets up the rest of
 * the user interface and directly communicates with the Voxel.js module.
 * @extends React.Component
 */
class VoxelManager extends React.Component {
  render() {
    return <GUIController />;
  }
}

export default VoxelManager;
