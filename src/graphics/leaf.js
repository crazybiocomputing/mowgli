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
 * Node in the Scene Graph
 *
 * @class Leaf
 * @memberof module:graphics
 * @constructor
 **/
function Leaf(node) {
    this._isDirty = true;
    this.parent = null;
    this.renderer = null;
    
    // 
    this.nodeGL = null;
    
    // Matrix for rotation(s) and translation(s)
    this.matrix=mat4.create();
    mat4.identity(this.matrix);
}

Leaf.prototype.isDirty = function() {
    return _isDirty;
}

Leaf.prototype.getNodeGL = function() {
    return this.nodeGL;
}

Leaf.prototype.getRenderer = function() {
    console.log(this);
    if (this.renderer != null) {
        return this.renderer;
    }
    else if (this.parent instanceof Renderer) {
        this.renderer = this.parent;
        return this.renderer;
    }
    return this.parent.getRenderer();
}

/**
 * Init the OpenGL config of this object in the scene graph
 * and traverse its children.
 * Function called by the renderer
 *
 * @param{number} OpenGL context
 **/
Leaf.prototype.init = function(context) {
    console.log('INIT leaf ' + this.ID);
    this.getNodeGL().init(context);
}

/**
 * Render this object and traverse its children
 * Function called by the renderer
 *
 * @param{number} OpenGL context
 **/
Leaf.prototype.render = function(context) {
    console.log('RENDER_Leaf ' + this.ID);
    console.log(this.parent.getNodeGL().workmatrix);
    // Update matrix
    mat4.multiply(this.getNodeGL().workmatrix,this.parent.getNodeGL().workmatrix,this.matrix);
    // OpenGL rendering
    this.getNodeGL().render(context);
}

Leaf.prototype.translate = function(tx, ty, tz) {
    console.log(this.matrix);
    mat4.translate(this.matrix,this.matrix,[tx, ty, tz]);
        console.log(this.matrix);
}

Leaf.prototype.graph = function(level) {
    var str = (this.ID || 'unknown');
    return str;
}


