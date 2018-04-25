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
class Renderer {

  constructor(w,h,className = 'mowgli3D') {

    // Get A WebGL context
    function createWebGLContext(canvas, opt_attribs) {
      var context = null;
      try {
          context = canvas.getContext('webgl2', opt_attribs);
      } catch(e) {
          // TODO
      }
      if (context) {
          break;
      }
      return context;
    }

    this.scene = null;
    this.handlers = [];

    this.canvas = document.createElement('canvas');
    this.canvas.width  = w;
    this.canvas.height = h;

    this.context = createWebGLContext(canvas);
    
    if (!this.context) {
        MOWGLI.alert('ERR:context');
        return;
    }

/*
    // Properties
    var displayWidth  = canvas.clientWidth;
    var displayHeight = canvas.clientHeight;

    // Check if the canvas is not the same size.
    if (canvas.width  != displayWidth ||
        canvas.height != displayHeight) {

        // Make the canvas the same size
        canvas.width  = displayWidth;
        canvas.height = displayHeight;
    }
    this.context.viewportWidth  = canvas.width;
    this.context.viewportHeight = canvas.height;

*/

    this.shaders=[];
    this.shaderProgram=null; //Active program ID

  }

  /**
   * Get graphics context
   *
   * @return {number} - Reference of the OpenGL graphics context
   *
   **/
  getContext() {
    return this.context;
  };

  /**
   * Add scene
   *
   * @param {Scene} - Add a scene which is the root of the scene graph.
   *
   **/
  addScene(a_scene) {
    this.scene = a_scene;
    a_scene.parent = this;
  };

  /**
   * Get scene
   *
   * @return {Scene} - Get the scene which is the root of the scene graph.
   *
   **/
  getScene() {
    return this.scene;
  };


  addShader(a_shaderprogram) {
    this.shaders.push(a_shaderprogram);
  };

  /**
   * Add sensor
   *
   * @param {Sensor} - Add a sensor or an object interacting with the scene graph
   *
   **/
  addSensor(a_sensor) {
    this.sensor = a_sensor;
    this.sensor.setRenderer(this);
  };

  setUniform(name,value) {
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
  init() {
    const gl = this.context;

    // Force resize...
    window.resizeCanvas();

    // Init GL
    this._initGL();

    // Propagate to scene(s)
    this.scene.init(gl);
  };

  /**
   * Draw the scene. This function triggers the OpenGL rendering in an infinite loop.
   *
   *
   **/
  drawScene() {
    const gl = this.context;

    // Traverse scene graph
    // Properties

    console.log('*************** RENDER:'+ this.canvasWidth +' '+ this.canvasHeight +' ***************');

    this.scene.render(gl);
  };

  subscribe(obj) {
    this.handlers.push(obj);
  };

  unsubscribe(obj) {
    this.handlers = this.handlers.filter(
      function(item) {
        if (item !== obj) {
            return item;
        }
      }
    );
  };

  fire() {
    var self = this;

    this.handlers.forEach(function(item) {
        console.log('fire');
        console.log(item);
        item.handle(self);
    });
  };


  /*
   * Private
   */
  static FLOAT_IN_BYTES = 4;

  _initGL() {
    // Init GL stuff
    const gl = this.context;
    // TODO
    // Default clearColor
    gl.clearColor(0.1,0.1,0.1,1.0);

    gl.enable(gl.DEPTH_TEST);

    // Check extension...
    gl.getExtension('EXT_frag_depth');
    if (gl.getSupportedExtensions().indexOf('EXT_frag_depth') < 0 ) {
        alert('Extension frag_depth not supported');
    }

    // HACK Default shader program???
    this.program = new Program();
  };

} // End of class Renderer


