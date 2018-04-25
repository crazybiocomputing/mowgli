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
 * Point Geometer generates coordinates
 *
 * @class PointGeometer
 * @memberof module:graphics
 * @constructor
 * @author Jean-Christophe Taveau
 **/
function PointGeometer(mol,colorer) {
    console.log('PointGeometer');
    this.mol = mol;
    this.colorer = colorer || CPKColorer;
    this.shape;

    // TODO: Check if already calculated and stored in database
}

/**
 * Get shape corresponding to this geometry style
 *
 * @return {shape}
 * @author Jean-Christophe Taveau
 */
PointGeometer.prototype.getShape = function () {
    if (this.shape === undefined) {
        this.shape = new Shape();
        var vertices = [];
        // Only one array is used to define the vertices and corresponding colors
        // Interleaved array of (vertices + colors)
        // X Y Z R G B X Y Z R G B
        for (var i=0; i < this.mol.atoms.length; i++) {
            vertices.push(this.mol.atoms[i].x);
            vertices.push(this.mol.atoms[i].y);
            vertices.push(this.mol.atoms[i].z);
            // get RGB color
            var rgb = this.colorer.get(this.mol.atoms[i]);
            vertices.push(rgb[0]);
            vertices.push(rgb[1]);
            vertices.push(rgb[2]);
        }
        // Set geometry and colors of this shape
        this.shape.type = 'POINTS';
        this.shape.addVertexData(
            {
                'content': Shape.XYZ | Shape.RGB,
                'data':vertices,
                'attributes': [new Attribute("aVertexPosition",0,6), new Attribute("aVertexColor",3,6)]
            }
        );
        console.log(this.mol.centroid);
        //mat4.translate(this.shape.matrix,this.shape.matrix,[-this.mol.centroid.x,-this.mol.centroid.y,-this.mol.centroid.z]);
        this.shape.translate(-this.mol.centroid.x, -this.mol.centroid.y, -this.mol.centroid.z);

    }
    console.log(this.shape);
    return this.shape;
};
