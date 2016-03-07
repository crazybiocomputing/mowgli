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
 
 "use strict"
 
 
/**
 * OpenGL shader program class
 *
 * @class Program
 * @memberof module:graphics
 * @constructor
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
var Program = function(context,name) {
  this.ctx = context;
  this.name = name;
  this.vertex_shader   = null;
  this.fragment_shader = null;
  this.shaderProgram = 0;
  this.attributes =[];
  this.uniforms = [];
  this.attribLocation = {};
  this.uniformLocation = {};
}

/**
 * Get OpenGL ID of this shader program
 *
 **/
Program.prototype.getID=function() {
  return this.shaderProgram;
}

/**
 * Load vertex or fragment source files for compilation and link
 *
 * @param {string} type: Source file types - **'vertex'** or **'fragment'**
 * @param {string} name: Source filename
 **/
Program.prototype.load=function(type,name) {
  // TODO
  if (type =='vertex')
    // this.vertex_shader = ShaderFactory.get(type,name);
    console.log('vertex');
  else if (type =='fragment')
    // this.fragment_shader = ShaderFactory.get(type,name);
    console.log('fragment');
  else
    alert('Unknown shader type');
}

/**
 * Load vertex or fragment source files for compilation and link via http
 *
 * @param {string} type: Source file types - 'vertex' or 'fragment'
 * @param {string} name: Source filename
 **/
Program.prototype.loadHTTP=function(type,name) {
  // From http://www.html5rocks.com/en/tutorials/file/xhr2/
  // XMLHttpRequest()

  var url = 'shaders/'+name+'.'+type;
  var req = new XMLHttpRequest();
  req.open("GET", url, true);
  req.responseType = 'text';
  req.onreadystatechange = function() {
    if (req.readyState==4 && req.status==200) {
      this.fragment_shader = this._compile(gl.FRAGMENT_SHADER,this.response);
    }
  }
  req.send();
}

/**
 * Load vertex or fragment source files for compilation and link from the DOM.
 * From Learning WEBGL.
 *
 * @param {string} type: Source file types - 'vertex' or 'fragment'
 * @param {string} name: ID of the html div
 **/
Program.prototype.loadDOM = function(type,name) {
  var gl = this.ctx;

  var shaderScript = document.getElementById(name);
  if (!shaderScript) {
    return null;
  }

  var str = "";
  var k = shaderScript.firstChild;
  while (k) {
    if (k.nodeType == 3) {
      str += k.textContent;
    }
    k = k.nextSibling;
  }


  if (shaderScript.type == "x-shader/x-fragment") {
    this.fragment_shader = this._compile(gl.FRAGMENT_SHADER,str);
  } else if (shaderScript.type == "x-shader/x-vertex") {
    this.vertex_shader = this._compile(gl.VERTEX_SHADER,str);
  } else {
    return null;
  }

  // Extract attribute from shader text and create objects
  this._createAttributesAndUniforms(str);

}


Program.prototype.link=function() {
  var gl = this.ctx;
  this.shaderProgram = gl.createProgram();
  gl.attachShader(this.shaderProgram, this.vertex_shader);
  gl.attachShader(this.shaderProgram, this.fragment_shader);
  gl.linkProgram(this.shaderProgram);

  if (!gl.getProgramParameter(this.shaderProgram, gl.LINK_STATUS)) {
    alert("Could not initialise shaders");
  }
}

/**
 * Activate this shader program for rendering
 *
 **/
Program.prototype.use=function() {
  var gl = this.ctx;
  gl.useProgram(this.shaderProgram);
}


Program.prototype.getAttribLocation = function(attrib_name) {
  var gl = this.ctx;
  gl.useProgram(this.getID());
  return gl.getAttribLocation(this.getID(),attrib_name);
}

/**
 *  Get uniform location and set up the correspondig array.
 * The method's name is not really appropriate (set/getUniform[...])
 *
 * 
 **/
Program.prototype.setUniformLocation=function(name) {
  var gl = this.ctx;
  gl.useProgram(this.getID());
  this.uniformLocation[name]=gl.getUniformLocation(this.getID(),name);
}

Program.prototype.getUniformLocation=function(name) {
  var gl = this.ctx;
  return this.uniformLocation[name];
}

/**
 *  Update all the uniforms. This function is called by the ShapeGL.render().
 *
 * 
 **/
Program.prototype.updateUniforms = function () {
    var gl = this.ctx;
    for (var i in this.uniforms) {
        var uniform = this.uniforms[i];
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
}

/**
 * Private method for compiling shader
 *
 */
Program.prototype._compile=function(type,text) {
  var gl = this.ctx;
  var shader = gl.createShader(type);
  gl.shaderSource(shader, text);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(gl.getShaderInfoLog(shader));
    return null;
  }

  return shader;
}

/**
 * Private method to automatically detect in the shader source files the attribute(s) and uniform(s).
 * TODO - Must be improved to remove commented lines containing attributes and/or uniforms
 *
 */
Program.prototype._createAttributesAndUniforms=function(text) {
  var rows = text.split('\n');
  var re = /[\s,;]+/;
  var type;
  var qualifier = 'x';

  for (var i in rows) {
    var a_row = rows[i];
    if (a_row.indexOf('attribute') != -1 || a_row.indexOf('uniform') != -1) {
      var words = a_row.trim().split(re); //  match(/[\S,;]+/g);
      var itemSize = 0;
      console.log(words);
      for (var j=0; j < words.length; j++) {
        switch (words[j]) {
        case '//':
          // Commented line
          j = words.length; 
          break;
        case 'attribute':
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
            console.log('attribute '+ words[j] + ' type '+ type);
            this.attributes[words[j]] = {'name':words[j],'type':type,'size':itemSize}; 
          }
          else if (qualifier == 'u' && words[j] != '') {
            console.log('uniform '+ words[j] + ' type '+ type);
            this.uniforms[words[j]] = {'name':words[j],'type':type,'size':itemSize};
          } 
          break;
        }
      }
    }
  }
}



