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
 * Atomic model
 * @class Molecule
 * @memberof module:structure
 * @constructor
 * @extends module:structure.Structure
 *
 * @author Jean-Christophe Taveau
 **/
function Molecule(other) {
    // super()
    Structure.call(this, other);

   /**
    * Molecule Classification
    *
    * @type {string}
    **/
    this.information.classification = other.classification || 'Unknown';

   /**
    * Atoms - Array of {@link module:mol.Atom}
    *
    * @see {@link module:mol.Atom}
    * @type {Array(Atom)}
    *
    * @property {Atom} atom
    * @property {string} atom.type - ATOM or HETATM
    * @property {number} atom.serial - ID of the atom in the file
    * @property {string} atom.name - Atom name according to the chemical nomenclature
    * @property {char} atom.altLoc - Alternate Location of the atom
    * @property {string} atom.group - Group name the atom belongs (three-chars code)
    * @property {string} atom.groupID  - Location of the group (residue or nucleotide) in the chain.
    * @property {char} atom.chain -Chain ID
    * @property {number} atom.x - X-coordinate
    * @property {number} atom.y - Y-coordinate
    * @property {number} atom.z - Z-coordinate
    * @property {string} atom.symbol - Chemical symbol
    *
    **/
    this.atoms = other.atoms || [];

  /**
   * Bonds
   *
   * @type {Array(Bond)}
   * @see {@link mol.Bond}
   *
   **/
    this.bonds=[];

   /**
    * RGB Colors
    *
    * @type {Array(RGBColor)}
    *
    **/
    this.colors = [];

   /**
    * Chains
    **/
    this.chains = other.chains || [];

}

Molecule.prototype = Object.create(Structure.prototype);

Molecule.RIGHT_HANDED_ALPHA = 1;
Molecule.RIGHT_HANDED_OMEGA = 2;
Molecule.RIGHT_HANDED_PI    = 3;
Molecule.RIGHT_HANDED_GAMMA = 4;
Molecule.RIGHT_HANDED_3_10  = 5;
Molecule.LEFT_HANDED_ALPHA  = 6;
Molecule.LEFT_HANDED_OMEGA  = 7;
Molecule.LEFT_HANDED_GAMMA  = 8;
Molecule.RIBBON_HELIX_2_7   = 9;
Molecule.POLYPROLINE        = 10;

/**
 * Three to One Letter Converter for amino-acids and nucleotides
 *
 * @type {string}
 *
 * @example
 * var aa   = Structure.threeToOne('GLN'); // returns 'Q' in uppercase
 * var nucl = Structure.threeToOne('DA'); // returns 'a' in lowercase
 *
 **/
Molecule.threeToOne = {
    'ALA' : 'A', // Alanine
    'ARG' : 'R', // Arginine
    'ASN' : 'N', // Asparagine
    'ASP' : 'D', // Aspartic_acid
    'CYS' : 'C', // Cysteine
    'GLU' : 'E', // Glutamic_acid
    'GLN' : 'Q', // Glutamine
    'GLY' : 'G', // Glycine
    'HIS' : 'H', // Histidine
    'ILE' : 'I', // Isoleucine
    'LEU' : 'L', // Leucine
    'LYS' : 'K', // Lysine
    'MET' : 'M', // Methionine
    'PHE' : 'F', // Phenylalanine
    'PRO' : 'P', // Proline
    'SER' : 'S', // Serine
    'THR' : 'T', // Threonine
    'TRP' : 'W', // Tryptophan
    'TYR' : 'Y', // Tyrosine
    'VAL' : 'V', // Valine
    'SEC' : 'U', // Selenocysteine
    'PYL' : 'O', // Pyrrolysine
    'ASX' : 'B', // Asparagine_or_aspartic_acid
    'GLX' : 'Z', // Glutamine_or_glutamic_acid
    'XLE' : 'J', // Leucine_or_Isoleucine
    'XAA' : 'X', // Unspecified_or_unknown_amino_acid
    'XXX' : 'X', // Unspecified_or_unknown_amino_acid
    'A'   : 'a', // Adenosine (nucleic)
    'T'   : 't', // Thymine (nucleic)
    'G'   : 'g', // Guanosine (nucleic)
    'C'   : 'c', // Guanosine (nucleic)
    'U'   : 'u', // Uracyl (nucleic)
    'DA'  : 'a', // Adenosine (nucleic)
    'DT'  : 't', // Thymine (nucleic)
    'DG'  : 'g', // Guanosine (nucleic)
    'DC'  : 'c'  // Guanosine (nucleic)
};


/**
 * Get first atom corresponding to the pattern  In MOWGLI, each atom has a label following the following syntax:
 * - &lt;PDBID&gt;.&lt;modelID&gt;.&lt;chainID&gt;[&lt;secStruct&gt;].&lt;groupName&gt;([&lt;groupSerial&gt;].&lt;atomName&gt;[&lt;atomSerial&gt;]
 * - __A*.*[1].CA__ corresponds to the alpha carbon belonging to the first residue of chain A of the PDB structure 1ZNI
 * - __.CA__ corresponds to the first alpha carbon found in this structure
 *
 * @param {string} pattern - A simplified regular expression
 *
 * @return {Atom}
 *
 * @example
 *
 * // Get the first atom carbon alpha (CA) found in chain B
 * var atom = mystructure.getAtomByLabel('B*.CA');
 *
 *
 **/
Molecule.prototype.getAtomByLabel = function(pattern) {
    var atom;
    // Escape characters
    var motif = pattern.replace(/([.\[\]])/g,'\\$1');
    motif = motif.replace(/\*/g,'.+');
    console.log(motif);
    var regexp = new RegExp(motif,'i');
    var i= 0;
    var match = false;
    while (!match && i < this.atoms.length) {
        match = regexp.test(this.atoms[i].label);
        if (match) {
            atom = this.atoms[i];
        }
        i++;
    }
    return atom;
};

/**
 * Filter the atoms or bonds in function of their properties
 *
 * @param {string} src - The type of objects (ATOM or BOND ) on which the filter is applied
 * @param {function} callback - A function for filtering
 *
 * @return {Array(Atom)}
 *
 * @example
 * // Extract CA atoms from mystructure
 * var selA = mystructure.finder(
 *     'ATOM',
 *     function (atom) {
 *         if ( atom.name === 'CA') {
 *              return true;
 *         }
 *     }
 * );
 *
 *
 **/
Molecule.prototype.finder = function (src,callback) {
    if (src === 'ATOM') {
        return this.atoms.filter(callback);
    }
    else {
        return this.bonds.filter(callback);
    }
};

/**
 * Filter the atoms in function of their properties
 *
 * @param {function} callback - A function for filtering
 *
 * @return {Array(Atom)}
 *
 * @example
 * // Extract CA atoms from mystructure
 * var selA = mystructure.atomFinder(
 *     function (atom) {
 *         if ( atom.name === 'CA') {
 *              return true;
 *         }
 *     }
 * );
 *
 *
 **/
Molecule.prototype.atomFinder = function (callback) {
    return this.atoms.filter(callback);
};

Molecule.prototype.bondFinder = function (callback) {
    return this.bonds.filter(callback);
};

/**
 * Return the primary sequence in FASTA format
 *
 * @return {string} The sequence in FASTA format
 *
 **/
Molecule.prototype.fasta = function () {
    var fasta = '> ' + this.ID + ':' + this.atoms[0].chain + ' | ' + this.information.title + '\n';
    var current_chain = this.atoms[0].chain;
    var count = 0;
    for (var i= 0; i < this.atoms.length; i++) {
        // console.log(this.atoms[i].chain+' '+current_chain);
        if (this.atoms[i].chain != current_chain && this.atoms[i].type=== 'ATOM') {
            fasta += '\n> ' + this.ID + ':' + this.atoms[i].chain + ' | ' + this.information.title + '\n';
            current_chain = this.atoms[i].chain;
            count = 0;
        }
        if ( (this.atoms[i].name==='CA' || this.atoms[i].name==='O4*'|| this.atoms[i].name==='O4\'') && this.atoms[i].chain == current_chain) {
            fasta += Molecule.threeToOne[this.atoms[i].group];
            count++;
            if ( (count % 80) == 0) {
                fasta += '\n';
                count = 0;
            }
        }
    }
    return fasta;
};

/**
 * Return the secondary structures in FASTA format -- if available.
 *
 * @return {string} The secondary structures of sequence in FASTA format
 *
 **/
Molecule.prototype.secondary = function () {
    var fasta = '> ' + this.ID + ':' + this.atoms[0].chain + ' | ' + this.title + '\n';
    var current_chain = this.atoms[0].chainID;
    var count = 0;
    for (var i= 0; i < this.atoms.length; i++) {
        if (this.atoms[i].chainID != current_chain) {
            fasta += '\n> ' + this.ID + ':' + this.atoms[i].chain + ' | ' + this.title + '\n';
            current_chain = this.atoms[i].chainID;
            count = 0;
        }
        if (this.atoms[i].name==='CA' && this.atoms[i].chainID == current_chain) {
            fasta += this.atoms[i].struct[0];
            count++;
            if ( (count % 80) == 0) {
                fasta += '\n';
                count = 0;
            }
        }
    }
};


/**
 * Compute the phi and psi dihedral angles of this structure.
 * The angles are stored in the CA atom of each group.
 *
 * @example
 * // Compute phi and psi dihedral angles from mystructure
 * mystructure.calcPhiPsi();
 * console.log(mystructure.getAtomByLabel('[10].CA').phi);  //
 *
 **/
Molecule.prototype.calcPhiPsi = function () {
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
            var angles = calcPhiPsi(points);
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

    // Private
    function calcPhiPsi(points)
    {
        var psi=calcDihedralAngle(points[0],points[1],points[2],points[3]); // [0,1,2,3]);
        var phi=calcDihedralAngle(points[2],points[3],points[4],points[5]); // [2,3,4,5]);
        return [phi, psi];
    }

    // Private
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
};

Molecule.prototype.calcBonds = function () {
    var bondCalc = new BondCalculator(this);
};

Molecule.prototype.toString = function () {
    var quote='';
    var out='{\n';

    for (var i in this.atoms)
    {
        out+='{';
        out+='type: \''  + this.atoms[i].type + '\', ' +
         'serial: ' + this.atoms[i].serial + ', ' +
         'name: \''  + this.atoms[i].name + '\', ' +
         'struct:\'' + this.atoms[i].struct + '\', ' +
         'x :'    + this.atoms[i].x + ', ' +
         'y :'    + this.atoms[i].y + ', ' +
         'z :'    + this.atoms[i].z + ', ' +
         'symbol:\'' + this.atoms[i].symbol + '\'},\n ';
    }
    out+= 'center: {' + this.cg.x + ',y: '+ this.cg.y + ',z: '+ this.cg.z + '} } ';
    out+=('}\n');
    return out;
};
