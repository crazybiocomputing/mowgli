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


window.onload = function() {

    // 1- File
    // 1-1 Open...PDB
    //var openPDB = mwGUI.Opener("pdb");
    // 1-2 Open...EMDB
    //var openEMDB = mwGUI.Opener("emdb");
    // 1-3 Open...Samples
    var sample_1ZNI = new mwGUI.Sample("1zni");
    var sample_3CRO = new mwGUI.Sample("3cro");

    // 2-3-1 Structure...Sequence...FASTA
    // 2-3-2 Structure...Sequence...Sec.Structures
    // 2-3-3 Structure...Sequence...Ramachandran
    
    // 7- Help
    // About modal window
    console.log('Add event click on About...');
    var about = new mwGUI.About("about");
}
