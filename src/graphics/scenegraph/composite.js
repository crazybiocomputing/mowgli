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
 * Node with children in the Scene Graph
 *
 * @class Composite
 * @memberof module:graphics
 * @constructor
 **/
function Composite(node) {
    this.children = {};
    this._isDirty = true;
    this.parent   = null;
    this.renderer = null;

    //
    this.nodeGL   = null;

    // Matrix for rotation(s) and translation(s)
    this.matrix=mat4.create();
    mat4.identity(this.matrix);
}

Composite.prototype.add = function(an_object) {
    this.children[an_object.ID+'_' + size(this.children)] = an_object;
    an_object.parent = this;

    function size(obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    }
};

Composite.prototype.getNodeGL = function() {
    return this.nodeGL;
};

Composite.prototype.getRenderer = function() {
    console.log(this);
    if (this.renderer != null) {
        return this.renderer;
    }
    else if (this.parent instanceof Renderer){
        this.renderer = this.parent;
        return this.renderer;
    }
    return this.parent.getRenderer();
};

Composite.prototype.isDirty = function() {
    return _isDirty;
};

/**
 * Init the OpenGL config of this object in the scene graph
 * and traverse its children.
 * Function called by the renderer
 *
 * @param{number} OpenGL context
 **/
Composite.prototype.init = function(context) {
    // Uniforms
    console.log('INIT ' + this.ID);
    this.getNodeGL().init(context);
    for (var i in this.children) {
        traverse(context,this.children[i]);
    }
    this.isDirty = false;

    function traverse(context,a_node) {
        a_node.init(context);
        for (var i in a_node.children) {
            traverse(context,a_node.children[i]);
        }
    }
};

/**
 * Render this object and traverse its children
 * Function called by the renderer
 *
 * @param{number} OpenGL context
 **/
Composite.prototype.render = function(context) {
    console.log('RENDER_Composite ' + this.ID );
    console.log(this.parent);
    // Update matrix
    if (!(this.parent instanceof Renderer) ) {
        console.log('multiply');
        mat4.multiply(this.getNodeGL().workmatrix,this.parent.getNodeGL().workmatrix,this.matrix);
    }
    // Render
    this.getNodeGL().render(context);
    // Propagate to children
    for (var i in this.children) {
        traverse(context,this.children[i]);
    }

    function traverse(context,a_node) {
        a_node.render(context);
        for (var i in a_node.children) {
            traverse(context,a_node.children[i]);
        }
    }

};

Composite.prototype.graph = function(level) {
    var lvl = level || 0;
    var spaces = Array(lvl+1).join('.');
    var str = (this.ID || 'unknown') +'\n';
    for (var i in this.children) {
        str += spaces + '+-'+this.children[i].graph(lvl++)+'\n';
    }
    return str;
};

/***
Composite.prototype._updateAttributes = function(context) {
    var gl = context;

  if (this.shaderProgram.attributes.length != this.geometry.attributes.length) {
    console.log(this.shaderProgram.attributes);
    console.log(this.shaderProgram.attributes.length + ' != ' + this.geometry.attributesLength() );
    console.log('MOWGLI: Attributes are not correctly defined');
  }

    for (var i=0; i < this.geometry.VBO.length;i++) {
        var vbo = this.geometry.VBO[i];
        for (var j=0; j < vbo.attributes.length; j++) {
            vbo.attributes[j].location = this.shaderProgram.getAttribLocation(vbo.attributes[j].name);
            vbo.attributes[j].size = this.shaderProgram.attributes[vbo.attributes[j].name].size;
            console.log('location [' + vbo.attributes[j].name + ']= '+ vbo.attributes[j].location + ' '+vbo.attributes[j].size);
        }
    }
}
*****/
