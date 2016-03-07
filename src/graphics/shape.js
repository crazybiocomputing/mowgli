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
 * Shape: Graphical object defined by geometries (Vertex Data) and a rendering style (Shader Program).
 *
 * The classical way to create a shape in Mowgli is:
 *
 * ```javascript
 * var shape = new Shape();
 * shape.type = 'POINTS';
 * var vrtxData = {
 *     'content': Shape.XYZ | Shape.RGB,
 *     'data':vertices, 
 *     'attributes': [new Attribute("aVertexPosition",0,6), new Attribute("aVertexColor",3,6)] 
 * };
 * shape.addVertexData(vrtxData);
 * shape.setProgram(shaderProgram);
 *
 * ```
 * @class Shape
 * @memberof module:graphics
 * @constructor
 * @augments Leaf
 **/
function Shape() {
    Leaf.call(this);
    
    this.ID = 'shape';
    this.colorMode = 'monochrome';
    this.shaderProgram = null;
    this.geometries = [];
    this.textures   = [];
    this.uniforms   = [];

    this.type = 'POINTS';
    this.glType = 0; // gl.POINTS
    this.numItems = 0;
    this.numIndices = 0;
    this.parent = null;
    this.cg = {'x':0,'y':0,'z':0};

    this._isIndexed=false;
    
    this.nodeGL = new ShapeGL(this);
    

}

Shape.prototype = Object.create(Leaf.prototype);


Shape.XYZ    = 1;
Shape.XYZW   = 2;
Shape.NXYZ   = 4;
Shape.RGB    = 8;
Shape.RGBA   = 16;
Shape.ST     = 32;

// Private
Shape.itemLength = {
    1  : 3,
    2  : 4,
    4  : 3,
    8  : 3,
    16 : 4,
    32 : 2
}

/**
 * Set Program
 *
 * @param {Program} a_program - A shader program defining the rendering style
 *
 **/
Shape.prototype.setProgram = function(a_program) {
  console.log(a_program);
  this.nodeGL.shaderProgram = a_program;
}

/**
 * Flag indicating if this shape contains indexed geometries
 *
 * @return {boolean}
 *
 **/
Shape.prototype.isIndexedGeometry = function() {
  return this._isIndexed;
}

/**
 * Add Vertex Data.
 *
 * These data may contain:
 * - Coordinates
 * - Normals
 * - Colors
 * - Indices
 * - And/or texture coordinates.
 *
 * @param {VertexData} a_geom - Contains all the data describing the vertices of this shape
 *
 *
 * 
 * @property {VertexData} a_geom 
 * @property {number}  a_geom.type 
 * @property {number}  a_geom.type.Shape.XYZ - X, Y, Z- Vertex Coordinates
 * @property {number}  a_geom.type.Shape.XYZW - X, Y, Z, W- Vertex Coordinates
 * @property {number}  a_geom.type.Shape.NXYZ - X, Y, Z- Normal Coordinates
 * @property {number}  a_geom.type.Shape.RGB - Red, Green, and Blue Color 
 * @property {number}  a_geom.type.Shape.RGBA - Red, Green, Blue, and Alpha Color 
 * @property {number}  a_geom.type.Shape.ST - S,T Texture Coordinates
 * @property {Array(number)}  a_geom.data
 * @property {Array(number)}  a_geom.indices
 * @property {Array(Attribute)}  a_geom.attributes
 *
 **/
Shape.prototype.addVertexData = function(a_geom) {
    if (a_geom.indices != undefined) {
        this._isIndexed = true;
        this.geometries.push( 
            new Geometry({
                'type'       : 'indexed',
                'content'    : a_geom.content,
                'data'       : new Float32Array(a_geom.data),
                'indices'    : new Uint16Array(a_geom.indices),
                'attributes' : a_geom.attributes
            }) 
        );
        this.numIndices = a_geom.indices.length;
    }
    else {
        this.geometries.push( 
            new Geometry( {
                'type'     : 'vertex',
                'content'    : a_geom.content,
                'data'     : new Float32Array(a_geom.data),
                'attributes' : a_geom.attributes
            }) 
        );    
    }

    console.log(this.geometries);
    // Set the number of items in this shape
    // this.numItems = a_geom.data.length / itemSize;
}


Shape.prototype.addTexture = function(image_name) {
    var image = new Image();
    image.src = image_name;
    this.textures.push(image);
}

Shape.prototype.addUniformData = function(a_uniform) {
    this.uniforms.push(a_uniform);
}

/**
 * Set centroid
 *
 * @param {Point3D} cg - Centroid
 *
 **/
Shape.prototype.setCentroid = function(cg) {
    this.cg = cg;
}

Shape.prototype.updateUniforms = function (context) {

}



