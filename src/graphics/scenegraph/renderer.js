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
 * Core class for rendering in the canvas
 *
 * @todo must be a singleton ??
 *
 * @class Renderer
 * @memberof module:graphics
 * @constructor
 *
 * @example
 * var id = document.getElementById('canvas');
 * var renderer = new Renderer(id);
 * renderer.addScene(myScene);
 * // Inititalize the renderer just before executing the rendering loop
 * renderer.init();
 * // Run infinite loop
 * renderer.drawScene();
 */
function Renderer(canvas_id) {
    this.scene = null;

    // Get A WebGL context
    function createWebGLContext(canvas, opt_attribs) {
        var names = ['webgl', 'experimental-webgl'];
        var context = null;
        for (var ii in names) {
            try {
                context = canvas.getContext(names[ii], opt_attribs);
            } catch(e) {
                // TODO
            }
            if (context) {
                break;
            }
        }
        return context;
    }

    var canvas = document.getElementById(canvas_id);
    this.context = createWebGLContext(canvas);

    if (!this.context) {
        return;
    }

    // Properties
    this.context.viewportWidth  = canvas.width;
    this.context.viewportHeight = canvas.height;
    this.shaders=[];
    this.shaderProgram=null; //Active program ID

    // Init GL
    this._initGL();
}

/**
 * Get graphics context
 *
 * @return {number} - Reference of the OpenGL graphics context
 *
 **/
Renderer.prototype.getContext = function () {
    return this.context;
};

/**
 * Add scene
 *
 * @param {Scene} - Add a scene which is the root of the scene graph.
 *
 **/
Renderer.prototype.addScene = function (a_scene) {
    this.scene = a_scene;
    a_scene.parent = this;
};


Renderer.prototype.addShader = function (a_shaderprogram) {
    this.shaders.push(a_shaderprogram);
};

/**
 * Add sensor
 *
 * @param {Sensor} - Add a sensor or an object interacting with the scene graph
 *
 **/
Renderer.prototype.addSensor = function (a_sensor) {
    this.sensor = a_sensor;
    this.sensor.setRenderer(this);
};

Renderer.prototype.setUniform = function (name,value) {
    for (var i in this.shaders) {
        var shader = this.shaders[i];
        shader.uniforms[name].value = value;
    }
};


/**
 * Initialize the renderer.
 *
 *
 **/
Renderer.prototype.init = function () {
    var gl = this.context;
    this.scene.init(gl);
  // TODO
};

/**
 * Draw the scene. This function triggers the OpenGL rendering in an infinite loop.
 *
 *
 **/
Renderer.prototype.drawScene = function () {
    var gl = this.context;

    // Clear Screen And Depth Buffer
    gl.viewport(0.0, 0.0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Traverse scene graph
    console.log('*************** RENDER ***************');
    this.scene.render(gl);
};
/*
 * Private
 */

Renderer.FLOAT_IN_BYTES = 4;

Renderer.prototype._initGL = function() {
    // Init GL stuff
    var gl = this.context;
    // TODO
    // Default clearColor
    gl.clearColor(0.1,0.1,0.1,1.0);

    gl.enable(gl.DEPTH_TEST);

    // Check extension...
    gl.getExtension('EXT_frag_depth');
    if (gl.getSupportedExtensions().indexOf('EXT_frag_depth') < 0 ) {
        alert('Extension frag_depth not supported');
    }

    // Default shader program
    this.program = new Program();
};
