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
 * Triangle Mesh
 *
 * @class Mesh
 */
class Mesh extends Shape {

  /**
   * @constructor
   *
   */
  constructor() {
    super();
    this.ID = 'mesh';
  }

  /**
   * Set style of this mesh:
   * @param{string} 'wireframe','solid'
   */
  setStyle = function(type) {
    switch (type) {
    case 'wireframe' :
      this.ID = 'meshWire';
      // 1- Define geometry
      var _indices = [0,1,2,3,0,4,5,6,7,4,5,1,2,6,7,3];
      this.type = 'LINE_STRIP';
      this.addVertexData(
          {
              'content'   : Shape.XYZ,
              'data'      : Cube.verticesWire,
              'indices'   :_indices,
              'attributes': [new Attribute("aVertexPosition",0,0)]
          }
      );
/**
      this.addUniformData(
          {
              'content': ['RGB'],
              'data'   : [1.0,0.6,0.2],
              'uniform': [new Uniform("uColor")]
          }
      )
**/
      this.numItems = Cube.verticesWire.length / 3;
      // 2- Define graphics style
      //this.setProgram(shaderProgram);

      break;
    case 'solid' :
      this.ID = 'meshSolid';
      this.type = 'TRIANGLES';
      this.addVertexData(
          {
              'content': Shape.XYZ,
              'data': this.vertices,
              'indices': this.indices,
              'attributes': [new Attribute("aVertexPosition",0,0)]
          }
      );
      this.addVertexData(
          {
              'content': Shape.RGB,
              'data': this.colors,
              'attributes': [new Attribute("aVertexColor",0,0)]
          }
      );

      this.addVertexData(
          {
              'content'   : Shape.XYZ | Shape.RGBA,
              'data'      : this.vertices,
              'indices'   : this.indices,
              'attributes': [new Attribute("aVertexPosition",0,7), new Attribute("aVertexColor",3,7)]
          }
      );
      this.numItems = Cube.vertices.length / 7;
      break;

    default:
    // TODO
    }
  };
}


