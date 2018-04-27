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

import {Node} from './mwgl_node.js';

/**
 * OpenGL part of Shape
 *
 * @class ShapeGL
 * @memberof module:mwGL
 *
 **/
export class Shape extends Node {
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


