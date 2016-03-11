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
 
 "use strict";

 
/**
 * Camera
 *
 * @class Camera
 * @memberof module:graphics
 * @constructor
 * @augments Leaf
 **/
function Camera() {
    Leaf.call(this);
    
    this.ID = 'camera';

    this.projMatrix = mat4.create();
    this.viewMatrix = mat4.create();
    mat4.identity(this.viewMatrix);
    
    /**
     * Y-Field of View
     **/
    this.fovy = 45.0*Math.PI/180.0;
    
    /**
     * Zoom
     **/
    this.zoom = 1.0;

    /**
     * Z-near Plane
     **/
    this.zNear = 0.1;

    /**
     * Z-far Plane
     **/
    this.zFar  = 1000.0;

      // NodeGL
    this.nodeGL = new mwGL.Camera(this);
}

Camera.prototype = new Leaf;

/**
 * Set the Y-Field of View. 
 *
 * @param {number} angle_in_degrees - Angle of the Field of View expressed in degrees
 * 
 **/
Camera.prototype.setFovy = function (angle_in_degrees) {
  this.fovy= angle_in_degrees * Math.PI/180.0;
}



