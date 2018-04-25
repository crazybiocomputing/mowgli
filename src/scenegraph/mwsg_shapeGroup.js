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

(function(exports) {

    /**
     * ShapeGroup: A collection of shapes
     *
     * @class ShapeGroup
     * @constructor
     * @memberof module:mwSG
     * @augments Composite
     **/
    function ShapeGroup () {
        mwSG.Composite.call(this);

        this.ID = 'group[shape]';

        this.nodeGL = new mwGL.Node(this);

    }

    ShapeGroup.prototype = Object.create(mwSG.Composite.prototype);

    exports.ShapeGroup = ShapeGroup;


})(this.mwSG = this.mwSG || {} );