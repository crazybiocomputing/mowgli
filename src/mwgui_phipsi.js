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
 * 
 * @module mwGUI
 **/
 
 /**
 * Constructor
 * @class About
 * @memberof module:mwGUI
 * @param {number} the_id - DOM element ID
 *
 * @author Jean-Christophe Taveau
 **/
 
/**
 * @function handleEvent
 * @memberof module:mwGUI.Phipsi
 * @desc Handle various event types
 * @param event - The DOM event
 *
 * @author Jean-Christophe Taveau
 **/


(function(exports) {

    function PhipsiGUI(the_id) {
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
            console.log(selection);
            var Phipsi_content=function(array){
            var str='Chain'+'\t'+'Group'+'\t'+'GroupID'+'\t'+'Phi'+'\t'+'Psi'+'\n';
            for (var i=1; i < selection.length; i++) {
                str+=(selection[i].chain[0]+'\t'+selection[i].group[0]+'\t'+(selection[i].phi[0]=='X' ?'.' : selection[i].phi[0])+'\t'+(selection[i].psi[0]=='X') ?'.' : selection[i].psi[0]+"\n")
                    }
                return str                        
                }
                var content=Phipsi_content(selection);
                console.log(content);
                // Display modal window
                var popup = new Modal({
                    headerTitle : "Phi/Psi...",
                    headerImage : "url('images/headprot.jpg')",
                    body  : "Sorry it's empty"
                            
                        
                });
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

    exports.Phipsi = PhipsiGUI;
    
    
})(this.mwGUI = this.mwGUI || {} );



