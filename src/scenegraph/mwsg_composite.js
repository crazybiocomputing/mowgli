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

import {Node} from './mwsg_node.js';

/**
 * Node with children in the Scene Graph
 *
 * @class Composite
 * @memberof module:mwSG
 *
 * @augments Node
 **/
export class Composite extends Node {
  /**
   * @constructor
   */
  constructor() {
    super();
    this.ID = 'composite';

    this.children = [];
  }


  /**
   * Add an object in the scene graph
   *
   * @param{object} A 3D graphics object
   **/
  add(an_object) {
  
    function size(obj) {
      var size = 0, key;
      for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
      }
      return size;
    }
    
    // Modify ID if duplicates
    an_object.name = an_object.ID + '_' + size(this.children);
    this.children[an_object.name] = an_object;
    an_object.parent = this;
  };

  remove(id) {
    if (this.children.id !== undefined) {
      delete this.children.id;
    }
  };

  getById(id) {

    function traverse(id,a_node) {
      if (a_node.ID === id) {
        return a_node;
      }
      for (var i in a_node.children) {
        var result = traverse(id,a_node.children[i]);
        if (result !== undefined) {
          return result;
        }
      }
      return null;
    }

    return traverse(id,this);
  };

  /**
   * Init the OpenGL config of this object in the scene graph
   * and traverse its children.
   * Function called by the renderer
   *
   * @param{number} OpenGL context
   **/
  init(context) {
    // Uniforms
    // HACK console.log('INIT ' + this.ID);
    this.getNodeGL().init(context);
    for (var i in this.children) {
      // HACK console.log('child:INIT ' + this.children[i].ID);
      // HACK console.log(this.children[i]);
      this.children[i].init(context);
    }
    this.isDirty = false;
  };

  /**
   * Render this object and traverse its children
   * Function called by the renderer
   *
   * @param{number} OpenGL context
   **/
  render(context) {
    // HACK console.log('RENDER_Composite ' + this.ID );
    // HACK console.log(this.parent);
    // Update matrix
    if (!(this.parent.Id === 'renderer') ) {
      mat4.multiply(this.getNodeGL().workmatrix,this.parent.getNodeGL().workmatrix,this.matrix);
    }
    // Render
    this.getNodeGL().render(context);
    // Propagate to children
    for (var i in this.children) {
      this.children[i].render(context);
    }
  };

  /**
   * Update this object and traverse its children
   *
   * @param {number} context - OpenGL context
   **/
  update(context) {
    if (this._isDirty !== Node.CLEAN) {
      // Update matrix ?
      mat4.multiply(this.getNodeGL().workmatrix,this.parent.getNodeGL().workmatrix,this.matrix);
      // Update OpenGL (e.g. VBOs, shaders, etc.)
      this.getNodeGL().update(context);
      this._isDirty = Node.CLEAN;
    }
    // Propagate to children
    for (var i in this.children) {
      this.children[i].update(context);
    }
  };

  graph(level) {
    var lvl = level || 0;
    var spaces = Array(lvl+1).join('.');
    var str = (this.ID || 'unknown') +'\n';
    for (var i in this.children) {
      str += spaces + '+-'+this.children[i].graph(lvl++)+'\n';
    }
    return str;
  };


  traverse(context,a_node) {
    for (var i in a_node.children) {
      this.traverse(context,a_node.children[i]);
    }
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

} // End of class Composite


