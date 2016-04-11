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
    var sample_Toric = new mwGUI.Sample("toricSolenoid.png");
    // 1-4 Export
    var export_menuitem = new mwGUI.SaveAs("export");

    // 2- Structure
    // 2-3- Structure...Sequence
    // 2-3-1 Structure...Sequence...FASTA
    var sequence_fasta = new mwGUI.Fasta("fasta");

    // 2-3-2 Structure...Sequence...Sec.Structures
    var second_struct = new mwGUI.SecStruct("secstruct");

    // 2-3-3 Structure...Sequence...Phipsi
    var phipsi = new mwGUI.Phipsi("phipsi");
    // 2-3-4 Structure...Sequence...Ramachandran

    // 3- Display

    // 4- Colors

    // 5- Settings
    // 5-1 FullScreen
    var fullscreen = new mwGUI.FullScreen("fullscreen");

    // 5-2 Camera
    var camera_settings = new mwGUI.Camera("camera");

    // 6- Tools

    // 7- Help
    // About modal window
    console.log('Add event click on About...');
    var about = new mwGUI.About("about");
}
