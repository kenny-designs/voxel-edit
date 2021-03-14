import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import textureAtlas from "../images/flourish-cc-by-nc-sa.png";

/**
 * Manages voxel data.
 * At the top level, a single VoxelWorld consists of cells. Each cell is a 'chunk' of the world
 * that consists of voxels (i.e. cubes). In order to optimize render times, we merge the geometry
 * of all the voxels within a single cell and make a single render call (as opposed to rendering
 * each individual voxel). In addition, a single cell is essentially a 3D grid that voxels are
 * placed in. Each cell has a length, width, and height dictated by the cellSize variable. This could
 * be set to anything but is perhaps best capped at 128 or 256 (256^3 is 16,777,216 voxels!).
 *
 * @property {number} cellSize      - The length, width, and height of a single cell (or chunk) within the world
 * @property {number} cellSliceSize - The area of a single slice of each cell (cellSize^2)
 * @property {Object} cell          - Object consisting of an array for each cell
 */
class VoxelWorld {
  /**
   * Creates a VoxelWorld object with the given options
   * @param {Object} options - Options to spawn the world with
   * @param {number} options.cellSize - The length, width, and height of each cell
   * @param {number} options.tileSize - The size of each tile from a texture atlas
   * @param {number} options.tileTextureWidth - The width of the texture atlas
   * @param {number} options.tileTextureHeight - The height of the texture atlas
   */
  constructor(options) {
    this.cellSize = options.cellSize;
    this.tileSize = options.tileSize;
    this.tileTextureWidth = options.tileTextureWidth;
    this.tileTextureHeight = options.tileTextureHeight;
    const { cellSize } = this;
    this.cellSliceSize = cellSize * cellSize;
    this.cells = {};
  }

  /**
   * Returns the offset, or index, to the voxel within the cell array
   * at the given x, y, and z coordinates.
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns {number} Index to the voxel within the cell array
   */
  computeVoxelOffset(x, y, z) {
    const { cellSize, cellSliceSize } = this;

    // Note, the "| 0" actually TRUNCATES the value! Not quite the same as flooring
    // https://stackoverflow.com/questions/7487977/using-bitwise-or-0-to-floor-a-number
    // Also, euclideanModulo(n, m) is the equivalent of (( n % m ) + m ) % m
    const voxelX = THREE.MathUtils.euclideanModulo(x, cellSize) | 0;
    const voxelY = THREE.MathUtils.euclideanModulo(y, cellSize) | 0;
    const voxelZ = THREE.MathUtils.euclideanModulo(z, cellSize) | 0;

    // Return index voxel is located at
    return voxelY * cellSliceSize + voxelZ * cellSize + voxelX;
  }

  /**
   * Computes the id of the cell stored as a key in this.cells based
   * on the given x, y, and z coordinates of a voxel.
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns {string} The id of the cell in the form of "(x,y,z)"
   */
  computeCellId(x, y, z) {
    const { cellSize } = this;
    const cellX = Math.floor(x / cellSize);
    const cellY = Math.floor(y / cellSize);
    const cellZ = Math.floor(z / cellSize);
    return `${cellX},${cellY},${cellZ}`;
  }

  /**
   * Adds a new cell for a voxel at the given x, y, and z coordinates if a
   * cell doesn't already exist to accomodate it.
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns {Uint8Array} Array of voxels for the cell
   */
  addCellForVoxel(x, y, z) {
    // Get the id of the cell corresponding to the x, y, and z coordinate
    const cellId = this.computeCellId(x, y, z);

    // Get the array of voxels associated with the cellId
    let cell = this.cells[cellId];

    // If cell doesn't exist, add it
    if (!cell) {
      const { cellSize } = this;
      cell = new Uint8Array(cellSize * cellSize * cellSize);
      this.cells[cellId] = cell;
    }

    // Return the cell
    return cell;
  }

  /**
   * Finds the corresponding voxel array for the cell for the given voxel coordinates.
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns {Uint8Array} Array of voxels.
   */
  getCellForVoxel(x, y, z) {
    return this.cells[this.computeCellId(x, y, z)];
  }

  /**
   * Sets voxel at given coordinates.
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} v - The type of voxel to add
   * @param {boolean} addCell - If true, a new cell will be created to accomodate the voxel if needed
   */
  setVoxel(x, y, z, v, addCell = true) {
    // Get the array of voxels corresponding to the x, y, and z coordinates
    let cell = this.getCellForVoxel(x, y, z);

    // No cell was found
    if (!cell) {
      // If addCell is false, return
      if (!addCell) {
        return;
      }
      // Otherwise, create a new cell for the voxel
      cell = this.addCellForVoxel(x, y, z);
    }

    // Find the index to add the new voxel within the found cell
    const voxelOffset = this.computeVoxelOffset(x, y, z);

    // Set the new voxel
    cell[voxelOffset] = v;
  }

  /**
   * Gets the corresponding voxel at the given coordinates.
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns {number} Number representing the type of voxel
   */
  getVoxel(x, y, z) {
    // Find the cell that has the voxel at the given coordinates
    const cell = this.getCellForVoxel(x, y, z);

    // No such cell exists! Default by returning 0
    if (!cell) {
      return 0;
    }

    // Find the index of the voxel within the cell
    const voxelOffset = this.computeVoxelOffset(x, y, z);

    // Return the voxel that was found
    return cell[voxelOffset];
  }

  /**
   * Generates geometry data for a cell at the given coordinate. Similar to voxels, each cell
   * is a part of a 3D grid as well.
   * @example
   * generateGeometryDataForCell(0, 0, 0);  // Cell created at (0, 0, 0) coordinate
   * generateGeometryDataForCell(0, 1, 0);  // Cell created above the last one at (0, 1, 0)
   *
   * @param {number} cellX
   * @param {number} cellY
   * @param {number} cellZ
   */
  generateGeometryDataForCell(cellX, cellY, cellZ) {
    const { cellSize, tileSize, tileTextureWidth, tileTextureHeight } = this;

    // Used for generating the geometry of the final mesh formed by the voxels
    const positions = [];
    const normals = [];
    const uvs = [];
    const indices = [];

    // Calculate origin point of the cell i.e. (0, 0, 0)
    const startX = cellX * cellSize;
    const startY = cellY * cellSize;
    const startZ = cellZ * cellSize;

    // Iterate over y coords
    for (let y = 0; y < cellSize; ++y) {
      const voxelY = startY + y;
      // Iterate over z coords
      for (let z = 0; z < cellSize; ++z) {
        const voxelZ = startZ + z;
        // Iterate over x coords
        for (let x = 0; x < cellSize; ++x) {
          const voxelX = startX + x;

          // Get voxel at current x, y, and z coords
          const voxel = this.getVoxel(voxelX, voxelY, voxelZ);

          // Check if voxel exists (by default, a voxel 0 is empty)
          if (voxel) {
            // voxel 0 is sky so for UVs we start at 0
            const uvVoxel = voxel - 1;

            // There is a voxel here but do we need faces for it?
            for (const { dir, corners, uvRow } of VoxelWorld.faces) {
              // The neighboring voxel to the face of our voxel
              const neighbor = this.getVoxel(
                voxelX + dir[0],
                voxelY + dir[1],
                voxelZ + dir[2]
              );

              // neighbor voxel is empty (0) in this direction so we need a face
              if (!neighbor) {
                // Used to define the indices
                const ndx = positions.length / 3;

                // Add vertices for the face of the voxel and normals too
                for (const { pos, uv } of corners) {
                  positions.push(pos[0] + x, pos[1] + y, pos[2] + z);
                  normals.push(...dir);

                  // Calculates where to grab texture from the texture atlas
                  // uvVoxel corresponds to the column and uvRow the row to get the texture
                  uvs.push(
                    ((uvVoxel + uv[0]) * tileSize) / tileTextureWidth,
                    1 - ((uvRow + 1 - uv[1]) * tileSize) / tileTextureHeight
                  );
                }

                // Add indices used to draw the face
                indices.push(ndx, ndx + 1, ndx + 2, ndx + 2, ndx + 1, ndx + 3);
              }
            }
          }
        }
      }
    }

    // Return object consisting of geometry data for the voxel model
    return {
      positions,
      normals,
      uvs,
      indices,
    };
  }

  /**
   * Algorithm for raycasting specialized for use with voxels. Used to check if the
   * user clicked a voxel in the scene and returns information related to it such as
   * the coordinates of the successful hit.
   * The code itself is based upon this paper: http://www.cse.chalmers.se/edu/year/2010/course/TDA361/grid.pdf
   * @param {*} start
   * @param {*} end
   * @returns {Object} HitResults or null if nothing was hit
   * @returns {Array.<number>} HitResults.position Coordinates of the hit
   * @returns {Array.<number} HitResults.normal Normal of the hit
   * @returns {number} HitResults.voxel The type of voxel hit
   */
  intersectRay(start, end) {
    // Get the direction that ray is cast
    let dx = end.x - start.x;
    let dy = end.y - start.y;
    let dz = end.z - start.z;

    // Find the magnitude of the above direction
    const lenSq = dx * dx + dy * dy + dz * dz;
    const len = Math.sqrt(lenSq);

    // Change to unit vector so we only have the direction of the ray cast
    dx /= len;
    dy /= len;
    dz /= len;

    // t is a scalar that we use to 'stretch' the ray into the scene to test for intersections
    let t = 0.0;
    let ix = Math.floor(start.x);
    let iy = Math.floor(start.y);
    let iz = Math.floor(start.z);

    // Dictates how we 'step' from voxel to voxel
    const stepX = dx > 0 ? 1 : -1;
    const stepY = dy > 0 ? 1 : -1;
    const stepZ = dz > 0 ? 1 : -1;

    // The amount of change required to advance one whole voxel
    const txDelta = Math.abs(1 / dx);
    const tyDelta = Math.abs(1 / dy);
    const tzDelta = Math.abs(1 / dz);

    const xDist = stepX > 0 ? ix + 1 - start.x : start.x - ix;
    const yDist = stepY > 0 ? iy + 1 - start.y : start.y - iy;
    const zDist = stepZ > 0 ? iz + 1 - start.z : start.z - iz;

    // location of nearest voxel boundary, in units of t
    let txMax = txDelta < Infinity ? txDelta * xDist : Infinity;
    let tyMax = tyDelta < Infinity ? tyDelta * yDist : Infinity;
    let tzMax = tzDelta < Infinity ? tzDelta * zDist : Infinity;

    // Represents the direction we last stepped in. Either x, y, or z
    let steppedIndex = -1;

    // main loop along raycast vector
    while (t <= len) {
      // Get the voxel at the ix, iy, and iz coordinate
      const voxel = this.getVoxel(ix, iy, iz);

      // Found a non-empty voxel! Return hit information
      if (voxel) {
        return {
          position: [start.x + t * dx, start.y + t * dy, start.z + t * dz],
          normal: [
            steppedIndex === 0 ? -stepX : 0,
            steppedIndex === 1 ? -stepY : 0,
            steppedIndex === 2 ? -stepZ : 0,
          ],
          voxel,
        };
      }

      // advance t to next nearest voxel boundary
      // This is the core if-statement from the research paper
      if (txMax < tyMax) {
        if (txMax < tzMax) {
          ix += stepX;
          t = txMax;
          txMax += txDelta;
          steppedIndex = 0;
        } else {
          iz += stepZ;
          t = tzMax;
          tzMax += tzDelta;
          steppedIndex = 2;
        }
      } else {
        if (tyMax < tzMax) {
          iy += stepY;
          t = tyMax;
          tyMax += tyDelta;
          steppedIndex = 1;
        } else {
          iz += stepZ;
          t = tzMax;
          tzMax += tzDelta;
          steppedIndex = 2;
        }
      }
    }

    // Nothing was found, return null
    return null;
  }
}

/**
 * Array of objects that represent each face of a single voxel.
 * uvRow is the row of the texture atlas to grab an image from
 * dir is the direction of the face
 * corners consist of vertices and uv coordinates for the texture
 */
VoxelWorld.faces = [
  {
    // left
    uvRow: 0,
    dir: [-1, 0, 0],
    corners: [
      { pos: [0, 1, 0], uv: [0, 1] },
      { pos: [0, 0, 0], uv: [0, 0] },
      { pos: [0, 1, 1], uv: [1, 1] },
      { pos: [0, 0, 1], uv: [1, 0] },
    ],
  },
  {
    // right
    uvRow: 0,
    dir: [1, 0, 0],
    corners: [
      { pos: [1, 1, 1], uv: [0, 1] },
      { pos: [1, 0, 1], uv: [0, 0] },
      { pos: [1, 1, 0], uv: [1, 1] },
      { pos: [1, 0, 0], uv: [1, 0] },
    ],
  },
  {
    // bottom
    uvRow: 1,
    dir: [0, -1, 0],
    corners: [
      { pos: [1, 0, 1], uv: [1, 0] },
      { pos: [0, 0, 1], uv: [0, 0] },
      { pos: [1, 0, 0], uv: [1, 1] },
      { pos: [0, 0, 0], uv: [0, 1] },
    ],
  },
  {
    // top
    uvRow: 2,
    dir: [0, 1, 0],
    corners: [
      { pos: [0, 1, 1], uv: [1, 1] },
      { pos: [1, 1, 1], uv: [0, 1] },
      { pos: [0, 1, 0], uv: [1, 0] },
      { pos: [1, 1, 0], uv: [0, 0] },
    ],
  },
  {
    // back
    uvRow: 0,
    dir: [0, 0, -1],
    corners: [
      { pos: [1, 0, 0], uv: [0, 0] },
      { pos: [0, 0, 0], uv: [1, 0] },
      { pos: [1, 1, 0], uv: [0, 1] },
      { pos: [0, 1, 0], uv: [1, 1] },
    ],
  },
  {
    // front
    uvRow: 0,
    dir: [0, 0, 1],
    corners: [
      { pos: [0, 0, 1], uv: [0, 0] },
      { pos: [1, 0, 1], uv: [1, 0] },
      { pos: [0, 1, 1], uv: [0, 1] },
      { pos: [1, 1, 1], uv: [1, 1] },
    ],
  },
];

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

    // Fullscreen instead
    //const width = canvas.clientWidth;
    //const height = canvas.clientHeight;
    const width = window.innerWidth;
    const height = window.innerHeight;

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
      // Using window instead
      //const canvas = renderer.domElement;
      //camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.aspect = window.innerWidth / window.innerHeight;

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
   *
   * @param {Event} event
   */
  function placeVoxel(event) {
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
      // If shiftkey was held, remove voxel. Otherwise, add currentVoxel
      const voxelId = event.shiftKey ? 0 : currentVoxel;

      // the intersection point is on the face. That means
      // the math imprecision could put us on either side of the face.
      // so go half a normal into the voxel if removing (currentVoxel = 0)
      // our out of the voxel if adding (currentVoxel  > 0)
      const pos = intersection.position.map((v, ndx) => {
        return v + intersection.normal[ndx] * (voxelId > 0 ? 0.5 : -0.5);
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
      placeVoxel(event);
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

export default Voxels;
