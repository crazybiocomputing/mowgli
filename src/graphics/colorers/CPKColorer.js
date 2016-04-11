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
 * CPK Colorer generates given RGB color depending an atom
 *
 * @class CPKColorer
 * @memberof module:graphics
 * @constructor
 * @author Jean-Christophe Taveau
 **/
function CPKColorer() {
    this.name = "CPK";
}

CPKColorer.prototype.get = function(atom) {
    var rgb = [];
    switch (atom.symbol) {
    case 'C':
        rgb.push(0.78); //red
        rgb.push(0.78); //green
        rgb.push(0.78); //blue
        break;
    case 'N':
        rgb.push(0.56); //red
        rgb.push(0.56); //green
        rgb.push(1.00); //blue
        break;
    case 'O':
        rgb.push(0.94); //red
        rgb.push(0.00); //green
        rgb.push(0.00); //blue
        break;
    case 'P':
        rgb.push(1.00); //red
        rgb.push(0.5); //green
        rgb.push(0.00); //blue
        break;
    case 'S':
        rgb.push(1.00); //red
        rgb.push(0.98); //green
        rgb.push(0.19); //blue
        break;
    default:
        rgb.push(1.00); //red
        rgb.push(0.1); //green
        rgb.push(0.50); //blue
    }

    return rgb;
};
