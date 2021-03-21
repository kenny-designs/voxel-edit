import * as THREE from "three";

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
   * @param {*} options.material - The material that the VoxelWorld should use for its meshes
   */
  constructor(options) {
    this.cellSize = options.cellSize;
    this.tileSize = options.tileSize;
    this.tileTextureWidth = options.tileTextureWidth;
    this.tileTextureHeight = options.tileTextureHeight;
    this.material = options.material;
    this.cellSliceSize = this.cellSize * this.cellSize;
    this.cells = {};

    // Used in the updateCellGeometry() function
    // Tracks the meshes for each cell
    this.cellIdToMesh = {};

    // Used in updateVoxelGeometry() function
    this.neighborOffsets = [
      [0, 0, 0], // self
      [-1, 0, 0], // left
      [1, 0, 0], // right
      [0, -1, 0], // down
      [0, 1, 0], // up
      [0, 0, -1], // back
      [0, 0, 1], // front
    ];
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
    const colors = [];

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

                  // TODO: Need to add color based on color palette
                  // Add color
                  colors.push(0, 1, 0);
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
      colors,
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

  /**
   * Updates the voxel of a cell at the given x, y, and z coordinates. Also,
   * updates any cells that the voxel is adjacent to.
   * @param scene - The scene to add the final mesh to
   * @param {number} x
   * @param {number} y
   * @param {number} z
   */
  updateVoxelGeometry(scene, x, y, z) {
    const updatedCellIds = {};

    // Check the cell and all surrounding cells when updating voxel geometry
    for (const offset of this.neighborOffsets) {
      // Get the coordinates of the current cell to update
      const ox = x + offset[0];
      const oy = y + offset[1];
      const oz = z + offset[2];

      // Get the id of the cell we wish to update
      const cellId = this.computeCellId(ox, oy, oz);

      // If cell yet not updated, update it!
      if (!updatedCellIds[cellId]) {
        updatedCellIds[cellId] = true;

        // Update the cell's geometry
        this.updateCellGeometry(scene, ox, oy, oz);
      }
    }
  }

  /**
   * Updates the geometry of the cell with the given coordinates within
   * the scene.
   * @param scene - The scene to add the final mesh to
   * @param {number} x
   * @param {number} y
   * @param {number} z
   */
  updateCellGeometry(scene, x, y, z) {
    const { cellSize } = this;

    // Find the cell corresponding to the voxel at the x, y, and z coordinates
    const cellX = Math.floor(x / cellSize);
    const cellY = Math.floor(y / cellSize);
    const cellZ = Math.floor(z / cellSize);
    const cellId = this.computeCellId(x, y, z);

    // Get the mesh corresponding to the given cellId
    let mesh = this.cellIdToMesh[cellId];
    // Get the geometry of the mesh. If no mesh exists, create new geometry
    const geometry = mesh ? mesh.geometry : new THREE.BufferGeometry();

    // Retrieve data for making the geometry for a given cell
    const {
      positions,
      normals,
      //uvs,
      indices,
      colors,
    } = this.generateGeometryDataForCell(cellX, cellY, cellZ);

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

    // TODO: Add back if supporting textures
    // Set uv data for cell
    /*
    const uvNumComponents = 2;
    geometry.setAttribute(
      "uv",
      new THREE.BufferAttribute(new Float32Array(uvs), uvNumComponents)
    );
    */

    const rgbNumComponents = 3;
    geometry.setAttribute(
      "color",
      new THREE.BufferAttribute(new Float32Array(colors), rgbNumComponents)
    );

    // Set index data for cell
    geometry.setIndex(indices);

    // Comput bounding sphere of the geometry
    geometry.computeBoundingSphere();

    // If the mesh has not yet been created, create it!
    if (!mesh) {
      mesh = new THREE.Mesh(geometry, this.material);
      mesh.name = cellId;
      this.cellIdToMesh[cellId] = mesh;
      scene.add(mesh);
      mesh.position.set(cellX * cellSize, cellY * cellSize, cellZ * cellSize);
    }
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

export default VoxelWorld;
