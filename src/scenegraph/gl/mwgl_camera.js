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
        mwGL.Node.call(this,node);

        this.backgroundColor = {
            r:0.0,
            g:0.0,
            b:0.0,
            a:1.0
        };

    }

    _Camera.prototype = Object.create(mwGL.Node.prototype);


    _Camera.prototype.isDirty = function() {
        return _isDirty;
    };

    _Camera.prototype.setViewport = function (x,y,width,height) {
        this.viewport.x = x;
        this.viewport.y = y;
        this.viewport.width  = width;
        this.viewport.height = height;
    };

    _Camera.prototype.init = function(context) {
        // Do nothing
        this.isDirty = false;
    };

    _Camera.prototype.render = function(context) {
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


    exports.Camera = _Camera;


})(this.mwGL = this.mwGL || {} );
