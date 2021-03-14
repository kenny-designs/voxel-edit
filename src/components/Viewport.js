import React from "react";
import "./Viewport.css";
import Voxels from "../modules/Voxels";

/**
 * Handles the 3D viewport and surrounding GUI for the application.
 * @property {Ref} canvasRef - Reference to the canvas
 *
 * @extends React.Component
 */
class Viewport extends React.Component {
  constructor(props) {
    super(props);

    // Reference to canvas element
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    // Render voxels
    Voxels(this.canvasRef.current);
  }

  render() {
    return <canvas className="viewportCanvas" ref={this.canvasRef} />;
  }
}

export default Viewport;
