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

'use strict';


 /**
 * Load various samples for testing:
 * - from PDB: 1ZNI, 1HHO, and 3CRO (here in pre-loaded JSON files)
 * - from EMDB
 * - from ImageJ: [lena-std.tif](http://imagej.nih.gov/ij/images/lena-std.tif) and [T1-Head](t1-head.zip)
 *
 * @class ShapeSettings
 * @memberof module:mwGUI
 * @param {number} the_id - DOM element ID
 *
 * @author Jean-Christophe Taveau
 **/

/**
 * @function handleEvent
 * @memberof module:mwGUI.ShapeSettings
 * @desc Handle click events
 * @param {object} event - The DOM event
 *
 * @author Jean-Christophe Taveau
 **/


(function(exports) {

    function ShapeSettingsGUI(the_id) {
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
            switch(event.type) {
            case 'click':
                var displayMode = event.target.parentNode;
                var displayMenu = displayMode.parentNode.parentNode.id;
                console.log(displayMenu + '->' + displayMode.id);
                if (displayMenu === 'atoms') {
                    MOWGLI.settings.displayAtoms = displayMode.id;
                }
                else if (displayMenu === 'maps') {
                    MOWGLI.settings.displayMaps = displayMode.id;
                }
                else if (displayMenu === 'colors') {
                    MOWGLI.settings.displayColors = displayMode.id;
                }
                // Update Graphics stuff
                console.log('Update MOWGLI');
                console.log(MOWGLI.settings);
                MOWGLI.update();
                break;
            }
        }

        // Note that the listeners in this case are this, not this.handleEvent
        this.element.addEventListener('click', this, false);
    }

    exports.ShapeSettings = ShapeSettingsGUI;

})(this.mwGUI = this.mwGUI || {} );
