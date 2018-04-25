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
 * @memberof module:mw<sg
 * @constructor
 * @augments mwSG.Leaf
 **/
export class Shape extends Leaf {
  constructor() {
      super(this);

      this.ID = 'shape';
      this.colorMode = 'monochrome';
      this.shaderProgram = null;
      this.geometries = [];
      this.textures   = [];
      this.uniforms   = [];

      this.type = 'POINTS';

      this.centroid = {
          x:0,
          y:0,
          z:0
      };

      this._isIndexed=false;

      this.nodeGL = new ShapeGL(this);
  }

  static XYZ    = 1;
  static XYZW   = 2;
  static NXYZ   = 4;
  static RGB    = 8;
  static RGBA   = 16;
  static ST     = 32;
  static INDICES= 64;

  // Private
  static itemLength = {
      1  : 3,
      2  : 4,
      4  : 3,
      8  : 3,
      16 : 4,
      32 : 2,
      64 : 1
  };

  /**
   * Set Program
   *
   * @param {Program} a_program - A shader program defining the rendering style
   *
   **/
  setProgram(a_program) {
      this.nodeGL.shaderProgram = a_program;
  };

  /**
   * Flag indicating if this shape contains indexed geometries
   *
   * @return {boolean}
   *
   **/
  isIndexedGeometry() {
      return this._isIndexed;
  };

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
  addVertexData(a_geom) {
      if ( (a_geom.content & Shape.INDICES) === Shape.INDICES) {
          this._isIndexed = true;
          this.geometries.push(
              new mwSG.Geometry({
                  'type'       : 'indexed',
                  'content'    : a_geom.content,
                  'data'       : new Uint16Array(a_geom.data),
                  'attributes' : []
              })
          );
      }
      else {
          this.geometries.push(
              new mwSG.Geometry( {
                  'type'     : 'vertex',
                  'content'    : a_geom.content,
                  'data'     : new Float32Array(a_geom.data),
                  'attributes' : a_geom.attributes
              })
          );
      }

      // HACK console.log(this.geometries);
      // Set the number of items in this shape
      // this.numItems = a_geom.data.length / itemSize;
  };


  addTexture(image_name) {
      var image = new Image();
      image.src = image_name;
      this.textures.push(image);
  };

  addUniformData(a_uniform) {
      this.uniforms.push(a_uniform);
  };

  /**
   * Remove Vertex Data (aka geometry).
   *
   * These data may contain:
   * - Coordinates
   * - Normals
   * - Colors
   * - Indices
   * - And/or texture coordinates.
   *
   * @param {number} geom_content - Delete the geometry with the given content
   *

   *
   **/
  removeVertexData(geom_content) {
      var i = 0;
      var stop = false;
      while (!stop) {
          if (this.geometries[i].content === geom_content) {
              stop = true;
          }
          i++;
          if (i >= this.geometries[i].length) {
              stop = true;
              i = -1;
          }
      }
      if (i !== -1) {
          delete this.geometries[i];
      }

      // Update the OpenGL counterpart
      this.nodeGL.removeVBO(geom_content);

      // Update status
      if (((this.type & Shape.XYZ) === Shape.XYZ)
      || ((this.type & Shape.XYZW) === Shape.XYZW)
      || ((this.type & Shape.NXYZ) === Shape.NXYZ) ) {
          this._isDirty &= ~Node.GEOMETRY;
      }
      else {
          // Shape.RGB || Shape.RGBA  || Shape.ST
          this._isDirty &= ~Node.MATERIAL;
      }

  };

  /**
   * Set centroid
   *
   * @param {Point3D} cg - Centroid
   *
   **/
  setCentroid(cg) {
      this.centroid = cg;
  };

  update(context) {
      // TODO
  };

  updateUniforms(context) {
      // TODO
  };

} // End of class Shape

