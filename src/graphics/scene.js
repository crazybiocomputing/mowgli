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
 * Scene: Root of the scene graph
 *
 * @class Scene
 * @memberof module:graphics
 * @constructor
 * @augments Composite
 **/
var Scene = function () {
    Composite.call(this);
    
    this.ID = 'scene';
    this.add(new Camera() );
    this.add(new Light()  );
    
    this.nodeGL = new NodeGL();

}

Scene.prototype = Object.create(Composite.prototype);

/**
 * Get Camera in the scene
 *
 * @return {Camera} Returns the current camera
 **/
Scene.prototype.getCamera = function() {
    return this.children['camera_0'];
}

Scene.prototype.toString = function() {
    var str = this.ID+'\n';
    for (var i in this.children) {
        str += '+-'+this.children[i].ID+'\n';
    }
    return str;
}



