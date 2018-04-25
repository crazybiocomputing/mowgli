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


// class Cube
class IsoCube
  constructor(x,y,z,size) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.size = size;
    this.voxels = [0,0,0,0,0,0,0,0];
    this.edges=[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
    this.key=0;
  }

  getVertex(index) {
    switch (index) {
    case 0:
      return {
        x:this.x,
        y:this.y,
        z:this.z,
        voxel:this.voxels[0] 
      }; // v0
    case 1:
      return {
        x:this.x+this.size, 
        y:this.y,
        z:this.z, 
        voxel:this.voxels[1] 
      }; // v1
    case 2:
      return {
        x:this.x+this.size, 
        y:this.y+this.size, 
        z:this.z,
        voxel:this.voxels[2]
      }; // v2
    case 3:
      return {
        x:this.x,
        y:this.y+this.size,
        z:this.z,
        voxel:this.voxels[3]
      }; // v3
    case 4:
      return {
        x:this.x,
        y:this.y,
        z:this.z+this.size,
        voxel:this.voxels[4]
      }; // v4
    case 5:
      return {
        x:this.x+this.size,
        y:this.y,
        z:this.z+this.size,
        voxel:this.voxels[5]
      }; // v5
    case 6:
      return {
        x:this.x+this.size,
        y:this.y+this.size,
        z:this.z+this.size,
        voxel:this.voxels[6]
      }; // v6
    case 7:
      return {
        x:this.x,
        y:this.y+this.size,
        z:this.z+this.size,
        voxel:this.voxels[7]
      }; // v7
    }
  }

  setVoxels(stack) {
    const getVoxel = (vol,x,y,z) => vol.pixelData[x + y * vol.width + z * vol.width * vol.height];
    
    this.voxels[0] = getVoxel(stack,this.x          ,this.y          ,this.z          ); // v0
    this.voxels[1] = getVoxel(stack,this.x+this.size,this.y          ,this.z          ); // v1
    this.voxels[2] = getVoxel(stack,this.x+this.size,this.y+this.size,this.z          ); // v2
    this.voxels[3] = getVoxel(stack,this.x          ,this.y+this.size,this.z          ); // v3
    this.voxels[4] = getVoxel(stack,this.x          ,this.y          ,this.z+this.size); // v4
    this.voxels[5] = getVoxel(stack,this.x+this.size,this.y          ,this.z+this.size); // v5
    this.voxels[6] = getVoxel(stack,this.x+this.size,this.y+this.size,this.z+this.size); // v6
    this.voxels[7] = getVoxel(stack,this.x          ,this.y+this.size,this.z+this.size); // v7
  };

  calcKey(threshold) {
    this.key = 0;
    this.key += (this.voxels[7] > threshold) ? 128 : 0;
    this.key += (this.voxels[6] > threshold) ? 64 : 0;
    this.key += (this.voxels[5] > threshold) ? 32 : 0;
    this.key += (this.voxels[4] > threshold) ? 16 : 0;
    this.key += (this.voxels[3] > threshold) ? 8 : 0;
    this.key += (this.voxels[2] > threshold) ? 4 : 0;
    this.key += (this.voxels[1] > threshold) ? 2 : 0;
    this.key += (this.voxels[0] > threshold) ? 1 : 0;

    return this.key;
  };

  toString() {
    var str='[';
    for (var i=0;i<12;i++) {
        str+=(this.edges[i]+'; ');
    }
    return (`Cube[${this.key}]=(${this.x} ${this.y} ${this.z}) ${str}]`);
  };
  
} // End of class IsoCube

