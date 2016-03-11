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
 *
 * @module parser
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
function PDBParser() {
  this.mol = new Molecule({});
  this.secondary = [];
  this.cubes = [];
  this.cube_side = 5.0; // 5 angstroems
}


PDBParser.TAGS = {
  'ANISOU': 0,
  'ATOM'  : 1,
  'AUTHOR': 2,
  'CAVEAT': 3,
  'CISPEP': 4,
  'COMPND': 5,
  'CONECT': 6,
  'CRYST1': 7,
  'DBREF1': 8,
  'DBREF2': 9,
  'DBREF' : 10,
  'END'   : 11,
  'ENDMDL': 12,
  'EXPDTA': 13,
  'FORMUL': 14,
  'HEADER': 15,
  'HELIX' : 16,
  'HET'   : 17,
  'HETATM': 18,
  'HETNAM': 19,
  'HETSYN': 20,
  'JRNL'  : 21,
  'KEYWDS': 22,
  'LINK'  : 23,
  'MASTER': 24,
  'MDLTYP': 25,
  'MODEL' : 26,
  'MODRES': 27,
  'MTRIX1': 28,
  'MTRIX2': 29,
  'MTRIX3': 30,
  'NUMMDL': 31,
  'OBSLTE': 32,
  'ORIGX1': 33,
  'ORIGX2': 34,
  'ORIGX3': 35,
  'REMARK': 36,
  'REVDAT': 37,
  'SCALE1': 38,
  'SCALE2': 39,
  'SCALE3': 40,
  'SEQADV': 41,
  'SEQRES': 42,
  'SHEET' : 43,
  'SITE'  : 44,
  'SOURCE': 45,
  'SPLT'  : 46,
  'SPRSDE': 47,
  'SSBOND': 48,
  'TER'   : 49,
  'TITLE' : 50
}

/**
 * Return the PDB structure
 *
 * @return {Structure} - The 3D structure of the molecule
 **/
PDBParser.prototype.getStructure = function () {
  return this.mol;
}

/**
 * Trigger the parsing of the PDB file
 *
 * @params {string} text - Text containing the PDB structure
 **/
PDBParser.prototype.parse = function (text) {
  // 1- Split the text in an array of rows
  var rows = text.split('\n');

  // 2- Main loop
  for (var i=0;i<rows.length;i++) {
    if (rows[i].length > 2) {
      var tag = PDBParser.TAGS[rows[i].substring(0,6).trim()];
      // console.log(rows[i].substring(0,6).trim()+' '+tag);
      switch (tag) {
      case PDBParser.TAGS.ATOM: 
      case PDBParser.TAGS.HETATM:
        this.parseAtom(rows[i]);
        break;
      case PDBParser.TAGS.END:
        this.postProcess();
        break;
      case PDBParser.TAGS.HEADER:
        this.parseHeader(rows[i]);
        break;
      case PDBParser.TAGS.HELIX:
        this.parseHelix(rows[i]);
        break;
      case PDBParser.TAGS.SHEET:
        console.log("parse sheet");
        this.parseSheet(rows[i]);
        break;
      case PDBParser.TAGS.TITLE:
        this.parseTitle(rows[i]);
        break;
      default:
        // console.log('unimplemented tag = [' + rows[i].substring(0,6).trim()+']');
        // Do nothing
      }
    }
  }

  //  3- Finalization
  this.mol.centroid.x/=this.mol.atoms.length;
  this.mol.centroid.y/=this.mol.atoms.length;
  this.mol.centroid.z/=this.mol.atoms.length;
  mat4.translate(this.mol.matrix,this.mol.matrix, [-this.mol.centroid.x, -this.mol.centroid.y, -this.mol.centroid.z]);
  this.mol.bbox.center.x = (this.mol.bbox.min.x+this.mol.bbox.max.x)/2.0;
  this.mol.bbox.center.y = (this.mol.bbox.min.y+this.mol.bbox.max.y)/2.0;
  this.mol.bbox.center.z = (this.mol.bbox.min.z+this.mol.bbox.max.z)/2.0;
  this.mol.bbox.radius   = 
    (this.mol.bbox.min.x-this.mol.bbox.max.x)*(this.mol.bbox.min.x-this.mol.bbox.max.x)+
    (this.mol.bbox.min.y-this.mol.bbox.max.y)*(this.mol.bbox.min.y-this.mol.bbox.max.y)+
    (this.mol.bbox.min.z-this.mol.bbox.max.z)*(this.mol.bbox.min.z-this.mol.bbox.max.z);
  this.mol.bbox.radius   = Math.sqrt(this.mol.bbox.radius)/2.0;

  console.log('centroid '+this.mol.centroid.x+' '+this.mol.centroid.y+' '+this.mol.centroid.z);
  console.log(this.mol.atoms.length+' '+this.mol.bbox.radius+' '+this.mol.bbox.center.x+' '+this.mol.bbox.center.y+' '+this.mol.bbox.center.z);
}


/**
 *
 * @summary Parse HEADER row - Private method
 *
 * @description
 * 
 * |COLUMNS  |    DATA  TYPE   |  FIELD           |  DEFINITION
 * |---------|-----------------|------------------|---------------------------------------
 * |01 - 06  |    Record name  |  "HEADER"        |  |
 * |11 - 50  |    String(40)   |  classification  |  Classifies the molecule(s).
 * |51 - 59  |    Date         |  depDate         |  Deposition date. This is the date the coordinates were received at the PDB.
 * |63 - 66  |    IDcode       |  idCode          |  This identifier is unique within the PDB.
 * 
 **/
PDBParser.prototype.parseHeader = function (row) {
  this.mol.classification = row.substring(10,50).trim();
  this.mol.date           = row.substring(50,59).trim();
  this.mol.ID             = row.substring(62,66).trim();
}


/**
 *
 * @summary Parse ATOM and HETATM row - Private method
 *
 * @description
 * 
 * 
 * |COLUMNS   |    DATA  TYPE   | FIELD      |  DEFINITION
 * |----------|------------------------------|--------------------------------------------
 * |01 - 06   |    Record name  | "ATOM  "   |  |
 * |07 - 11   |    Integer      | serial     |  Atom  serial number.
 * |13 - 16   |    Atom         | name       |  Atom name.
 * |17        |    Character    | altLoc     |  Alternate location indicator.
 * |18 - 20   |    Residue name | resName    |  Residue name.
 * |22        |    Character    | chainID    |  Chain identifier.
 * |23 - 26   |    Integer      | resSeq     |  Residue sequence number.
 * |27        |    AChar        | iCode      |  Code for insertion of residues.
 * |31 - 38   |    Real(8.3)    | x          |  Orthogonal coordinates for X in Angstroms.
 * |39 - 46   |    Real(8.3)    | y          |  Orthogonal coordinates for Y in Angstroms.
 * |47 - 54   |    Real(8.3)    | z          |  Orthogonal coordinates for Z in Angstroms.
 * |55 - 60   |    Real(6.2)    | occupancy  |  Occupancy.
 * |61 - 66   |    Real(6.2)    | tempFactor |  Temperature  factor.
 * |77 - 78   |    LString(2)   | element    |  Element symbol, right-justified.
 * |79 - 80   |    LString(2)   | charge     |  Charge  on the atom.
 * 
 **/

PDBParser.prototype.parseAtom = function (line) {
  var atom = {};
  atom.type = line.substring(0,6).trim();
  atom.serial = parseInt(line.substring(6,11));
  atom.name = line.substring(12,16).trim();
  atom.altLoc = line[16];
  atom.group = line.substring(17,20).trim();
  atom.chain = line[21];
  atom.groupID = parseInt(line.substring(22,26));
  atom.x = parseFloat(line.substring(30,38));
  atom.y = parseFloat(line.substring(38,46));
  atom.z = parseFloat(line.substring(46,54));
  atom.symbol = line.substring(76,78).trim();
  // If exists, set the secondary structure (previously parse in HELIX and SHEET)
  atom.secondary = 'X';
  var i = 0;
  while (i < this.secondary.length) {
    if (this.secondary[i].initChain === atom.chain && atom.groupID >= this.secondary[i].init && atom.groupID <= this.secondary[i].end ) {
      atom.secondary = this.secondary[i].label;
      // Stop
      i = this.secondary.length;
    }
    i++;
  }
//  if (atom.groupID===24 && atom.chain==="B") console.log(atom.secondary);

  this.mol.atoms.push(atom);

  // Update chain
  if (this.mol.chains.indexOf(atom.chain) == -1) {
    this.mol.chains.push(atom.chain);
  }
  // Update centroid and bounding box of the structure
  this.mol.centroid.x += atom.x;
  this.mol.centroid.y += atom.y;
  this.mol.centroid.z += atom.z;
  this.updateBBox(atom);

}


/**
 *
 * @summary Parse HELIX rows - Private method
 *
 * @description
 * 
 * 
 * |COLUMNS   |    DATA  TYPE   | FIELD          |  DEFINITION
 * |----------|-----------------|----------------|--------------------------------------------
 * |01 - 06   |    Record name  |    "HELIX      |  | 
 * |08 - 10   |   Integer       |    serNum      | Serial number of the helix. This starts at 1 and increases incrementally.
 * |12 - 14   |    LString(3)   |    helixID     | Helix identifier.
 * |16 - 18   |    Residue name |    initResName | Name of the initial residue.
 * |20        |    Character    |    initChainID | Chain identifier for the chain containing this helix.
 * |22 - 25   |    Integer      |    initSeqNum  | Sequence number of the initial residue.
 * |26        |    AChar        |    initICode   | Insertion code of the initial residue.
 * |28 - 30   |    Residue name |    endResName  | Name of the terminal residue of the helix.
 * |32        |    Character    |    endChainID  | Chain identifier for the chain containing this helix.
 * |34 - 37   |    Integer      |    endSeqNum   | Sequence number of the terminal residue.
 * |38        |    AChar        |    endICode    | Insertion code of the terminal residue.
 * |39 - 40   |    Integer      |    helixClass  | Helix class (see below).
 * |41 - 70   |    String       |    comment     | Comment about this helix.
 * |72 - 76   |    Integer      |    length      | Length of this helix.
 **/
PDBParser.prototype.parseHelix = function(row) {
  this.secondary.push( {
    'type'      : 'H',
    'serial'    : parseInt(row.substring(7,10) ), 
    'ID'        : row.substring(11,14).trim(),
    'strand'    : '', 
    'initChain' : row[19], 
    'init'      : parseInt(row.substring(21,25) ), 
    'endChain'  : row[31], 
    'end'       : parseInt(row.substring(33,37) ), 
    'class'     : Structure.RIGHT_HANDED_ALPHA || parseInt(row.substring(38,40)),
    'label'     : 'H('+row.substring(11,14).trim()+';'+parseInt(row.substring(7,10) )+')'
   });
/****
   console.log('HELIX:'+ 'H{' + this.secondary[this.secondary.length-1].ID +'}'+ 
     ' first:' + this.secondary[this.secondary.length-1].init + this.secondary[this.secondary.length-1].initChain + 
     ' last:'+ this.secondary[this.secondary.length-1].end + this.secondary[this.secondary.length-1].endChain);
*****/
}


/**
 *
 * @summary Parse SHEET rows - Private method - TODO
 *
 * @description
 *
 * |COLUMNS   |    DATA  TYPE    | FIELD          |  DEFINITION
 * |----------|------------------|----------------|--------------------------------------------
 * |01 - 06   |     Record name  | "SHEET "       |    |
 * |08 - 10   |     Integer      | strand         | Strand number which starts at 1 for each strand within a sheet and increases by one.
 * |12 - 14   |     LString(3)   | sheetID        | Sheet identifier.
 * |15 - 16   |     Integer      | numStrands     | Number of strands in sheet.
 * |18 - 20   |     Residue name | initResName    | Residue  name of initial residue.
 * |22        |     Character    | initChainID    | Chain identifier of initial residue in strand. 
 * |23 - 26   |     Integer      | initSeqNum     | Sequence number of initial residue in strand.
 * |27        |     AChar        | initICode      | Insertion code of initial residue in  strand.
 * |29 - 31   |     Residue name | endResName     | Residue name of terminal residue.
 * |33        |     Character    | endChainID     | Chain identifier of terminal residue.
 * |34 - 37   |     Integer      | endSeqNum      | Sequence number of terminal residue.
 * |38        |     AChar        | endICode       | Insertion code of terminal residue.
 * |39 - 40   |     Integer      | sense          | Sense of strand. 0 if first strand, 1 if parallel,and -1 if anti-parallel.
 * |42 - 45   |     Atom         | curAtom        | Registration.  Atom name in current strand.
 * |46 - 48   |     Residue name | curResName     | Registration.  Residue name in current strand
 * |50        |     Character    | curChainId     | Registration. Chain identifier in current strand.
 * |51 - 54   |     Integer      | curResSeq      | Registration.  Residue sequence number in current strand.
 * |55        |     AChar        | curICode       | Registration. Insertion code in current strand.
 * |57 - 60   |     Atom         | prevAtom       | Registration.  Atom name in previous strand.
 * |61 - 63   |     Residue name | prevResName    | Registration.  Residue name in previous strand.
 * |65        |     Character    | prevChainId    | Registration.  Chain identifier in previous  strand.
 * |66 - 69   |     Integer      | prevResSeq     | Registration. Residue sequence number in previous strand.
 * |70        |     AChar        | prevICode      | Registration.  Insertion code in previous strand.
 **/
PDBParser.prototype.parseSheet = function (row) {

  this.secondary.push( {
    'type'      : 'E',
    'serial'    : 'x',
    'ID'        : row.substring(11,14).trim(),
    'strand'    : parseInt(row.substring(7,10)),
    'initChain' : row[21], 
    'init'      : parseInt(row.substring(22,26) ), 
    'endChain'  : row[32], 
    'end'       : parseInt(row.substring(33,37) ),
    'sense'     : parseInt(row.substring(38,40) ), 
    'label'     : 'E'+parseInt(row.substring(7,10))+'('+row.substring(11,14).trim()+';'+parseInt(row.substring(38,40) )+')'
  });
    console.log(this.secondary[this.secondary.length - 1]);
}

/**
 *
 * @summary Parse TITLE rows - Private method - TODO
 *
 * @description
 *
 * |COLUMNS   |    DATA  TYPE   | FIELD          |  DEFINITION
 * |----------|-----------------|----------------|--------------------------------------------
 * |01 -  6   |    Record name  |  "TITLE "      |  |
 * |09 - 10   |    Continuation |  continuation  | Allows concatenation of multiple records.
 * |11 - 80   |    String       |  title         | Title of the  experiment.
 *
 **/
PDBParser.prototype.parseTitle = function (row) 
{
  if (parseInt(row.substring(8,10).trim()) == 1) {
    this.mol.title = row.substring(10,80).trim();
  }
  else {
    this.mol.title = ' ' + row.substring(10,80).trim();
  }
}

PDBParser.prototype.updateBBox = function (a) {
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

PDBParser.prototype.postProcess = function () {
  console.log('PostProcess');
  // Now, don't know what to do.
  // Check data ?
}


