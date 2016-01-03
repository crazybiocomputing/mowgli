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
 
 var Cube = function() {
    Shape.call(this);
    this.ID = 'cube';
 }
 
Cube.prototype = Object.create(Shape.prototype );

/*
 * Set style of this cube:
 * @param{string} 'wireframe','solid','shaded','textured'
 */
Cube.prototype.setStyle = function(type) {
    switch (type) {
    case 'wireframe' :
        this.ID = 'cubeWire';
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
        this.ID = 'cubeSolid';
        this.type = 'TRIANGLES';
        this.addVertexData(
            {
                'content': Shape.XYZ,
                'data': Cube.vertices,
                'indices': Cube.indices, 
                'attributes': [new Attribute("aVertexPosition",0,0)] 
            }
        );
        this.addVertexData(
            {
                'content': Shape.RGB,
                'data': Cube.colors,
                'attributes': [new Attribute("aVertexColor",0,0)] 
            }
        );

        this.addVertexData( 
            {
                'content'   : Shape.XYZ | Shape.RGBA,
                'data'      : Cube.vertices, 
                'indices'   : Cube.indices, 
                'attributes': [new Attribute("aVertexPosition",0,7), new Attribute("aVertexColor",3,7)] 
            }
        );
        this.numItems = Cube.vertices.length / 7;
        break;
    case 'shaded':
        this.ID = 'cubeShaded'; 
        // TODO
        break;
    case 'textured' :
        this.ID = 'cubeTextured'; 
        // TODO
        break;
    default:
    
    }
}
 
  
Cube.verticesWire = [
     1, 1,-1,
     1,-1,-1,
    -1,-1,-1,
    -1, 1,-1,
     1, 1, 1,
     1,-1, 1,
    -1,-1, 1,
    -1, 1, 1
];

Cube.vertices = [
    // Front face
    -1.0, -1.0,  1.0, 1.0, 0.0, 0.0, 1.0,
     1.0, -1.0,  1.0, 1.0, 0.0, 0.0, 1.0,
     1.0,  1.0,  1.0, 1.0, 0.0, 0.0, 1.0,
    -1.0,  1.0,  1.0, 1.0, 0.0, 0.0, 1.0,

    // Back face
    -1.0, -1.0, -1.0, 1.0, 1.0, 0.0, 1.0,
    -1.0,  1.0, -1.0, 1.0, 1.0, 0.0, 1.0,
     1.0,  1.0, -1.0, 1.0, 1.0, 0.0, 1.0,
     1.0, -1.0, -1.0, 1.0, 1.0, 0.0, 1.0,

    // Top face
    -1.0,  1.0, -1.0, 0.0, 1.0, 0.0, 1.0,
    -1.0,  1.0,  1.0, 0.0, 1.0, 0.0, 1.0,
     1.0,  1.0,  1.0, 0.0, 1.0, 0.0, 1.0,
     1.0,  1.0, -1.0, 0.0, 1.0, 0.0, 1.0,

    // Bottom face
    -1.0, -1.0, -1.0, 1.0, 0.5, 0.5, 1.0,
     1.0, -1.0, -1.0, 1.0, 0.5, 0.5, 1.0,
     1.0, -1.0,  1.0, 1.0, 0.5, 0.5, 1.0,
    -1.0, -1.0,  1.0, 1.0, 0.5, 0.5, 1.0,

    // Right face
     1.0, -1.0, -1.0, 1.0, 0.0, 1.0, 1.0,
     1.0,  1.0, -1.0, 1.0, 0.0, 1.0, 1.0,
     1.0,  1.0,  1.0, 1.0, 0.0, 1.0, 1.0,
     1.0, -1.0,  1.0, 1.0, 0.0, 1.0, 1.0,

    // Left face
    -1.0, -1.0, -1.0, 0.0, 0.0, 1.0, 1.0,
    -1.0, -1.0,  1.0, 0.0, 0.0, 1.0, 1.0,
    -1.0,  1.0,  1.0, 0.0, 0.0, 1.0, 1.0,
    -1.0,  1.0, -1.0, 0.0, 0.0, 1.0, 1.0
];

Cube.indices = [
     0, 1, 2,      0, 2, 3,    // Front face
     4, 5, 6,      4, 6, 7,    // Back face
     8, 9, 10,     8, 10, 11,  // Top face
    12, 13, 14,   12, 14, 15, // Bottom face
    16, 17, 18,   16, 18, 19, // Right face
    20, 21, 22,   20, 22, 23  // Left face
];


 
