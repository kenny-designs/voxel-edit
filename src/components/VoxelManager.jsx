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

    // Create object with callbacks for each component
    this.callbacks = this.getCallbacksObject();
  }

  /**
   * Takes the given canvas Ref and renders the voxel world.
   * @function
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
   * Changes the brush action currently being used.
   * @function
   * @param {string} brushAction - brush action to set
   */
  setBrushAction = (brushAction) => {
    if (this.voxelEditor) {
      this.voxelEditor.brush.setCurrentAction(brushAction);
    }
  };

  /**
   * Handler for when Brush components want to know the current
   * brush action in the editor.
   * @returns {string} The current brush action
   */
  onGetBrushAction = () => {
    if (!this.voxelEditor) {
      return "add";
    }

    return this.voxelEditor.brush.getCurrentAction();
  };

  /**
   * Changes the brush type currently being used.
   * @function
   * @param {string} brushType
   */
  setBrushType = (brushType) => {
    if (this.voxelEditor) {
      this.voxelEditor.brush.setCurrentType(brushType);
    }
  };

  /**
   * Handler for when Brush components want to know the current
   * brush type in the editor.
   * @returns {string} The current brush type
   */
  onGetBrushType = () => {
    if (!this.voxelEditor) {
      return "single";
    }

    return this.voxelEditor.brush.getCurrentType();
  };

  /**
   * Returns color palette data from the VoxelWorld.
   * @function
   * @returns {Array.Color}
   */
  onGetColorData = () => {
    // Return empty array if voxelEditor not ready
    if (!this.voxelEditor) {
      return {
        colors: [],
        selectedColorIndex: 0,
        currentColor: { r: 127.5, g: 127.5, b: 127.5 }, // default to a grey color
        isColorsFull: true,
      };
    }

    const { colorPalette } = this.voxelEditor.world;
    const { r, g, b } = colorPalette.getSelectedColor().getRGB255();
    return {
      colors: colorPalette.getColorsArray(),
      selectedColorIndex: colorPalette.getSelectedColorIndex(),
      currentColor: { r, g, b },
      isColorsFull: colorPalette.isColorsFull(),
    };
  };

  /**
   * Called whenever a new color is selected.
   * @function
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
   * @function
   * @param {number} index
   */
  onNewSelectedColor = (index) => {
    if (this.voxelEditor) {
      this.voxelEditor.onNewSelectedColor(index);
    }
  };

  /**
   * Tell the VoxelEditor that the user added a new color to their color palette
   * @function
   */
  onAddColor = () => {
    if (!this.voxelEditor) return;

    // Add a new color to the color palette
    this.voxelEditor.world.colorPalette.addColor();
  };

  /**
   * Gets project data from the currently open project.
   * @function
   * @returns {Object} JavaScript object representing the relevant data from the
   * currently open project/scene.
   */
  onGetProjectData = () => {
    // If voxelEditor isn't ready, return an empty object
    if (!this.voxelEditor) return {};

    // Return object representing the currently open project
    return this.voxelEditor.onGetProjectData();
  };

  /**
   * Handler used to load a new scene from the given project data.
   * @function
   * @param {Object} projectData
   */
  onLoadProjectData = (projectData) => {
    // If voxelEditor isn't ready, do nothing
    if (!this.voxelEditor) return;

    // Load the project
    this.voxelEditor.onLoadProjectData(projectData);

    // @TODO: Generally, you should never invoke this method.
    // Since loading a project leads to a substantial change in the application's
    // internal state, I am making an exception.
    this.forceUpdate();
  };

  /**
   * Handler used to export the current frame from the canvas as an image.
   * @function
   * @param {string} imageName - What to name the exported image
   * @returns {Canvas} The canvas to take a screenshot from
   */
  onExportImage = (imageName) => {
    if (!this.voxelEditor) return null;

    this.voxelEditor.onExportImage(imageName);
  };

  /**
   * Exports the voxel model to some 3D file format.
   * @function
   * @param {string} name - What the exported file should be called
   * @param {string} type - The type of file to export
   */
  onExportModel = (name, type) => {
    if (!this.voxelEditor) return;

    this.voxelEditor.onExportModel(name, type);
  };

  /**
   * Loads a fresh, blank project.
   * @function
   */
  onNewProject = () => {
    if (!this.voxelEditor) return;

    this.voxelEditor.onNewProject();
    this.forceUpdate();
  };

  /**
   * Returns callbacks organized by the component that they are meant for.
   * @function
   * @returns {Object}
   */
  getCallbacksObject = () => {
    return {
      brush: {
        brushActions: {
          onBrushActionChange: this.setBrushAction,
          onGetBrushAction: this.onGetBrushAction,
        },
        brushTypes: {
          onBrushTypeChange: this.setBrushType,
          onGetBrushType: this.onGetBrushType,
        },
      },
      colorPalette: {
        onGetColorData: this.onGetColorData,
        onSelectedColorChange: this.onSelectedColorChange,
        onNewSelectedColor: this.onNewSelectedColor,
        onAddColor: this.onAddColor,
      },
      viewport: {
        onCanvasCreation: this.createVoxelWorld,
      },
      file: {
        onGetProjectData: this.onGetProjectData,
        onLoadProjectData: this.onLoadProjectData,
        onExportModel: this.onExportModel,
        onNewProject: this.onNewProject,
      },
      render: {
        onExportImage: this.onExportImage,
      },
      examples: {
        onLoadProjectData: this.onLoadProjectData,
      },
    };
  };

  render() {
    return <GUIController callbacks={this.callbacks} />;
  }
}

export default VoxelManager;
