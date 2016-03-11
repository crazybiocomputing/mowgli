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
 * Bond
 *
 * @class Bond
 * @constructor
 * @memberof module:mol
 *
 * @param {Atom} atom1 - First atom
 * @param {Atom} atom2 - Second atom
 *
 * @author: Jean-Christophe Taveau
 */
function Bond(atom1, atom2)  {
  /**
   * Bond Type
   *
   * @property {number} Bond.NONE - Unknown type
   * @property {number} Bond.COVALENT - Covalent bond
   * @property {number} Bond.SSBOND - Disulfide bridge
   * @property {number} Bond.HBOND - Hydrogen bond
   **/
  this.type  = Bond.NONE;

  /**
   * First atom
   **/
  this.atom1 = atom1;

  /**
   * Second atom
   **/
  this.atom2 = atom2;

  /**
   * Mid-point
   **/
  this.middle = {
    'x': (this.atom1.x + this.atom2.x)/2.0,  
    'y': (this.atom1.y + this.atom2.y)/2.0,  
    'z': (this.atom1.z + this.atom2.z)/2.0,  
  };
}

Bond.NONE     = 0;
Bond.COVALENT = 1;
Bond.SSBOND   = 2;
Bond.HBOND    = 4;
