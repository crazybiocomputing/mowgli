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


"use strict"



/**
 * Geometry contains geometrical data like coordinates, normals, texCoords, colors,etc.
 *
 * @class Geometry
 * @memberof module:graphics
 * @constructor
 **/
function Geometry (options) {
  
  /** 
   * The type
   *
   * @type {string} 
   *
   * @description
   * - 'none' 
   * - 'POINTS' 
   * - 'LINES' 
   * - 'TRIANGLES' 
   **/
  this.type    = options.type || 'none';
  
  /** 
   * The content - A description of all the vertex data in this geometry. For example,
   *
   *```javascript
   * "content" : Shape.XYZ | Shape.RGB | Shape.ST
   *```
   * The various available values are:
   *
   * - Shape.XYZ
   * - Shape.XYZW 
   * - Shape.NXYZ 
   * - Shape.RGB
   * - Shape.RGBA
   * - Shape.ST
   **/
  this.content = options.content;
  
  /** 
   * The data - A [Float32Array]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array} array containing the vertex data
   *
   * @example
   * If the content is Shape.XYZ | Shape.RGB, it means that in the same array, one vertex is defined by three X,Y, and Z-coordinates plus 
   * three Red, Green, and Blue color values like this...
   * var data [X Y Z R G B X Y Z R G B ... Z R G B ]
   **/
  this.data    = options.data;
  
  /** 
   * The attributes - An array of {@link module:graphics.Attribute} used by the shader program
   *
   **/
  this.attributes = options.attributes; // || [];

  /** 
   * The indices - A [UInt32Array]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint32Array} array of indices pointing to the vertex array 
   *
   **/
  this.indices = options.indices;
  
  console.log(options);
  
  if (this.type === 'indexed') {
    this._isIndexed = true;
  }
  else {
    this._isIndexed = false;
  }

    console.log('end create GEOM');
    console.log(this.attributes);
}

Geometry.prototype.getBuffer = function(name) {
  var stop = false;
  var i=0;
  while (!stop && i < this.VBO.length) {
    if (this.VBO[i].type === name) {
      return this.VBO[i];
    }
    i++;
  }
  return null;
}

Geometry.prototype.isIndexed = function() {
  return this._isIndexed;
}


