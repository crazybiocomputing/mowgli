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
 * @class Modal
 * @memberof module:gui
 * @constructor
 *
 * @author Jean-Christophe Taveau
 **/
 function Modal(options) {
    var element = document.getElementById('modal');
    var html =  '<div class="container"><header id="modalhead">';
    html += '<a href="#close" title="Close modal window" class="droite">&#10060;</a>';
    html += options.headerTitle || 'Modal window';
    html += '</header>';
    html += '<article>';
    html += options.body || 'No information';
    html += '</section>';
    html += '<footer class="cf">';
    html += '<a href="#close" class="btn droite" title="Close modal window">Close</a>';
    html += '</footer></div>';

    element.innerHTML = html;
    
    var header = element.children[0].children[0];  // aka document.getElementById("modalhead");
    console.log(header);
    header.style.backgroundImage = options.headerImage || 'url("images/default-background.jpg")';

    // Display modal
    element.classList.toggle("oModal_target");

}
