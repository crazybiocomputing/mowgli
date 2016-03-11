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
 * Constructor
 * @class Atom
 * @memberof module:mol
 * @constructor
 *
 * @author Jean-Christophe Taveau
 **/
function Atom() {
   
   /**
    * Type - ATOM or HETATM
    *
    * @type {string}
    **/
   this.type; 
   
   /**
    * ID of the atom in the file
    *
    * @type {number}
    **/
   this.serial; 

   /**
    * Atom name according to the chemical nomenclature
    *
    * @type {string}
    **/
   this.name;

   /**
    * Alternate Location of the atom
    *
    * @type {string}
    **/
   this.altLoc; 

   /**
    * Group name the atom belongs (three//chars code)
    *
    * @type {string}
    **/
   this.group;

   /**
    * Location of the group (residue or nucleotide) in the chain.
    *
    * @type {number}
    **/
   this.groupID; 

   /**
    * Chain ID
    *
    * @type {char}
    **/
   this.chain; 

   /**
    * X- coordinate
    *
    * @type {string}
    **/
   this.x;  

   /**
    * Y- coordinate 
    *
    * @type {string}
    **/
   this.y; 

   /**
    * Z-coordinate 
    *
    * @type {number}
    **/
   this.z; 

   /**
    * Chemical symbol
    *
    * @type {string}
    **/
   this.symbol;

}


