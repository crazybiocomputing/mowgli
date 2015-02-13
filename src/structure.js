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
var Structure = function () {

  // General Information
  this.ID             = '0UNK';
  this.classification = 'Unknown';
  this.title          = 'No Title';
  this.date           = '00-UNK-00';

  // Atoms
  this.atoms=[];

  //Bonds
  this.bonds=[];

  // Colors
  this.colors = [];

  // Center of Gravity
  this.cg={'x': 0.0,'y': 0.0,'z': 0.0};

  // Matrix for rotation(s) and translation(s)
  this.matrix=mat4.create();
  mat4.identity(this.matrix);

  // Bounding Box
  this.bbox={
    'min': {'x': Number.MAX_VALUE,'y': Number.MAX_VALUE,'z': Number.MAX_VALUE},
    'max': {'x': Number.MIN_VALUE,'y': Number.MIN_VALUE,'z': Number.MIN_VALUE},
    'center':  {'x': 0.0,'y': 0.0,'z': 0.0},
    'radius': 0.0
  };

}


Structure.RIGHT_HANDED_ALPHA = 1;
Structure.RIGHT_HANDED_OMEGA = 2;
Structure.RIGHT_HANDED_PI    = 3;
Structure.RIGHT_HANDED_GAMMA = 4;
Structure.RIGHT_HANDED_3_10  = 5;
Structure.LEFT_HANDED_ALPHA  = 6;
Structure.LEFT_HANDED_OMEGA  = 7;
Structure.LEFT_HANDED_GAMMA  = 8;
Structure.RIBBON_HELIX_2_7   = 9;
Structure.POLYPROLINE        = 10;


Structure.prototype.finder = function (src,callback) {
  if (src === 'ATOM') {
    return this.atoms.filter(callback);
  }
  else {
    return this.bonds.filter(callback);     
  }
}

Structure.prototype.atomFinder = function (callback) {
  return this.atoms.filter(callback);
}

Structure.prototype.bondFinder = function (callback) {
  return this.bonds.filter(callback);
}

Structure.prototype.toString = function () {
  var quote='';
  var out='{\n';

  for (var i in this.atoms)
  {
    out+="{";
    out+="type: '"  + this.atoms[i].type + "', " +
     "serial: " + this.atoms[i].serial + ", " +
     "name: '"  + this.atoms[i].name + "', " +
     "struct:'" + this.atoms[i].struct + "', " +
     "x :"    + this.atoms[i].x + ", " + 
     "y :"    + this.atoms[i].y + ", " + 
     "z :"    + this.atoms[i].z + ", " + 
     "symbol:'" + this.atoms[i].symbol + "'},\n ";
  }
  out+= 'center: {' + this.cg.x + ',y: '+ this.cg.y + ',z: '+ this.cg.z + '} } ';
  out+=("}\n");
  return out;
}

