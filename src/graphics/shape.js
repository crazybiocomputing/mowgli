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
function Shape() {
  this.ID = 'shape';
  this.colorMode = 'monochrome';
  this.shaderProgram = null;
  this.geometries = [];
  this.colors = null;
  this.type = 'POINTS';
  this.glType = 0; // gl.POINTS
  this.numItems = 0;
  this.numIndices = 0;
  this.cg = {'x':0,'y':0,'z':0};

  this._isIndexed=false;

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

Shape.prototype.isIndexedGeometry = function() {
  return this._isIndexed;
}

Shape.prototype.setInterleavedGeometry = function(types,data) {
 // TODO
}

Shape.prototype.setGeometry = function(a_geom) {
  this.type = a_geom.type || 'POINTS';

  if (a_geom.indices != undefined) {
    this._isIndexed = true;
    this.geometries.push( new Geometry({
      'type'       : 'indexed',
      'data'       : new Float32Array(a_geom.data),
      'indices'    : new Uint16Array(a_geom.indices),
    }) );
    this.numIndices = a_geom.indices.length;
  }
  else {
    this.geometries.push( new Geometry( {
      'type'     : 'vertex',
      'data'     : new Float32Array(a_geom.data),
      'attributes' : a_geom.attributes
    }) );    
  }

  // Set the number of items in this shape
  // this.numItems = a_geom.data.length / itemSize;
}

Shape.prototype.setCG = function(cg) {
  this.cg = cg;
}

Shape.prototype.setColors = function(color_array) {  
  var itemSize = 0;
  switch (color_array.type) {
  case 'RGB':
    itemSize = 3;
    break;
  case 'RGBA':
    itemSize = 4;
    break;
  }
  this.geometries.push( {
    'type'       : 'color',
    'data'       : new Float32Array(color_array.data),
    'attributes' : color_array.attributes

  });

  // Check if numItems is coherent with `this.numItems'
  // TODO
}

Shape.prototype.updateGL = function (context) {
  for (var i in this.geometries) {
    this.geometries[i] = this._createVBO(context,this.geometries[i]);
  }

  this.isDirty = false;
}

Shape.prototype.updateUniforms = function (context) {

}

// Private
Shape.prototype._createVBO = function(context,vbo) {
  var gl = context;
  switch (this.type) {
  case 'POINTS','POINTS_RADIUS': 
    this.glType = gl.POINTS;
    break;
  case 'LINES':
    this.glType = gl.LINES;
    break;
  case 'LINE_STRIP':
    this.glType = gl.LINE_STRIP;
    break;
  case 'LINE_LOOP':
    this.glType = gl.LINE_LOOP;
    break;
  case 'TRIANGLES':
    this.glType = gl.TRIANGLES;
    break;
  case 'TRIANGLE_STRIP':
    this.glType = gl.TRIANGLE_STRIP;
    break;
  }
  // Create VBO
  vbo.ID = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo.ID);
  gl.bufferData(gl.ARRAY_BUFFER, vbo.data, gl.STATIC_DRAW);

  // Update attribute(s) associated to this VBO
  for (var j=0; j < vbo.attributes.length; j++) {
    vbo.attributes[j].location = this.shaderProgram.getAttribLocation(vbo.attributes[j].name);
    vbo.attributes[j].size = this.shaderProgram.attributes[vbo.attributes[j].name].size;
    console.log('location [' + vbo.attributes[j].name + ']= '+ vbo.attributes[j].location + ' '+vbo.attributes[j].size);
  }

  if (vbo.type === 'indexed') {
    vbo.IndxID = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vbo.IndxID);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, vbo.indices, gl.STATIC_DRAW);
  }
  console.log(vbo.ID);
  return vbo;

}

Shape.prototype._updateAttributes = function(context) {
  var gl = context;
/***
  if (this.shaderProgram.attributes.length != this.geometry.attributes.length) {
    console.log(this.shaderProgram.attributes);
    console.log(this.shaderProgram.attributes.length + ' != ' + this.geometry.attributesLength() );
    console.log("MOWGLI: Attributes are not correctly defined");
  }
*****/
  for (var i=0; i < this.geometry.VBO.length;i++) {
    var vbo = this.geometry.VBO[i];
    for (var j=0; j < vbo.attributes.length; j++) {
      vbo.attributes[j].location = this.shaderProgram.getAttribLocation(vbo.attributes[j].name);
      vbo.attributes[j].size = this.shaderProgram.attributes[vbo.attributes[j].name].size;
      console.log('location [' + vbo.attributes[j].name + ']= '+ vbo.attributes[j].location + ' '+vbo.attributes[j].size);
    }
  }
}


