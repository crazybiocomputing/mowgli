/*
 *  mowgli: Molecule WebGL Viewer in JavaScript, html5, css3, and WebGL
 *  Copyright (C) 2015  Jean-Christophe Taveau.
 *
 *  This file is part of mowgli
 *
 * This program is free software: you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with mowgli.  If not, see <http://www.gnu.org/licenses/>.
 *
 *
 * Authors:
 * Jean-Christophe Taveau
 */

'use strict';

/**
 * IsoSurface Generator based on the Marching Cubes algorithm
 * All the details explained in http://crazybiocomputing.blogspot.fr/2014/11/graphics-marching-cubes-implementation.html
 *
 * @class IsoSurfacer
 *
 * @author Jean-Christophe Taveau
 */
class IsoSurfacer {
  /**
   * @constructor
   */
  constructor(volume, threshold = 128, cubeSize = 2, mode = 0) {
    if (map instanceof Map) {
      this.map = volume;
      this.mesh = {};
      this.mesh.vertices = [];
      this.mesh.triangles = [];
      this.mesh.normals = [];

      // Default Marching Cubes Parameters
      this.threshold = threshold;
      this.cubeSize = cubeSize;
      this.interpolate = (mode === 1) ? IsoSurfacer.interpolateBilinear : IsoSurfacer.interpolateNone;
    }
    else {
      MOWGLI.alert('This structure is not a voxels raster/map');
    }
  }

  static interpolateNone(v0,v1) {
    return {
      x : ( v0.x + v1.x ) / 2.0,
      y : ( v0.y + v1.y ) / 2.0,
      z : ( v0.z + v1.z ) / 2.0
    }
  };

  static interpolateBilinear(v0,v1) => {
    let k = (threshold - v0.voxel)/(v1.voxel - v0.voxel);
    return {
      x : v0.x + (v1.x - v0.x) * k,
      y : v0.y + (v1.y - v0.y) * k,
      z : v0.z + (v1.z - v0.z) * k
    } 
  };
    
  setInterpolation(mode) {
    this.interpolate = (mode === 1) ? IsoSurfacer.interpolateBilinear : IsoSurfacer.interpolateNone;
  };

  getMesh() {
    return this.mesh;
  };

  /**
   * Compute Triangle Mesh
   *
   * @author
   */
  compute(threshold) {
  // Private
    function createTriangles(probe) {
      //console.log('key '+probe.key+' '+ probe.x +' '+probe.y+' '+probe.z);
      let vertex;
      let edges = IsoSurfacer.triangles[probe.key];
      for (let i=0;i<edges.length;i++) {
        let index=-1;
        let edge = edges[i];

        if (probe.edges[edge] !== -1) {
          // Edge already calculated
          index = probe.edges[edge];
        }
        else {
          switch (edge) {
          case 0:
            if (probe.y !== 0) {
              probe.edges[edge] = slab.above().edges[2];
              index = probe.edges[edge];
            }
            else {
              vertex = this.interpolate(probe.getVertex(0),probe.getVertex(1) );
              this.mesh.vertices.push(vertex);
              index = this.mesh.vertices.length-1;
              probe.edges[edge]= index;
            }
            break;
          case 1:
            if (probe.z !== 0) {
              probe.edges[edge] = slab.back().edges[5];
              index = probe.edges[edge];
            }
            else {
              vertex= this.interpolate(probe.getVertex(1),probe.getVertex(2) );
              this.mesh.vertices.push(vertex);
              index = this.mesh.vertices.length-1;
              probe.edges[edge]= index;
            }
            break;
          case 2:
            if (probe.z !== 0) {
              probe.edges[edge] = slab.back().edges[6];
              index = probe.edges[edge];
            }
            else {
              vertex=this.interpolate(probe.getVertex(2),probe.getVertex(3) );
              this.mesh.vertices.push(vertex);
              index = this.mesh.vertices.length-1;
              probe.edges[edge]= index;
            }
            break;
          case 3:
            if (probe.x !== 0) {
              probe.edges[edge] = slab.previous().edges[1];
              index = probe.edges[edge];
            }
            else {
              vertex=this.interpolate(probe.getVertex(0),probe.getVertex(3) );
              this.mesh.vertices.push(vertex);
              index = this.mesh.vertices.length-1;
              probe.edges[edge]= index;
            }
            break;
          case 4:
            if (probe.y !== 0) {
              probe.edges[edge] = slab.above().edges[6];
              index = probe.edges[edge];
            }
            else {
              vertex=this.interpolate(probe.getVertex(4),probe.getVertex(5) );
              this.mesh.vertices.push(vertex);
              index = this.mesh.vertices.length-1;
              probe.edges[edge]= index;
            }
            break;
          case 5:
            vertex=this.interpolate(probe.getVertex(5),probe.getVertex(6) );
            this.mesh.vertices.push(vertex);
            index = this.mesh.vertices.length-1;
            probe.edges[edge]= index;
            break;
          case 6:
            vertex=this.interpolate(probe.getVertex(6),probe.getVertex(7) );
            this.mesh.vertices.push(vertex);
            index = this.mesh.vertices.length-1;
            probe.edges[edge]= index;
            break;
          case 7:
            if (probe.x !== 0) {
              probe.edges[edge] = slab.previous().edges[5];
              index = probe.edges[edge];
            }
            else {
              vertex = this.interpolate(probe.getVertex(4),probe.getVertex(7) );
              this.mesh.vertices.push(vertex);
              index = this.mesh.vertices.length-1;
              probe.edges[edge]= index;
            }
            break;
          case 8:
            if (probe.x !== 0) {
              probe.edges[edge] = slab.previous().edges[9];
              index = probe.edges[edge];
            }
            else {
              vertex = this.interpolate(probe.getVertex(0),probe.getvertex(4) );
              this.mesh.vertices.push(vertex);
              index = this.mesh.vertices.length-1;
              probe.edges[edge]= index;
            }
            break;
          case 9:
            if (probe.y !== 0) {
              probe.edges[edge] = slab.above().edges[11];
              index = probe.edges[edge];
            }
            else {
              vertex = this.interpolate(probe.getVertex(1),probe.getVertex(5) );
              this.mesh.vertices.push(vertex);
              index = this.mesh.vertices.length-1;
              probe.edges[edge]= index;
            }
            break;
          case 10:
            if (probe.x !== 0) {
              probe.edges[edge] = slab.previous().edges[11];
              index = probe.edges[edge];
            }
            else {
              vertex  = this.interpolate(probe.getVertex(3),probe.getVertex(7) );
              this.mesh.vertices.push(vertex);
              index = this.mesh.vertices.length-1;
              probe.edges[edge]= index;
            }
            break;
          case 11:
            vertex = this.interpolate(probe.getVertex(2),probe.getVertex(6) );
            this.mesh.vertices.push(vertex);
            index = this.mesh.vertices.length-1;
            probe.edges[edge]= index;
            break;
          }
        }
        this.mesh.triangles.push(index);
      }
    }
    
    // M A I N
    let slab = new IsoSlab(Math.floor( (nx -1)/this.cubeSize ),Math.floor( (ny-1)/this.cubeSize ) );

    let nx = this.map.width;
    let ny = this.map.height;
    let nz = this.map.depth;
    
    // M a i n   L o o p
    console.log('Start of the main loop... Please wait.');
    for (let z = 0; z < nz-this.cubeSize; z+= this.cubeSize) {
      slab.reset_count();
      for (let y = 0; y < ny-this.cubeSize; y += this.cubeSize) {
        for (let x = 0; x < nx-this.cubeSize; x += this.cubeSize) {
          // 1- Create a new marching cube
          let cube = new IsoCube(x,y,z,this.cubeSize);
          // 2- Set voxels in the cube
          cube.setVoxels(this.map.data);
          // 3- Calc configuration
          cube.calcKey(threshold);
          // 4- Create vertices and triangles
          if (cube.key != 0 && cube.key != 255) {
              createTriangles(cube);
          }
          // 5- Update slab
          slab.push(cube);
        }
      }
      if ( (z%10) === 0) {
        console.log('z=' + z);
      }
    }
  };


  // triangles to be drawn in each case
  static triangles = [
    [],
    [0,8,3],
    [0,1,9],
    [1,8,3,9,8,1],
    [1,2,11],
    [0,8,3,1,2,11],
    [9,2,11,0,2,9],
    [2,8,3,2,11,8,11,9,8],
    [3,10,2],
    [0,10,2,8,10,0],
    [1,9,0,2,3,10],
    [1,10,2,1,9,10,9,8,10],
    [3,11,1,10,11,3],
    [0,11,1,0,8,11,8,10,11],
    [3,9,0,3,10,9,10,11,9],
    [9,8,11,11,8,10],
    [4,7,8],
    [4,3,0,7,3,4],
    [0,1,9,8,4,7],
    [4,1,9,4,7,1,7,3,1],
    [1,2,11,8,4,7],
    [3,4,7,3,0,4,1,2,11],
    [9,2,11,9,0,2,8,4,7],
    [2,11,9,2,9,7,2,7,3,7,9,4],
    [8,4,7,3,10,2],
    [10,4,7,10,2,4,2,0,4],
    [9,0,1,8,4,7,2,3,10],
    [4,7,10,9,4,10,9,10,2,9,2,1],
    [3,11,1,3,10,11,7,8,4],
    [1,10,11,1,4,10,1,0,4,7,10,4],
    [4,7,8,9,0,10,9,10,11,10,0,3],
    [4,7,10,4,10,9,9,10,11],
    [9,5,4],
    [9,5,4,0,8,3],
    [0,5,4,1,5,0],
    [8,5,4,8,3,5,3,1,5],
    [1,2,11,9,5,4],
    [3,0,8,1,2,11,4,9,5],
    [5,2,11,5,4,2,4,0,2],
    [2,11,5,3,2,5,3,5,4,3,4,8],
    [9,5,4,2,3,10],
    [0,10,2,0,8,10,4,9,5],
    [0,5,4,0,1,5,2,3,10],
    [2,1,5,2,5,8,2,8,10,4,8,5],
    [11,3,10,11,1,3,9,5,4],
    [4,9,5,0,8,1,8,11,1,8,10,11],
    [5,4,0,5,0,10,5,10,11,10,0,3],
    [5,4,8,5,8,11,11,8,10],
    [9,7,8,5,7,9],
    [9,3,0,9,5,3,5,7,3],
    [0,7,8,0,1,7,1,5,7],
    [1,5,3,3,5,7],
    [9,7,8,9,5,7,11,1,2],
    [11,1,2,9,5,0,5,3,0,5,7,3],
    [8,0,2,8,2,5,8,5,7,11,5,2],
    [2,11,5,2,5,3,3,5,7],
    [7,9,5,7,8,9,3,10,2],
    [9,5,7,9,7,2,9,2,0,2,7,10],
    [2,3,10,0,1,8,1,7,8,1,5,7],
    [10,2,1,10,1,7,7,1,5],
    [9,5,8,8,5,7,11,1,3,11,3,10],
    [5,7,0,5,0,9,7,10,0,1,0,11,10,11,0],
    [10,11,0,10,0,3,11,5,0,8,0,7,5,7,0],
    [10,11,5,7,10,5],
    [11,6,5],
    [0,8,3,5,11,6],
    [9,0,1,5,11,6],
    [1,8,3,1,9,8,5,11,6],
    [1,6,5,2,6,1],
    [1,6,5,1,2,6,3,0,8],
    [9,6,5,9,0,6,0,2,6],
    [5,9,8,5,8,2,5,2,6,3,2,8],
    [2,3,10,11,6,5],
    [10,0,8,10,2,0,11,6,5],
    [0,1,9,2,3,10,5,11,6],
    [5,11,6,1,9,2,9,10,2,9,8,10],
    [6,3,10,6,5,3,5,1,3],
    [0,8,10,0,10,5,0,5,1,5,10,6],
    [3,10,6,0,3,6,0,6,5,0,5,9],
    [6,5,9,6,9,10,10,9,8],
    [5,11,6,4,7,8],
    [4,3,0,4,7,3,6,5,11],
    [1,9,0,5,11,6,8,4,7],
    [11,6,5,1,9,7,1,7,3,7,9,4],
    [6,1,2,6,5,1,4,7,8],
    [1,2,5,5,2,6,3,0,4,3,4,7],
    [8,4,7,9,0,5,0,6,5,0,2,6],
    [7,3,9,7,9,4,3,2,9,5,9,6,2,6,9],
    [3,10,2,7,8,4,11,6,5],
    [5,11,6,4,7,2,4,2,0,2,7,10],
    [0,1,9,4,7,8,2,3,10,5,11,6],
    [9,2,1,9,10,2,9,4,10,7,10,4,5,11,6],
    [8,4,7,3,10,5,3,5,1,5,10,6],
    [5,1,10,5,10,6,1,0,10,7,10,4,0,4,10],
    [0,5,9,0,6,5,0,3,6,10,6,3,8,4,7],
    [6,5,9,6,9,10,4,7,9,7,10,9],
    [11,4,9,6,4,11],
    [4,11,6,4,9,11,0,8,3],
    [11,0,1,11,6,0,6,4,0],
    [8,3,1,8,1,6,8,6,4,6,1,11],
    [1,4,9,1,2,4,2,6,4],
    [3,0,8,1,2,9,2,4,9,2,6,4],
    [0,2,4,4,2,6],
    [8,3,2,8,2,4,4,2,6],
    [11,4,9,11,6,4,10,2,3],
    [0,8,2,2,8,10,4,9,11,4,11,6],
    [3,10,2,0,1,6,0,6,4,6,1,11],
    [6,4,1,6,1,11,4,8,1,2,1,10,8,10,1],
    [9,6,4,9,3,6,9,1,3,10,6,3],
    [8,10,1,8,1,0,10,6,1,9,1,4,6,4,1],
    [3,10,6,3,6,0,0,6,4],
    [6,4,8,10,6,8],
    [7,11,6,7,8,11,8,9,11],
    [0,7,3,0,11,7,0,9,11,6,7,11],
    [11,6,7,1,11,7,1,7,8,1,8,0],
    [11,6,7,11,7,1,1,7,3],
    [1,2,6,1,6,8,1,8,9,8,6,7],
    [2,6,9,2,9,1,6,7,9,0,9,3,7,3,9],
    [7,8,0,7,0,6,6,0,2],
    [7,3,2,6,7,2],
    [2,3,10,11,6,8,11,8,9,8,6,7],
    [2,0,7,2,7,10,0,9,7,6,7,11,9,11,7],
    [1,8,0,1,7,8,1,11,7,6,7,11,2,3,10],
    [10,2,1,10,1,7,11,6,1,6,7,1],
    [8,9,6,8,6,7,9,1,6,10,6,3,1,3,6],
    [0,9,1,10,6,7],
    [7,8,0,7,0,6,3,10,0,10,6,0],
    [7,10,6],
    [7,6,10],
    [3,0,8,10,7,6],
    [0,1,9,10,7,6],
    [8,1,9,8,3,1,10,7,6],
    [11,1,2,6,10,7],
    [1,2,11,3,0,8,6,10,7],
    [2,9,0,2,11,9,6,10,7],
    [6,10,7,2,11,3,11,8,3,11,9,8],
    [7,2,3,6,2,7],
    [7,0,8,7,6,0,6,2,0],
    [2,7,6,2,3,7,0,1,9],
    [1,6,2,1,8,6,1,9,8,8,7,6],
    [11,7,6,11,1,7,1,3,7],
    [11,7,6,1,7,11,1,8,7,1,0,8],
    [0,3,7,0,7,11,0,11,9,6,11,7],
    [7,6,11,7,11,8,8,11,9],
    [6,8,4,10,8,6],
    [3,6,10,3,0,6,0,4,6],
    [8,6,10,8,4,6,9,0,1],
    [9,4,6,9,6,3,9,3,1,10,3,6],
    [6,8,4,6,10,8,2,11,1],
    [1,2,11,3,0,10,0,6,10,0,4,6],
    [4,10,8,4,6,10,0,2,9,2,11,9],
    [11,9,3,11,3,2,9,4,3,10,3,6,4,6,3],
    [8,2,3,8,4,2,4,6,2],
    [0,4,2,4,6,2],
    [1,9,0,2,3,4,2,4,6,4,3,8],
    [1,9,4,1,4,2,2,4,6],
    [8,1,3,8,6,1,8,4,6,6,11,1],
    [11,1,0,11,0,6,6,0,4],
    [4,6,3,4,3,8,6,11,3,0,3,9,11,9,3],
    [11,9,4,6,11,4],
    [4,9,5,7,6,10],
    [0,8,3,4,9,5,10,7,6],
    [5,0,1,5,4,0,7,6,10],
    [10,7,6,8,3,4,3,5,4,3,1,5],
    [9,5,4,11,1,2,7,6,10],
    [6,10,7,1,2,11,0,8,3,4,9,5],
    [7,6,10,5,4,11,4,2,11,4,0,2],
    [3,4,8,3,5,4,3,2,5,11,5,2,10,7,6],
    [7,2,3,7,6,2,5,4,9],
    [9,5,4,0,8,6,0,6,2,6,8,7],
    [3,6,2,3,7,6,1,5,0,5,4,0],
    [6,2,8,6,8,7,2,1,8,4,8,5,1,5,8],
    [9,5,4,11,1,6,1,7,6,1,3,7],
    [1,6,11,1,7,6,1,0,7,8,7,0,9,5,4],
    [4,0,11,4,11,5,0,3,11,6,11,7,3,7,11],
    [7,6,11,7,11,8,5,4,11,4,8,11],
    [6,9,5,6,10,9,10,8,9],
    [3,6,10,0,6,3,0,5,6,0,9,5],
    [0,10,8,0,5,10,0,1,5,5,6,10],
    [6,10,3,6,3,5,5,3,1],
    [1,2,11,9,5,10,9,10,8,10,5,6],
    [0,10,3,0,6,10,0,9,6,5,6,9,1,2,11],
    [10,8,5,10,5,6,8,0,5,11,5,2,0,2,5],
    [6,10,3,6,3,5,2,11,3,11,5,3],
    [5,8,9,5,2,8,5,6,2,3,8,2],
    [9,5,6,9,6,0,0,6,2],
    [1,5,8,1,8,0,5,6,8,3,8,2,6,2,8],
    [1,5,6,2,1,6],
    [1,3,6,1,6,11,3,8,6,5,6,9,8,9,6],
    [11,1,0,11,0,6,9,5,0,5,6,0],
    [0,3,8,5,6,11],
    [11,5,6],
    [10,5,11,7,5,10],
    [10,5,11,10,7,5,8,3,0],
    [5,10,7,5,11,10,1,9,0],
    [11,7,5,11,10,7,9,8,1,8,3,1],
    [10,1,2,10,7,1,7,5,1],
    [0,8,3,1,2,7,1,7,5,7,2,10],
    [9,7,5,9,2,7,9,0,2,2,10,7],
    [7,5,2,7,2,10,5,9,2,3,2,8,9,8,2],
    [2,5,11,2,3,5,3,7,5],
    [8,2,0,8,5,2,8,7,5,11,2,5],
    [9,0,1,5,11,3,5,3,7,3,11,2],
    [9,8,2,9,2,1,8,7,2,11,2,5,7,5,2],
    [1,3,5,3,7,5],
    [0,8,7,0,7,1,1,7,5],
    [9,0,3,9,3,5,5,3,7],
    [9,8,7,5,9,7],
    [5,8,4,5,11,8,11,10,8],
    [5,0,4,5,10,0,5,11,10,10,3,0],
    [0,1,9,8,4,11,8,11,10,11,4,5],
    [11,10,4,11,4,5,10,3,4,9,4,1,3,1,4],
    [2,5,1,2,8,5,2,10,8,4,5,8],
    [0,4,10,0,10,3,4,5,10,2,10,1,5,1,10],
    [0,2,5,0,5,9,2,10,5,4,5,8,10,8,5],
    [9,4,5,2,10,3],
    [2,5,11,3,5,2,3,4,5,3,8,4],
    [5,11,2,5,2,4,4,2,0],
    [3,11,2,3,5,11,3,8,5,4,5,8,0,1,9],
    [5,11,2,5,2,4,1,9,2,9,4,2],
    [8,4,5,8,5,3,3,5,1],
    [0,4,5,1,0,5],
    [8,4,5,8,5,3,9,0,5,0,3,5],
    [9,4,5],
    [4,10,7,4,9,10,9,11,10],
    [0,8,3,4,9,7,9,10,7,9,11,10],
    [1,11,10,1,10,4,1,4,0,7,4,10],
    [3,1,4,3,4,8,1,11,4,7,4,10,11,10,4],
    [4,10,7,9,10,4,9,2,10,9,1,2],
    [9,7,4,9,10,7,9,1,10,2,10,1,0,8,3],
    [10,7,4,10,4,2,2,4,0],
    [10,7,4,10,4,2,8,3,4,3,2,4],
    [2,9,11,2,7,9,2,3,7,7,4,9],
    [9,11,7,9,7,4,11,2,7,8,7,0,2,0,7],
    [3,7,11,3,11,2,7,4,11,1,11,0,4,0,11],
    [1,11,2,8,7,4],
    [4,9,1,4,1,7,7,1,3],
    [4,9,1,4,1,7,0,8,1,8,7,1],
    [4,0,3,7,4,3],
    [4,8,7],
    [9,11,8,11,10,8],
    [3,0,9,3,9,10,10,9,11],
    [0,1,11,0,11,8,8,11,10],
    [3,1,11,10,3,11],
    [1,2,10,1,10,9,9,10,8],
    [3,0,9,3,9,10,1,2,9,2,10,9],
    [0,2,10,8,0,10],
    [3,2,10],
    [2,3,8,2,8,11,11,8,9],
    [9,11,2,0,9,2],
    [2,3,8,2,8,11,0,1,8,1,11,8],
    [1,11,2],
    [1,3,8,9,1,8],
    [0,9,1],
    [0,3,8],
    []
  ];


} // End of class IsoSurfacer
