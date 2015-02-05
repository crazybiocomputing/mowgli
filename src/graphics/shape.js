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
var Shape = function (context) {
  this.ID = 'shape';
  this.colorMode = 'monochrome';
  this.shaderProgram = null;
  this.VBO = null;
  this.geometry = null;
  this.colors = null;
  this.context = context;
  this.type = 'POINTS';
  this.cg = {'x':0,'y':0,'z':0};

  // Matrix for rotation(s) and translation(s)
  this.matrix=mat4.create();
  mat4.identity(this.matrix);

}

Shape.prototype.setColorMode = function(mode) {
  // TODO
}

Shape.prototype.setProgram = function(a_program) {
  console.log(a_program);
  this.shaderProgram = a_program;
}

Shape.prototype.setGeometry = function(type,vertices) {
  this.type = type;
  switch (type) {
  case 'POINTS':
    this.itemSize = 3;
    break;
  case 'LINES':
    this.itemSize = 6;
    break;
  case 'TRIANGLES':
    this.itemSize = 9;
    break;
  }

  this.geometry = new Float32Array(vertices);
}

Shape.prototype.setCG = function(cg) {
  this.cg = cg;
}

Shape.prototype.setColors = function(colors) {
  this.colors = colors;
}

Shape.prototype.update = function () {
  this._createVBO();
}

Shape.prototype._createVBO = function() {
  var gl = this.context;

  // Create VBO
  this.VBO = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.VBO);
  gl.bufferData(gl.ARRAY_BUFFER, this.geometry, gl.STATIC_DRAW);

  this.VBO.itemSize = this.itemSize;
  this.VBO.numItems = this.geometry.length / this.itemSize;

  this.isDirty = false;
}

