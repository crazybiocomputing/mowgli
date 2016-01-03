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
 * @constructor
 **/
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

  // Chains
  this.chains = [];

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

Structure.threeToOne = {
    "ALA" : "A", // Alanine
    "ARG" : "R", // Arginine
    "ASN" : "N", // Asparagine
    "ASP" : "D", // Aspartic_acid
    "CYS" : "C", // Cysteine
    "GLU" : "E", // Glutamic_acid
    "GLN" : "Q", // Glutamine
    "GLY" : "G", // Glycine
    "HIS" : "H", // Histidine
    "ILE" : "I", // Isoleucine
    "LEU" : "L", // Leucine
    "LYS" : "K", // Lysine
    "MET" : "M", // Methionine
    "PHE" : "F", // Phenylalanine
    "PRO" : "P", // Proline
    "SER" : "S", // Serine
    "THR" : "T", // Threonine
    "TRP" : "W", // Tryptophan
    "TYR" : "Y", // Tyrosine
    "VAL" : "V", // Valine
    "SEC" : "U", // Selenocysteine
    "PYL" : "O", // Pyrrolysine
    "ASX" : "B", // Asparagine_or_aspartic_acid
    "GLX" : "Z", // Glutamine_or_glutamic_acid
    "XLE" : "J", // Leucine_or_Isoleucine
    "XAA" : "X", // Unspecified_or_unknown_amino_acid
    "XXX" : "X"  // Unspecified_or_unknown_amino_acid
}

/**
 * Set Title
 *
 * @param{string} the new title
 *
 **/
Structure.prototype.setTitle = function (str) {
    this.title = str;
}

/**
 * Filter the atoms or bonds in function of their attributes
 *
 * @param{string} The type of objects (ATOM or BOND )on which the filter is applied
 * @param{function} A function for filtering
 *
 **/
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

/**
 * Return the primary sequence in the FASTA format
 *
 * @return {string} The sequence in FASTA format
 *
 **/
Structure.prototype.fasta = function () {
    var fasta = '> ' + this.ID + ':' + this.atoms[0].chain + ' | ' + this.title + '\n';
    var current_chain = this.atoms[0].chainID;
    var count = 0;
    for (var i= 0; i < this.atoms.length; i++) {
        if (this.atoms[i].chainID != current_chain) {
            fasta += '\n> ' + this.ID + ':' + this.atoms[i].chain + ' | ' + this.title + '\n';
            current_chain = this.atoms[i].chainID;
            count = 0;
        }
        if (this.atoms[i].name==="CA" && this.atoms[i].chainID == current_chain) {
            fasta += Structure.threeToOne[this.atoms[i].group];
            count++;
            if ( (count % 80) == 0) {
                fasta += '\n';
                count = 0;
            }
        }
    }
    return fasta;
}

/**
 * Return the secondary structures in FASTA format -- if available.
 *
 * @return {string} The secondary structures of sequence in FASTA format
 *
 **/
Structure.prototype.secondary = function () {
    var fasta = '> ' + this.ID + ':' + this.atoms[0].chain + ' | ' + this.title + '\n';
    var current_chain = this.atoms[0].chainID;
    var count = 0;
    for (var i= 0; i < this.atoms.length; i++) {
        if (this.atoms[i].chainID != current_chain) {
            fasta += '\n> ' + this.ID + ':' + this.atoms[i].chain + ' | ' + this.title + '\n';
            current_chain = this.atoms[i].chainID;
            count = 0;
        }
        if (this.atoms[i].name==="CA" && this.atoms[i].chainID == current_chain) {
            fasta += this.atoms[i].struct[0];
            count++;
            if ( (count % 80) == 0) {
                fasta += '\n';
                count = 0;
            }
        }
    }
    return fasta;
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

