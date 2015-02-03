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
 *  along with dotplot_wgl.  If not, see <http://www.gnu.org/licenses/>.
 *
 *
 * Authors:
 * Jean-Christophe Taveau
 */


"use strict"

/*
 * Singleton ??
/*
function RendererGL(canvas_id) {
  // Get A WebGL context
  function createWebGLContext(canvas, opt_attribs) {
    var names = ["webgl", "experimental-webgl"];
    var context = null;
    for (var ii in names) {
      try {
        context = canvas.getContext(names[ii], opt_attribs);
      } catch(e) {}
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
  this.shaders={}; 
  this.program=null; //Active program ID

  this._initGL();
}

RendererGL.prototype.drawScene = function () {
  var gl = this.context;
  
  this.program.use();
  // Draw
  // TODO
}


/*
 * Private
 */
RendererGL.prototype._initGL = function() {
  // Init GL stuff
  // TODO
}



