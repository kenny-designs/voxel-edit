import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import VoxelWorld from "./VoxelWorld";
import Brush from "./Brush";
import textureAtlas from "../images/flourish-cc-by-nc-sa.png";

const currentBrush = new Brush();

/**
 * Helper function used to create the VoxelWorld.
 */
function Voxels(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas });

  // Length, width, and height of each cell in the VoxelWorld
  const cellSize = 32;

  // Create the camera
  const fov = 75;
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(-cellSize * 0.3, cellSize * 0.8, -cellSize * 0.3);

  // Create the orbit controls
  const controls = new OrbitControls(camera, canvas);
  controls.target.set(cellSize / 2, cellSize / 3, cellSize / 2);
  controls.update();

  // Create the scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("lightblue");

  // Load texture atlas
  const tileSize = 16;
  const tileTextureWidth = 256;
  const tileTextureHeight = 64;
  const loader = new THREE.TextureLoader();
  const texture = loader.load(textureAtlas, render);
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;

  /**
   * Adds a directional light to the scene at the given x, y, and z position.
   * Remember, the default position of the directional light's target is (0, 0, 0).
   * @param {number} x
   * @param {number} y
   * @param {number} z
   */
  function addLight(x, y, z) {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(x, y, z);
    scene.add(light);
  }

  // Add two directional lights to the scene
  addLight(-1, 2, 4);
  addLight(1, -1, -2);

  // Create a new VoxelWorld that will manage our voxels
  const world = new VoxelWorld({
    cellSize,
    tileSize,
    tileTextureWidth,
    tileTextureHeight,
  });

  // Create material for the voxel model
  const material = new THREE.MeshLambertMaterial({
    map: texture,
    side: THREE.DoubleSide,
    alphaTest: 0.1,
    transparent: true,
  });

  // Used in the updateCellGeometry() function
  // Tracks the meshes for each cell
  // TODO: Not good having a global variable like this! Find a better spot for it
  const cellIdToMesh = {};

  /**
   *
   * @param {*} x
   * @param {*} y
   * @param {*} z
   */
  function updateCellGeometry(x, y, z) {
    // Find the cell corresponding to the voxel at the x, y, and z coordinates
    const cellX = Math.floor(x / cellSize);
    const cellY = Math.floor(y / cellSize);
    const cellZ = Math.floor(z / cellSize);
    const cellId = world.computeCellId(x, y, z);

    // Get the mesh corresponding to the given cellId
    let mesh = cellIdToMesh[cellId];
    // Get the geometry of the mesh. If no mesh exists, create new geometry
    const geometry = mesh ? mesh.geometry : new THREE.BufferGeometry();

    // Retrieve data for making the geometry for a given cell
    const {
      positions,
      normals,
      uvs,
      indices,
    } = world.generateGeometryDataForCell(cellX, cellY, cellZ);

    // Set position (vertex) data of cell
    const positionNumComponents = 3;
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(
        new Float32Array(positions),
        positionNumComponents
      )
    );

    // Set normal data for cell
    const normalNumComponents = 3;
    geometry.setAttribute(
      "normal",
      new THREE.BufferAttribute(new Float32Array(normals), normalNumComponents)
    );

    // Set uv data for cell
    const uvNumComponents = 2;
    geometry.setAttribute(
      "uv",
      new THREE.BufferAttribute(new Float32Array(uvs), uvNumComponents)
    );

    // Set index data for cell
    geometry.setIndex(indices);

    // Comput bounding sphere of the geometry
    geometry.computeBoundingSphere();

    // If the mesh has not yet been created, create it!
    if (!mesh) {
      mesh = new THREE.Mesh(geometry, material);
      mesh.name = cellId;
      cellIdToMesh[cellId] = mesh;
      scene.add(mesh);
      mesh.position.set(cellX * cellSize, cellY * cellSize, cellZ * cellSize);
    }
  }

  // Used in updateVoxelGeometry() function
  // TODO: Find a better spot for this variable!
  const neighborOffsets = [
    [0, 0, 0], // self
    [-1, 0, 0], // left
    [1, 0, 0], // right
    [0, -1, 0], // down
    [0, 1, 0], // up
    [0, 0, -1], // back
    [0, 0, 1], // front
  ];

  /**
   * Updates the voxel of a cell at the given x, y, and z coordinates. Also,
   * updates any cells that the voxel is adjacent to.
   * @param {number} x
   * @param {number} y
   * @param {number} z
   */
  function updateVoxelGeometry(x, y, z) {
    const updatedCellIds = {};

    // Check the cell and all surrounding cells when updating voxel geometry
    for (const offset of neighborOffsets) {
      // Get the coordinates of the current cell to update
      const ox = x + offset[0];
      const oy = y + offset[1];
      const oz = z + offset[2];

      // Get the id of the cell we wish to update
      const cellId = world.computeCellId(ox, oy, oz);

      // If cell yet not updated, update it!
      if (!updatedCellIds[cellId]) {
        updatedCellIds[cellId] = true;

        // Update the cell's geometry
        updateCellGeometry(ox, oy, oz);
      }
    }
  }

  /**
   * Has the cell at the given coordinates form a sine wave out of its voxels.
   * @param {number} cellX
   * @param {number} cellY
   * @param {number} cellZ
   * @param {number} v - The type of voxel to spawn. 0 for random
   */
  function createSineWave(cellX, cellY, cellZ, v = 0) {
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

  // Generate various sine waves
  createSineWave(0, 0, 0); // Center
  createSineWave(1, 0, 0, 2); // Right
  createSineWave(-1, 0, 0, 3); // Left
  createSineWave(0, 0, -1, 4); // Forward
  createSineWave(0, 0, 1, 5); // Backward

  // Update geometry so that it get rendered
  // Remember, cells adjacent to the voxel coordinate will also update
  updateVoxelGeometry(0, 0, 0);
  updateVoxelGeometry(cellSize - 1, 0, cellSize - 1);

  /**
   * Helper function to return a random integer between the min and max value
   * in a range of [min, max).
   * @param {number} min
   * @param {number} max
   * @returns
   */
  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  /**
   * Checks if the renderer needs to resize to account for changes in screen
   * width or height.
   * @param {WebGLRenderer} renderer
   * @returns {boolean} True if the renderer resized. False otherwise.
   */
  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  // Used with requestRenderIfNotRequested() function
  // TODO: Find a better place for this variable!
  let renderRequested = false;

  /**
   * Main render loop.
   */
  function render() {
    renderRequested = undefined;

    if (resizeRendererToDisplaySize(renderer)) {
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    controls.update();
    renderer.render(scene, camera);
  }
  render();

  /**
   * Used to make a render update request only if one hasn't been made already.
   */
  function requestRenderIfNotRequested() {
    if (!renderRequested) {
      renderRequested = true;
      requestAnimationFrame(render);
    }
  }

  // The current voxel to add when clicking. 0 represent nothing so it effectively removes voxels.
  // TODO: This value needs to be tied to react!
  let currentVoxel = 1; // add pumpkins

  /**
   * Finds the x and y coordinate of a mouse click relative to the canvas.
   * @param {Event} event
   * @returns {Object} Object with x and y coordinates of click relative to canvas
   */
  function getCanvasRelativePosition(event) {
    const rect = canvas.getBoundingClientRect();

    // Calculate the x and y of click relative to the canvas
    return {
      x: ((event.clientX - rect.left) * canvas.width) / rect.width,
      y: ((event.clientY - rect.top) * canvas.height) / rect.height,
    };
  }

  /**
   * Adds, removes, or paints a voxel based on the given brush.
   * @param {Event} event
   * @param {brushOptions} brush - The type of brush to paint with
   */
  function placeVoxel(event, brush) {
    // Find position of mouse click relative to canvas
    const pos = getCanvasRelativePosition(event);
    const x = (pos.x / canvas.width) * 2 - 1;
    const y = (pos.y / canvas.height) * -2 + 1; // note we flip Y

    // Get the starting and ending vectors for our raycast
    const start = new THREE.Vector3();
    const end = new THREE.Vector3();
    start.setFromMatrixPosition(camera.matrixWorld);
    end.set(x, y, 1).unproject(camera);

    // Cast a ray into the scene
    const intersection = world.intersectRay(start, end);

    // If raycast was successful, place a voxel with the information returned
    if (intersection) {
      // Set voxelId depending on brush option. 0 removes voxels
      const voxelId =
        brush.currentBrush === Brush.brushOptions.remove ? 0 : currentVoxel;

      // the intersection point is on the face. That means
      // the math imprecision could put us on either side of the face.
      // so go half a normal into the voxel if removing/painting
      // or half a normal out if adding
      const pos = intersection.position.map((v, ndx) => {
        return (
          v +
          intersection.normal[ndx] *
            (brush.currentBrush === Brush.brushOptions.add ? 0.5 : -0.5)
        );
      });

      // Set voxel at the pos position with new voxelID
      world.setVoxel(...pos, voxelId);

      // Update the cell associated with the position of the new voxel
      updateVoxelGeometry(...pos);

      // Update render frame
      requestRenderIfNotRequested();
    }
  }

  /**
   * Mouse object representing the position of mouse clicks.
   */
  const mouse = {
    x: 0,
    y: 0,
  };

  /**
   * Reset mouse movement and begin recording.
   * @param {Event} event
   */
  function recordStartPosition(event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    mouse.moveX = 0;
    mouse.moveY = 0;
  }

  /**
   * Callback function used to record how far the mouse has moved since started recording.
   * @param {Event} event
   */
  function recordMovement(event) {
    mouse.moveX += Math.abs(mouse.x - event.clientX);
    mouse.moveY += Math.abs(mouse.y - event.clientY);
  }

  /**
   * Callback function used to check if the user meant to set a voxel instead
   * of orbiting the camera.
   * @param {Event} event
   */
  function placeVoxelIfNoMovement(event) {
    // Mouse hardly moved, user likely intended to place a voxel
    if (mouse.moveX < 5 && mouse.moveY < 5) {
      // TODO: Remove global variable currentBrush
      placeVoxel(event, currentBrush);
    }

    // Stop recording movement and checks to place voxel
    window.removeEventListener("pointermove", recordMovement);
    window.removeEventListener("pointerup", placeVoxelIfNoMovement);
  }

  // Listen for mouse clicks
  canvas.addEventListener(
    "pointerdown",
    (event) => {
      event.preventDefault();
      // Record where we first clicked
      recordStartPosition(event);

      // Record mouse movement
      window.addEventListener("pointermove", recordMovement);

      // Add voxel upon releasing mouse click if movement is small. Other,
      // user is orbiting the camera
      window.addEventListener("pointerup", placeVoxelIfNoMovement);
    },
    { passive: false }
  );

  // Listen for touch events
  canvas.addEventListener(
    "touchstart",
    (event) => {
      // prevent scrolling
      event.preventDefault();
    },
    { passive: false }
  );

  // Listen for camera orbit events
  controls.addEventListener("change", requestRenderIfNotRequested);

  // Listen for window resizing events
  window.addEventListener("resize", requestRenderIfNotRequested);
}

function SetBrush(brushName) {
  currentBrush.setCurrentBrush(brushName);
}

export { Voxels, SetBrush };
