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
 *
 * @author: Jean-Christophe Taveau
 */

function XYZParser() {
  this.mol = new Molecule({});
}

XYZParser.prototype.getStructure = function () {
  return this.mol;
}

/**
 * File format described in Wikipedia:
 * https://en.wikipedia.org/wiki/XYZ_file_format
 * Example from Wikipedia:
 *
 * 5
 * methane molecule (in Angströms)
 * C        0.000000        0.000000        0.000000
 * H        0.000000        0.000000        1.089000
 * H        1.026719        0.000000       -0.363000
 * H       -0.513360       -0.889165       -0.363000
 * H       -0.513360        0.889165       -0.363000
 *
 **/
XYZParser.prototype.parse = function (text) {
    // 1- Split the text in an array of rows
    var rows = text.split('\n');
    console.log(rows);
    // 2- Search for row #0
    var start = 0;
    while (/^\d+$/.test(rows[start]) == false) {
        start++;
    }
    // 3- Read title aka row #1
    this.mol.title = rows[start + 1];
    // 4- Main loop
    for (var i = start + 2; i < rows.length; i++) {
        if (rows[i] !== undefined && rows[i].length > 0) {
            this.parseAtom(rows[i],i - 1 - start);
        }
    }
}



XYZParser.prototype.parseAtom = function (line, row_number) {
  var words = line.match(/(\S+)/g);
  console.log(words);
  var atom = {};
  atom.type = "ATOM";
  atom.serial = row_number;
  atom.name = words[0].trim();
  atom.group = "XXX";
  atom.chain = "A";
  atom.groupID = 1;
  atom.x = parseFloat(words[1].trim());
  atom.y = parseFloat(words[2].trim());
  atom.z = parseFloat(words[3].trim());
  atom.symbol = atom.name;
  // If exists, set the secondary structure (previously parse in HELIX and SHEET)
  atom.secondary = 'X';
  this.mol.atoms.push(atom);

  // Update centroid and bounding box of the structure
  this.mol.cg.x += atom.x;
  this.mol.cg.y += atom.y;
  this.mol.cg.z += atom.z;
  this.updateBBox(atom);

}
XYZParser.prototype.updateBBox = function (a) {
  if (this.mol.bbox.min.x > a.x)
    this.mol.bbox.min.x = a.x;
  if (this.mol.bbox.min.y > a.y)
    this.mol.bbox.min.y = a.y;
  if (this.mol.bbox.min.z > a.z)
    this.mol.bbox.min.z = a.z;
  if (this.mol.bbox.max.x < a.x)
    this.mol.bbox.max.x = a.x;
  if (this.mol.bbox.max.y < a.y)
    this.mol.bbox.max.y = a.y;
  if (this.mol.bbox.max.z < a.z)
    this.mol.bbox.max.z = a.z;
}
