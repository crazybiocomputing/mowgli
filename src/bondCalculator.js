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

/*
 * Constructor
 *
 * @author: Jean-Christophe Taveau
 */
function BondCalculator(structure)  {

  var isDirty = true;
  var volume = {};
  var width  = 0;
  var height = 0;
  var depth  = 0;
  var cov_bonds = [];
  var h_bonds   = [];
  var ss_bonds  = [];


  function calcSubVolumes(mol) {
    var cube_side = 5.0 // 5 Angstroems
    width  = Math.round( (mol.bbox.max.x - mol.bbox.min.x) / cube_side);
    height = Math.round( (mol.bbox.max.y - mol.bbox.min.y) / cube_side);
    depth  = Math.round( (mol.bbox.max.z - mol.bbox.min.z) / cube_side);
                       
    for (var i in mol.atoms ) {
      var an_atom = mol.atoms[i];
      var cube = [];
      var x_cell = Math.floor( (an_atom.x - mol.bbox.min.x) / cube_side);
      var y_cell = Math.floor( (an_atom.y - mol.bbox.min.y) / cube_side);
      var z_cell = Math.floor( (an_atom.z - mol.bbox.min.z) / cube_side);
      var key = (x_cell + y_cell * width + z_cell * width * height);
      if (volume[key] == undefined) {
        // Create a new cube
        volume[key]={'key':key,'atoms':[]};
      }
      volume[key].atoms.push(an_atom);
    }
  }

  function calcAllBonds(mol) {
    console.log('calcAllBonds');
    for (var i in volume) {
      var cell = volume[i];
      for (var z = -1; z <= 1; z++) { 
        for (var y = -1; y <= 1; y++) {
          for (var x = -1; x <= 1; x++) {
            var key = volume[i].key + x+ y* width + z* width*height;
            if (volume[key] != undefined) {
              calcBonds(cell, volume[key]);
            }
          }
        }
      }
    }

    // open checkResult RasMol like !!
    console.log("covalent bonds .... " + cov_bonds.length);
    console.log("hydrogen bonds .... " + h_bonds.length);
    console.log("disulfide bonds ... " + ss_bonds.length);

    // close checkResult
    mol.bonds = cov_bonds;
    mol.hBonds = h_bonds;
    mol.ssBonds = ss_bonds;

/***
    for (var i in cov_bonds) {
      console.log('Bond['+cov_bonds[i].atom1.serial+';'+cov_bonds[i].atom2.serial+'] = '+'Bond['+cov_bonds[i].atom1.name+';'+cov_bonds[i].atom2.name+']');
    }
***/
  }

  function calcBonds(cell1, cell2 ) {
  for (var i in cell1.atoms) {
    var atom1 = cell1.atoms[i];
    for (var j in cell2.atoms) {
      var atom2 = cell2.atoms[j];
      if (atom1.serial < atom2.serial) {
        var flag = isBonded(atom1, atom2);
        switch (flag) {
        case Bond.COVALENT:
            var bond = new Bond(atom1, atom2);
            cov_bonds.push(bond);
          break;
        case Bond.HBOND:
            var bond = new Bond(atom1, atom2);
            h_bonds.push(bond);
          break;
        case Bond.SSBOND:
            var bond = new Bond(atom1, atom2);
            ss_bonds.push(bond);
          break;
        default:
          // Do nothing
        }
      } 
    } 
  }                 
}   
    
  function isBonded(at1, at2) {
  var minlength2 = 0.5 * 0.5;
  var maxlength2 = 1.9 * 1.9;
  var maxlength_sbond2 = 2.2 * 2.2;
  var maxlength_hbond2 = 3.5 * 3.5;
            
  var d2 = (at2.x - at1.x)*(at2.x - at1.x) + (at2.y - at1.y)*(at2.y - at1.y) + (at2.z - at1.z)*(at2.z - at1.z);

  if (at1.name === "SG" && at2.name === "SG" && d2 < maxlength_sbond2) {
    return Bond.SSBOND;
  }
  else if ( minlength2 < d2 && d2 < maxlength2) {
    return Bond.COVALENT;
  }
  else if ( (at1.name === "O" && at2.name === "N" && d2 < maxlength_hbond2 ) 
         || (at1.name === "N" && at2.name === "O" && d2 < maxlength_hbond2 )
         || (at1.name === "C" && at2.name === "O" && d2 < maxlength_hbond2 )
         || (at1.name === "O" && at2.name === "C" && d2 < maxlength_hbond2 ) ) {
    return Bond.HBOND;
  }
  else {
    return Bond.NONE;
  }
}

  // Main 
  calcSubVolumes(structure);
  calcAllBonds(structure);

}
   

 

