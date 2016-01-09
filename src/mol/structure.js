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
}


/**
 * Compute the phi and psi dihedral angles of this structure.
 * The angles are stored in the CA atom of each group.
 *
 *
 **/
Structure.prototype.calcPhiPsi = function () {
      var ca      = 0;
      var ca_next = 0;
      var points  = [];
      var names   = { 'N': 0, 'CA': 1, 'C': 2};
      var count   = 0;
      var gp      = 0; // current group index
      var ch      = ' '; // Current chain ID
      var oldPhi  = undefined;

    // Assume that the atoms are sorted by ascending index
    for (var i in this.atoms) {
    
        // New chain
        if (this.atoms[i].chain != ch) {
            if (ch != ' ') {
                // Last point of the current chain
                this.atoms[ca].phi = oldPhi;
                this.atoms[ca].psi = undefined;
            }
            // Reset variables
            oldPhi  = undefined;
            gp = this.atoms[i].groupID;
            ch = this.atoms[i].chain;
            count = 0;
        }
        
        // sort N, CA, C, N', CA', C' of the same chain
        if (this.atoms[i].chain == ch 
        &&  this.atoms[i].groupID >= gp 
        &&  this.atoms[i].groupID <= gp+1 
        && (this.atoms[i].name === 'N' || this.atoms[i].name === 'CA' || this.atoms[i].name === 'C' ) ) {
            var ii = (this.atoms[i].groupID - gp ) * 3 + names[this.atoms[i].name];
            if (ii == 1) {
                ca = i;
            }
            else if (ii == 4) {
                ca_next = i;
            }
            points[ii] = this.atoms[i];
            count++;
        }
        else if (count == 6){
            var angles=calcPhiPsi(points);
            this.atoms[ca].phi = oldPhi;
            this.atoms[ca].psi = angles[1];

            // Update variables for next group
            oldPhi=angles[0];
            gp=points[count-1].groupID;
            ca = ca_next;
            points[0]=points[3];
            points[1]=points[4];
            points[2]=points[5];
            count=3;
        }
    }
    // Last point of this chain
    this.atoms[ca].phi = oldPhi;
    this.atoms[ca].psi = undefined;

    
    function calcPhiPsi(points)
    {
      var psi=calcDihedralAngle(points[0],points[1],points[2],points[3]); // [0,1,2,3]);
      var phi=calcDihedralAngle(points[2],points[3],points[4],points[5]); // [2,3,4,5]);
      return [phi, psi];
    }


    function calcDihedralAngle(point0,point1,point2,point3) {
      // UA = (A2−A1) × (A3−A1) is orthogonal to plane A and UB = (B2−B1) × (B3−B1)  

      var v1 = vec3.fromValues(point1.x-point0.x,point1.y-point0.y, point1.z-point0.z); 
      var v2 = vec3.fromValues(point2.x-point1.x,point2.y-point1.y, point2.z-point1.z); 
      var v3 = vec3.fromValues(point3.x-point2.x,point3.y-point2.y, point3.z-point2.z); 
      var na=vec3.create();
      var nb=vec3.create();
      vec3.cross(na,v1,v2);
      vec3.cross(nb,v2,v3);
      var sinAngle=vec3.dot(v1,nb) * vec3.length(v2);
      var cosAngle=vec3.dot(na,nb);
      return Math.atan2(sinAngle,cosAngle)/Math.PI*180.0;
    }
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

