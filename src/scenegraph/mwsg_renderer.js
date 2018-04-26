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
export class Renderer {

  constructor(w,h,className = 'mowgli3D') {

    // Get A WebGL context
    function createWebGLContext(canvas, opt_attribs) {
      var context = null;
      try {
          context = canvas.getContext('webgl2', opt_attribs);
      } catch(e) {
          // TODO
      }
      return context;
    }

    this.ID = 'renderer';
    this.scene = null;
    this.handlers = [];

    this.canvas = document.createElement('canvas');
    this.canvas.width  = w;
    this.canvas.height = h;

    this.context = createWebGLContext(this.canvas);
    
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
   * Get HTML5 Canvas
   *
   * @return {number} - Reference of the Canvas
   *
   **/
  getCanvas() {
    return this.canvas;
  };

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

  /**
   * 
   *
   * @author Jean-Christophe Taveau
   **/
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

  /**
   * 
   *
   * @author Jean-Christophe Taveau
   **/
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
    // TODO Fix Bug window.resizeCanvas();

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

    console.log('*************** RENDER:'+ this.canvas.width +' '+ this.canvas.height +' ***************');

    this.scene.render(gl);
  };

  /**
   * 
   *
   * @author Jean-Christophe Taveau
   **/
  subscribe(obj) {
    this.handlers.push(obj);
  };

  /**
   * 
   *
   * @author Jean-Christophe Taveau
   **/
  unsubscribe(obj) {
    // TODO Fix
    this.handlers = this.handlers.filter(
      function(item) {
        if (item !== obj) {
            return item;
        }
      }
    );
  };

  /**
   * 
   *
   * @author Jean-Christophe Taveau
   **/
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
  static get FLOAT_IN_BYTES() {
    return 4;
  }

  _initGL() {
    // Init GL stuff
    const gl = this.context;
    // TODO
    // Default clearColor
    gl.clearColor(0.1,0.1,0.1,1.0);

    gl.enable(gl.DEPTH_TEST);

    // Check extension...
    // If required ?

    // HACK Default shader program???
    this.program = new gpu.Program();
  };

} // End of class Renderer


