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
 * Constructor
 * @class Modal
 * @memberof module:mwGUI
 * @constructor
 *
 * @author Jean-Christophe Taveau
 **/
 function Modal(options) {
    // Header
    var header = document.querySelector(".mwModal .modal-header");
    header.style.backgroundImage = options.headerImage || 'url("images/default-background.jpg")';
    document.querySelector(".mwModal .modal-header h2").innerHTML = options.headerTitle || 'Modal window';
    
    // Body
    var body = document.querySelector(".mwModal .modal-body");
    body.innerHTML= options.body || '<p>No information</p>';
    body.style.fontSize = options.fontSize || "1.1em";
    body.style.fontFamily = options.fontFamily || "Lato";
    
    // Display modal
    document.querySelector('.mwModal #modal-one').checked = true;

}
