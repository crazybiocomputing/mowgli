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

/*
 * Constructor
 */
var StructureReader = function () {

}

StructureReader.prototype.getFromDOM = function(document_id,format) {
  var text = document.getElementById(document_id).innerHTML;  
  var mol = this.createStructure(text,format);
  return mol;
}

StructureReader.prototype.getFromURL = function(url) {
  var extension = url.substr(url.length-3,url.length-1);
  console.log(extension);
  
  if (window.XMLHttpRequest)
  {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    request=new XMLHttpRequest();
  }
  else
    alert('Please update your browser');
  try {
    request.open("GET",url,false);
    request.send();
  } catch (e) {
    alert(e.description);
  }
  
  var mol = this.createStructure(request.responseText,extension);
  return mol;
}

StructureReader.prototype.getFromID = function(pdb_id) {
  return this.getFromURL("http://www.rcsb.org/pdb/files/"+pdb_id+".pdb");

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
  this.computeBonds(mol); 

  return mol;
}

StructureReader.prototype.computeBonds = function(a_mol) {
  // TODO
}

