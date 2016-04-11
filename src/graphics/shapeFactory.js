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

var ShapeFactory = (function () {

    // Storage for our various styles types
    var styles = {};
    var shape = new Shape();
    return {
        /**
         * Get shape
         *
         * @example
         * var shape = ShapeFactory.get({'molecule': myStruct, 'displayType': 'wireframe', 'color': 'cpk'});
         */
        get: function ( options ) {
            switch (options.displayType) {
            case 'points':
                // Already computed for the given structure?
                // var style = types['atoms'] ????
                // if (style === undefined) then
                // Basic shape - only for debug
                var style = new PointGeometer(options.molecule,ColorFactory.get(options.color) );
                return style.getShape();
                break;
            case 'backbone':
                // TODO
                break;
            case 'ball_sticks':
                // TODO
                break;
            case 'cartoon':
                // TODO
                break;
            case 'dots':
                // TODO
                break;
            case 'spacefill':
                // TODO
                break;
            case 'ribbons':
                // TODO
                break;
            case 'sticks':
                // TODO
                break;
            case 'strands':
                // TODO
                break;
            case 'trace':
                // TODO
                break;
            case 'wireframe':
                // TODO
                style = new WireGeometer(options.molecule,ColorFactory.get(options.color) );
                return style.getShape();
            default:
                // Do nothing ??
                return null;
            }
        }
    };
})();
