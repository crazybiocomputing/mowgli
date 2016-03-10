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

/**
 * @module structure
 **/
 
 
"use strict";

/**
 * Root class for 3D objects: atomic ({@link module:structure.Molecule}), map, or any 3D graphics vectorial object
 * @class Structure
 * @memberof module:structure
 * @constructor
 *
 * @author Jean-Christophe Taveau
 **/
function Structure() {

  /**
   * Identifier
   *
   * @type {string}
   **/
  this.ID             = '0UNK';


  /**
   * Title
   *
   **/
  this.title          = 'No Title';
  
  /**
   * Deposit Date DD-MMM-YY
   *
   * @type {string}
   **/
  this.date           = '00-UNK-00';

  /**
   * Center of Gravity - Centroid
   *
   * @type {vec3}
   *
   * @property {vec3} centroid - Center of gravity or centroid of this structure
   * @property {number} centroid.x - X-coordinate
   * @property {number} centroid.y - Y-coordinate
   * @property {number} centroid.y - Z-coordinate

   **/
  this.centroid={'x': 0.0,'y': 0.0,'z': 0.0};

  /**
   *  Matrix for rotation(s) and translation(s)
   * @type {mat4}
   **/
  this.matrix=mat4.create();
  mat4.identity(this.matrix);

  /**
   * Bounding Box
   *
   * @property {vec3} min - Top-left-front corner of the bounding box
   * @property {number} min.x - X-coordinate of the 'min' corner
   * @property {number} min.y - Y-coordinate of the 'min' corner
   * @property {number} min.y - Z-coordinate of the 'min' corner
   * @property {vec3} max - Bottom-right-back corner of the bounding box
   * @property {number} max.x - X-coordinate of the 'max' corner
   * @property {number} max.y - Y-coordinate of the 'max' corner
   * @property {number} max.z - Z-coordinate of the 'max' corner
   **/
  this.bbox={
    'min': {'x': Number.MAX_VALUE,'y': Number.MAX_VALUE,'z': Number.MAX_VALUE},
    'max': {'x': Number.MIN_VALUE,'y': Number.MIN_VALUE,'z': Number.MIN_VALUE},
    'center':  {'x': 0.0,'y': 0.0,'z': 0.0},
    'radius': 0.0
  };

}

/**
 * Set Title
 *
 * @param {string} str - Set a new title
 *
 **/
Structure.prototype.setTitle = function (str) {
    this.title = str;
}
