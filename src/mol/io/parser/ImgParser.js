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

"use strict";

/**
 *
 * @module raster
 *
 **/
 
 
 
/**
 * Constructor
 * @class PDBParser
 * @classdesc This class allows the parsing of the PDB file format version 3.30

 *
 * @constructor
 *
 * @example
 * parser = new PDBParser();
 * parser.parse(myText);
 * var mol = parser.getStructure();
 *
 * @author Jean-Christophe Taveau
 **/
function ImageParser() {
  this.raster = new Raster({});
}


/**
 * Return the 2D- or 3D-raster
 *
 * @return {Structure} - The 3D structure
 **/
ImageParser.prototype.getRaster = function () {
  return this.raster;
}

/**
 * Trigger the parsing of the PDB file
 *
 * @params {string} text - Text containing the PDB structure
 **/
ImageParser.prototype.parse = function (data) {


var pixelData = canvas.getContext('2d').getImageData(event.offsetX, event.offsetY, 1, 1).data;

}



