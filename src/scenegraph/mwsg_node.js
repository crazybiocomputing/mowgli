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

/**
 * @module mwSG
 */

'use strict';

/**
 * Node in the Scene Graph
 *
 * @class Node
 * @memberof module:mwSG
 * 
 **/
export class Node {
  /**
   * @constructor
   */
  constructor() {

    /**
     * Type of scenegraph node
     */
    this.ID = 'node';

    /**
     * Name of scenegraph node
     */
    this.name = 'none';

    /**
     * Status of scenegraph node
     * isDirty: Node.MATRIX | Node.GEOMETRY | Node.MATERIAL | Node.CLEAN;
     */
    this._isDirty = Node.MATRIX | Node.GEOMETRY | Node.MATERIAL;

    /**
     * Parent of this scenegraph node
     */
    this.parent = null;

    /**
     * Renderer of this scene that includes this node
     */
    this.renderer = null;

    /**
     * OpenGL/WebGL object of this node
     */
    this.nodeGL = null;

    /**
     * Matrix for rotation(s) and translation(s): the Model Matrix
     */
    this.matrix = mat4.create();
    mat4.identity(this.matrix);
  }

  static get CLEAN() {
    return 0;
  }
  
  
  static get MATRIX() {
    return 1;
  }
  
  static get GEOMETRY() {
    return 2;
  }
  
  static get MATERIAL() {
    return 4;
  }

  isDirty() {
    return this._isDirty;
  };

  getNodeGL() {
    return this.nodeGL;
  };

  getRenderer() {
    if (this.renderer !== null) {
      return this.renderer;
    }
    else if (this.parent.ID === 'renderer') {
      this.renderer = this.parent;
      return this.renderer;
    }
    return this.parent.getRenderer();
  };

  /**
   * Init the OpenGL config of this object in the scene graph
   * and traverse its children.
   * Function called by the renderer
   *
   * @param{number} OpenGL context
   **/
  init(context) {
  };

  /**
   * Render this object
   * Function called by the renderer
   *
   * @param{number} OpenGL context
   **/
  render(context) {
    this.nodeGL.pre_render(context);
    this.nodeGL.render(context);
    this.nodeGL.post_render(context);
  };

  translate(tx, ty, tz) {
    // HACK console.log(this.matrix);
    mat4.translate(this.matrix,this.matrix,[tx, ty, tz]);
    // HACK console.log(this.matrix);
  };

  graph(level) {
  };


} // End of class Node
