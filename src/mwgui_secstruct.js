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
 * @class SecStruct
 * @memberof module:mwGUI
 * @param {number} the_id - DOM element ID
 *
 * @author Jean-Christophe Taveau
 **/
 
/**
 * @function handleEvent
 * @memberof module:mwGUI.Secstruct
 * @desc Handle various event types
 * @param event - The DOM event
 *
 * @author Jean-Christophe Taveau
 **/


(function(exports) {

    function SecStructGUI(the_id) {
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
            if( MOWGLI.structure.isMolecule() ) {
                 MOWGLI.structure.secondary();
                var selection=MOWGLI.structure.finder(
                    'ATOM', 
                    function (atom) {
                        if ( atom.name === 'CA') {
                            return true;
                         } 
                    }
                );
                console.log(selection);
                 var Secondary_content=function(array){
                     var str='<table id="tabsec">'
                      str+='<tr><th>Chain</th><th>Group</th><th>GroupID</th><th>Phi</th><th>Psi</th></tr>'
                    for (var i=0; i < selection.length; i++) {
                        str+='<tr><td>'+selection[i].chain+'</td>'+'<td>'+selection[i].group+'</td>'+'<td>'+selection[i].groupID+'</td>'+'<td>'+selection[i].secondary+'</td>'+'</tr>'
                        }
                    str+='</table>'
                    str=str.replace(/undefined/g,"-");
                    return str                        
                }
                var content=Secondary_content(selection);
                
                // Display modal window
                var popup = new Modal({
                    headerTitle : "Secondary structure...",
                    headerImage : "url('images/headprot.jpg')",
                    body  : content
                            
                        
                });
                }
                
                else {
                    MOWGLI.alert("No Secondary Structure are available for this structure");
                }
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

    exports.SecStruct = SecStructGUI;
    
    
})(this.mwGUI = this.mwGUI || {} );



