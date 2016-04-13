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
 * Wireframe Geometer generates lines from bonds
 *
 * @class WireGeometer
 * @memberof module:graphics
 * @constructor
 * @author Jean-Christophe Taveau
 **/
function WireGeometer(mol,colorer) {
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
WireGeometer.prototype.getShape = function () {
    var vertices = [];
    var indices = [];

    var createWireframeShape = function(mol,colMaker) {
        var alreadyDone = {};
        var index=0;

        // Collect all the XYZ-coordinates of atoms + middle points
        for (var i=0; i < mol.bonds.length; i++) {
            var bond = mol.bonds[i];
            // First atom
            var rgbAtom1 = colMaker.get(bond.atom1);
            if (alreadyDone[bond.atom1.serial] === undefined) {
                index = vertices.length / 6.0;
                vertices.push(bond.atom1.x);
                vertices.push(bond.atom1.y);
                vertices.push(bond.atom1.z);
                vertices.push(rgbAtom1[0]);
                vertices.push(rgbAtom1[1]);
                vertices.push(rgbAtom1[2]);
                alreadyDone[bond.atom1.serial] = index;
            }

            // First half bond
            index = vertices.length / 6.0;
            vertices.push(bond.middle.x);
            vertices.push(bond.middle.y);
            vertices.push(bond.middle.z);
            vertices.push(rgbAtom1[0]);
            vertices.push(rgbAtom1[1]);
            vertices.push(rgbAtom1[2]);

            indices.push(alreadyDone[bond.atom1.serial]);
            indices.push(index); // middle

            // Second half bond
            var rgbAtom2 = colMaker.get(bond.atom2);
            if (alreadyDone[bond.atom2.serial] === undefined) {
                index = vertices.length / 6.0;
                vertices.push(bond.atom2.x);
                vertices.push(bond.atom2.y);
                vertices.push(bond.atom2.z);
                vertices.push(rgbAtom2[0]);
                vertices.push(rgbAtom2[1]);
                vertices.push(rgbAtom2[2]);

                alreadyDone[bond.atom2.serial] = index;
            }

            index = vertices.length / 6.0;
            vertices.push(bond.middle.x);
            vertices.push(bond.middle.y);
            vertices.push(bond.middle.z);
            vertices.push(rgbAtom2[0]);
            vertices.push(rgbAtom2[1]);
            vertices.push(rgbAtom2[2]);

            indices.push(alreadyDone[bond.atom2.serial]);
            indices.push(index); // middle
        }
    };

    // Do the job
    if (this.shape === undefined) {
        if (this.mol.bonds === undefined || this.mol.bonds.length === 0) {
            BondCalculator(this.mol);
        }
        console.log('Create wireframe shape');
        createWireframeShape(this.mol,this.colorer);
        console.log(colors);
        console.log(indices);

        this.shape = new Shape();
        this.shape.type = 'LINES';
        this.shape.addVertexData(
            {
                'content'   : Shape.XYZ | Shape.RGB,
                'data'      : vertices,
                'indices'   : indices,
                'attributes': [new Attribute('aVertexPosition',0,6), new Attribute('aVertexColor',3,6)]
            }
        );
        this.shape.translate(-this.mol.centroid.x, -this.mol.centroid.y, -this.mol.centroid.z);
    }
    console.log(this.shape);
    return this.shape;
};
