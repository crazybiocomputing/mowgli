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


"use strict";

/**
 * Voxels maps
 * @class Raster
 * @memberof module:structure
 * @constructor
 * @extends module:structure.Structure
 * @author Jean-Christophe Taveau
 **/
function Raster(other) {
    // super()
    Structure.call(this,other);

   /**
    * Pixels/Voxels
    *
    * @type {Array(RGBColor)}
    *
    **/
    this.data = other.data || new Uint8ClampedArray();

    // mode 8-bit, 16-bit, 32-bit, rgb, rgba
    this.information.mode = other.mode || '8-bit';
    this.information.width = other.width;
    this.information.height = other.height;
    this.information.depth = other.depth || 1;

    this.width = this.information.width;
    this.height = this.information.height;
    this.depth = this.information.depth;

    this.bbox = {
      'min': {'x': 0,'y': 0,'z': 0},
      'max': {'x': this.width,'y': this.height,'z': this.depth},
      'center':  {'x': this.width/2.0,'y': this.height/2.0,'z': this.depth/2.0},
      'radius': Math.sqrt(this.width * this.width + this.height * this.height + this.depth * this.depth)/2.0
    };

    this.centroid = {'x': this.width/2.0,'y': this.height/2.0,'z': this.depth/2.0};

    this.bins;
}

Raster.prototype.getPixel = function(x,y) {
    return this.data(x + this.width * y);
}

Raster.prototype.getVoxel = function(x,y,z) {
    return this.data(x + this.width * y + this.width * this.height * z);
}

Raster.prototype.histogram() {
    if (this.bins === undefined) {
        this.bins = [];
        for (var i=0; i < this.data.length; i++) {
            this.bins[this.data[i]]++;
        }
    }
    return this.bins;
}
