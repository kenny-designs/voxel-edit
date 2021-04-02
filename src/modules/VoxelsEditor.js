import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import VoxelWorld from "./VoxelWorld";
import Brush from "./Brush";
import ColorPalette from "./ColorPalette";
//import textureAtlas from "../images/flourish-cc-by-nc-sa.png";

/**
 * Helper function to return a random integer between the min and max value
 * in a range of [min, max).
 * TODO: This can be removed soon
 * @param {number} min
 * @param {number} max
 * @returns
 */
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Has the cell at the given coordinates form a sine wave out of its voxels.
 * @param {VoxelWorld} world - The world to spawn the sine wave in
 * @param {number} cellX
 * @param {number} cellY
 * @param {number} cellZ
 * @param {number} cellSize - Dimensions of the cell
 * @param {number} [v=0] - The type of voxel to spawn. 0 for random
 */
/*
function createSineWave(world, cellX, cellY, cellZ, cellSize, v = 0) {
  const startX = cellX * cellSize;
  const startY = cellY * cellSize;
  const startZ = cellZ * cellSize;

  // Create a sine wave with our voxels
  for (let y = 0; y < cellSize; ++y) {
    for (let z = 0; z < cellSize; ++z) {
      for (let x = 0; x < cellSize; ++x) {
        // Calculate the maximum height at the x and z position for a voxel to be placed
        const height =
          (Math.sin((x / cellSize) * Math.PI * 2) +
            Math.sin((z / cellSize) * Math.PI * 3)) *
            (cellSize / 6) +
          cellSize / 2;

        // Set voxel if y is below the height
        if (y < height) {
          // Set voxel to random texture
          world.setVoxel(
            startX + x,
            startY + y,
            startZ + z,
            v ? v : randInt(1, 17)
          );
        }
      }
    }
  }
}
*/

/**
 * Has the cell at the given coordinates form a flat ground out of its voxels.
 * @param {VoxelWorld} world - The world to spawn flat ground in
 * @param {number} cellX
 * @param {number} cellY
 * @param {number} cellZ
 * @param {number} cellSize - Dimensions of the cell
 * @param {number} [v=0] - The type of voxel to spawn. 0 for random
 */
function createFlatGround(world, cellX, cellY, cellZ, cellSize, v = 0) {
  const startX = cellX * cellSize;
  const startY = cellY * cellSize;
  const startZ = cellZ * cellSize;

  // Create flat ground with our voxels
  for (let z = 0; z < cellSize; ++z) {
    for (let x = 0; x < cellSize; ++x) {
      // Set voxel to random texture or v if given
      world.setVoxel(startX + x, startY, startZ + z, v ? v : randInt(1, 17));
    }
  }
}

/**
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

    // If raycast was successful, place a voxel with the information returned
    if (intersection) {
      // Set voxelId depending on brush option. 0 removes voxels
      const voxelId =
        this.brush.currentBrush === Brush.brushOptions.remove
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
            (this.brush.currentBrush === Brush.brushOptions.add ? 0.5 : -0.5)
        );
      });

      // Set voxel at the pos position with new voxelID
      this.world.setVoxel(...pos, voxelId);

      // Update the cell associated with the position of the new voxel
      this.world.updateVoxelGeometry(this.scene, ...pos);

      // Update render frame
      this.requestRenderIfNotRequested();
    }
  }

  /**
   * Reset mouse movement and begin recording.
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
   * @param {Event} event
   */
  placeVoxelIfNoMovement = (event) => {
    const { mouse } = this;
    // Mouse hardly moved, user likely intended to place a voxel
    if (mouse.moveX < 5 && mouse.moveY < 5) {
      // TODO: Remove global variable currentBrush
      this.placeVoxel(event);
    }

    // Stop recording movement and checks to place voxel
    window.removeEventListener("pointermove", this.recordMovement);
    window.removeEventListener("pointerup", this.placeVoxelIfNoMovement);
  };

  /**
   * Called whenever a new color is selected.
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
   * @param {number} index
   */
  onNewSelectedColor = (index) => {
    // Update the currently selected color for adding/painting
    this.world.colorPalette.setSelectedColor(index);
  };

  /**
   * Gets project data from the currently open project.
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
}

export default VoxelEditor;
