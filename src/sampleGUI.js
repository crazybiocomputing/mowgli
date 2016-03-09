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
 * @class SampleGUI
 * @memberof module:gui
 * @constructor
 *
 * @author Jean-Christophe Taveau
 **/
function SampleGUI(the_id) {
    /**
     * DOM element ID
     *
     **/
    this.element = document.getElementById(the_id);
    
    /**
     * Handle various event types
     * @param event - The DOM event
    **/
    this.handleEvent = function(event) {
        console.log(the_id); // 'Something Good', as this is the Something object
        switch(event.type) {
        case 'click':
            // Load JSON file
            console.log('Load JSON...');
            var xhr = new XMLHttpRequest();
            // We need a asynchronous request (3rd argument true) - Wait until completion
            xhr.open('GET', "samples/1ZNI.json", true);
            xhr.responseType = 'json';
            xhr.onreadystatechange = function (aEvt) {
                if (xhr.readyState == 4) {
                    if(xhr.status == 200) {
                        MOWGLI.molecule = xhr.response; // JSON.parse(xhr.responseText);
                        console.log(MOWGLI.molecule);
                    }
                    else {
                        console.log("ERROR:: Can't download PDB file."+aEvt.description+"\n");
                    }
                }
            };
            xhr.send(null);
            break;
        case 'dblclick':
            // some code here...
            break;
        }
    };

    // Note that the listeners in this case are this, not this.handleEvent
    this.element.addEventListener('click', this, false);
    this.element.addEventListener('dblclick', this, false);

    // You can properly remove the listeners
    // this.element.removeEventListener('click', this, false);
    // this.element.removeEventListener('dblclick', this, false);


}
