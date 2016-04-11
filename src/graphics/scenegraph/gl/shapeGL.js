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
 * OpenGL part of Shape
 *
 * @class ShapeGL
 * @memberof module:mwGL
 *
 * @constructor
 **/
function ShapeGL(node) {
    NodeGL.call(this,node);

    this.numIndices = 0;
    this.numItems = 0;
    this.VBOs = [];
    this.GLTextures = [];
    this.shaderProgram = null;
}

/**
 * Flag indicating if the OpenGL state of this shape is correct
 *
 **/
ShapeGL.prototype.isDirty = function() {
    return _isDirty;
}

/**
 * Init of the OpenGL part: VBO creation
 *
 * @param {number} context - Graphics context
 **/
ShapeGL.prototype.init = function(context) {

    // Get the corresponding node of the scene graph
    var shape = this.sgnode;
    console.log(shape);
    // Add shader(s) to the renderer for uniform management
    this.sgnode.getRenderer().addShader(this.shaderProgram);
    
    // For each buffer, create corresponding VBO
    for (var i in shape.geometries) {
        console.log(shape.geometries[i]);
        this.VBOs[i] = this._createVBO(context,shape.geometries[i]);
    }
    
    // For each textured image, create corresponding Texture
    console.log('INIT TEXTURE TOTAL:' + shape.textures.length);
    console.log(shape.textures);
    for (var i=0; i < shape.textures.length; i++) {
        console.log('INIT TEXTURE '+shape.textures[i]);
        // TODO
        this.GLTextures.push(this._createTexture(context,shape.textures[i]) );
    }
    
    // All is fine (I hope ?)
    this.isDirty = false;
}

/**
 * Render this shape; Called by the renderer
 *
 **/
ShapeGL.prototype.render = function(context) {
    var gl = context;
    // Update matrix
    mat4.multiply(this.workmatrix,this.sgnode.parent.getNodeGL().workmatrix,this.sgnode.matrix);
    this.sgnode.getRenderer().setUniform("uMMatrix", this.workmatrix);
    
    // Choose shader
    console.log(this.shaderProgram);
    this.shaderProgram.use();

    console.log('coordSize '+ this.numItems );
    
    
    // For this geometry, activate VBO
    for (var j in this.VBOs) {
        var vbo = this.VBOs[j];
        if (vbo.type === 'indexed') {
            console.log('bind buffer '+ vbo.type + ' ' + vbo.ID+ ' ' + vbo.data);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vbo.IndxID);
        }
        else {
            console.log('bind buffer '+ vbo.type + ' ' + vbo.ID);
            gl.bindBuffer(gl.ARRAY_BUFFER, vbo.ID);
        }
        for (var k in vbo.attributes) {
            var attribute = vbo.attributes[k];
            console.log('enable ' + attribute.name+' '+attribute.location+' '+attribute.size+' '+attribute.stride+' '+attribute.offset);
            gl.enableVertexAttribArray(attribute.location );
            gl.vertexAttribPointer(
                attribute.location,
                attribute.size,
                gl.FLOAT,
                false,
                attribute.stride * Renderer.FLOAT_IN_BYTES,
                attribute.offset * Renderer.FLOAT_IN_BYTES
            );
        }
    }
    
    // For this geometry, activate Texture
    for (var i=0; i < this.GLTextures.length; i++) {
        // HACK: TODO
        if (this.GLTextures[i] !== undefined) {
            console.log('Activate tex ' + this.GLTextures[i]);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, this.GLTextures[i]);
            this.sgnode.getRenderer().setUniform("uTexture", 0);
        }
    }
    if (this.GLTextures.length > 0) {
        // gl.enable ( gl.TEXTURE_2D );
    }


    // TODO Update uniforms
    this.shaderProgram.updateUniforms();
    

    // Draw ...
    console.log(this.sgnode.type + ' '+ this.glType +' '+ this.numIndices+' '+ this.numItems);
    if (this.numIndices != 0 ) {
        gl.drawElements(this.glType, this.numIndices, gl.UNSIGNED_SHORT, 0);
    }
    else {
        console.log('drawArrays');
        gl.drawArrays(this.glType, 0, this.numItems);
    }
}


// Private
ShapeGL.prototype._createVBO = function(context,geom) {
    var gl = context;
    console.log('SHAPE TYPE ' + this.sgnode.type);
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
    var vbo = {};
    vbo.attributes = [];
    vbo.type = geom.type;
    
    // Create VBO
    vbo.ID = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo.ID);
    gl.bufferData(gl.ARRAY_BUFFER, geom.data, gl.STATIC_DRAW);

    // Update attribute(s) associated to this VBO
    console.log('VBO attributes');
    console.log(geom.attributes);
    for (var j=0; j < geom.attributes.length; j++) {
        if ( (geom.content & Shape.XYZ) == Shape.XYZ) {
            var n = 32 // Highest value of Shape type(s)
            var nItems = 0;
            while (n != 0) {
                if ( (geom.content & n) == n) {
                    nItems += Shape.itemLength[n];
                }
                n/=2;
            }
            this.numItems = geom.data.length / nItems;
        }
        vbo.attributes[j] = {};
        vbo.attributes[j].name     = geom.attributes[j].name;
        vbo.attributes[j].location = this.shaderProgram.getAttribLocation(geom.attributes[j].name);
        vbo.attributes[j].size     = this.shaderProgram.attributes[vbo.attributes[j].name].size;
        vbo.attributes[j].stride   = geom.attributes[j].stride;
        vbo.attributes[j].offset   = geom.attributes[j].offset;
        console.log('location [' + vbo.attributes[j].name + ']= '+ vbo.attributes[j].location + ' '+vbo.attributes[j].size);
    }

    if (vbo.type === 'indexed') {
        vbo.IndxID = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vbo.IndxID);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, geom.indices, gl.STATIC_DRAW);
        this.numIndices = geom.indices.length;
    }
    console.log('VBO ID: ' + JSON.stringify(vbo) );
    return vbo;

}

// Private
ShapeGL.prototype._createTexture = function(context, img) {
    var gl = context;
    var glTex = gl.createTexture();
    this.GLTextures.push(glTex);
    
    console.log('Create Texture from '+img.src + ' ' + img.complete);

    img.onload = function() {
        newTexture(img,glTex);
    }
    
    
    
    function newTexture(img,glTex) {
        // Image now asynchronously loaded
        // Check dimension
        if (!powerOfTwo(img.width) || !powerOfTwo(img.height) ) {
            // Alert
            var msg = "ERR: The texture "+img.src+" has non power-of-two dimension"
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
        
        function powerOfTwo(n) {
            return ( (n & (n - 1)) == 0);
        }
    }

}


ShapeGL.prototype._updateAttributes = function(context) {
    var gl = context;
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
            console.log('location [' + vbo.attributes[j].name + ']= '+ vbo.attributes[j].location + ' '+vbo.attributes[j].size);
        }
    }
}

