import React from "react";
import "./Viewport.css";

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
    // Canvas is ready to be drawn on
    this.props.callbacks.onCanvasCreation(this.canvasRef);
  }

  render() {
    return <canvas className="viewportCanvas" ref={this.canvasRef} />;
  }
}

export default Viewport;
