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
 * @module mol
 **/


/**
 * Factory of various readers of atomic models: pdb, cif, xyz
 *
 * @class StructureReader
 * @constructor
 */
var StructureReader = function () {

}

StructureReader.prototype.getFromDOM = function(document_id,format) {
  var text = document.getElementById(document_id).innerHTML;
  var mol = this.createStructure(text,format);
  return mol;
}

StructureReader.prototype.getFromURL = function(url,callback) {
  var extension = url.split('.').pop().toLowerCase();
  console.log(extension);

  if (window.XMLHttpRequest)
  {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    var req = new XMLHttpRequest();
    // We need a asynchronous request (3rd argument true) - Wait until completion
    req.open('GET', url, true);
    var cFunc = this.createStructure;
    req.onreadystatechange = function (aEvt) {
        if (req.readyState == 4) {
            if(req.status == 200) {
                var mol = cFunc(req.responseText,extension);
                callback(mol);
            }
            else {
                console.log("ERROR:: Can't download PDB file."+aEvt.description+"\n");
            }
        }
    };
    req.send(null);
  }
  else {
    alert('Please update your browser');
  }

}

StructureReader.prototype.getFromID = function(pdb_id,callback) {
  return this.getFromURL("http://www.rcsb.org/pdb/files/"+pdb_id+".pdb",callback);

}

StructureReader.prototype.createStructure = function(text,format) {

  // 1- Choose the good parser
  var parser = null;

  if (format === 'pdb') {
    parser = new PDBParser();
  }
  else if (format === 'cif') {
    parser = new MMCIFParser();
  }
  else if (format === 'xml') {
    parser = new PDBMLParser();
  }
  else if (format === 'xyz') {
    parser = new XYZParser();
  }
  else {
  // Unknown format
  }

    // 2- Parse the file
    parser.parse(text);
    var mol = parser.getStructure();

    // 3- Compute Bonds
    computeBonds(mol);

    return mol;

    // Private
    function computeBonds (a_mol) {
        // TODO
    }
}
