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
 * @module mwgl
 */

import {Node} from './mwgl_node.js';

/**
 *
 *
 * @desc Set Viewport of canvas
 *
 * @param {number} width - Canvas width
 * @param {number} height - Canvas height
 *
 * @author Jean-Christophe Taveau
 **/
export class Camera extends Node {
  /**
   * @constructor
   * @param {Node} node - Camera Object belonging to the scene graph
   * @extends module:mwGL.Node
   * @author Jean-Christophe Taveau
   **/
   constructor(node) {
      super(node);

      this.backgroundColor = {
        r:0.0,
        g:0.0,
        b:0.0,
        a:1.0
      };
    }

  isDirty() {
    return _isDirty;
  };

  setViewport (x,y,width,height) {
    this.viewport.x = x;
    this.viewport.y = y;
    this.viewport.width  = width;
    this.viewport.height = height;
  };

  init(context) {
    // Do nothing
    this.isDirty = false;
  };

  render(context) {
    var gl = context;

    // HACK console.log(context);

    // Update viewport...
    console.log('RENDER CAM++ ');

    // ... and update Projection matrix
    //this.sgnode.projectionFunc(this.viewport.width / viewport.height);
    console.log(this.sgnode.viewMatrix);
    console.log(this.sgnode.projMatrix);

    // Update uniforms
    this.sgnode.getRenderer().setUniform('uVMatrix', this.sgnode.viewMatrix);
    this.sgnode.getRenderer().setUniform('uPMatrix', this.sgnode.projMatrix);

    // Update GL viewport
    gl.viewport(this.sgnode.viewport.x, this.sgnode.viewport.y, this.sgnode.viewport.width, this.sgnode.viewport.height);
  };


} // End of class Camera

