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

import {Shape} from '../mwsg_shape.js';

/**
 * Triangle Mesh
 *
 * @class Mesh
 */
export class Mesh extends Shape {

  /**
   * @constructor
   *
   */
  constructor() {
    super();
    this.ID = 'mesh';
    this.vertices = [];
    this.triangles = [];
    this.normals = [];
  }

  /**
   * Set style of this mesh:
   * @param{string} 'wireframe','solid'
   */
  setStyle(type) {
    switch (type) {
    case 'wireframe' :
      this.ID = 'meshWire';
      // 1- Define geometry
      this.type = 'LINES';
      let _indices = [];
      for (let i = 0; i < this.triangles.length; i+=3) {
        _indices.push(this.triangles[i]);
        _indices.push(this.triangles[i+1]);
        _indices.push(this.triangles[i+1]);
        _indices.push(this.triangles[i+2]);
        _indices.push(this.triangles[i+2]);
        _indices.push(this.triangles[i]);
      }
      this.addVertexData(
          {
              'content'   : Shape.XYZ,
              'data'      : this.vertices,
              'indices'   : _indices,
              'attributes': [new gpu.Attribute("aVertexPosition",3,'float',0,0)]
          }
      );
      break;
    case 'solid' :
      this.ID = 'meshSolid';
      this.type = 'TRIANGLES';
      this.addVertexData(
          {
              'content': Shape.XYZ,
              'data': this.vertices,
              'indices': this.indices,
              'attributes': [new gpu.Attribute("aVertexPosition",3,'float',0,0)]
          }
      );
      this.addVertexData(
          {
              'content': Shape.RGB,
              'data': this.colors,
              'attributes': [new gpu.Attribute("aVertexColor",0,0)]
          }
      );

      this.addVertexData(
          {
              'content'   : Shape.XYZ | Shape.RGBA,
              'data'      : this.vertices,
              'indices'   : this.indices,
              'attributes': [new gpu.Attribute("aVertexPosition",0,7), new Attribute("aVertexColor",3,7)]
          }
      );
      this.numItems = Cube.vertices.length / 7;
      break;

    default:
    // TODO
    }
  };
}


