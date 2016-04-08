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
 * @class Camera
 * @memberof module:mwGUI
 * @param {number} the_id - DOM element ID
 *
 * @author Jean-Christophe Taveau
 **/

/**
 * @function handleEvent
 * @memberof module:mwGUI.Camera
 * @desc Handle various event types
 * @param event - The DOM event
 *
 * @author Jean-Christophe Taveau
 **/


(function(exports) {

    function Camera(the_id) {
        /**
         * DOM element ID
         *
         **/
        this.element = document.getElementById(the_id);
        this.checkbox = new CheckBox(the_id);

        /**
         * Handle various event types
         * @param event - The DOM event
        **/
        this.handleEvent = function(event) {
            switch(event.type) {
            case 'click':
                var value = event.target.dataset.value;
                if (value === 'cam_anaglyph') {
                    console.log('cam_anaglyph');
                }
                else if  (value === 'cam_cross') {
                    console.log('cam_cross');
                }
                else if  (value === 'cam_mono') {
                    // Default settings
                    console.log('cam_mono');
                }
                else {
                    console.log('cam_stereo');
                }

                // Update checkbox display
                this.checkbox.update(event.target.parentNode,value);
                break;
            }
        };

        // Note that the listeners in this case are this, not this.handleEvent
        this.element.addEventListener('click', this, false);


    }

    exports.Camera = Camera;


})(this.mwGUI = this.mwGUI || {} );
