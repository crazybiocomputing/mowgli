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
 * All the classes related to the rendering, scene graph and OpenGL.
 * @module graphics
 */


/**
 * CameraGroup: A collection of shapes
 *
 * @class CameraGroup
 * @constructor
 * @memberof module:graphics
 * @augments Composite
 **/
function CameraGroup() {
    Composite.call(this);

    this.ID = 'group[camera]';
    this.nodeGL = new NodeGL(this);

}

CameraGroup.prototype = Object.create(Composite.prototype);

CameraGroup.prototype.add = function(an_object) {
    if (an_object instanceof Camera) {
        Composite.add.call(this,an_object);
    }
    else {
        // ERROR: Do nothing
    }
};
