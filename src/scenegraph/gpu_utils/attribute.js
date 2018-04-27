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
 * Attribute class used by the shader program
 *
 * @class Attribute
 * @memberof module:graphics
 * 
 **/
export class Attribute {
  /**
   * @constructor
   */
  constructor(name,size,type,offset,stride) {

    /** 
    * The name
    * @type {string}
    *
    **/
    this.name = name;

    /**
     * A GLint specifying the number of components per vertex attribute. 
     * Must be 1, 2, 3, or 4.
     */
    this.size = size;
    
    /**
     * 
     */
    this.type = type;
    /**
    * The offset
    * @type {number}
    *
    **/
    this.offset = offset;

    /**
    * The stride
    * @type {number}
    *
    **/
    this.stride = stride;


    this.location = -1;
  }
} // End of class Attribute


