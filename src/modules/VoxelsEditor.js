// Import Three.js
import * as THREE from "three";

// Import orbit controls
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Import Exporters
import { OBJExporter } from "three/examples/jsm/exporters/OBJExporter";
import { PLYExporter } from "three/examples/jsm/exporters/PLYExporter";
import { ColladaExporter } from "three/examples/jsm/exporters/ColladaExporter";
import { STLExporter } from "three/examples/jsm/exporters/STLExporter";

// Import modules
import VoxelWorld from "./VoxelWorld";
import Brush from "./Brush";
import ColorPalette from "./ColorPalette";

// Import FileSaver
import FileSaver from "file-saver";

// Import image assets
//import textureAtlas from "../images/flourish-cc-by-nc-sa.png";

/**
 * Has the cell at the given coordinates form a flat ground out of its voxels.
 * @param {VoxelWorld} world - The world to spawn flat ground in
 * @param {number} cellX
 * @param {number} cellY
 * @param {number} cellZ
 * @param {number} cellSize - Dimensions of the cell
 * @param {number} [v=1] - The type of voxel to spawn.
 */
function createFlatGround(world, cellX, cellY, cellZ, cellSize, v = 1) {
  const startX = cellX * cellSize;
  const startY = cellY * cellSize;
  const startZ = cellZ * cellSize;

  // Create flat ground with our voxels
  for (let z = 0; z < cellSize; ++z) {
    for (let x = 0; x < cellSize; ++x) {
      world.setVoxel(startX + x, startY, startZ + z, v);
    }
  }
}

/*
 * TODO: Temporary function for creating the texture atlas. Will be removed
 * during the creation of the ColorPalette code.
 * @param {*} render
 * @return texture
 */
/*
function createTextureAtlas(render) {
  // Load texture atlas
  const loader = new THREE.TextureLoader();
  const texture = loader.load(textureAtlas, render);
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  return texture;
}
*/

/**
 * Class used to interface with the scene and handles the main render loop.
 */
class VoxelEditor {
  constructor(options) {
    this.canvas = options.canvas;
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });

    // Length, width, and height of each cell in the VoxelWorld
    this.cellSize = 32;

    // Initialize the camera
    this.createCamera();

    // Initialize orbit controls
    this.createOrbitControls();

    // Create the scene
    this.scene = new THREE.Scene();

    // Setting background color to the same one Blender uses
    this.scene.background = new THREE.Color("#3C3C3C");

    // Add two directional lights to the scene
    this.addLight(-1, 2, 4);
    this.addLight(1, -1, -2);

    // TODO: Remove these variables soon. Not needed for ColorPalette
    const tileSize = 16;
    const tileTextureWidth = 256;
    const tileTextureHeight = 64;
    //const texture = createTextureAtlas(this.render);

    // Create material for the voxel model
    const material = new THREE.MeshLambertMaterial({
      // TODO: add texture back if using textures
      //map: texture,
      side: THREE.DoubleSide,
      alphaTest: 0.1,
      transparent: true,
      vertexColors: true,
    });

    // Load from previous world or set defaults
    const { world } = options;
    const colorPalette = world ? world.colorPalette : new ColorPalette();
    const cells = world ? world.cells : {};

    // Create a new VoxelWorld that will manage our voxels
    this.world = new VoxelWorld({
      cellSize: this.cellSize,
      tileSize,
      tileTextureWidth,
      tileTextureHeight,
      material,
      colorPalette,
      cells,
    });

    // If there is no pre-existing world, create flat ground by default
    if (!world) {
      // Create a floor to the world
      createFlatGround(this.world, 0, 0, 0, this.cellSize, 1); // Center
    }

    // Update geometry of the entire world
    this.world.updateWorldGeometry(this.scene);

    // Used with requestRenderIfNotRequested() function
    this.renderRequested = false;

    // Mouse object representing the position of mouse clicks.
    this.mouse = {
      x: 0,
      y: 0,
      moveX: 0,
      moveY: 0,
    };

    // Listen for mouse clicks
    this.canvas.addEventListener(
      "pointerdown",
      (event) => {
        event.preventDefault();
        // Record where we first clicked
        this.recordStartPosition(event);

        // Record mouse movement
        window.addEventListener("pointermove", this.recordMovement);

        // Add voxel upon releasing mouse click if movement is small. Other,
        // user is orbiting the camera
        window.addEventListener("pointerup", this.placeVoxelIfNoMovement);
      },
      { passive: false }
    );

    // Listen for touch events
    this.canvas.addEventListener(
      "touchstart",
      (event) => {
        // prevent scrolling
        event.preventDefault();
      },
      { passive: false }
    );

    // Listen for camera orbit events
    this.controls.addEventListener("change", this.requestRenderIfNotRequested);

    // Listen for window resizing events
    window.addEventListener("resize", this.requestRenderIfNotRequested);

    // Create new brush
    this.brush = new Brush();

    // Start render loop
    this.render();
  }

  /**
   * Helper function used to create the camera and set it to a default position.
   * @param {number} [fov=75] - field of view
   * @param {number} [aspect=2] - Aspect. Canvas default is 2
   * @param {number} [near=0.1]
   * @param {number} [far=1000]
   */
  createCamera(fov = 75, aspect = 2, near = 0.1, far = 1000) {
    // Create a new perspective camera
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    // TODO: This is an arbitrary starting position. Consider an alternative
    this.camera.position.set(
      -this.cellSize * 0.2,
      this.cellSize * 0.3,
      -this.cellSize * 0.2
    );
  }

  /**
   * Helper function to create the orbit controls.
   */
  createOrbitControls() {
    // Create the orbit controls
    this.controls = new OrbitControls(this.camera, this.canvas);

    // Orbit controls starts by targeting center of scene
    this.controls.target.set(this.cellSize / 2, 0, this.cellSize / 2);

    // Controls must be updated before they can be used
    this.controls.update();
  }

  /**
   * Adds a directional light to the scene at the given x, y, and z position.
   * Remember, the default position of the directional light's target is (0, 0, 0).
   * @param {number} x
   * @param {number} y
   * @param {number} z
   */
  addLight(x, y, z) {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(x, y, z);
    this.scene.add(light);
  }

  /**
   * Checks if the renderer needs to resize to account for changes in screen
   * width or height.
   * @param {WebGLRenderer} renderer
   * @returns {boolean} True if the renderer resized. False otherwise.
   */
  resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  /**
   * Main render loop.
   * @function
   */
  render = () => {
    this.renderRequested = undefined;

    if (this.resizeRendererToDisplaySize(this.renderer)) {
      this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
      this.camera.updateProjectionMatrix();
    }

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  };

  /**
   * Used to make a render update request only if one hasn't been made already.
   * @function
   */
  requestRenderIfNotRequested = () => {
    if (!this.renderRequested) {
      this.renderRequested = true;
      requestAnimationFrame(this.render);
    }
  };

  /**
   * Finds the x and y coordinate of a mouse click relative to the canvas.
   * @param {Event} event
   * @returns {Object} Object with x and y coordinates of click relative to canvas
   */
  getCanvasRelativePosition(event) {
    const { canvas } = this;
    const rect = canvas.getBoundingClientRect();

    // Calculate the x and y of click relative to the canvas
    return {
      x: ((event.clientX - rect.left) * canvas.width) / rect.width,
      y: ((event.clientY - rect.top) * canvas.height) / rect.height,
    };
  }

  /**
   * Handler for adding, removing, or painting a voxel based on the given brush
   * and where the user clicked.
   * @param {Event} event
   */
  placeVoxel(event) {
    // Find position of mouse click relative to canvas
    const pos = this.getCanvasRelativePosition(event);
    const x = (pos.x / this.canvas.width) * 2 - 1;
    const y = (pos.y / this.canvas.height) * -2 + 1; // note we flip Y

    // Get the starting and ending vectors for our raycast
    const start = new THREE.Vector3();
    const end = new THREE.Vector3();
    start.setFromMatrixPosition(this.camera.matrixWorld);
    end.set(x, y, 1).unproject(this.camera);

    // Cast a ray into the scene
    const intersection = this.world.intersectRay(start, end);

    // If raycast wasn't successful, return
    if (!intersection) return;

    // Add voxels depending on the current brush type
    switch (this.brush.currentType) {
      // Single type brush
      case Brush.brushTypes.single:
        this.singleBrushAction(intersection);
        break;

      // Extrude type brush
      case Brush.brushTypes.extrude:
        this.extrudeBrushAction(intersection);
        break;

      default:
      // No default case
    }
  }

  /**
   * Perform the current brush action for the single brush type.
   * For add, add a single voxel.
   * For remove, remove a single voxel.
   * For paint, paint a single voxel.
   * @param {Object} intersection
   */
  singleBrushAction = (intersection) => {
    // Set voxelId depending on brush option. 0 removes voxels
    const voxelId =
      this.brush.currentAction === Brush.brushActions.remove
        ? 0
        : this.world.colorPalette.getSelectedColorIndex() + 1;

    // the intersection point is on the face. That means
    // the math imprecision could put us on either side of the face.
    // so go half a normal into the voxel if removing/painting
    // or half a normal out if adding
    const pos = intersection.position.map((v, ndx) => {
      return (
        v +
        intersection.normal[ndx] *
          (this.brush.currentAction === Brush.brushActions.add ? 0.5 : -0.5)
      );
    });

    // Set voxel at the pos position with new voxelID
    this.world.setVoxel(...pos, voxelId);

    // Update the cell associated with the position of the new voxel
    this.world.updateVoxelGeometry(this.scene, ...pos);

    // Update render frame
    this.requestRenderIfNotRequested();
  };

  /**
   * Perform the current brush action for the extrude brush type.
   * For add, place a layer of voxels on all adjacent voxels of the same color along
   * the clicked side.
   * For remove, remove a layer of adjacent voxels of the same color along the clicked side.
   * For paint, paint a layer of adjacent voxels of the same color along the clicked side.
   * @param {Object} intersection
   */
  extrudeBrushAction = (intersection) => {
    console.log("Extruding.");
    console.log(intersection);
  };

  /**
   * Reset mouse movement and begin recording.
   * @function
   * @param {Event} event
   */
  recordStartPosition = (event) => {
    const { mouse } = this;
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    mouse.moveX = 0;
    mouse.moveY = 0;
  };

  /**
   * Callback function used to record how far the mouse has moved since started recording.
   * @function
   * @param {Event} event
   */
  recordMovement = (event) => {
    const { mouse } = this;
    mouse.moveX += Math.abs(mouse.x - event.clientX);
    mouse.moveY += Math.abs(mouse.y - event.clientY);
  };

  /**
   * Callback function used to check if the user meant to set a voxel instead
   * of orbiting the camera.
   * @function
   * @param {Event} event
   */
  placeVoxelIfNoMovement = (event) => {
    const { mouse } = this;
    // Mouse hardly moved, user likely intended to place a voxel
    if (mouse.moveX < 5 && mouse.moveY < 5) {
      this.placeVoxel(event);
    }

    // Stop recording movement and checks to place voxel
    window.removeEventListener("pointermove", this.recordMovement);
    window.removeEventListener("pointerup", this.placeVoxelIfNoMovement);
  };

  /**
   * Called whenever a new color is selected.
   * @function
   * @param {number} index - Index of the changed color
   * @param {r} r - Red color from 0-1
   * @param {g} g - Green color from 0-1
   * @param {b} b - Blue color from 0-1
   */
  onSelectedColorChange = (index, r, g, b) => {
    // Update the color
    this.world.colorPalette.setColorAtIndex(index, r, g, b);

    // Updated the world with new color
    this.world.updateWorldGeometry(this.scene);

    // Update render frame
    this.requestRenderIfNotRequested();
  };

  /**
   * Updates which voxel the user is placing/painting now from the palette.
   * @function
   * @param {number} index
   */
  onNewSelectedColor = (index) => {
    // Update the currently selected color for adding/painting
    this.world.colorPalette.setSelectedColor(index);
  };

  /**
   * Gets project data from the currently open project.
   * @function
   * @returns {Object} JavaScript object representing the relevant data from the
   * currently open project/scene.
   */
  onGetProjectData = () => {
    const projectObj = {
      voxelWorld: {
        cellSize: this.world.cellSize,
        cells: this.world.cells,
      },
      colorPalette: {
        colors: this.world.colorPalette.getColorsArray(),
        selectedColor: this.world.colorPalette.getSelectedColorIndex(),
      },
    };

    return projectObj;
  };

  /**
   * Loads a project from the given data.
   * @function
   * @param {Object} projectData
   */
  onLoadProjectData = (projectData) => {
    const { voxelWorld, colorPalette } = projectData;

    // Remove the old cells from the world
    this.world.removeAllCells(this.scene);

    // Load data for the color palette
    this.world.colorPalette.setNewColorsArray(colorPalette.colors);
    this.world.colorPalette.setSelectedColor(colorPalette.selectedColor);

    // Load data for the VoxelWorld
    this.world.cells = voxelWorld.cells;
    this.world.cellSize = voxelWorld.cellSize;

    // Update world geometry and rerender
    this.world.updateWorldGeometry(this.scene);
    this.requestRenderIfNotRequested();
  };

  /**
   * Exports the current frame of the canvas to an image file.
   * @function
   * @param {string} imageName
   */
  onExportImage = (imageName) => {
    // Render must first be invoked to get current frame
    this.render();

    // Save the current frame as an image
    this.canvas.toBlob((blob) => {
      FileSaver.saveAs(blob, imageName + ".png");
    }, "image/png");
  };

  /**
   * Exports the voxel model to some 3D file format
   * @function
   * @param {string} name - What the exported file should be called
   * @param {string} type - The type of file to export
   */
  onExportModel = (name, type) => {
    // Create an exporter that matches the given type
    let exporter, blobType;
    switch (type) {
      case "obj":
        exporter = new OBJExporter();
        blobType = "model/obj";
        break;

      case "ply":
        exporter = new PLYExporter();
        // ply doesn't appear to have an official internet media type
        blobType = "text/plain";
        break;

      case "stl":
        exporter = new STLExporter();
        blobType = "model/stl";
        break;

      case "dae":
        exporter = new ColladaExporter();
        blobType = "model/vnd.collada+xml";
        break;

      default:
        exporter = null;
        break;
    }

    // If type is invalid, return
    if (!exporter) return;

    // Parse the scene for object data
    const result = exporter.parse(this.scene);

    // Create a blob to download with object data
    const blob = new Blob([result], {
      type: blobType,
    });

    // Save object file to user's device
    FileSaver.saveAs(blob, name + "." + type);
  };

  /**
   * Creates a new, empty voxel world
   * @function
   */
  onNewProject = () => {
    this.world.removeAllCells(this.scene);
    this.world.colorPalette.restoreDefaults();
    createFlatGround(this.world, 0, 0, 0, this.cellSize, 1); // Center

    // Update geometry of the entire world
    this.world.updateWorldGeometry(this.scene);

    this.requestRenderIfNotRequested();
  };
}

export default VoxelEditor;
