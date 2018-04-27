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
 * Voxels maps
 * @class Map
 * @memberof module:structure
 *
 * @extends module:structure.Structure
 * @author Jean-Christophe Taveau
 **/
export class Map {
  /**
   * @constructor
   */
  constructor(pixelData,nx,ny,nz,mode='8-bit') {

    this.ID = 'map';
    this.name = 'map';
    
   /**
    * Pixels/Voxels
    *
    * @type {Array(RGBColor)}
    *
    **/
    this.data = pixelData;

    // mode 8-bit, 16-bit, 32-bit, rgb, rgba
    this.information = {};
    this.information.mode = mode;
    this.information.width = nx;
    this.information.height = ny;
    this.information.depth = nz;

    this.width = this.information.width;
    this.height = this.information.height;
    this.depth = this.information.depth;
    
    // Histogram
    this.bins;
    
    // Init
    this.init();

  }

  /**
   * Preprocess Map
   *
   */
  init() {
    this.bbox = {
      min: {
        x: 0,
        y: 0,
        z: 0
      },
      max: {
        x: this.width,
        y: this.height,
        z: this.depth
      },
      center:  {
        x: this.width/2.0,
        y: this.height/2.0,
        z: this.depth/2.0
      },
      radius: Math.sqrt(this.width * this.width + this.height * this.height + this.depth * this.depth) / 2.0
    };

    this.centroid = {
      x: this.width/2.0,
      y: this.height/2.0,
      z: this.depth/2.0
    };
  }
  
  getPixel(x,y) {
    return this.data(x + this.width * y);
  };

  getVoxel(x,y,z) {
    return this.data(x + this.width * y + this.width * this.height * z);
  };

  histogram() {
    if (this.bins === undefined) {
      this.bins = [];
      for (let i=0; i < this.data.length; i++) {
        this.bins[this.data[i]]++;
      }
    }
    return this.bins;
  };
  
}

