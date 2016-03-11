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
 * @module mwGL
 */
 
 
/**
 * WebGL part of Camera class
 *
 * @class Camera
 * @memberof module:mwGL
 * 
 * 
 **/
 
 
/**
 * @constructor
 * @param {Node} node - Camera Object belonging to the scene graph
 * @extends module:mwGL.Node
 * @author Jean-Christophe Taveau
 **/
 
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
(function(exports) {
    function _Camera(node) {
        this.sgnode = node;
        this.glType = -1;
        this._isDirty = true;
        
        // Matrix for rotation(s) and translation(s)
        this.workmatrix= mat4.create();
        mat4.identity(this.workmatrix);
    }

    _Camera.prototype.isDirty = function() {
        return _isDirty;
    }


    _Camera.prototype.setViewport = function (width, height) {
        mat4.perspective(this.sgnode.projMatrix,this.sgnode.fovy * this.sgnode.zoom,width / height,this.sgnode.zNear,this.sgnode.zFar);
    }

    _Camera.prototype.init = function(context) {
        // Do nothing
        this.isDirty = false;
    }

    _Camera.prototype.render = function(context) {
        var gl = context;
        console.log('RENDER CAM++ ' ,gl.viewportWidth,gl.viewportHeight);
        console.log(context);
        this.setViewport(gl.viewportWidth,gl.viewportHeight);
        this.sgnode.getRenderer().setUniform("uVMatrix", this.sgnode.viewMatrix);
        this.sgnode.getRenderer().setUniform("uPMatrix", this.sgnode.projMatrix);
    }



    exports.Camera = _Camera;

    
})(this.mwGL = this.mwGL || {} );

