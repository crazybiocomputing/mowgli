(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scenegraph_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "mwsg", function() { return _scenegraph_index_js__WEBPACK_IMPORTED_MODULE_0__; });
/* harmony import */ var _scenegraph_gl_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(14);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "mwgl", function() { return _scenegraph_gl_index_js__WEBPACK_IMPORTED_MODULE_1__; });
/* harmony import */ var _ui_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(19);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "mwui", function() { return _ui_index_js__WEBPACK_IMPORTED_MODULE_2__; });
/* harmony import */ var _scenegraph_gpu_utils_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(21);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "gpu", function() { return _scenegraph_gpu_utils_index_js__WEBPACK_IMPORTED_MODULE_3__; });
/* harmony import */ var _map_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(27);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "map", function() { return _map_index_js__WEBPACK_IMPORTED_MODULE_4__; });
/* harmony import */ var _structure_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(32);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Structure", function() { return _structure_js__WEBPACK_IMPORTED_MODULE_5__["Structure"]; });

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



/* scenegraph classes */


/* scenegraph/gl classes */


/* ui/ classes */


/* scenegraph/gpu classes */


/* map/ classes */







/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mwsg_camera_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Camera", function() { return _mwsg_camera_js__WEBPACK_IMPORTED_MODULE_0__["Camera"]; });

/* harmony import */ var _mwsg_composite_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Composite", function() { return _mwsg_composite_js__WEBPACK_IMPORTED_MODULE_1__["Composite"]; });

/* harmony import */ var _mwsg_geometry_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Geometry", function() { return _mwsg_geometry_js__WEBPACK_IMPORTED_MODULE_2__["Geometry"]; });

/* harmony import */ var _mwsg_leaf_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Leaf", function() { return _mwsg_leaf_js__WEBPACK_IMPORTED_MODULE_3__["Leaf"]; });

/* harmony import */ var _mwsg_light_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Light", function() { return _mwsg_light_js__WEBPACK_IMPORTED_MODULE_4__["Light"]; });

/* harmony import */ var _mwsg_node_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Node", function() { return _mwsg_node_js__WEBPACK_IMPORTED_MODULE_5__["Node"]; });

/* harmony import */ var _mwsg_renderer_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Renderer", function() { return _mwsg_renderer_js__WEBPACK_IMPORTED_MODULE_6__["Renderer"]; });

/* harmony import */ var _mwsg_scene_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Scene", function() { return _mwsg_scene_js__WEBPACK_IMPORTED_MODULE_7__["Scene"]; });

/* harmony import */ var _mwsg_shapeGroup_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(10);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ShapeGroup", function() { return _mwsg_shapeGroup_js__WEBPACK_IMPORTED_MODULE_8__["ShapeGroup"]; });

/* harmony import */ var _mwsg_shape_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(11);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Shape", function() { return _mwsg_shape_js__WEBPACK_IMPORTED_MODULE_9__["Shape"]; });

/* harmony import */ var _shapes_cube_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(12);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Cube", function() { return _shapes_cube_js__WEBPACK_IMPORTED_MODULE_10__["Cube"]; });

/* harmony import */ var _shapes_mesh_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(13);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Mesh", function() { return _shapes_mesh_js__WEBPACK_IMPORTED_MODULE_11__["Mesh"]; });

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
 
// import *  from './mwsg_cameraGroup.js';




















/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Camera", function() { return Camera; });
/* harmony import */ var _mwsg_leaf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
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
 * Camera
 *
 * @class Camera
 * @memberof module:mwSG
 * 
 * @augments Leaf
 **/
class Camera extends _mwsg_leaf_js__WEBPACK_IMPORTED_MODULE_0__["Leaf"] {
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



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Leaf", function() { return Leaf; });
/* harmony import */ var _mwsg_node_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
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
 * Leaf node in the Scene Graph
 *
 * @class Leaf
 * @memberof module:mwSG
 * @constructor
 * @augments Node
 **/
class Leaf extends _mwsg_node_js__WEBPACK_IMPORTED_MODULE_0__["Node"] {
  constructor() {
    super();
    this.ID = 'leaf';
  }

  /**
   * Init the OpenGL config of this object in the scene graph
   * and traverse its children.
   * Function called by the renderer
   *
   * @param{number} OpenGL context
   **/
  init(context) {
    console.log('INIT leaf ' + this.ID);
    this.getNodeGL().init(context);
  };

  /**
   * Render this object
   * Function called by the renderer
   *
   * @param {number} context - OpenGL context
   **/
  render(context) {
    // HACK console.log('RENDER_Leaf ' + this.ID);
    // HACK console.log(this.parent.getNodeGL().workmatrix);
    // Update matrix
    mat4.multiply(this.getNodeGL().workmatrix,this.parent.getNodeGL().workmatrix,this.matrix);

    console.log(this.getNodeGL());
    
    // OpenGL rendering
    this.getNodeGL().pre_render(context);
    this.getNodeGL().render(context);
    this.getNodeGL().post_render(context);
  };

  /**
   * Update this object
   *
   * @param {number} context - OpenGL context
   **/
  update(context) {
    // HACK console.log('UPDATE_Leaf ' + this.ID);
    // HACK console.log(this.parent);
    // Update matrix
    if (this._isDirty !== _mwsg_node_js__WEBPACK_IMPORTED_MODULE_0__["Node"].CLEAN) {
        mat4.multiply(this.getNodeGL().workmatrix,this.parent.getNodeGL().workmatrix,this.matrix);
        // OpenGL rendering
        this.getNodeGL().update(context);
        this._isDirty = _mwsg_node_js__WEBPACK_IMPORTED_MODULE_0__["Node"].CLEAN;
    }
  };


  graph(level) {
      var str = (this.ID || 'unknown');
      return str;
  };




} // End of class Leaf


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Node", function() { return Node; });
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



/**
 * Node in the Scene Graph
 *
 * @class Node
 * @memberof module:mwSG
 * 
 **/
class Node {
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


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Composite", function() { return Composite; });
/* harmony import */ var _mwsg_node_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
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
 * Node with children in the Scene Graph
 *
 * @class Composite
 * @memberof module:mwSG
 *
 * @augments Node
 **/
class Composite extends _mwsg_node_js__WEBPACK_IMPORTED_MODULE_0__["Node"] {
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
    an_object.name = an_object.ID + '_' + this.children.length;
    this.children.push(an_object);
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
    if (this._isDirty !== _mwsg_node_js__WEBPACK_IMPORTED_MODULE_0__["Node"].CLEAN) {
      // Update matrix ?
      mat4.multiply(this.getNodeGL().workmatrix,this.parent.getNodeGL().workmatrix,this.matrix);
      // Update OpenGL (e.g. VBOs, shaders, etc.)
      this.getNodeGL().update(context);
      this._isDirty = _mwsg_node_js__WEBPACK_IMPORTED_MODULE_0__["Node"].CLEAN;
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




/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Geometry", function() { return Geometry; });
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
 * Geometry contains geometrical data like coordinates, normals, texCoords, colors,etc.
 *
 * @class Geometry
 * @memberof module:mwSG
 * 
 **/
class Geometry { 
  /**
   * @constructor
   */
  constructor(options) {
    const numComponents = (content) => content.toString(2)
        .padStart(8,'0')
        .split('')
        .reverse()
        .reduce( (accu,bit,index) => {
          let value = bit * 2**index;
          accu += (value !== 0) ? mwsg.Shape.itemLength[value] : 0;
          return accu;
        },0);


    /**
    * The type
    *
    * @type {string}
    *
    * @description
    * - 'none'
    * - 'POINTS'
    * - 'LINES'
    * - 'TRIANGLES'
    **/
    this.type    = options.type || 'none';

    /**
    * The content - A description of all the vertex data in this geometry. For example,
    *
    *```javascript
    * "content" : Shape.XYZ | Shape.RGB | Shape.ST
    *```
    * The various available values are:
    *
    * - Shape.XYZ
    * - Shape.XYZW
    * - Shape.NXYZ
    * - Shape.RGB
    * - Shape.RGBA
    * - Shape.ST
    **/
    this.content = options.content;

    /**
    * The data - A [Float32Array]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array} 
    * array containing the vertex data
    *
    * @example
    * If the content is Shape.XYZ | Shape.RGB, it means that in the same array, one vertex is defined by three X,Y, and Z-coordinates plus
    * three Red, Green, and Blue color values like this...
    * var data [X Y Z R G B X Y Z R G B ... Z R G B ]
    **/
    this.data = options.data;

    /**
    * The attributes - An array of {@link module:graphics.Attribute} used by the shader program
    *
    **/
    this.attributes = options.attributes; // || [];

    // TODO Obsolete
    this._isIndexed = (this.type === 'indexed') ? true : false;
    
    if (this.type === 'indexed') {
      this.numIndices = this.data.length;
    }
    else {
      this.numVertices = this.data.length / numComponents(this.content);
    }

    // HACK console.log(this.attributes);
  }

  getBuffer(name) {
    var stop = false;
    var i=0;
    while (!stop && i < this.VBO.length) {
      if (this.VBO[i].type === name) {
        return this.VBO[i];
      }
      i++;
    }
    return null;
  };

  isIndexed() {
    return this._isIndexed;
  };



} // End of class Geometry




/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Light", function() { return Light; });
/* harmony import */ var _mwsg_leaf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
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
 * Light
 *
 * @class Light
 * @memberof module:graphics
 * @constructor
 * @augments Leaf
 **/
class Light extends _mwsg_leaf_js__WEBPACK_IMPORTED_MODULE_0__["Leaf"] {
  /**
   * @constructor
   */
  constructor() {
    super();
    this.ID = 'light';

      // NodeGL
    this.nodeGL = new mwgl.Node(this);
  }

} // End of class Light




/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Renderer", function() { return Renderer; });
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
      return context;
    }

    this.ID = 'renderer';


    this.handlers = [];

    this.canvas = document.createElement('canvas');
    this.canvas.width  = w;
    this.canvas.height = h;

    this.context = createWebGLContext(this.canvas);
    
    if (!this.context) {
        MOWGLI.alert('ERR:context');
        return;
    }
    
    // Create a scene
    this.scene = new mwsg.Scene();
    this.scene.parent = this;

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
    this.fire();
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




/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Scene", function() { return Scene; });
/* harmony import */ var _mwsg_composite_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
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
 * Scene: Root of the scene graph
 *
 * @class Scene
 * @memberof module:mwSG
 * @constructor
 * @augments Composite
 **/
class Scene extends _mwsg_composite_js__WEBPACK_IMPORTED_MODULE_0__["Composite"] {
  constructor() {
    super();
    this.ID = 'scene';
    this.cameras = [];
    this.backgroundColor = {
      r:0.0,
      g:0.0,
      b:0.0,
      a:1.0
    };
    this.nodeGL = new mwgl.Scene(this);
  }


  /**
   * Set default scene with a camera and a light
   *
   **/
  setDefault() {
    this.name = 'scene_default';
    // Add a camera
    var cam = new mwsg.Camera();
    this.add(cam);
    // Add a light
    this.add(new mwsg.Light()  );
  };

  /**
   * Add a node/object in this scene
   *
   **/
  add(an_object) {
    super.add(an_object);

    // Special case of the camera
    if (an_object instanceof mwsg.Camera) {
      this.cameras.push(an_object);
      // Observe the renderer for canvas resize
      this.parent.subscribe(an_object);
    }
  };

  /**
   * Get Camera in the scene
   *
   * @return {Camera} Returns the current camera
   **/
  getCamera() {
    // TODO: must be improved if CameraGroup exists for stereo
    return this.children.filter( (child) => child.ID === 'camera');
  };

  /**
   * Render this object and traverse its children
   * Function called by the renderer
   *
   * @param{number} OpenGL context
   **/
  render(context) {
    console.log('RENDER_Scene ' + this.ID );// HACK
    // HACK console.log(this.parent);
    // Update matrix
    if (!(this.parent.ID === 'renderer') ) {
        mat4.multiply(this.getNodeGL().workmatrix,this.parent.getNodeGL().workmatrix,this.matrix);
    }

    // Sort children
    this.children.sort( (a, b) => a.ID - b.ID);

    // Render Scene...
    this.getNodeGL().render(context);

    // For each camera in scene...
    for (var i = 0; i < this.cameras.length; i++) {
      // Clear screen & buffers, update cam matrices, etc.
      this.cameras[i].render(context);
      // Propagate to children
      for (var j in this.children) {
        if (this.children[j].ID !== 'camera') {
          this.children[j].render(context);
        }
      }
    }

  };

  toString() {
    return this.children.reduce( (accu,child,index) => `${accu}+-${index}: ${child.ID}::${child.name}\n${child.toString()}\n`, `${this.ID}::${this.name}\n`);
  };



} // End of class Scene




/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShapeGroup", function() { return ShapeGroup; });
/* harmony import */ var _mwsg_composite_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
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
 * ShapeGroup: A collection of shapes
 *
 * @class ShapeGroup
 * 
 * @memberof module:mwSG
 * @augments Composite
 **/
class ShapeGroup extends _mwsg_composite_js__WEBPACK_IMPORTED_MODULE_0__["Composite"] {
  /**
   * @constructor
   */
  constructor() {
    super();
    this.ID = 'group[shape]';
    this.nodeGL = new mwgl.Node(this);

  }


} // End of class ShapeGroup


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Shape", function() { return Shape; });
/* harmony import */ var _mwsg_leaf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
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
 * Shape: Graphical object defined by geometries (Vertex Data) and a rendering style (Shader Program).
 *
 * The classical way to create a shape in Mowgli is:
 *
 * ```javascript
 * var shape = new Shape();
 * shape.type = 'POINTS';
 * var vrtxData = {
 *     'content': Shape.XYZ | Shape.RGB,
 *     'data':vertices,
 *     'attributes': [new Attribute("aVertexPosition",0,6), new Attribute("aVertexColor",3,6)]
 * };
 * shape.addVertexData(vrtxData);
 * shape.setProgram(shaderProgram);
 *
 * ```
 * @class Shape
 * @memberof module:mw<sg
 * 
 * @augments mwsg.Leaf
 **/
class Shape extends _mwsg_leaf_js__WEBPACK_IMPORTED_MODULE_0__["Leaf"] {
  /**
   * @constructor
   */
  constructor() {
    super();

    this.ID = 'shape';
    this.colorMode = 'monochrome';
    this.shaderProgram = null;
    this.geometries = [];
    this.textures   = [];
    this.uniforms   = [];

    this.type = 'POINTS';

    this.centroid = {
      x:0,
      y:0,
      z:0
    };

    this._isIndexed=false;

    this.nodeGL = new mwgl.Shape(this);
  }

  static get XYZ() {
    return 1;
  }
  
  static get XYZW() {
    return 2;
  }
  static get NXYZ() {
    return 4;
  }
  static get RGB() {
    return 8;
  }
  static get RGBA() {
    return 16;
  }
  static get ST() {
    return 32;
  }
  static get INDICES() {
    return 64;
  }

  // Private
  static get itemLength() {
    return {
      1  : 3,
      2  : 4,
      4  : 3,
      8  : 3,
      16 : 4,
      32 : 2,
      64 : 1
    };
  } 

  /**
   * Set Program
   *
   * @param {Program} a_program - A shader program defining the rendering style
   *
   **/
  setProgram(a_program) {
      this.nodeGL.shaderProgram = a_program;
  };

  /**
   * Flag indicating if this shape contains indexed geometries
   *
   * @return {boolean}
   *
   **/
  isIndexedGeometry() {
      return this._isIndexed;
  };

  /**
   * Add Vertex Data.
   *
   * These data may contain:
   * - Coordinates
   * - Normals
   * - Colors
   * - Indices
   * - And/or texture coordinates.
   *
   * @param {VertexData} a_geom - Contains all the data describing the vertices of this shape
   *
   *
   *
   * @property {VertexData} a_geom
   * @property {number}  a_geom.type
   * @property {number}  a_geom.type.Shape.XYZ - X, Y, Z- Vertex Coordinates
   * @property {number}  a_geom.type.Shape.XYZW - X, Y, Z, W- Vertex Coordinates
   * @property {number}  a_geom.type.Shape.NXYZ - X, Y, Z- Normal Coordinates
   * @property {number}  a_geom.type.Shape.RGB - Red, Green, and Blue Color
   * @property {number}  a_geom.type.Shape.RGBA - Red, Green, Blue, and Alpha Color
   * @property {number}  a_geom.type.Shape.ST - S,T Texture Coordinates
   * @property {Array(number)}  a_geom.data
   * @property {Array(number)}  a_geom.indices
   * @property {Array(Attribute)}  a_geom.attributes
   *
   **/
  addVertexData(a_geom) {
    if ( a_geom.indices !== undefined) {
      this._isIndexed = true;
      this.geometries.push(
        new mwsg.Geometry({
          type       : 'indexed',
          content    : a_geom.content,
          data       : new Uint16Array(a_geom.indices),
          attributes : []
        })
      );
    }

    this.geometries.push(
      new mwsg.Geometry( {
        'type'     : 'vertex',
        'content'    : a_geom.content,
        'data'     : new Float32Array(a_geom.data),
        'attributes' : a_geom.attributes
      })
    );

    // HACK console.log(this.geometries);
    // Set the number of items in this shape
    // this.numItems = a_geom.data.length / itemSize;
  };


  addTexture(image_name) {
      var image = new Image();
      image.src = image_name;
      this.textures.push(image);
  };

  addUniformData(a_uniform) {
      this.uniforms.push(a_uniform);
  };

  /**
   * Remove Vertex Data (aka geometry).
   *
   * These data may contain:
   * - Coordinates
   * - Normals
   * - Colors
   * - Indices
   * - And/or texture coordinates.
   *
   * @param {number} geom_content - Delete the geometry with the given content
   *

   *
   **/
  removeVertexData(geom_content) {
      var i = 0;
      var stop = false;
      while (!stop) {
          if (this.geometries[i].content === geom_content) {
              stop = true;
          }
          i++;
          if (i >= this.geometries[i].length) {
              stop = true;
              i = -1;
          }
      }
      if (i !== -1) {
          delete this.geometries[i];
      }

      // Update the OpenGL counterpart
      this.nodeGL.removeVBO(geom_content);

      // Update status
      if (((this.type & Shape.XYZ) === Shape.XYZ)
      || ((this.type & Shape.XYZW) === Shape.XYZW)
      || ((this.type & Shape.NXYZ) === Shape.NXYZ) ) {
          this._isDirty &= ~Node.GEOMETRY;
      }
      else {
          // Shape.RGB || Shape.RGBA  || Shape.ST
          this._isDirty &= ~Node.MATERIAL;
      }

  };

  /**
   * Set centroid
   *
   * @param {Point3D} cg - Centroid
   *
   **/
  setCentroid(cg) {
      this.centroid = cg;
  };

  update(context) {
      // TODO
  };

  updateUniforms(context) {
      // TODO
  };

} // End of class Shape



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cube", function() { return Cube; });
/* harmony import */ var _mwsg_shape_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
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





/*
 * @class
 */

class Cube extends _mwsg_shape_js__WEBPACK_IMPORTED_MODULE_0__["Shape"] {
  constructor() {
    super();
    this.ID = 'cube';
  }


/*
 * Set style of this cube:
 * @param{string} 'wireframe','solid','shaded','textured'
 */
  setStyle(type) {
    switch (type) {
    case 'wireframe' :
        this.ID = 'cubeWire';
        // 1- Define geometry
        var _indices = [0,1,2,3,0,4,5,6,7,4,5,1,2,6,7,3];
        this.type = 'LINE_STRIP';
        this.addVertexData(
            {
                'content'   : _mwsg_shape_js__WEBPACK_IMPORTED_MODULE_0__["Shape"].XYZ,
                'data'      : Cube.verticesWire,
                'numItems'  : 8,
                'indices'   :_indices,
                'attributes': [new gpu.Attribute("aVertexPosition",3,'float',0,0)]
            }
        );
/**
        this.addUniformData(
            {
                'content': ['RGB'],
                'data'   : [1.0,0.6,0.2],
                'uniform': [new Uniform("uColor")]
            }
        )
**/
        this.numItems = Cube.verticesWire.length / 3;
        // 2- Define graphics style
        //this.setProgram(shaderProgram);

        break;
    case 'solid' :
        this.ID = 'cubeSolid';
        this.type = 'TRIANGLES';
        this.addVertexData(
            {
                'content': _mwsg_shape_js__WEBPACK_IMPORTED_MODULE_0__["Shape"].XYZ,
                'data': Cube.vertices,
                'indices': Cube.indices,
                'attributes': [new gpu.Attribute("aVertexPosition",0,0)]
            }
        );
        this.addVertexData(
            {
                'content': _mwsg_shape_js__WEBPACK_IMPORTED_MODULE_0__["Shape"].RGB,
                'data': Cube.colors,
                'attributes': [new gpu.Attribute("aVertexColor",0,0)]
            }
        );

        this.addVertexData(
            {
                'content'   : _mwsg_shape_js__WEBPACK_IMPORTED_MODULE_0__["Shape"].XYZ | _mwsg_shape_js__WEBPACK_IMPORTED_MODULE_0__["Shape"].RGBA,
                'data'      : Cube.vertices,
                'indices'   : Cube.indices,
                'attributes': [new gpu.Attribute("aVertexPosition",0,7), new Attribute("aVertexColor",3,7)]
            }
        );
        this.numItems = Cube.vertices.length / 7;
        break;
    case 'shaded':
        this.ID = 'cubeShaded';
        // TODO
        break;
    case 'textured' :
        this.ID = 'cubeTextured';
        // TODO
        break;
    default:

    }
};


  static get verticesWire() {
    return [
     1, 1,-1,
     1,-1,-1,
    -1,-1,-1,
    -1, 1,-1,
     1, 1, 1,
     1,-1, 1,
    -1,-1, 1,
    -1, 1, 1
    ];
  }

  static get vertices() {
    return [
    // Front face
    -1.0, -1.0,  1.0, 1.0, 0.0, 0.0, 1.0,
     1.0, -1.0,  1.0, 1.0, 0.0, 0.0, 1.0,
     1.0,  1.0,  1.0, 1.0, 0.0, 0.0, 1.0,
    -1.0,  1.0,  1.0, 1.0, 0.0, 0.0, 1.0,

    // Back face
    -1.0, -1.0, -1.0, 1.0, 1.0, 0.0, 1.0,
    -1.0,  1.0, -1.0, 1.0, 1.0, 0.0, 1.0,
     1.0,  1.0, -1.0, 1.0, 1.0, 0.0, 1.0,
     1.0, -1.0, -1.0, 1.0, 1.0, 0.0, 1.0,

    // Top face
    -1.0,  1.0, -1.0, 0.0, 1.0, 0.0, 1.0,
    -1.0,  1.0,  1.0, 0.0, 1.0, 0.0, 1.0,
     1.0,  1.0,  1.0, 0.0, 1.0, 0.0, 1.0,
     1.0,  1.0, -1.0, 0.0, 1.0, 0.0, 1.0,

    // Bottom face
    -1.0, -1.0, -1.0, 1.0, 0.5, 0.5, 1.0,
     1.0, -1.0, -1.0, 1.0, 0.5, 0.5, 1.0,
     1.0, -1.0,  1.0, 1.0, 0.5, 0.5, 1.0,
    -1.0, -1.0,  1.0, 1.0, 0.5, 0.5, 1.0,

    // Right face
     1.0, -1.0, -1.0, 1.0, 0.0, 1.0, 1.0,
     1.0,  1.0, -1.0, 1.0, 0.0, 1.0, 1.0,
     1.0,  1.0,  1.0, 1.0, 0.0, 1.0, 1.0,
     1.0, -1.0,  1.0, 1.0, 0.0, 1.0, 1.0,

    // Left face
    -1.0, -1.0, -1.0, 0.0, 0.0, 1.0, 1.0,
    -1.0, -1.0,  1.0, 0.0, 0.0, 1.0, 1.0,
    -1.0,  1.0,  1.0, 0.0, 0.0, 1.0, 1.0,
    -1.0,  1.0, -1.0, 0.0, 0.0, 1.0, 1.0
    ];
  }
  

  static get indices() {
    return [
     0, 1, 2,      0, 2, 3,    // Front face
     4, 5, 6,      4, 6, 7,    // Back face
     8, 9, 10,     8, 10, 11,  // Top face
    12, 13, 14,   12, 14, 15, // Bottom face
    16, 17, 18,   16, 18, 19, // Right face
    20, 21, 22,   20, 22, 23  // Left face
    ];
  }

}



/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Mesh", function() { return Mesh; });
/* harmony import */ var _mwsg_shape_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
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
 * Triangle Mesh
 *
 * @class Mesh
 */
class Mesh extends _mwsg_shape_js__WEBPACK_IMPORTED_MODULE_0__["Shape"] {

  /**
   * @constructor
   *
   */
  constructor() {
    super();
    this.ID = 'mesh';
    this.vertices = [];
    this.triangles = [];
    this.normals = [];
  }

  /**
   * Set style of this mesh:
   * @param{string} 'wireframe','solid'
   */
  setStyle(type) {
    switch (type) {
    case 'wireframe' :
      this.ID = 'meshWire';
      // 1- Define geometry
      this.type = 'LINES';
      let _indices = [];
      for (let i = 0; i < this.triangles.length; i+=3) {
        _indices.push(this.triangles[i]);
        _indices.push(this.triangles[i+1]);
        _indices.push(this.triangles[i+1]);
        _indices.push(this.triangles[i+2]);
        _indices.push(this.triangles[i+2]);
        _indices.push(this.triangles[i]);
      }
      this.addVertexData(
          {
              'content'   : _mwsg_shape_js__WEBPACK_IMPORTED_MODULE_0__["Shape"].XYZ,
              'data'      : this.vertices,
              'indices'   : _indices,
              'attributes': [new gpu.Attribute("aVertexPosition",3,'float',0,0)]
          }
      );
      break;
    case 'solid' :
      this.ID = 'meshSolid';
      this.type = 'TRIANGLES';
      this.addVertexData(
          {
              'content': _mwsg_shape_js__WEBPACK_IMPORTED_MODULE_0__["Shape"].XYZ,
              'data': this.vertices,
              'indices': this.indices,
              'attributes': [new gpu.Attribute("aVertexPosition",3,'float',0,0)]
          }
      );
      this.addVertexData(
          {
              'content': _mwsg_shape_js__WEBPACK_IMPORTED_MODULE_0__["Shape"].RGB,
              'data': this.colors,
              'attributes': [new gpu.Attribute("aVertexColor",0,0)]
          }
      );

      this.addVertexData(
          {
              'content'   : _mwsg_shape_js__WEBPACK_IMPORTED_MODULE_0__["Shape"].XYZ | _mwsg_shape_js__WEBPACK_IMPORTED_MODULE_0__["Shape"].RGBA,
              'data'      : this.vertices,
              'indices'   : this.indices,
              'attributes': [new gpu.Attribute("aVertexPosition",0,7), new Attribute("aVertexColor",3,7)]
          }
      );
      this.numItems = Cube.vertices.length / 7;
      break;

    default:
    // TODO
    }
  };
}




/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mwgl_camera_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(15);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Camera", function() { return _mwgl_camera_js__WEBPACK_IMPORTED_MODULE_0__["Camera"]; });

/* harmony import */ var _mwgl_node_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Node", function() { return _mwgl_node_js__WEBPACK_IMPORTED_MODULE_1__["Node"]; });

/* harmony import */ var _mwgl_scene_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(17);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Scene", function() { return _mwgl_scene_js__WEBPACK_IMPORTED_MODULE_2__["Scene"]; });

/* harmony import */ var _mwgl_shape_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(18);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Shape", function() { return _mwgl_shape_js__WEBPACK_IMPORTED_MODULE_3__["Shape"]; });

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
 












/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Camera", function() { return Camera; });
/* harmony import */ var _mwgl_node_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16);
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
 * @module mwgl
 */



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
class Camera extends _mwgl_node_js__WEBPACK_IMPORTED_MODULE_0__["Node"] {
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
    console.log(this.sgnode.viewport);

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



/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Node", function() { return Node; });
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
 * @module mwGL
 */


/**
 * OpenGL node of the scene graph
 *
 * @class Node
 * @memberof module:mwGL
 *
 **/
class Node {
  /**
   * @constructor
   * @param {Node} node - Object belonging to the scene graph
   * @extends module:mwGL.Node
   * @author Jean-Christophe Taveau
   */
  constructor(node) {
    this.sgnode = node;
    this.glType = -1;
    this._isDirty = true;

    // Matrix for rotation(s) and translation(s)
    this.workmatrix= mat4.create();
    mat4.identity(this.workmatrix);
  };

  isDirty() {
    return this._isDirty;
  };

  init(context) {
    // Do nothing
    this.isDirty = false;
  };

  pre_render(context) {
    // Do nothing
  };

  render(context) {
    // Do nothing
  };

  post_render(context) {
    // Do nothing
  };

};


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Scene", function() { return Scene; });
/* harmony import */ var _mwgl_node_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16);
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
 * @module mwGL
 */



/**
 * WebGL part of Camera class
 *
 * @class Scene
 * @memberof module:mwGL
 *
 *
 **/
class Scene extends _mwgl_node_js__WEBPACK_IMPORTED_MODULE_0__["Node"] {
  /**
   * @constructor
   * @param {Node} node - Scene belonging to the scene graph
   * @extends module:mwGL.Node
   * @author Jean-Christophe Taveau
   **/
  constructor(node) {
    super(node);
  }

  render(context) {
    const gl = context;

    // Clear Screen And Depth Buffer
    gl.clearColor(this.sgnode.backgroundColor.r,this.sgnode.backgroundColor.g,this.sgnode.backgroundColor.b,this.sgnode.backgroundColor.a);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  };


} // End of class mwgl.Scene




/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Shape", function() { return Shape; });
/* harmony import */ var _mwgl_node_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16);
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
 * OpenGL part of Shape
 *
 * @class ShapeGL
 * @memberof module:mwGL
 *
 **/
class Shape extends _mwgl_node_js__WEBPACK_IMPORTED_MODULE_0__["Node"] {
 /**
  * @constructor
  */
  constructor(node) {
    super(node);

    this.numIndices = 0;
    this.numVertices = 0;
    this.VBOs = [];
    this.GLTextures = [];
    this.shaderProgram = null;
  }

  /**
   * Init of the OpenGL part: VBO creation
   *
   * @param {number} context - Graphics context
   **/
  init(context) {
    console.log('>>> INIT GL ' + this.sgnode.ID);
    // Get the corresponding node of the scene graph
    var shape = this.sgnode;

    // Add shader(s) to the renderer for uniform management
    this.sgnode.getRenderer().addShader(this.shaderProgram);

    // For each buffer, create corresponding VBO
    for (var i in shape.geometries) {
        this.VBOs[i] = this._createVBO(context,shape.geometries[i]);
    }

    // For each textured image, create corresponding Texture
    // HACK console.log('INIT TEXTURE TOTAL:' + shape.textures.length);
    // HACK console.log(shape.textures);
    for (var i=0; i < shape.textures.length; i++) {
        // HACK console.log('INIT TEXTURE '+shape.textures[i]);
        // TODO
        this.GLTextures.push(this._createTexture(context,shape.textures[i]) );
    }

    // All is fine (I hope ?)
    this.isDirty = false;
  };

  /**
   * Render this shape; Called by the renderer
   *
   **/
  render(context) {
    // HACK console.log('>>>   render');
    const gl = context;
    // Update matrix: multiply current matrix with parent matrix
    mat4.multiply(this.workmatrix,this.sgnode.parent.getNodeGL().workmatrix,this.sgnode.matrix);
    // HACK console.log('matrix ' + this.workmatrix);
    this.sgnode.getRenderer().setUniform('uMMatrix', this.workmatrix);

    // Choose shader
    // HACK console.log(this.shaderProgram);
    this.shaderProgram.use();

    // TODO console.log('coordSize '+ this.numItems );


    // For this geometry, activate VBO
    for (var j=0; j < this.VBOs.length; j++) {
        var vbo = this.VBOs[j];
        if (vbo.type === 'indexed') {
            //HACK console.log('bind indexed buffer '+ vbo.type + ' ' + vbo.ID+ ' ' + vbo.data);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vbo.ID);
        }
        else {
            // HACK console.log('bind buffer '+ vbo.type + ' ' + vbo.ID);
            gl.bindBuffer(gl.ARRAY_BUFFER, vbo.ID);
        }
        for (let k in vbo.attributes) {
            let attribute = vbo.attributes[k];
            console.log(attribute);
            // HACK console.log('enable ' + k + ':'+ attribute.name+' '+attribute.location+' '+attribute.size+' '+attribute.stride+' '+attribute.offset);
            gl.enableVertexAttribArray(attribute.location );
            gl.vertexAttribPointer(
                attribute.location,
                attribute.size,
                gl.FLOAT,
                false,
                attribute.stride * mwsg.Renderer.FLOAT_IN_BYTES,
                attribute.offset * mwsg.Renderer.FLOAT_IN_BYTES
            );
        }
    }

    // For this geometry, activate Texture
    for (var i=0; i < this.GLTextures.length; i++) {
        // TODO
        if (this.GLTextures[i] !== undefined) {
            // HACK console.log('Activate tex ' + this.GLTextures[i]);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, this.GLTextures[i]);
            this.sgnode.getRenderer().setUniform('uTexture', 0);
        }
    }
    if (this.GLTextures.length > 0) {
        // gl.enable ( gl.TEXTURE_2D );
    }

    // TODO Update uniforms
    this.shaderProgram.updateUniforms();

    // Draw ...
    // HACK console.log(this.sgnode.type + ' '+ this.glType +' '+ this.numIndices+' '+ this.numItems);
    if (this.numIndices !== 0 ) {
        gl.drawElements(this.glType, this.numIndices, gl.UNSIGNED_SHORT, 0);
    }
    else {
        // HACK console.log('drawArrays');
        gl.drawArrays(this.glType, 0, this.numVertices);
    }
  };

  removeVBO (geom_content) {
    const gl = this.context;

    // Search VBO...
    var i = 0;
    var stop = false;
    while (!stop) {
        if (this.VBOs[i].content === geom_content) {
            stop = true;
        }
        i++;
        if (i >= this.VBOs.length) {
            stop = true;
            i = -1;
        }
    }
    // Found it!!
    if (i !== -1) {
        var vbo = this.VBOs[i];
        gl.bindBuffer(gl.ARRAY_BUFFER, vbo.ID);
        gl.bufferData(gl.ARRAY_BUFFER, 1, gl.STATIC_DRAW);
        gl.deleteBuffer(vbo.ID);
        if (vbo.type === 'indexed') {
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vbo.IndxID);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, 1, gl.STATIC_DRAW);
            gl.deleteBuffer(vbo.IndxID);
        }
        delete this.VBOs[i];
    }
  };

  // Private
  _createVBO(context,geom) {
    const gl = context;
    // HACK console.log('SHAPE TYPE ' + this.sgnode.type);
    switch (this.sgnode.type) {
    case 'POINTS':
    case 'POINTS_RADIUS':
        this.glType = gl.POINTS;
        break;
    case 'LINES':
        this.glType = gl.LINES;
        break;
    case 'LINE_STRIP':
        this.glType = gl.LINE_STRIP;
        break;
    case 'LINE_LOOP':
        this.glType = gl.LINE_LOOP;
        break;
    case 'TRIANGLES':
        this.glType = gl.TRIANGLES;
        break;
    case 'TRIANGLE_STRIP':
        this.glType = gl.TRIANGLE_STRIP;
        break;
    }
    // Init VBO
    let vbo = {
      attributes : [],
      type : geom.type,
      content : geom.content
    };
    
    // Create VBO
    vbo.ID = gl.createBuffer();
    if (vbo.type === 'indexed') {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vbo.ID);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, geom.data, gl.STATIC_DRAW);
        this.numIndices = geom.numIndices;
    }
    else {
        gl.bindBuffer(gl.ARRAY_BUFFER, vbo.ID);
        gl.bufferData(gl.ARRAY_BUFFER, geom.data, gl.STATIC_DRAW);
        this.numVertices = geom.numVertices;
    }


    // Update attribute(s) associated to this VBO
    // HACK console.log('VBO attributes');
    // HACK console.log(geom.attributes);
    for (var j=0; j < geom.attributes.length; j++) {
      vbo.attributes[j] = geom.attributes[j];
      vbo.attributes[j].location = this.shaderProgram.getAttribLocation(geom.attributes[j].name);
        // TODO console.log('location [' + vbo.attributes[j].name + ']= '+ vbo.attributes[j].location + ' '+vbo.attributes[j].size);
    }

    //HACK console.log('VBO ID: ' + JSON.stringify(vbo) );
    return vbo;

  };

  // Private
  _createTexture(context, img) {
  
    function newTexture(img,glTex) {
      const powerOfTwo = (n) => ( (n & (n - 1)) == 0);
      
      // Image now asynchronously loaded
      // Check dimension
      if (!powerOfTwo(img.width) || !powerOfTwo(img.height) ) {
        // Alert
        var msg = 'ERR: The texture '+img.src+' has non power-of-two dimension';
        alert(msg);
      }
      else {
        gl.bindTexture(gl.TEXTURE_2D, glTex);
        // Set parameters
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); //_MIPMAP_NEAREST);

        //gl.generateMipmap(gl.TEXTURE_2D);

        // Fill texture with image data
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);

        // Free texture binding
        gl.bindTexture(gl.TEXTURE_2D, null);
      }
    }
    
    // Main
    const gl = context;
    let glTex = gl.createTexture();
    this.GLTextures.push(glTex);

    // TODO console.log('Create Texture from '+img.src + ' ' + img.complete);
/*
TODO Fix Bug
    img.onload() {
        newTexture(img,glTex);
    };
*/
  };


  _updateAttributes(context) {
    const gl = context;
/***
  if (this.shaderProgram.attributes.length != this.geometry.attributes.length) {
    console.log(this.shaderProgram.attributes);
    console.log(this.shaderProgram.attributes.length + ' != ' + this.geometry.attributesLength() );
    console.log("MOWGLI: Attributes are not correctly defined");
  }
*****/
    for (var i=0; i < this.geometry.VBO.length;i++) {
      var vbo = this.geometry.VBO[i];
      for (var j=0; j < vbo.attributes.length; j++) {
          vbo.attributes[j].location = this.shaderProgram.getAttribLocation(vbo.attributes[j].name);
          vbo.attributes[j].size = this.shaderProgram.attributes[vbo.attributes[j].name].size;
          // HACK console.log('location [' + vbo.attributes[j].name + ']= '+ vbo.attributes[j].location + ' '+vbo.attributes[j].size);
      }
    }
  };
  
} // End of class mwgl.Shape




/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mwui_mouseSensor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(20);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MouseSensor", function() { return _mwui_mouseSensor_js__WEBPACK_IMPORTED_MODULE_0__["MouseSensor"]; });

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
 










/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MouseSensor", function() { return MouseSensor; });
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
 * MouseSensor
 * @class MouseSensor
 * 
 * @memberof module:mwUI
 */
class MouseSensor {
  /**
   * @constructor
   */
  constructor(canvas) {
  
    this.shapes = [];
    this.renderer;
    
    
    let mousePosition=[0.0,0.0];
    let currentAngle=[0.0,0.0];

    let lastX = -1;
    let lastY = -1;
    let dragging = false;

    let zoom = 0;
    let zoomDelta=0.01;


    
    let that = this;

    canvas.onmousedown = (ev) => {
      //Mouse is pressed
      let x = ev.clientX;
      let y = ev.clientY;

      let rect = ev.target.getBoundingClientRect();
      if(rect.left <= x && x <= rect.right && rect.top <= y && y <= rect.bottom) {
        lastX = x;
        lastY = y;
        mousePosition[0] = x;
        mousePosition[1] = canvas.height - y;
        dragging = true;
      }
    };

    canvas.onmouseup = (ev) => {
      //Mouse is released
      dragging = false;
    };

    canvas.onmousemove = (ev) => {
      //Mouse is moved
      var x = ev.clientX;
      var y = ev.clientY;
      if (dragging) {
        //put some kind of dragging logic in here
        //Here is a rotation example
        var factor = 0.05;
        var dx = factor * (x - lastX);
        var dy = factor * (y - lastY);
        //Limit x-axis rotation angle to -90 to 90 degrees
        currentAngle[0] = Math.max(Math.min(currentAngle[0] + dy, 90), -90);
        currentAngle[1] = currentAngle[1] + dx;

        mousePosition[0] = x;
        mousePosition[1] = canvas.height - y;

        // Update shape(s) matrix
        // HACK console.log(currentAngle[0]+ ' '+ currentAngle[1])
        var tmp = mat4.create();
        mat4.identity(tmp);
        mat4.rotate(tmp,tmp,dx,[0,1,0]);
        mat4.rotate(tmp,tmp,dy,[1,0,0]);

        // Apply rotation to each registered shape
        for (var i in that.shapes) {
          mat4.multiply(that.shapes[i].matrix,tmp,that.shapes[i].matrix);
        }
        // Update Display
        that.renderer.drawScene();
      }
      lastX = x;
      lastY = y;
    };
  }
  
  /**
   * Attach shape
   */
  attach(a_shape) {
    this.shapes.push(a_shape);
  }

  setRenderer(r) {
    this.renderer = r;
  }
  
} // End of class MouseSensor




/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _attribute_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(22);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Attribute", function() { return _attribute_js__WEBPACK_IMPORTED_MODULE_0__["Attribute"]; });

/* harmony import */ var _program_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(23);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Program", function() { return _program_js__WEBPACK_IMPORTED_MODULE_1__["Program"]; });

/* harmony import */ var _uniform_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(26);
/* harmony import */ var _uniform_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_uniform_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Uniform", function() { return _uniform_js__WEBPACK_IMPORTED_MODULE_2__["Uniform"]; });

/* harmony import */ var _exceptions_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(24);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ShaderCompilationException", function() { return _exceptions_js__WEBPACK_IMPORTED_MODULE_3__["ShaderCompilationException"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ShaderLinkException", function() { return _exceptions_js__WEBPACK_IMPORTED_MODULE_3__["ShaderLinkException"]; });

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











/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Attribute", function() { return Attribute; });
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
 * Attribute class used by the shader program
 *
 * @class Attribute
 * @memberof module:graphics
 * 
 **/
class Attribute {
  /**
   * @constructor
   */
  constructor(name,size,type,offset,stride) {

    /** 
    * The name
    * @type {string}
    *
    **/
    this.name = name;

    /**
     * A GLint specifying the number of components per vertex attribute. 
     * Must be 1, 2, 3, or 4.
     */
    this.size = size;
    
    /**
     * 
     */
    this.type = type;
    /**
    * The offset
    * @type {number}
    *
    **/
    this.offset = offset;

    /**
    * The stride
    * @type {number}
    *
    **/
    this.stride = stride;


    this.location = -1;
  }
} // End of class Attribute




/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Program", function() { return Program; });
/* harmony import */ var _exceptions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(24);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(25);
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
 * OpenGL shader program class
 *
 * @class Program
 * @memberof module:graphics
 * 
 *
 * @example
  * // 1- Create a new shader program termed 'cel-shading' from the current graphics context
 *  var shaderProgram = new Program(renderer.getContext(),'cel-shading');
 *  // 2- Load vertex source file from DOM and compile
 *  shaderProgram.loadDOM("vertex"  ,"cel-shading-vs");
 *  // 3- Load fragment source file from DOM and compile
 *  shaderProgram.loadDOM("fragment","cel-shading-fs");
 *  // 4- Link the program
 *  shaderProgram.link();
 *  // 5 Get uniformLocation
 *  shaderProgram.setUniformLocation("uPMatrix");
 *  shaderProgram.setUniformLocation("uVMatrix");
 *  shaderProgram.setUniformLocation("uMMatrix");
 *
 * @author Jean-Christophe Taveau
 *
 **/
class Program {
  /**
   * @constructor
   */
  constructor(context,name) {
    this.ctx = context;
    this.name = name;
    this.vertex_shader   = null;
    this.fragment_shader = null;
    this.shaderProgram;
    this.attributes ={};
    this.uniforms = {};
    this.attribLocation = {};
    this.uniformLocation = {};
  }

  attribute(a_name,a_num,a_type,a_stride,a_offset) {
    this.attributes[a_name] = {
      name: a_name,
      num : a_num,
      type: a_type, 
      stride: a_stride,
      offset: a_offset,
      location: null
    };
  }
  
  /**
   *
   */
  uniform(u_name,u_value) {
    let gl = this.ctx;
    
    let u = this.uniforms[u_name];

    switch (u.type) {
      case 'float': gl.uniform1f(u.location, u_value);break;
      case 'int': gl.uniform1i(u.location, u_value);break;
      case 'uint': gl.uniform1ui(u.location, u_value);break;
      case 'int[]': gl.uniform1iv(u.location, u_value);break;
      case 'float[]': gl.uniform1fv(u.location, u_value);break;
      case 'mat2': gl.uniformMatrix2fv(u.location, u_value);break;
      case 'mat3': gl.uniformMatrix3fv(u.location, u_value);break;
      case 'mat4': gl.uniformMatrix4fv(u.location, u_value);break;
      case 'sampler2D': gl.uniform1i(u.location, u_value);break;
      case 'vec2': gl.uniform2fv(u.location, u_value);break;
      case 'vec3': gl.uniform3fv(u.location, u_value);break;
      case 'vec4': gl.uniform4fv(u.location, u_value);break;
    };
  }

  /**
   * Get OpenGL ID of this shader program
   *
   **/
  getID() {
    return this.shaderProgram;
  };

  /**
   * Load vertex or fragment source files for compilation and link
   *
   * @param {string} type: Source file types - **'vertex'** or **'fragment'**
   * @param {string} name: Source filename
   **/
  load(type,src) {
    const gl = this.ctx;

    if (type === 'fragment') {
      this.fragment_shader = this._compile(gl.FRAGMENT_SHADER,src);
    }
    else if (type === 'vertex') {
      this.vertex_shader = this._compile(gl.VERTEX_SHADER,src);
    }
    else {
      return null;
    }

    // Extract attribute(s) and uniform(s) from shader sources and create objects
    this._createAttributesAndUniforms(src);

  };


  /**
   * Load vertex or fragment source files for compilation and link via http
   *
   * @param {string} type: Source file types - 'vertex' or 'fragment'
   * @param {string} name: Source filename
   **/
  loadHTTP(type,name) {
    const gl = this.ctx;
    // From http://www.html5rocks.com/en/tutorials/file/xhr2/
    // XMLHttpRequest()

    var url = 'shaders/'+name+'.'+type;
    var req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.responseType = 'text';
    req.onreadystatechange = function() {
      if (req.readyState==4 && req.status==200) {
        this.fragment_shader = this._compile(gl.FRAGMENT_SHADER,this.response);
      }
    };
    req.send();
  };

  /**
   * Load vertex or fragment source files for compilation and link from the DOM.
   * From Learning WEBGL.
   *
   * @param {string} type: Source file types - 'vertex' or 'fragment'
   * @param {string} name: ID of the html div
   **/
  loadDOM(type,name) {
    const gl = this.ctx;

    var shaderScript = document.getElementById(name);
    if (!shaderScript) {
      return null;
    }

    var str = '';
    var k = shaderScript.firstChild;
    while (k) {
      if (k.nodeType === 3) {
        str += k.textContent;
      }
      k = k.nextSibling;
    }

    return str;

  };


  link() {
    const gl = this.ctx;
    this.shaderProgram = gl.createProgram();
    gl.attachShader(this.shaderProgram, this.vertex_shader);
    gl.attachShader(this.shaderProgram, this.fragment_shader);
    gl.linkProgram(this.shaderProgram);

    if (!gl.getProgramParameter(this.shaderProgram, gl.LINK_STATUS)) {
      throw new _exceptions_js__WEBPACK_IMPORTED_MODULE_0__["ShaderLinkException"]('Could not link shaders');
    }
  };

  /**
   * Activate this shader program for rendering
   *
   **/
  use() {
    const gl = this.ctx;
    gl.useProgram(this.shaderProgram);
  };


  getAttribLocation(attrib_name) {
    const gl = this.ctx;
    gl.useProgram(this.getID());
    return gl.getAttribLocation(this.getID(),attrib_name);
  };

  /**
   *  Get uniform location and set up the corresponding array.
   * The method's name is not really appropriate (set/getUniform[...])
   *
   *
   **/
  setUniformLocation(name) {
    const gl = this.ctx;
    gl.useProgram(this.getID());
    this.uniformLocation[name]=gl.getUniformLocation(this.getID(),name);
  };

  getUniformLocation(name) {
    //const gl = this.ctx;
    return this.uniformLocation[name];
  };

  /**
   *  Update all the uniforms. This function is called by the ShapeGL.render().
   *
   *
   **/
  updateUniforms () {
    const gl = this.ctx;
    for (var i in this.uniforms) {
      var uniform = this.uniforms[i];
      console.log(uniform);
      switch (uniform.type) {
      case 'mat4' :
        gl.uniformMatrix4fv(this.getUniformLocation(uniform.name), false, uniform.value);
        break;
      case 'sampler2D' :
        gl.uniform1i(this.getUniformLocation(uniform.name), uniform.value);
        break;
      case 'vec3' :
        gl.uniform3fv(this.getUniformLocation(uniform.name), false, uniform.value);
        break;
      case 'vec4' :
        gl.uniform4fv(this.getUniformLocation(uniform.name), false, uniform.value);
        break;
      }
    }
  };

  /**
   * Private method for compiling shader
   *
   */
  _compile(type,text) {
  const gl = this.ctx;
  var shader = gl.createShader(type);
  gl.shaderSource(shader, text);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new _exceptions_js__WEBPACK_IMPORTED_MODULE_0__["ShaderCompilationException"](gl.getShaderInfoLog(shader) );
  }

  return shader;
  };

  /**
   * Create Shader Program
   * 
   * @author Jean-Christophe Taveau
   */
  create(src_vs,src_fs) {

    let shader = Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["createProgram"])({context: this.ctx},src_vs,src_fs);
    this.attributes = shader.attributes;
    this.uniforms = shader.uniforms;
    this.shaderProgram = shader.program;
  }


  /**
   * Private method to automatically detect in the shader source files the attribute(s) and uniform(s).
   * TODO - Must be improved to remove commented lines containing attributes and/or uniforms
   *
   */
  _createAttributesAndUniforms(source) {
    // Remove comments
    // Works in most cases. However, does not take into account weird cases :-)
    var text = source.replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, '');
    var rows = text.split(';');
    var re = /[\s,;]+/;
    var type;
    var qualifier = 'x';

    for (let i in rows) {
      var a_row = rows[i];
      if (a_row.indexOf('in') != -1 || a_row.indexOf('uniform') != -1) {
        var words = a_row.trim().split(re); //  match(/[\S,;]+/g);
        var itemSize = 0;
        // HACK console.log(words);
        for (let j=0; j < words.length; j++) {
          switch (words[j]) {
          case 'in':
            qualifier = 'a';
            break;
          case 'uniform':
            qualifier = 'u';
            break;
          case 'bool':
            itemSize = 1;
            type = words[j];
            break;
          case 'int' :
            itemSize = 1;
            type = words[j];
            break;
          case 'float':
            itemSize = 1;
            type = words[j];
            break;
          case 'sampler2D':
            itemSize = 1;
            type = words[j];
            break;
          case 'vec2':
            itemSize = 2;
            type = words[j];
            break;
          case 'vec3':
            itemSize = 3;
            type = words[j];
            break;
          case 'vec4':
            itemSize = 4;
            type = words[j];
            break;
          case 'mat4':
            itemSize = 16;
            type = words[j];
            break;
          default:
            if (qualifier == 'a' && words[j] != '') {
              // HACK console.log('attribute '+ words[j] + ' type '+ type);
              this.attributes[words[j]] = {'name':words[j],'type':type,'size':itemSize};
            }
            else if (qualifier == 'u' && words[j] != '') {
              // HACK console.log('uniform '+ words[j] + ' type '+ type);
              this.uniforms[words[j]] = {'name':words[j],'type':type,'size':itemSize};
            }
            break;
          }
        }
      }
    }
  };
  
} // End of class Program




/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShaderCompilationException", function() { return ShaderCompilationException; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShaderLinkException", function() { return ShaderLinkException; });
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



class ShaderCompilationException {
  constructor(value) {
    this.value = value;
    this.message = 'cannot compile the shader source';
    this.toString = () => `${this.value} cannot compile the shader source`;
  }
}

class ShaderLinkException {
  constructor(value) {
    this.value = value;
    this.message = 'cannot compile the shader source';
    this.toString = `${this.value} cannot compile the shader source`;
  }
};


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getGraphicsContext", function() { return getGraphicsContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createProgram", function() { return createProgram; });
/*
 *  TIMES: Tiny Image ECMAScript Application
 *  Copyright (C) 2017  Jean-Christophe Taveau.
 *
 *  This file is part of TIMES
 *
 * This program is free software: you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,Image
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with TIMES.  If not, see <http://www.gnu.org/licenses/>.
 *
 *
 * Authors:
 * Jean-Christophe Taveau
 */
 


/**
 * Toolbox for GPU
 *
 */


/**
 *
 * Init WebGL2
 *
 */
const getGraphicsContext = (elementID='preview') => {
  // http://webglreport.com/
  let _canvas = document.getElementById(elementID);
  let gl2;
  let _params = {};
  
  try {
    gl2 = _canvas.getContext("webgl2");
    // Need extension(s)
    const ext = gl2.getExtension("EXT_color_buffer_float");
    if (!ext) {
      alert("need EXT_color_buffer_float");
    }
    // Various useful configuration parameters
    _params.maxTextures  = gl2.getParameter(gl2.MAX_TEXTURE_IMAGE_UNITS);
    _params.maxTextureSize  = gl2.getParameter(gl2.MAX_TEXTURE_SIZE);
    
  } catch (e) {
  }
  if (!gl2) {
      alert("Could not initialise WebGL2, sorry :-(");
  }
  return {canvas: _canvas, context: gl2, parameters: _params};
};


/**
 *
 * Create Shader Program
 *
 */
const createProgram = (gpuEnv,src_vs,src_fs) => {

  // Compile shader
  const compileShader = (gl, source,type) => {
    let str = source;

    let shader;
    if (type == "fragment") {
      shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (type == "vertex") {
      shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
      return null;
    }

    gl.shaderSource(shader, str);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert(` ${type}: ${gl.getShaderInfoLog(shader)}`);
      return null;
    }

    return shader;
  };

  /**** MAIN ****/
  
  let shader = {
    program: null,
    attributes: {},
    uniforms: {}
  };

  let gl = gpuEnv.context;
  
  //1- Check in source(s) where are the attributes (keyword`in `)
  let re = /in\s*(\w+)\s(\w+)/gm;
  let result;
  while ((result = re.exec(src_vs)) !== null) {
    // console.log(re.exec(src_vs));
    shader.attributes[result[2]] = {type: result[1],name: result[2],location: null, size: numComponents(result[1])};
  }
  // Check in source(s) where are the uniforms (keyword: `uniform`)
  re = /uniform\s*(\w+)\s+(\w+)\s*(\[)*/gm;
  while ((result = re.exec(src_vs)) !== null) {
    // console.log(re.exec(src_vs));
    shader.uniforms[result[2]] = {type: result[1]+(result[3]?'[]':''),name: result[2],location: null};
  }
  while ((result = re.exec(src_fs)) !== null) {
    // console.log(re.exec(src_vs));
    shader.uniforms[result[2]] = {type: result[1]+(result[3]?'[]':''),name: result[2],location: null};
  }
  console.log(shader);

  // 2- Create Shader Program with link step.
  shader.program = gl.createProgram();
  
  gl.attachShader(shader.program, compileShader(gl,src_vs,'vertex'));
  gl.attachShader(shader.program, compileShader(gl,src_fs,'fragment'));
  gl.linkProgram(shader.program);

  if (!gl.getProgramParameter(shader.program, gl.LINK_STATUS)) {
    alert("Could not initialise shaders");
  }
  
  // 3- Get Attribute and Uniform locations
  Object.values(shader.attributes).forEach( (attr) => attr.location =  gl.getAttribLocation(shader.program, attr.name) );
  Object.values(shader.uniforms).forEach( (uniform) => uniform.location =  gl.getUniformLocation(shader.program, uniform.name) );
  return shader;
}

const numComponents = (type) => {
    switch (type) {
      case 'float': return 1;break;
      case 'int': return 1;break;
      case 'uint': return 1;break;
      case 'vec2': return 2;break;
      case 'vec3': return 3;break;
      case 'vec4': return 4;break;
    };
  return -1;
  
}

// Export





/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
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




/*
 * Constructor
 */
function Uniform (options) {
    this.name = options.name;

}





/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _isoSurfacer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(28);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IsoSurfacer", function() { return _isoSurfacer_js__WEBPACK_IMPORTED_MODULE_0__["IsoSurfacer"]; });

/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(31);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Map", function() { return _map_js__WEBPACK_IMPORTED_MODULE_1__["Map"]; });

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









/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IsoSurfacer", function() { return IsoSurfacer; });
/* harmony import */ var _isoCube_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(29);
/* harmony import */ var _isoSlab_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(30);
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
 * IsoSurface Generator based on the Marching Cubes algorithm
 * All the details explained in http://crazybiocomputing.blogspot.fr/2014/11/graphics-marching-cubes-implementation.html
 *
 * @class IsoSurfacer
 *
 * @author Jean-Christophe Taveau
 */
class IsoSurfacer {
  /**
   * @constructor
   */
  constructor(volume, threshold = 128, cubeSize = 2, mode = 0) {

    // if (volume instanceof Map) {
      this.map = volume;
      this.mesh = new mwsg.Mesh();

      // Default Marching Cubes Parameters
      this.threshold = threshold;
      this.cubeSize = cubeSize;
      this.interpolate = (mode === 1) ? IsoSurfacer.interpolateBilinear : IsoSurfacer.interpolateNone;
/*    }
    else {
      console.log(volume.constructor.name, volume instanceof Map);
      alert('This structure is not a voxels raster/map');
    }
*/
  }

  static interpolateNone(threshold,v0,v1) {
    return {
      x : ( v0.x + v1.x ) / 2.0,
      y : ( v0.y + v1.y ) / 2.0,
      z : ( v0.z + v1.z ) / 2.0
    }
  };

  static interpolateBilinear(threshold, v0,v1) {
    let k = (threshold - v0.voxel)/(v1.voxel - v0.voxel);
    return {
      x : v0.x + (v1.x - v0.x) * k,
      y : v0.y + (v1.y - v0.y) * k,
      z : v0.z + (v1.z - v0.z) * k
    } 
  };
    
  setInterpolation(mode) {
    this.interpolate = (mode === 1) ? IsoSurfacer.interpolateBilinear : IsoSurfacer.interpolateNone;
  };

  getMesh() {
    // Flatten the vertices
    this.mesh.vertices = this.mesh.vertices.reduce( (accu,vtx) => [...accu,vtx.x,vtx.y,vtx.z],[]);
    return this.mesh;
  };

  /**
   * Compute Triangle Mesh
   *
   * @author Jean-Christophe Taveau
   */
  compute(threshold) {
  // Private
    const createTriangles = (probe,interpolateFunc) => {
      //console.log('key '+probe.key+' '+ probe.x +' '+probe.y+' '+probe.z);
      let vertex;
      let edges = IsoSurfacer.triangles[probe.key];
      for (let i=0;i<edges.length;i++) {
        let index=-1;
        let edge = edges[i];

        if (probe.edges[edge] !== -1) {
          // Edge already calculated
          index = probe.edges[edge];
        }
        else {
          switch (edge) {
          case 0:
            if (probe.y !== 0) {
              probe.edges[edge] = slab.above().edges[2];
              index = probe.edges[edge];
            }
            else {
              vertex = interpolateFunc(threshold,probe.getVertex(0),probe.getVertex(1) );
              this.mesh.vertices.push(vertex);
              index = this.mesh.vertices.length-1;
              probe.edges[edge]= index;
            }
            break;
          case 1:
            if (probe.z !== 0) {
              probe.edges[edge] = slab.back().edges[5];
              index = probe.edges[edge];
            }
            else {
              vertex= interpolateFunc(threshold,probe.getVertex(1),probe.getVertex(2) );
              this.mesh.vertices.push(vertex);
              index = this.mesh.vertices.length-1;
              probe.edges[edge]= index;
            }
            break;
          case 2:
            if (probe.z !== 0) {
              probe.edges[edge] = slab.back().edges[6];
              index = probe.edges[edge];
            }
            else {
              vertex=interpolateFunc(threshold,probe.getVertex(2),probe.getVertex(3) );
              this.mesh.vertices.push(vertex);
              index = this.mesh.vertices.length-1;
              probe.edges[edge]= index;
            }
            break;
          case 3:
            if (probe.x !== 0) {
              probe.edges[edge] = slab.previous().edges[1];
              index = probe.edges[edge];
            }
            else {
              vertex=interpolateFunc(threshold,probe.getVertex(0),probe.getVertex(3) );
              this.mesh.vertices.push(vertex);
              index = this.mesh.vertices.length-1;
              probe.edges[edge]= index;
            }
            break;
          case 4:
            if (probe.y !== 0) {
              probe.edges[edge] = slab.above().edges[6];
              index = probe.edges[edge];
            }
            else {
              vertex=interpolateFunc(threshold,probe.getVertex(4),probe.getVertex(5) );
              this.mesh.vertices.push(vertex);
              index = this.mesh.vertices.length-1;
              probe.edges[edge]= index;
            }
            break;
          case 5:
            vertex=interpolateFunc(threshold,probe.getVertex(5),probe.getVertex(6) );
            this.mesh.vertices.push(vertex);
            index = this.mesh.vertices.length-1;
            probe.edges[edge]= index;
            break;
          case 6:
            vertex=interpolateFunc(threshold,probe.getVertex(6),probe.getVertex(7) );
            this.mesh.vertices.push(vertex);
            index = this.mesh.vertices.length-1;
            probe.edges[edge]= index;
            break;
          case 7:
            if (probe.x !== 0) {
              probe.edges[edge] = slab.previous().edges[5];
              index = probe.edges[edge];
            }
            else {
              vertex = interpolateFunc(threshold,probe.getVertex(4),probe.getVertex(7) );
              this.mesh.vertices.push(vertex);
              index = this.mesh.vertices.length-1;
              probe.edges[edge]= index;
            }
            break;
          case 8:
            if (probe.x !== 0) {
              probe.edges[edge] = slab.previous().edges[9];
              index = probe.edges[edge];
            }
            else {
              vertex = interpolateFunc(threshold,probe.getVertex(0),probe.getvertex(4) );
              this.mesh.vertices.push(vertex);
              index = this.mesh.vertices.length-1;
              probe.edges[edge]= index;
            }
            break;
          case 9:
            if (probe.y !== 0) {
              probe.edges[edge] = slab.above().edges[11];
              index = probe.edges[edge];
            }
            else {
              vertex = interpolateFunc(threshold,probe.getVertex(1),probe.getVertex(5) );
              this.mesh.vertices.push(vertex);
              index = this.mesh.vertices.length-1;
              probe.edges[edge]= index;
            }
            break;
          case 10:
            if (probe.x !== 0) {
              probe.edges[edge] = slab.previous().edges[11];
              index = probe.edges[edge];
            }
            else {
              vertex  = interpolateFunc(threshold,probe.getVertex(3),probe.getVertex(7) );
              this.mesh.vertices.push(vertex);
              index = this.mesh.vertices.length-1;
              probe.edges[edge]= index;
            }
            break;
          case 11:
            vertex = interpolateFunc(threshold,probe.getVertex(2),probe.getVertex(6) );
            this.mesh.vertices.push(vertex);
            index = this.mesh.vertices.length-1;
            probe.edges[edge]= index;
            break;
          }
        }
        this.mesh.triangles.push(index);
      }
    }
    
    // M A I N
    let nx = this.map.width;
    let ny = this.map.height;
    let nz = this.map.depth;
    
    let slab = new _isoSlab_js__WEBPACK_IMPORTED_MODULE_1__["IsoSlab"](Math.floor( (nx -1)/this.cubeSize ),Math.floor( (ny-1)/this.cubeSize ) );

    
    // M a i n   L o o p
    console.log('Start of the main loop... Please wait.');
    for (let z = 0; z < nz-this.cubeSize; z+= this.cubeSize) {
      slab.reset_count();
      for (let y = 0; y < ny-this.cubeSize; y += this.cubeSize) {
        for (let x = 0; x < nx-this.cubeSize; x += this.cubeSize) {
          // 1- Create a new marching cube
          let cube = new _isoCube_js__WEBPACK_IMPORTED_MODULE_0__["IsoCube"](x,y,z,this.cubeSize);
          // 2- Set voxels in the cube
          cube.setVoxels(this.map);
          // 3- Calc configuration
          cube.calcKey(threshold);
          // 4- Create vertices and triangles
          if (cube.key != 0 && cube.key != 255) {
              createTriangles(cube,this.interpolate);
          }
          // 5- Update slab
          slab.push(cube);
        }
      }
      if ( (z%10) === 0) {
        console.log('z=' + z);
      }
    }
  };


  // triangles to be drawn in each case
  static  get triangles() {
    return [
      [],
      [0,8,3],
      [0,1,9],
      [1,8,3,9,8,1],
      [1,2,11],
      [0,8,3,1,2,11],
      [9,2,11,0,2,9],
      [2,8,3,2,11,8,11,9,8],
      [3,10,2],
      [0,10,2,8,10,0],
      [1,9,0,2,3,10],
      [1,10,2,1,9,10,9,8,10],
      [3,11,1,10,11,3],
      [0,11,1,0,8,11,8,10,11],
      [3,9,0,3,10,9,10,11,9],
      [9,8,11,11,8,10],
      [4,7,8],
      [4,3,0,7,3,4],
      [0,1,9,8,4,7],
      [4,1,9,4,7,1,7,3,1],
      [1,2,11,8,4,7],
      [3,4,7,3,0,4,1,2,11],
      [9,2,11,9,0,2,8,4,7],
      [2,11,9,2,9,7,2,7,3,7,9,4],
      [8,4,7,3,10,2],
      [10,4,7,10,2,4,2,0,4],
      [9,0,1,8,4,7,2,3,10],
      [4,7,10,9,4,10,9,10,2,9,2,1],
      [3,11,1,3,10,11,7,8,4],
      [1,10,11,1,4,10,1,0,4,7,10,4],
      [4,7,8,9,0,10,9,10,11,10,0,3],
      [4,7,10,4,10,9,9,10,11],
      [9,5,4],
      [9,5,4,0,8,3],
      [0,5,4,1,5,0],
      [8,5,4,8,3,5,3,1,5],
      [1,2,11,9,5,4],
      [3,0,8,1,2,11,4,9,5],
      [5,2,11,5,4,2,4,0,2],
      [2,11,5,3,2,5,3,5,4,3,4,8],
      [9,5,4,2,3,10],
      [0,10,2,0,8,10,4,9,5],
      [0,5,4,0,1,5,2,3,10],
      [2,1,5,2,5,8,2,8,10,4,8,5],
      [11,3,10,11,1,3,9,5,4],
      [4,9,5,0,8,1,8,11,1,8,10,11],
      [5,4,0,5,0,10,5,10,11,10,0,3],
      [5,4,8,5,8,11,11,8,10],
      [9,7,8,5,7,9],
      [9,3,0,9,5,3,5,7,3],
      [0,7,8,0,1,7,1,5,7],
      [1,5,3,3,5,7],
      [9,7,8,9,5,7,11,1,2],
      [11,1,2,9,5,0,5,3,0,5,7,3],
      [8,0,2,8,2,5,8,5,7,11,5,2],
      [2,11,5,2,5,3,3,5,7],
      [7,9,5,7,8,9,3,10,2],
      [9,5,7,9,7,2,9,2,0,2,7,10],
      [2,3,10,0,1,8,1,7,8,1,5,7],
      [10,2,1,10,1,7,7,1,5],
      [9,5,8,8,5,7,11,1,3,11,3,10],
      [5,7,0,5,0,9,7,10,0,1,0,11,10,11,0],
      [10,11,0,10,0,3,11,5,0,8,0,7,5,7,0],
      [10,11,5,7,10,5],
      [11,6,5],
      [0,8,3,5,11,6],
      [9,0,1,5,11,6],
      [1,8,3,1,9,8,5,11,6],
      [1,6,5,2,6,1],
      [1,6,5,1,2,6,3,0,8],
      [9,6,5,9,0,6,0,2,6],
      [5,9,8,5,8,2,5,2,6,3,2,8],
      [2,3,10,11,6,5],
      [10,0,8,10,2,0,11,6,5],
      [0,1,9,2,3,10,5,11,6],
      [5,11,6,1,9,2,9,10,2,9,8,10],
      [6,3,10,6,5,3,5,1,3],
      [0,8,10,0,10,5,0,5,1,5,10,6],
      [3,10,6,0,3,6,0,6,5,0,5,9],
      [6,5,9,6,9,10,10,9,8],
      [5,11,6,4,7,8],
      [4,3,0,4,7,3,6,5,11],
      [1,9,0,5,11,6,8,4,7],
      [11,6,5,1,9,7,1,7,3,7,9,4],
      [6,1,2,6,5,1,4,7,8],
      [1,2,5,5,2,6,3,0,4,3,4,7],
      [8,4,7,9,0,5,0,6,5,0,2,6],
      [7,3,9,7,9,4,3,2,9,5,9,6,2,6,9],
      [3,10,2,7,8,4,11,6,5],
      [5,11,6,4,7,2,4,2,0,2,7,10],
      [0,1,9,4,7,8,2,3,10,5,11,6],
      [9,2,1,9,10,2,9,4,10,7,10,4,5,11,6],
      [8,4,7,3,10,5,3,5,1,5,10,6],
      [5,1,10,5,10,6,1,0,10,7,10,4,0,4,10],
      [0,5,9,0,6,5,0,3,6,10,6,3,8,4,7],
      [6,5,9,6,9,10,4,7,9,7,10,9],
      [11,4,9,6,4,11],
      [4,11,6,4,9,11,0,8,3],
      [11,0,1,11,6,0,6,4,0],
      [8,3,1,8,1,6,8,6,4,6,1,11],
      [1,4,9,1,2,4,2,6,4],
      [3,0,8,1,2,9,2,4,9,2,6,4],
      [0,2,4,4,2,6],
      [8,3,2,8,2,4,4,2,6],
      [11,4,9,11,6,4,10,2,3],
      [0,8,2,2,8,10,4,9,11,4,11,6],
      [3,10,2,0,1,6,0,6,4,6,1,11],
      [6,4,1,6,1,11,4,8,1,2,1,10,8,10,1],
      [9,6,4,9,3,6,9,1,3,10,6,3],
      [8,10,1,8,1,0,10,6,1,9,1,4,6,4,1],
      [3,10,6,3,6,0,0,6,4],
      [6,4,8,10,6,8],
      [7,11,6,7,8,11,8,9,11],
      [0,7,3,0,11,7,0,9,11,6,7,11],
      [11,6,7,1,11,7,1,7,8,1,8,0],
      [11,6,7,11,7,1,1,7,3],
      [1,2,6,1,6,8,1,8,9,8,6,7],
      [2,6,9,2,9,1,6,7,9,0,9,3,7,3,9],
      [7,8,0,7,0,6,6,0,2],
      [7,3,2,6,7,2],
      [2,3,10,11,6,8,11,8,9,8,6,7],
      [2,0,7,2,7,10,0,9,7,6,7,11,9,11,7],
      [1,8,0,1,7,8,1,11,7,6,7,11,2,3,10],
      [10,2,1,10,1,7,11,6,1,6,7,1],
      [8,9,6,8,6,7,9,1,6,10,6,3,1,3,6],
      [0,9,1,10,6,7],
      [7,8,0,7,0,6,3,10,0,10,6,0],
      [7,10,6],
      [7,6,10],
      [3,0,8,10,7,6],
      [0,1,9,10,7,6],
      [8,1,9,8,3,1,10,7,6],
      [11,1,2,6,10,7],
      [1,2,11,3,0,8,6,10,7],
      [2,9,0,2,11,9,6,10,7],
      [6,10,7,2,11,3,11,8,3,11,9,8],
      [7,2,3,6,2,7],
      [7,0,8,7,6,0,6,2,0],
      [2,7,6,2,3,7,0,1,9],
      [1,6,2,1,8,6,1,9,8,8,7,6],
      [11,7,6,11,1,7,1,3,7],
      [11,7,6,1,7,11,1,8,7,1,0,8],
      [0,3,7,0,7,11,0,11,9,6,11,7],
      [7,6,11,7,11,8,8,11,9],
      [6,8,4,10,8,6],
      [3,6,10,3,0,6,0,4,6],
      [8,6,10,8,4,6,9,0,1],
      [9,4,6,9,6,3,9,3,1,10,3,6],
      [6,8,4,6,10,8,2,11,1],
      [1,2,11,3,0,10,0,6,10,0,4,6],
      [4,10,8,4,6,10,0,2,9,2,11,9],
      [11,9,3,11,3,2,9,4,3,10,3,6,4,6,3],
      [8,2,3,8,4,2,4,6,2],
      [0,4,2,4,6,2],
      [1,9,0,2,3,4,2,4,6,4,3,8],
      [1,9,4,1,4,2,2,4,6],
      [8,1,3,8,6,1,8,4,6,6,11,1],
      [11,1,0,11,0,6,6,0,4],
      [4,6,3,4,3,8,6,11,3,0,3,9,11,9,3],
      [11,9,4,6,11,4],
      [4,9,5,7,6,10],
      [0,8,3,4,9,5,10,7,6],
      [5,0,1,5,4,0,7,6,10],
      [10,7,6,8,3,4,3,5,4,3,1,5],
      [9,5,4,11,1,2,7,6,10],
      [6,10,7,1,2,11,0,8,3,4,9,5],
      [7,6,10,5,4,11,4,2,11,4,0,2],
      [3,4,8,3,5,4,3,2,5,11,5,2,10,7,6],
      [7,2,3,7,6,2,5,4,9],
      [9,5,4,0,8,6,0,6,2,6,8,7],
      [3,6,2,3,7,6,1,5,0,5,4,0],
      [6,2,8,6,8,7,2,1,8,4,8,5,1,5,8],
      [9,5,4,11,1,6,1,7,6,1,3,7],
      [1,6,11,1,7,6,1,0,7,8,7,0,9,5,4],
      [4,0,11,4,11,5,0,3,11,6,11,7,3,7,11],
      [7,6,11,7,11,8,5,4,11,4,8,11],
      [6,9,5,6,10,9,10,8,9],
      [3,6,10,0,6,3,0,5,6,0,9,5],
      [0,10,8,0,5,10,0,1,5,5,6,10],
      [6,10,3,6,3,5,5,3,1],
      [1,2,11,9,5,10,9,10,8,10,5,6],
      [0,10,3,0,6,10,0,9,6,5,6,9,1,2,11],
      [10,8,5,10,5,6,8,0,5,11,5,2,0,2,5],
      [6,10,3,6,3,5,2,11,3,11,5,3],
      [5,8,9,5,2,8,5,6,2,3,8,2],
      [9,5,6,9,6,0,0,6,2],
      [1,5,8,1,8,0,5,6,8,3,8,2,6,2,8],
      [1,5,6,2,1,6],
      [1,3,6,1,6,11,3,8,6,5,6,9,8,9,6],
      [11,1,0,11,0,6,9,5,0,5,6,0],
      [0,3,8,5,6,11],
      [11,5,6],
      [10,5,11,7,5,10],
      [10,5,11,10,7,5,8,3,0],
      [5,10,7,5,11,10,1,9,0],
      [11,7,5,11,10,7,9,8,1,8,3,1],
      [10,1,2,10,7,1,7,5,1],
      [0,8,3,1,2,7,1,7,5,7,2,10],
      [9,7,5,9,2,7,9,0,2,2,10,7],
      [7,5,2,7,2,10,5,9,2,3,2,8,9,8,2],
      [2,5,11,2,3,5,3,7,5],
      [8,2,0,8,5,2,8,7,5,11,2,5],
      [9,0,1,5,11,3,5,3,7,3,11,2],
      [9,8,2,9,2,1,8,7,2,11,2,5,7,5,2],
      [1,3,5,3,7,5],
      [0,8,7,0,7,1,1,7,5],
      [9,0,3,9,3,5,5,3,7],
      [9,8,7,5,9,7],
      [5,8,4,5,11,8,11,10,8],
      [5,0,4,5,10,0,5,11,10,10,3,0],
      [0,1,9,8,4,11,8,11,10,11,4,5],
      [11,10,4,11,4,5,10,3,4,9,4,1,3,1,4],
      [2,5,1,2,8,5,2,10,8,4,5,8],
      [0,4,10,0,10,3,4,5,10,2,10,1,5,1,10],
      [0,2,5,0,5,9,2,10,5,4,5,8,10,8,5],
      [9,4,5,2,10,3],
      [2,5,11,3,5,2,3,4,5,3,8,4],
      [5,11,2,5,2,4,4,2,0],
      [3,11,2,3,5,11,3,8,5,4,5,8,0,1,9],
      [5,11,2,5,2,4,1,9,2,9,4,2],
      [8,4,5,8,5,3,3,5,1],
      [0,4,5,1,0,5],
      [8,4,5,8,5,3,9,0,5,0,3,5],
      [9,4,5],
      [4,10,7,4,9,10,9,11,10],
      [0,8,3,4,9,7,9,10,7,9,11,10],
      [1,11,10,1,10,4,1,4,0,7,4,10],
      [3,1,4,3,4,8,1,11,4,7,4,10,11,10,4],
      [4,10,7,9,10,4,9,2,10,9,1,2],
      [9,7,4,9,10,7,9,1,10,2,10,1,0,8,3],
      [10,7,4,10,4,2,2,4,0],
      [10,7,4,10,4,2,8,3,4,3,2,4],
      [2,9,11,2,7,9,2,3,7,7,4,9],
      [9,11,7,9,7,4,11,2,7,8,7,0,2,0,7],
      [3,7,11,3,11,2,7,4,11,1,11,0,4,0,11],
      [1,11,2,8,7,4],
      [4,9,1,4,1,7,7,1,3],
      [4,9,1,4,1,7,0,8,1,8,7,1],
      [4,0,3,7,4,3],
      [4,8,7],
      [9,11,8,11,10,8],
      [3,0,9,3,9,10,10,9,11],
      [0,1,11,0,11,8,8,11,10],
      [3,1,11,10,3,11],
      [1,2,10,1,10,9,9,10,8],
      [3,0,9,3,9,10,1,2,9,2,10,9],
      [0,2,10,8,0,10],
      [3,2,10],
      [2,3,8,2,8,11,11,8,9],
      [9,11,2,0,9,2],
      [2,3,8,2,8,11,0,1,8,1,11,8],
      [1,11,2],
      [1,3,8,9,1,8],
      [0,9,1],
      [0,3,8],
      []
    ];
  }


} // End of class IsoSurfacer



/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IsoCube", function() { return IsoCube; });
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




// class Cube
class IsoCube {
  constructor(x,y,z,size) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.size = size;
    this.voxels = [0,0,0,0,0,0,0,0];
    this.edges=[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
    this.key=0;
  }

  getVertex(index) {
    switch (index) {
    case 0:
      return {
        x:this.x,
        y:this.y,
        z:this.z,
        voxel:this.voxels[0] 
      }; // v0
    case 1:
      return {
        x:this.x+this.size, 
        y:this.y,
        z:this.z, 
        voxel:this.voxels[1] 
      }; // v1
    case 2:
      return {
        x:this.x+this.size, 
        y:this.y+this.size, 
        z:this.z,
        voxel:this.voxels[2]
      }; // v2
    case 3:
      return {
        x:this.x,
        y:this.y+this.size,
        z:this.z,
        voxel:this.voxels[3]
      }; // v3
    case 4:
      return {
        x:this.x,
        y:this.y,
        z:this.z+this.size,
        voxel:this.voxels[4]
      }; // v4
    case 5:
      return {
        x:this.x+this.size,
        y:this.y,
        z:this.z+this.size,
        voxel:this.voxels[5]
      }; // v5
    case 6:
      return {
        x:this.x+this.size,
        y:this.y+this.size,
        z:this.z+this.size,
        voxel:this.voxels[6]
      }; // v6
    case 7:
      return {
        x:this.x,
        y:this.y+this.size,
        z:this.z+this.size,
        voxel:this.voxels[7]
      }; // v7
    }
  }

  setVoxels(stack) {
    const getVoxel = (vol,x,y,z) => vol.data[x + y * vol.width + z * vol.width * vol.height];
    
    this.voxels[0] = getVoxel(stack,this.x          ,this.y          ,this.z          ); // v0
    this.voxels[1] = getVoxel(stack,this.x+this.size,this.y          ,this.z          ); // v1
    this.voxels[2] = getVoxel(stack,this.x+this.size,this.y+this.size,this.z          ); // v2
    this.voxels[3] = getVoxel(stack,this.x          ,this.y+this.size,this.z          ); // v3
    this.voxels[4] = getVoxel(stack,this.x          ,this.y          ,this.z+this.size); // v4
    this.voxels[5] = getVoxel(stack,this.x+this.size,this.y          ,this.z+this.size); // v5
    this.voxels[6] = getVoxel(stack,this.x+this.size,this.y+this.size,this.z+this.size); // v6
    this.voxels[7] = getVoxel(stack,this.x          ,this.y+this.size,this.z+this.size); // v7
  };

  calcKey(threshold) {
    this.key = 0;
    this.key += (this.voxels[7] > threshold) ? 128 : 0;
    this.key += (this.voxels[6] > threshold) ? 64 : 0;
    this.key += (this.voxels[5] > threshold) ? 32 : 0;
    this.key += (this.voxels[4] > threshold) ? 16 : 0;
    this.key += (this.voxels[3] > threshold) ? 8 : 0;
    this.key += (this.voxels[2] > threshold) ? 4 : 0;
    this.key += (this.voxels[1] > threshold) ? 2 : 0;
    this.key += (this.voxels[0] > threshold) ? 1 : 0;

    return this.key;
  };

  toString() {
    var str='[';
    for (var i=0;i<12;i++) {
        str+=(this.edges[i]+'; ');
    }
    return (`Cube[${this.key}]=(${this.x} ${this.y} ${this.z}) ${str}]`);
  };
  
} // End of class IsoCube



/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IsoSlab", function() { return IsoSlab; });
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
 * Sliab used by IsoSurfacer class to store temporary cubes (probes in Marching Cubes algorithm)
 * @class IsoSlab
 *
 * @author Jean-Christophe Taveau
 */
class IsoSlab {
  /**
   * @constructor
   */
  constructor(cubes_per_row, cubes_per_column) {
    this.cubes = [];
    this.count = 0;
    this.w = cubes_per_row;
    this.h = cubes_per_column;
  }

  reset_count() {
    this.count = 0;
  };

  push(a_cube) {
    this.cubes[this.count++] = a_cube;
  };

  previous() {
    return this.cubes[this.count - 1];
  };

  above() {
    return this.cubes[this.count - this.w];
  };

  back() {
    return this.cubes[this.count];
  };
}



/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Map", function() { return Map; });
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
 * Voxels maps
 * @class Map
 * @memberof module:structure
 *
 * @extends module:structure.Structure
 * @author Jean-Christophe Taveau
 **/
class Map {
  /**
   * @constructor
   */
  constructor(pixelData,nx,ny,nz,mode='8-bit') {

    this.ID = 'map';
    this.name = 'map';
    
   /**
    * Pixels/Voxels
    *
    * @type {Array(RGBColor)}
    *
    **/
    this.data = pixelData;

    // mode 8-bit, 16-bit, 32-bit, rgb, rgba
    this.information = {};
    this.information.mode = mode;
    this.information.width = nx;
    this.information.height = ny;
    this.information.depth = nz;

    this.width = this.information.width;
    this.height = this.information.height;
    this.depth = this.information.depth;
    
    // Histogram
    this.bins;
    
    // Init
    this.init();

  }

  /**
   * Preprocess Map
   *
   */
  init() {
    this.bbox = {
      min: {
        x: 0,
        y: 0,
        z: 0
      },
      max: {
        x: this.width,
        y: this.height,
        z: this.depth
      },
      center:  {
        x: this.width/2.0,
        y: this.height/2.0,
        z: this.depth/2.0
      },
      radius: Math.sqrt(this.width * this.width + this.height * this.height + this.depth * this.depth) / 2.0
    };

    this.centroid = {
      x: this.width/2.0,
      y: this.height/2.0,
      z: this.depth/2.0
    };
  }
  
  getPixel(x,y) {
    return this.data(x + this.width * y);
  };

  getVoxel(x,y,z) {
    return this.data(x + this.width * y + this.width * this.height * z);
  };

  histogram() {
    if (this.bins === undefined) {
      this.bins = [];
      for (let i=0; i < this.data.length; i++) {
        this.bins[this.data[i]]++;
      }
    }
    return this.bins;
  };
  
}



/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Structure", function() { return Structure; });
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
 * @module structure
 **/




/**
 * Root class for 3D objects: atomic ({@link module:structure.Molecule}), map, or any 3D graphics vectorial object
 * @class Structure
 * @memberof module:structure
 *
 * @author Jean-Christophe Taveau
 **/
class Structure {
  /**
   * @constructor
   */
  constructor(other) {

    /**
    * Identifier
    *
    * @type {string}
    *
    **/
    this.ID               = other.ID || '0UNK';


    /**
    * Information
    *
    * @type {object}
    *
    **/
    this.information          =  {};
    this.information.ID       = this.ID;

    this.information.title    = other.title || 'No Title';

    /**
    * Deposit Date DD-MMM-YY
    *
    * @type {string}
    **/
    this.information.date     =  other.date || '00-UNK-00';

    /**
    * Center of Gravity - Centroid
    *
    * @type {vec3}
    *
    * @property {vec3} centroid - Center of gravity or centroid of this structure
    * @property {number} centroid.x - X-coordinate
    * @property {number} centroid.y - Y-coordinate
    * @property {number} centroid.y - Z-coordinate

    **/
    this.centroid             =  other.centroid || {'x': 0.0,'y': 0.0,'z': 0.0};

    /**
    *  Matrix for rotation(s) and translation(s)
    * @type {mat4}
    **/
    if (other.matrix !== undefined) {
        this.matrix = other.matrix;
    }
    else {
        this.matrix=mat4.create();
        mat4.identity(this.matrix);
    }


    /**
    * Bounding Box
    *
    * @property {vec3} min - Top-left-front corner of the bounding box
    * @property {number} min.x - X-coordinate of the 'min' corner
    * @property {number} min.y - Y-coordinate of the 'min' corner
    * @property {number} min.y - Z-coordinate of the 'min' corner
    * @property {vec3} max - Bottom-right-back corner of the bounding box
    * @property {number} max.x - X-coordinate of the 'max' corner
    * @property {number} max.y - Y-coordinate of the 'max' corner
    * @property {number} max.z - Z-coordinate of the 'max' corner
    **/
    this.bbox= other.bbox || {
        'min': {'x': Number.MAX_VALUE,'y': Number.MAX_VALUE,'z': Number.MAX_VALUE},
        'max': {'x': Number.MIN_VALUE,'y': Number.MIN_VALUE,'z': Number.MIN_VALUE},
        'center':  {'x': 0.0,'y': 0.0,'z': 0.0},
        'radius': 0.0
    };
  }


  /**
   * Is this structure an atomic model? (instance of class Molecule)
   *
   * @return {boolean} - true if this structure is an atomic model.
   *
   **/
  isMolecule() {
    return (this instanceof Molecule);
  };


  /**
   * Is this structure a 2D/3D-raster? (instance of class Raster)
   *
   * @return {boolean} - true if this structure is a 2D- or 3D-raster (image or volume/map).
   *
   **/
  isRaster() {
    return (this instanceof Map);
  };


  /**
  * Set Title
  *
  * @param {string} str - Set a new title
  *
  **/
  setTitle(str) {
    this.information.title = str;
  };

}



/***/ })
/******/ ]);
});