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

/*
 * Constructor
 */
var PointStyle = function (options) {
  this.structure = options.structure;
  this.context = options.context;
  this.VBO = null;
  this.isDirty = true;
}

PointStyle.prototype.getShape = function() {
  var shape = null;
  if (this.isDirty ) {
    this.createVBO();
    shape = new Shape();
    shape.VBO = this.VBO;
  }
  return shape;
}

PointStyle.prototype.createGeometry = function(structure) {
  var vertices = [];
  for (var i in structure.atoms) {
    vertices.push(structure.atoms[i].x);
    vertices.push(structure.atoms[i].y);
    vertices.push(structure.atoms[i].z);
  }
  return new Float32Array(vertices);
}

PointStyle.prototype.createVBO = function() {
  var gl = this.context;

  // Create Geometry
  var geom = this.createGeometry(this.structure);
  // Create VBO
  this.VBO = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.VBO);
  gl.bufferData(gl.ARRAY_BUFFER, geom, gl.STATIC_DRAW);

  this.VBO.itemSize = 3;
  this.VBO.numItems = this.structure.atoms.length;

  this.isDirty = false;
}

