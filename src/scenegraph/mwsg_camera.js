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

import {Leaf} from './mwsg_leaf.js';

/**
 * Camera
 *
 * @class Camera
 * @memberof module:mwSG
 * 
 * @augments Leaf
 **/
export class Camera extends Leaf {
  /**
   * @constructor
   */
  constructor() {
    super();

    this.ID = 'camera';
    this.eye = {x:0.0, y: 0.0, z:0.0}; // View position
    this.vd  = {x:0.0, y: 0.0, z:0.0}; // View direction vector
    this.up  = {x:0.0, y: 1.0, z:0.0}; // View up direction

    this.focallength;  // Focal Length along vd = distance between cam and objects center

    this.viewport = {
      x:0,
      y:0,
      width:0,
      height:0
    };

    this.projMatrix = mat4.create();
    this.viewMatrix = mat4.create();
    mat4.identity(this.viewMatrix);

    /**
     * Y-Field of View
     **/
    this.fovy = 45.0 * Math.PI/180.0;

    /**
     * Zoom
     **/
    this.zoom = 1.0;

    /**
     * Z-near Plane
     **/
    this.near = 0.1;

    /**
     * Z-far Plane
     **/
    this.far  = 1000.0;

    // NodeGL
    this.nodeGL = new mwgl.Camera(this);

    // Projection Func
    var that = this;
    this.proj_callback = function(aspect) {
        console.log('this/that '+ aspect + ' ' + that.fovy +' '+ that.zoom+' '+ that.near+' '+ that.far);
        mat4.perspective(that.projMatrix,that.fovy * that.zoom,aspect,that.near,that.far);
    };

  }

  /**
   * Camera position.
   *
   * @type {number}
   *
   */
  get position() {
    return this.eye;
  }
  
  set position(pos) {
    this.eye.x = pos.x;
    this.eye.y = pos.y;
    this.eye.z = pos.z;
  }


  /**
   * Set the Y-Field of View.
   *
   * @param {number} angle_in_degrees - Angle of the Field of View expressed in degrees
   *
   **/
  setFovy(angle_in_degrees) {
    this.fovy = angle_in_degrees * Math.PI/180.0;
  };


  /**
   * Set the Camera position.
   *
   * @param {number} posX - X-coordinate of the camera position in world
   * @param {number} posY - Y-coordinate of the camera position in world
   * @param {number} posZ - Z-coordinate of the camera position in world
   *
   **/
  setPosition(posX, posY, posZ) {
    this.eye.x = posX;
    this.eye.y = posY;
    this.eye.z = posZ;
  };

  /**
   * Calculates a look-at matrix with the given camera position, focal point, and up axis
   *
   * @param {vec3} center Point the viewer is looking at
     *
   */
  lookAt(center) {
    mat4.lookAt(
      this.viewMatrix,
      [this.eye.x, this.eye.y, this.eye.z],
      [center.x  , center.y  , center.z  ],
      [this.up.x , this.up.y , this.up.z ] );
  };

  /**
   * Calculates a perspective projection matrix with the given bounds for this camera
   *
   * @param {mat4} out mat4 frustum matrix will be written into
   * @param {number} fovy Vertical field of view in radians
   * @param {number} aspect Aspect ratio. typically viewport width/height
   * @param {number} near Near bound of the frustum
   * @param {number} far Far bound of the frustum
   * @returns {mat4} out
   */
  perspective(fovy, aspect, near, far) {
    mat4.perspective(this.projMatrix, fovy, aspect, near, far);
  };

  /**
   * Calculates a frustum projection matrix with the given bounds for this camera
   *
   * @param {Number} left Left bound of the frustum
   * @param {Number} right Right bound of the frustum
   * @param {Number} bottom Bottom bound of the frustum
   * @param {Number} top Top bound of the frustum
   * @param {Number} near Near bound of the frustum
   * @param {Number} far Far bound of the frustum
   *
   **/
  frustum(left,right,bottom,top,near,far) {
    mat4.frustum(this.projMatrix, left, right, bottom, top, near, far);
  };

  /**
   * Set the Y-Field of View.
   *
   * @param {number} angle_in_degrees - Angle of the Field of View expressed in degrees
   *
   **/
  setZoom(zoomFactor) {
    this.zoom = zoomFactor;
  };

  setViewportFunc(callback) {
    this.viewport_callback = callback;
  }

  viewportFunc(viewportWidth,viewportHeight) {
    return {
      x: 0,
      y: 0,
      width: viewportWidth,
      height: viewportHeight
    };
  };

  handle(rendr) {
    console.log('handle');
    console.log(rendr.canvas.width+' '+rendr.canvas.height);
    this.viewport = this.viewportFunc(rendr.canvas.width,rendr.canvas.height);
    var aspect_ratio = rendr.canvas.width / rendr.canvas.height;
    mat4.perspective(this.projMatrix, this.fovy * this.zoom, aspect_ratio, this.near, this.far);
  };

  toString() {
    return `view:[${this.viewMatrix.toString()}]\nproj: [${this.projMatrix.toString()}]`;
  };
} // End of class Camera

