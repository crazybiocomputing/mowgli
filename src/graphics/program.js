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
 
var Program = function(context,name) {
  this.ctx = context;
  this.name = name;
  this.vertex_shader   = null;
  this.fragment_shader = null;
  this.shaderProgram = 0;
  this.uniforms={};
  this.attribLocation = {};
  this.uniformLocation = {};
}

Program.prototype.getID=function() {
  return this.shaderProgram;
}

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

Program.prototype.loadHTTP=function(type,name) {
  // From http://www.html5rocks.com/en/tutorials/file/xhr2/
  // XMLHttpRequest()
  // TODO
  var url = 'shaders/'+name+'.'+type;
  var req = new XMLHttpRequest();
  req.open("GET", url, true);
  req.responseType = 'text';
  req.onload = function() {
    if (this.status === 200) {
      this.fragment_shader = this._compile(gl.FRAGMENT_SHADER,this.response);
    }
  }
  req.send();
}

/* From Learning WEBGL */
Program.prototype.loadDOM=function(type,name) {
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

Program.prototype.use=function() {
  var gl = this.ctx;
  gl.useProgram(this.shaderProgram);
}


Program.prototype.setUniforms=function(uniform_list) {
  this.uniforms = uniform_list;

  var gl = this.ctx;
  for (var i in this.uniforms) {
    console.log(i+' ' +this.uniforms[i]);
    this.uniforms[i].location = gl.getUniformLocation(this.getID(), i);
    switch (this.uniforms[i].type) {
    case 'f':
      gl.uniform1f(this.uniforms[i].location, this.uniforms[i].value);
      break;
    case 'm':
      break;
    case 't':
      break;
    case 'v':
      break;
    default:
    }
  }
}

Program.prototype.getAttributeLocation=function(name) {
  return this.attribLocation[name];
}

Program.prototype.setAttribLocation=function(name) {
  var gl = this.ctx;
  gl.useProgram(this.getID());
  this.attribLocation[name]=gl.getAttribLocation(this.getID(),name);
}

Program.prototype.setUniformLocation=function(name) {
  var gl = this.ctx;
  gl.useProgram(this.getID());
  this.uniformLocation[name]=gl.getUniformLocation(this.getID(),name);
}

Program.prototype.getUniformLocation=function(name) {
  var gl = this.ctx;
  return this.uniformLocation[name];
}

Program.prototype.setUniform1f=function(name,value) {
  var gl = this.ctx;
  // TODO
}

Program.prototype.setUniform2f=function(name,value1, value2) {
  var gl = this.ctx;

  this.uniforms[name]=gl.getUniformLocation(this.shaderProgram, name);
  gl.uniform2f(uniforms[name], value1, value2);
}

// Private
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

