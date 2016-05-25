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

'use strict';

(function(exports) {

    /**
     * Node in the Scene Graph
     *
     * @class Node
     * @memberof module:mwSG
     * @constructor
     **/
    function Node() {

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
         * OpenGL/WeGL object of this node
         */
        this.nodeGL = null;

        /**
         * Matrix for rotation(s) and translation(s): the Model Matrix
         */
        this.matrix=mat4.create();
        mat4.identity(this.matrix);
    }

    Node.CLEAN = 0;
    Node.MATRIX = 1;
    Node.GEOMETRY = 2;
    Node.MATERIAL = 4;

    Node.prototype.isDirty = function() {
        return this._isDirty;
    };

    Node.prototype.getNodeGL = function() {
        return this.nodeGL;
    };

    Node.prototype.getRenderer = function() {
        if (this.renderer != null) {
            return this.renderer;
        }
        else if (this.parent instanceof Renderer) {
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
    Node.prototype.init = function(context) {
    };

    /**
     * Render this object
     * Function called by the renderer
     *
     * @param{number} OpenGL context
     **/
    Node.prototype.render = function(context) {
        this.nodeGL.pre_render(context);
        this.nodeGL.render(context);
        this.nodeGL.post_render(context);
    };

    Node.prototype.translate = function(tx, ty, tz) {
        // HACK console.log(this.matrix);
        mat4.translate(this.matrix,this.matrix,[tx, ty, tz]);
        // HACK console.log(this.matrix);
    };

    Node.prototype.graph = function(level) {
    };

    exports.Node = Node;

})(this.mwSG = this.mwSG || {} );

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

(function(exports) {

    /**
     * Leaf node in the Scene Graph
     *
     * @class Leaf
     * @memberof module:mwSG
     * @constructor
     * @augments Node
     **/
    function Leaf() {
        mwSG.Node.call(this);
        this.ID = 'leaf';
    }

    Leaf.prototype = Object.create(mwSG.Node.prototype);

    Leaf.prototype.constructor = Leaf;


    /**
     * Init the OpenGL config of this object in the scene graph
     * and traverse its children.
     * Function called by the renderer
     *
     * @param{number} OpenGL context
     **/
    Leaf.prototype.init = function(context) {
        console.log('INIT leaf ' + this.ID);
        this.getNodeGL().init(context);
    };

    /**
     * Render this object
     * Function called by the renderer
     *
     * @param {number} context - OpenGL context
     **/
    Leaf.prototype.render = function(context) {
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
    Leaf.prototype.update = function(context) {
        // HACK console.log('UPDATE_Leaf ' + this.ID);
        // HACK console.log(this.parent);
        // Update matrix
        if (this._isDirty !== Node.CLEAN) {
            mat4.multiply(this.getNodeGL().workmatrix,this.parent.getNodeGL().workmatrix,this.matrix);
            // OpenGL rendering
            this.getNodeGL().update(context);
            this._isDirty = Node.CLEAN;
        }
    };


    Leaf.prototype.graph = function(level) {
        var str = (this.ID || 'unknown');
        return str;
    };


    exports.Leaf = Leaf;


})(this.mwSG = this.mwSG || {} );

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

(function(exports) {

    /**
     * Node with children in the Scene Graph
     *
     * @class Composite
     * @memberof module:mwSG
     * @constructor
     * @augments Node
     **/
    function Composite() {
        mwSG.Node.call(this);
        this.ID = 'composite';

        this.children = [];
    }

    Composite.prototype = Object.create(mwSG.Node.prototype);
    Composite.prototype.constructor = Composite;

    /**
     * Add an object in the scene graph
     *
     * @param{object} A 3D graphics object
     **/
    Composite.prototype.add = function(an_object) {
        // Modify ID if duplicates
        an_object.name = an_object.ID + '_' + size(this.children);
        this.children[an_object.name] = an_object;
        an_object.parent = this;

        function size(obj) {
            var size = 0, key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) size++;
            }
            return size;
        }
    };

    Composite.prototype.remove = function(id) {
        if (this.children.id !== undefined) {
            delete this.children.id;
        }
    };

    Composite.prototype.getById = function(id) {

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
            return;
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
    Composite.prototype.init = function(context) {
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
    Composite.prototype.render = function(context) {
        // HACK console.log('RENDER_Composite ' + this.ID );
        // HACK console.log(this.parent);
        // Update matrix
        if (!(this.parent instanceof Renderer) ) {
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
    Composite.prototype.update = function(context) {
        if (this._isDirty !== Node.CLEAN) {
            // Update matrix ?
            mat4.multiply(this.getNodeGL().workmatrix,this.parent.getNodeGL().workmatrix,this.matrix);
            // Update OpenGL (e.g. VBOs, shaders, etc.)
            this.getNodeGL().update(context);
            this._isDirty = Node.CLEAN;
        }
        // Propagate to children
        for (var i in this.children) {
            this.children[i].update(context);
        }
    };

    Composite.prototype.graph = function(level) {
        var lvl = level || 0;
        var spaces = Array(lvl+1).join('.');
        var str = (this.ID || 'unknown') +'\n';
        for (var i in this.children) {
            str += spaces + '+-'+this.children[i].graph(lvl++)+'\n';
        }
        return str;
    };


    Composite.prototype.traverse = function(context,a_node) {
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


    exports.Composite = Composite;


})(this.mwSG = this.mwSG || {});

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


/**
 * @constructor
 * @param {Node} node - Object belonging to the scene graph
 * @extends module:mwGL.Node
 * @author Jean-Christophe Taveau
 **/

(function(exports) {

    function NodeGL(node) {
        this.sgnode = node;
        this.glType = -1;
        this._isDirty = true;

        // Matrix for rotation(s) and translation(s)
        this.workmatrix= mat4.create();
        mat4.identity(this.workmatrix);
    };

    NodeGL.prototype.isDirty = function() {
        return this._isDirty;
    };

    NodeGL.prototype.init = function(context) {
        // Do nothing
        this.isDirty = false;
    };

    NodeGL.prototype.pre_render = function(context) {
        // Do nothing
    };

    NodeGL.prototype.render = function(context) {
        // Do nothing
    };

    NodeGL.prototype.post_render = function(context) {
        // Do nothing
    };


    exports.Node = NodeGL;


})(this.mwGL = this.mwGL || {} );

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

var ColorFactory = (function () {

    // Storage for our various styles types
    var colorers = {};
    return {
        /**
         * Get shape
         *
         * @example
         * var shape = ShapeFactory.get(name);
         */
        get: function ( name ) {
            switch (name) {
            case 'color_chain':
                if (colorers.CHAIN === undefined) {
                    colorers.CHAIN = new ChainColorer();
                }
                return colorers.CHAIN;
            case 'color_cpk':
                if (colorers.CPK === undefined) {
                    colorers.CPK = new CPKColorer();
                }
                return colorers.CPK;
            case 'color_mono':
                // TODO
                break;
            case 'color_struct':
                // TODO
                break;
            case 'color_rainbow':
                // TODO
                break;
            default:
                if (colorers.CPK === undefined) {
                    colorers.CPK = new CPKColorer();
                }
                return colorers.CPK;
            }
        }
    };
})();

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
 * CPK Colorer generates given RGB color depending an atom
 *
 * @class CPKColorer
 * @memberof module:graphics
 * @constructor
 * @author Jean-Christophe Taveau
 **/
function CPKColorer() {
    this.name = 'CPK';
}

CPKColorer.prototype.get = function(atom) {
    var rgb = CPKColorer.colors[atom.symbol].rgb;

    return rgb;
};


CPKColorer.colors = {
    'H':{
        'symbol':'H',
        'rgb':[1,1,1],
        'rgbRasmol':[1,1,1]
    },
    'HE':{
        'symbol':'He',
        'rgb':[0.8509803921568627,1,1],
        'rgbRasmol':[1,0.7529411764705882,0.796078431372549]
    },
    'LI':{
        'symbol':'Li',
        'rgb':[0.8,0.5019607843137255,1],
        'rgbRasmol':[0.6980392156862745,0.13333333333333333,0.13333333333333333]
    },
    'BE':{
        'symbol':'Be',
        'rgb':[0.7607843137254902,1,0],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'B':{
        'symbol':'B',
        'rgb':[1,0.7098039215686275,0.7098039215686275],
        'rgbRasmol':[0,1,0]
    },
    'C':{
        'symbol':'C',
        'rgb':[0.5647058823529412,0.5647058823529412,0.5647058823529412],
        'rgbRasmol':[0.7843137254901961,0.7843137254901961,0.7843137254901961]
    },
    'N':{
        'symbol':'N',
        'rgb':[0.18823529411764706,0.3137254901960784,0.9725490196078431],
        'rgbRasmol':[0.5607843137254902,0.5607843137254902,1]
    },
    'O':{
        'symbol':'O',
        'rgb':[1,0.050980392156862744,0.050980392156862744],
        'rgbRasmol':[0.9411764705882353,0,0]
    },
    'F':{
        'symbol':'F',
        'rgb':[0.5647058823529412,0.8784313725490196,0.3137254901960784],
        'rgbRasmol':[0.8549019607843137,0.6470588235294118,0.12549019607843137]
    },
    'NE':{
        'symbol':'Ne',
        'rgb':[0.7019607843137254,0.8901960784313725,0.9607843137254902],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'NA':{
        'symbol':'Na',
        'rgb':[0.6705882352941176,0.3607843137254902,0.9490196078431372],
        'rgbRasmol':[0,0,1]
    },
    'MG':{
        'symbol':'Mg',
        'rgb':[0.5411764705882353,1,0],
        'rgbRasmol':[0.13333333333333333,0.5450980392156862,0.13333333333333333]
    },
    'AL':{
        'symbol':'Al',
        'rgb':[0.7490196078431373,0.6509803921568628,0.6509803921568628],
        'rgbRasmol':[0.5019607843137255,0.5019607843137255,0.5647058823529412]
    },
    'SI':{
        'symbol':'Si',
        'rgb':[0.9411764705882353,0.7843137254901961,0.6274509803921569],
        'rgbRasmol':[0.8549019607843137,0.6470588235294118,0.12549019607843137]
    },
    'P':{
        'symbol':'P',
        'rgb':[1,0.5019607843137255,0],
        'rgbRasmol':[1,0.6470588235294118,0]
    },
    'S':{
        'symbol':'S',
        'rgb':[1,1,0.18823529411764706],
        'rgbRasmol':[1,0.7843137254901961,0.19607843137254902]
    },
    'CL':{
        'symbol':'Cl',
        'rgb':[0.12156862745098039,0.9411764705882353,0.12156862745098039],
        'rgbRasmol':[0,1,0]
    },
    'AR':{
        'symbol':'Ar',
        'rgb':[0.5019607843137255,0.8196078431372549,0.8901960784313725],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'K':{
        'symbol':'K',
        'rgb':[0.5607843137254902,0.25098039215686274,0.8313725490196079],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'CA':{
        'symbol':'Ca',
        'rgb':[0.23921568627450981,1,0],
        'rgbRasmol':[0.5019607843137255,0.5019607843137255,0.5647058823529412]
    },
    'SC':{
        'symbol':'Sc',
        'rgb':[0.9019607843137255,0.9019607843137255,0.9019607843137255],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'TI':{
        'symbol':'Ti',
        'rgb':[0.7490196078431373,0.7607843137254902,0.7803921568627451],
        'rgbRasmol':[0.5019607843137255,0.5019607843137255,0.5647058823529412]
    },
    'V':{
        'symbol':'V',
        'rgb':[0.6509803921568628,0.6509803921568628,0.6705882352941176],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'CR':{
        'symbol':'Cr',
        'rgb':[0.5411764705882353,0.6,0.7803921568627451],
        'rgbRasmol':[0.5019607843137255,0.5019607843137255,0.5647058823529412]
    },
    'MN':{
        'symbol':'Mn',
        'rgb':[0.611764705882353,0.47843137254901963,0.7803921568627451],
        'rgbRasmol':[0.5019607843137255,0.5019607843137255,0.5647058823529412]
    },
    'FE':{
        'symbol':'Fe',
        'rgb':[0.8784313725490196,0.4,0.2],
        'rgbRasmol':[1,0.6470588235294118,0]
    },
    'CO':{
        'symbol':'Co',
        'rgb':[0.9411764705882353,0.5647058823529412,0.6274509803921569],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'NI':{
        'symbol':'Ni',
        'rgb':[0.3137254901960784,0.8156862745098039,0.3137254901960784],
        'rgbRasmol':[0.6470588235294118,0.16470588235294117,0.16470588235294117]
    },
    'CU':{
        'symbol':'Cu',
        'rgb':[0.7843137254901961,0.5019607843137255,0.2],
        'rgbRasmol':[0.6470588235294118,0.16470588235294117,0.16470588235294117]
    },
    'ZN':{
        'symbol':'Zn',
        'rgb':[0.49019607843137253,0.5019607843137255,0.6901960784313725],
        'rgbRasmol':[0.6470588235294118,0.16470588235294117,0.16470588235294117]
    },
    'GA':{
        'symbol':'Ga',
        'rgb':[0.7607843137254902,0.5607843137254902,0.5607843137254902],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'GE':{
        'symbol':'Ge',
        'rgb':[0.4,0.5607843137254902,0.5607843137254902],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'AS':{
        'symbol':'As',
        'rgb':[0.7411764705882353,0.5019607843137255,0.8901960784313725],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'SE':{
        'symbol':'Se',
        'rgb':[1,0.6313725490196078,0],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'BR':{
        'symbol':'Br',
        'rgb':[0.6509803921568628,0.1607843137254902,0.1607843137254902],
        'rgbRasmol':[0.6470588235294118,0.16470588235294117,0.16470588235294117]
    },
    'KR':{
        'symbol':'Kr',
        'rgb':[0.3607843137254902,0.7215686274509804,0.8196078431372549],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'RB':{
        'symbol':'Rb',
        'rgb':[0.4392156862745098,0.1803921568627451,0.6901960784313725],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'SR':{
        'symbol':'Sr',
        'rgb':[0,1,0],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'Y':{
        'symbol':'Y',
        'rgb':[0.5803921568627451,1,1],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'ZR':{
        'symbol':'Zr',
        'rgb':[0.5803921568627451,0.8784313725490196,0.8784313725490196],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'NB':{
        'symbol':'Nb',
        'rgb':[0.45098039215686275,0.7607843137254902,0.788235294117647],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'MO':{
        'symbol':'Mo',
        'rgb':[0.32941176470588235,0.7098039215686275,0.7098039215686275],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'TC':{
        'symbol':'Tc',
        'rgb':[0.23137254901960785,0.6196078431372549,0.6196078431372549],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'RU':{
        'symbol':'Ru',
        'rgb':[0.1411764705882353,0.5607843137254902,0.5607843137254902],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'RH':{
        'symbol':'Rh',
        'rgb':[0.0392156862745098,0.49019607843137253,0.5490196078431373],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'PD':{
        'symbol':'Pd',
        'rgb':[0,0.4117647058823529,0.5215686274509804],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'AG':{
        'symbol':'Ag',
        'rgb':[0.7529411764705882,0.7529411764705882,0.7529411764705882],
        'rgbRasmol':[0.5019607843137255,0.5019607843137255,0.5647058823529412]
    },
    'CD':{
        'symbol':'Cd',
        'rgb':[1,0.8509803921568627,0.5607843137254902],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'IN':{
        'symbol':'In',
        'rgb':[0.6509803921568628,0.4588235294117647,0.45098039215686275],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'SN':{
        'symbol':'Sn',
        'rgb':[0.4,0.5019607843137255,0.5019607843137255],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'SB':{
        'symbol':'Sb',
        'rgb':[0.6196078431372549,0.38823529411764707,0.7098039215686275],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'TE':{
        'symbol':'Te',
        'rgb':[0.8313725490196079,0.47843137254901963,0],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'I':{
        'symbol':'I',
        'rgb':[0.5803921568627451,0,0.5803921568627451],
        'rgbRasmol':[0.6274509803921569,0.12549019607843137,0.9411764705882353]
    },
    'XE':{
        'symbol':'Xe',
        'rgb':[0.25882352941176473,0.6196078431372549,0.6901960784313725],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'CS':{
        'symbol':'Cs',
        'rgb':[0.3411764705882353,0.09019607843137255,0.5607843137254902],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'BA':{
        'symbol':'Ba',
        'rgb':[0,0.788235294117647,0],
        'rgbRasmol':[1,0.6470588235294118,0]
    },
    'LA':{
        'symbol':'La',
        'rgb':[0.4392156862745098,0.8313725490196079,1],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'CE':{
        'symbol':'Ce',
        'rgb':[1,1,0.7803921568627451],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'PR':{
        'symbol':'Pr',
        'rgb':[0.8509803921568627,1,0.7803921568627451],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'ND':{
        'symbol':'Nd',
        'rgb':[0.7803921568627451,1,0.7803921568627451],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'PM':{
        'symbol':'Pm',
        'rgb':[0.6392156862745098,1,0.7803921568627451],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'SM':{
        'symbol':'Sm',
        'rgb':[0.5607843137254902,1,0.7803921568627451],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'EU':{
        'symbol':'Eu',
        'rgb':[0.3803921568627451,1,0.7803921568627451],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'GD':{
        'symbol':'Gd',
        'rgb':[0.27058823529411763,1,0.7803921568627451],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'TB':{
        'symbol':'Tb',
        'rgb':[0.18823529411764706,1,0.7803921568627451],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'DY':{
        'symbol':'Dy',
        'rgb':[0.12156862745098039,1,0.7803921568627451],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'HO':{
        'symbol':'Ho',
        'rgb':[0,1,0.611764705882353],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'ER':{
        'symbol':'Er',
        'rgb':[0,0.9019607843137255,0.4588235294117647],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'TM':{
        'symbol':'Tm',
        'rgb':[0,0.8313725490196079,0.3215686274509804],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'YB':{
        'symbol':'Yb',
        'rgb':[0,0.7490196078431373,0.2196078431372549],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'LU':{
        'symbol':'Lu',
        'rgb':[0,0.6705882352941176,0.1411764705882353],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'HF':{
        'symbol':'Hf',
        'rgb':[0.30196078431372547,0.7607843137254902,1],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'TA':{
        'symbol':'Ta',
        'rgb':[0.30196078431372547,0.6509803921568628,1],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'W':{
        'symbol':'W',
        'rgb':[0.12941176470588237,0.5803921568627451,0.8392156862745098],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'RE':{
        'symbol':'Re',
        'rgb':[0.14901960784313725,0.49019607843137253,0.6705882352941176],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'OS':{
        'symbol':'Os',
        'rgb':[0.14901960784313725,0.4,0.5882352941176471],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'IR':{
        'symbol':'Ir',
        'rgb':[0.09019607843137255,0.32941176470588235,0.5294117647058824],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'PT':{
        'symbol':'Pt',
        'rgb':[0.8156862745098039,0.8156862745098039,0.8784313725490196],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'AU':{
        'symbol':'Au',
        'rgb':[1,0.8196078431372549,0.13725490196078433],
        'rgbRasmol':[0.8549019607843137,0.6470588235294118,0.12549019607843137]
    },
    'HG':{
        'symbol':'Hg',
        'rgb':[0.7215686274509804,0.7215686274509804,0.8156862745098039],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'TL':{
        'symbol':'Tl',
        'rgb':[0.6509803921568628,0.32941176470588235,0.30196078431372547],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'PB':{
        'symbol':'Pb',
        'rgb':[0.3411764705882353,0.34901960784313724,0.3803921568627451],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'BI':{
        'symbol':'Bi',
        'rgb':[0.6196078431372549,0.30980392156862746,0.7098039215686275],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'PO':{
        'symbol':'Po',
        'rgb':[0.6705882352941176,0.3607843137254902,0],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'AT':{
        'symbol':'At',
        'rgb':[0.4588235294117647,0.30980392156862746,0.27058823529411763],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'RN':{
        'symbol':'Rn',
        'rgb':[0.25882352941176473,0.5098039215686274,0.5882352941176471],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'FR':{
        'symbol':'Fr',
        'rgb':[0.25882352941176473,0,0.4],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'RA':{
        'symbol':'Ra',
        'rgb':[0,0.49019607843137253,0],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'AC':{
        'symbol':'Ac',
        'rgb':[0.4392156862745098,0.6705882352941176,0.9803921568627451],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'TH':{
        'symbol':'Th',
        'rgb':[0,0.7294117647058823,1],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'PA':{
        'symbol':'Pa',
        'rgb':[0,0.6313725490196078,1],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'U':{
        'symbol':'U',
        'rgb':[0,0.5607843137254902,1],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'NP':{
        'symbol':'Np',
        'rgb':[0,0.5019607843137255,1],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'PU':{
        'symbol':'Pu',
        'rgb':[0,0.4196078431372549,1],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'AM':{
        'symbol':'Am',
        'rgb':[0.32941176470588235,0.3607843137254902,0.9490196078431372],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'CM':{
        'symbol':'Cm',
        'rgb':[0.47058823529411764,0.3607843137254902,0.8901960784313725],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'BK':{
        'symbol':'Bk',
        'rgb':[0.5411764705882353,0.30980392156862746,0.8901960784313725],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'CF':{
        'symbol':'Cf',
        'rgb':[0.6313725490196078,0.21176470588235294,0.8313725490196079],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'ES':{
        'symbol':'Es',
        'rgb':[0.7019607843137254,0.12156862745098039,0.8313725490196079],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'FM':{
        'symbol':'Fm',
        'rgb':[0.7019607843137254,0.12156862745098039,0.7294117647058823],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'MD':{
        'symbol':'Md',
        'rgb':[0.7019607843137254,0.050980392156862744,0.6509803921568628],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'NO':{
        'symbol':'No',
        'rgb':[0.7411764705882353,0.050980392156862744,0.5294117647058824],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'LR':{
        'symbol':'Lr',
        'rgb':[0.7803921568627451,0,0.4],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'RF':{
        'symbol':'Rf',
        'rgb':[0.8,0,0.34901960784313724],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'DB':{
        'symbol':'Db',
        'rgb':[0.8196078431372549,0,0.30980392156862746],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'SG':{
        'symbol':'Sg',
        'rgb':[0.8509803921568627,0,0.27058823529411763],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'BH':{
        'symbol':'Bh',
        'rgb':[0.8784313725490196,0,0.2196078431372549],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'HS':{
        'symbol':'Hs',
        'rgb':[0.9019607843137255,0,0.1803921568627451],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'MT':{'symbol':'Mt',
        'rgb':[0.9215686274509803,0,0.14901960784313725],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    }
};

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
 * CPK Colorer generates given RGB color depending an atom
 *
 * @class ChainColorer
 * @memberof module:graphics
 * @constructor
 * @author Jean-Christophe Taveau
 **/
function ChainColorer() {
    this.name = 'Chain';
}

ChainColorer.prototype.get = function(atom) {
    var rgb = [];
    if (atom.type === 'HETATM') {
        rgb = ChainColorer.colors[atom.chain].rgbHETATM;
    }
    else {
        rgb = ChainColorer.colors[atom.chain].rgbATOM;
    }
    return rgb;
};


ChainColorer.colors = {
    '0':{
        'chainID':'0',
        'rgbATOM':[0,1,0.4980392156862745],
        'rgbHETATM':[0,0.8117647058823529,0.43529411764705883]
    },
    '1':{
        'chainID':'1',
        'rgbATOM':[0.23529411764705882,0.7019607843137254,0.44313725490196076],
        'rgbHETATM':[0.20392156862745098,0.6078431372549019,0.3803921568627451]
    },
    '2':{
        'chainID':'2',
        'rgbATOM':[0,0,0.5450980392156862],
        'rgbHETATM':[0,0,0.7333333333333333]
    },
    '3':{
        'chainID':'3',
        'rgbATOM':[0.7411764705882353,0.7176470588235294,0.4196078431372549],
        'rgbHETATM':[0.6470588235294118,0.6235294117647059,0.3568627450980392]
    },
    '4':{
        'chainID':'4',
        'rgbATOM':[0,0.39215686274509803,0],
        'rgbHETATM':[0,0.5803921568627451,0]
    },
    '5':{
        'chainID':'5',
        'rgbATOM':[0.5019607843137255,0,0],
        'rgbHETATM':[0.6901960784313725,0,0]
    },
    '6':{
        'chainID':'6',
        'rgbATOM':[0.5019607843137255,0.5019607843137255,0],
        'rgbHETATM':[0.6901960784313725,0.6901960784313725,0]
    },
    '7':{
        'chainID':'7',
        'rgbATOM':[0.5019607843137255,0,0.5019607843137255],
        'rgbHETATM':[0.6901960784313725,0,0.6901960784313725]
    },
    '8':{
        'chainID':'8',
        'rgbATOM':[0,0.5019607843137255,0.5019607843137255],
        'rgbHETATM':[0,0.6901960784313725,0.6901960784313725]
    },
    '9':{
        'chainID':'9',
        'rgbATOM':[0.7215686274509804,0.5254901960784314,0.043137254901960784],
        'rgbHETATM':[0.9098039215686274,0.7137254901960784,0.07450980392156863]
    },
    'A':{
        'chainID':'A',
        'rgbATOM':[0.7529411764705882,0.8156862745098039,1],
        'rgbHETATM':[0.5647058823529412,0.6274509803921569,0.8117647058823529]
    },
    'a':{
        'chainID':'a',
        'rgbATOM':[0.7529411764705882,0.8156862745098039,1],
        'rgbHETATM':[0.5647058823529412,0.6274509803921569,0.8117647058823529]
    },
    'B':{
        'chainID':'B',
        'rgbATOM':[0.6901960784313725,1,0.6901960784313725],
        'rgbHETATM':[0.5019607843137255,0.8117647058823529,0.596078431372549]
    },
    'b':{
        'chainID':'b',
        'rgbATOM':[0.6901960784313725,1,0.6901960784313725],
        'rgbHETATM':[0.5019607843137255,0.8117647058823529,0.596078431372549]
    },
    'C':{
        'chainID':'C',
        'rgbATOM':[1,0.7529411764705882,0.7843137254901961],
        'rgbHETATM':[0.8117647058823529,0.5647058823529412,0.6901960784313725]
    },
    'c':{
        'chainID':'c',
        'rgbATOM':[1,0.7529411764705882,0.7843137254901961],
        'rgbHETATM':[0.8117647058823529,0.5647058823529412,0.6901960784313725]
    },
    'D':{
        'chainID':'D',
        'rgbATOM':[1,1,0.5019607843137255],
        'rgbHETATM':[0.8117647058823529,0.8117647058823529,0.4392156862745098]
    },
    'd':{
        'chainID':'d',
        'rgbATOM':[1,1,0.5019607843137255],
        'rgbHETATM':[0.8117647058823529,0.8117647058823529,0.4392156862745098]
    },
    'E':{
        'chainID':'E',
        'rgbATOM':[1,0.7529411764705882,1],
        'rgbHETATM':[0.8117647058823529,0.5647058823529412,0.8117647058823529]
    },
    'e':{
        'chainID':'e',
        'rgbATOM':[1,0.7529411764705882,1],
        'rgbHETATM':[0.8117647058823529,0.5647058823529412,0.8117647058823529]
    },
    'F':{
        'chainID':'F',
        'rgbATOM':[0.6901960784313725,0.9411764705882353,0.9411764705882353],
        'rgbHETATM':[0.5019607843137255,0.7529411764705882,0.7529411764705882]
    },
    'f':{
        'chainID':'f',
        'rgbATOM':[0.6901960784313725,0.9411764705882353,0.9411764705882353],
        'rgbHETATM':[0.5019607843137255,0.7529411764705882,0.7529411764705882]
    },
    'G':{
        'chainID':'G',
        'rgbATOM':[1,0.8156862745098039,0.4392156862745098],
        'rgbHETATM':[0.8117647058823529,0.6274509803921569,0.3764705882352941]
    },
    'g':{
        'chainID':'g',
        'rgbATOM':[1,0.8156862745098039,0.4392156862745098],
        'rgbHETATM':[0.8117647058823529,0.6274509803921569,0.3764705882352941]
    },
    'H':{
        'chainID':'H',
        'rgbATOM':[0.9411764705882353,0.5019607843137255,0.5019607843137255],
        'rgbHETATM':[0.7529411764705882,0.3137254901960784,0.4392156862745098]
    },
    'h':{
        'chainID':'h',
        'rgbATOM':[0.9411764705882353,0.5019607843137255,0.5019607843137255],
        'rgbHETATM':[0.7529411764705882,0.3137254901960784,0.4392156862745098]
    },
    'I':{
        'chainID':'I',
        'rgbATOM':[0.9607843137254902,0.8705882352941177,0.7019607843137254],
        'rgbHETATM':[0.7725490196078432,0.6823529411764706,0.5137254901960784]
    },
    'i':{
        'chainID':'i',
        'rgbATOM':[0.9607843137254902,0.8705882352941177,0.7019607843137254],
        'rgbHETATM':[0.7725490196078432,0.6823529411764706,0.5137254901960784]
    },
    'J':{
        'chainID':'J',
        'rgbATOM':[0,0.7490196078431373,1],
        'rgbHETATM':[0,0.6549019607843137,0.8117647058823529]
    },
    'j':{
        'chainID':'j',
        'rgbATOM':[0,0.7490196078431373,1],
        'rgbHETATM':[0,0.6549019607843137,0.8117647058823529]
    },
    'K':{
        'chainID':'K',
        'rgbATOM':[0.803921568627451,0.3607843137254902,0.3607843137254902],
        'rgbHETATM':[0.7098039215686275,0.2980392156862745,0.2980392156862745]
    },
    'k':{
        'chainID':'k',
        'rgbATOM':[0.803921568627451,0.3607843137254902,0.3607843137254902],
        'rgbHETATM':[0.7098039215686275,0.2980392156862745,0.2980392156862745]
    },
    'L':{
        'chainID':'L',
        'rgbATOM':[0.4,0.803921568627451,0.6666666666666666],
        'rgbHETATM':[0.33725490196078434,0.7098039215686275,0.5725490196078431]
    },
    'l':{
        'chainID':'l',
        'rgbATOM':[0.4,0.803921568627451,0.6666666666666666],
        'rgbHETATM':[0.33725490196078434,0.7098039215686275,0.5725490196078431]
    },
    'M':{
        'chainID':'M',
        'rgbATOM':[0.6039215686274509,0.803921568627451,0.19607843137254902],
        'rgbHETATM':[0.5411764705882353,0.7098039215686275,0.16470588235294117]
    },
    'm':{
        'chainID':'m',
        'rgbATOM':[0.6039215686274509,0.803921568627451,0.19607843137254902],
        'rgbHETATM':[0.5411764705882353,0.7098039215686275,0.16470588235294117]
    },
    'N':{
        'chainID':'N',
        'rgbATOM':[0.9333333333333333,0.5098039215686274,0.9333333333333333],
        'rgbHETATM':[0.7450980392156863,0.4470588235294118,0.7450980392156863]
    },
    'n':{
        'chainID':'n',
        'rgbATOM':[0.9333333333333333,0.5098039215686274,0.9333333333333333],
        'rgbHETATM':[0.7450980392156863,0.4470588235294118,0.7450980392156863]
    },
    'O':{
        'chainID':'O',
        'rgbATOM':[0,0.807843137254902,0.8196078431372549],
        'rgbHETATM':[0,0.7137254901960784,0.6313725490196078]
    },
    'o':{
        'chainID':'o',
        'rgbATOM':[0,0.807843137254902,0.8196078431372549],
        'rgbHETATM':[0,0.7137254901960784,0.6313725490196078]
    },
    'P':{
        'chainID':'P',
        'rgbATOM':[0,1,0.4980392156862745],
        'rgbHETATM':[0,0.8117647058823529,0.43529411764705883]
    },
    'p':{
        'chainID':'p',
        'rgbATOM':[0,1,0.4980392156862745],
        'rgbHETATM':[0,0.8117647058823529,0.43529411764705883]
    },
    'Q':{
        'chainID':'Q',
        'rgbATOM':[0.23529411764705882,0.7019607843137254,0.44313725490196076],
        'rgbHETATM':[0.20392156862745098,0.6078431372549019,0.3803921568627451]
    },
    'q':{
        'chainID':'q',
        'rgbATOM':[0.23529411764705882,0.7019607843137254,0.44313725490196076],
        'rgbHETATM':[0.20392156862745098,0.6078431372549019,0.3803921568627451]
    },
    'R':{
        'chainID':'R',
        'rgbATOM':[0,0,0.5450980392156862],
        'rgbHETATM':[0,0,0.7333333333333333]
    },
    'r':{
        'chainID':'r',
        'rgbATOM':[0,0,0.5450980392156862],
        'rgbHETATM':[0,0,0.7333333333333333]
    },
    'S':{
        'chainID':'S',
        'rgbATOM':[0.7411764705882353,0.7176470588235294,0.4196078431372549],
        'rgbHETATM':[0.6470588235294118,0.6235294117647059,0.3568627450980392]
    },
    's':{
        'chainID':'s',
        'rgbATOM':[0.7411764705882353,0.7176470588235294,0.4196078431372549],
        'rgbHETATM':[0.6470588235294118,0.6235294117647059,0.3568627450980392]
    },
    'T':{
        'chainID':'T',
        'rgbATOM':[0,0.39215686274509803,0],
        'rgbHETATM':[0,0.5803921568627451,0]
    },
    't':{
        'chainID':'t',
        'rgbATOM':[0,0.39215686274509803,0],
        'rgbHETATM':[0,0.5803921568627451,0]
    },
    'U':{
        'chainID':'U',
        'rgbATOM':[0.5019607843137255,0,0],
        'rgbHETATM':[0.6901960784313725,0,0]
    },
    'u':{
        'chainID':'u',
        'rgbATOM':[0.5019607843137255,0,0],
        'rgbHETATM':[0.6901960784313725,0,0]
    },
    'V':{
        'chainID':'V',
        'rgbATOM':[0.5019607843137255,0.5019607843137255,0],
        'rgbHETATM':[0.6901960784313725,0.6901960784313725,0]
    },
    'v':{
        'chainID':'v',
        'rgbATOM':[0.5019607843137255,0.5019607843137255,0],
        'rgbHETATM':[0.6901960784313725,0.6901960784313725,0]
    },
    'W':{
        'chainID':'W',
        'rgbATOM':[0.5019607843137255,0,0.5019607843137255],
        'rgbHETATM':[0.6901960784313725,0,0.6901960784313725]
    },
    'w':{
        'chainID':'w',
        'rgbATOM':[0.5019607843137255,0,0.5019607843137255],
        'rgbHETATM':[0.6901960784313725,0,0.6901960784313725]
    },
    'X':{
        'chainID':'X',
        'rgbATOM':[0,0.5019607843137255,0.5019607843137255],
        'rgbHETATM':[0,0.6901960784313725,0.6901960784313725]
    },
    'x':{
        'chainID':'x',
        'rgbATOM':[0,0.5019607843137255,0.5019607843137255],
        'rgbHETATM':[0,0.6901960784313725,0.6901960784313725]
    },
    'Y':{
        'chainID':'Y',
        'rgbATOM':[0.7215686274509804,0.5254901960784314,0.043137254901960784],
        'rgbHETATM':[0.9098039215686274,0.7137254901960784,0.07450980392156863]
    },
    'y':{
        'chainID':'y',
        'rgbATOM':[0.7215686274509804,0.5254901960784314,0.043137254901960784],
        'rgbHETATM':[0.9098039215686274,0.7137254901960784,0.07450980392156863]
    },
    'Z':{
        'chainID':'Z',
        'rgbATOM':[0.6980392156862745,0.13333333333333333,0.13333333333333333],
        'rgbHETATM':[0.7607843137254902,0.19607843137254902,0.19607843137254902]
    },
    'z':{
        'chainID':'z',
        'rgbATOM':[0.6980392156862745,0.13333333333333333,0.13333333333333333],
        'rgbHETATM':[0.7607843137254902,0.19607843137254902,0.19607843137254902]
    },
    '_':{
        'chainID':'_',
        'rgbATOM':[1,1,1],
        'rgbHETATM':[1,1,1]
    }
};

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

function ShaderCompilationException(value) {
    this.value = value;
    this.message = 'cannot compile the shader source';
    this.toString = function() {
        return this.value + this.message;
    };
}

function ShaderLinkException(value) {
    this.value = value;
    this.message = 'cannot compile the shader source';
    this.toString = function() {
        return this.value + this.message;
    };
}

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
 * Point Geometer generates coordinates
 *
 * @class PointGeometer
 * @memberof module:graphics
 * @constructor
 * @author Jean-Christophe Taveau
 **/
function PointGeometer(mol,colorer) {
    console.log('PointGeometer');
    this.mol = mol;
    this.colorer = colorer || CPKColorer;
    this.shape;

    // TODO: Check if already calculated and stored in database
}

/**
 * Get shape corresponding to this geometry style
 *
 * @return {shape}
 * @author Jean-Christophe Taveau
 */
PointGeometer.prototype.getShape = function () {
    if (this.shape === undefined) {
        this.shape = new Shape();
        var vertices = [];
        // Only one array is used to define the vertices and corresponding colors
        // Interleaved array of (vertices + colors)
        // X Y Z R G B X Y Z R G B
        for (var i=0; i < this.mol.atoms.length; i++) {
            vertices.push(this.mol.atoms[i].x);
            vertices.push(this.mol.atoms[i].y);
            vertices.push(this.mol.atoms[i].z);
            // get RGB color
            var rgb = this.colorer.get(this.mol.atoms[i]);
            vertices.push(rgb[0]);
            vertices.push(rgb[1]);
            vertices.push(rgb[2]);
        }
        // Set geometry and colors of this shape
        this.shape.type = 'POINTS';
        this.shape.addVertexData(
            {
                'content': Shape.XYZ | Shape.RGB,
                'data':vertices,
                'attributes': [new Attribute("aVertexPosition",0,6), new Attribute("aVertexColor",3,6)]
            }
        );
        console.log(this.mol.centroid);
        //mat4.translate(this.shape.matrix,this.shape.matrix,[-this.mol.centroid.x,-this.mol.centroid.y,-this.mol.centroid.z]);
        this.shape.translate(-this.mol.centroid.x, -this.mol.centroid.y, -this.mol.centroid.z);

    }
    console.log(this.shape);
    return this.shape;
};

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
 * Wireframe Geometer generates lines from bonds
 *
 * @class WireGeometer
 * @memberof module:graphics
 * @constructor
 * @author Jean-Christophe Taveau
 **/
function WireGeometer(mol,colorer) {
    this.mol = mol;
    this.colorer = colorer || CPKColorer;
    this.shape;
    // TODO: Check if already calculated and stored in database
}

/**
 * Get shape corresponding to this geometry style
 *
 * @return {shape}
 * @author Jean-Christophe Taveau
 */
WireGeometer.prototype.getShape = function () {
    var vertices = [];
    var colors = [];
    var indices = [];

    var createWireframeShape = function(mol,colMaker) {
        var alreadyDone = {};
        var index=0;

        // Collect all the XYZ-coordinates of atoms + middle points
        for (var i=0; i < mol.bonds.length; i++) {
            var bond = mol.bonds[i];
            // First atom
            var rgbAtom1 = colMaker.get(bond.atom1);
            if (alreadyDone[bond.atom1.serial] === undefined) {
                index = vertices.length / 3.0;
                vertices.push(bond.atom1.x);
                vertices.push(bond.atom1.y);
                vertices.push(bond.atom1.z);
                colors.push(rgbAtom1[0]);
                colors.push(rgbAtom1[1]);
                colors.push(rgbAtom1[2]);
                alreadyDone[bond.atom1.serial] = index;
            }

            // First half bond
            index = vertices.length / 3.0;
            vertices.push(bond.middle.x);
            vertices.push(bond.middle.y);
            vertices.push(bond.middle.z);
            colors.push(rgbAtom1[0]);
            colors.push(rgbAtom1[1]);
            colors.push(rgbAtom1[2]);

            indices.push(alreadyDone[bond.atom1.serial]);
            indices.push(index); // middle

            // Second half bond
            var rgbAtom2 = colMaker.get(bond.atom2);
            if (alreadyDone[bond.atom2.serial] === undefined) {
                index = vertices.length / 3.0;
                vertices.push(bond.atom2.x);
                vertices.push(bond.atom2.y);
                vertices.push(bond.atom2.z);
                colors.push(rgbAtom2[0]);
                colors.push(rgbAtom2[1]);
                colors.push(rgbAtom2[2]);

                alreadyDone[bond.atom2.serial] = index;
            }

            index = vertices.length / 3.0;
            vertices.push(bond.middle.x);
            vertices.push(bond.middle.y);
            vertices.push(bond.middle.z);
            colors.push(rgbAtom2[0]);
            colors.push(rgbAtom2[1]);
            colors.push(rgbAtom2[2]);

            indices.push(alreadyDone[bond.atom2.serial]);
            indices.push(index); // middle
        }
    };

    // Do the job
    if (this.shape === undefined) {
        if (this.mol.bonds === undefined || this.mol.bonds.length === 0) {
            BondCalculator(this.mol);
        }
        // HACK console.log('Create wireframe shape');
        createWireframeShape(this.mol,this.colorer);
        // HACK console.log(vertices);
        // HACK console.log(indices);

        this.shape = new mwSG.Shape();
        this.shape.type = 'LINES';
        this.shape.addVertexData(
            {
                'content'   : mwSG.Shape.XYZ,
                'data'      : vertices,
                'attributes': [new Attribute('aVertexPosition',0,0)]
            }
        );
        this.shape.addVertexData(
            {
                'content'   : mwSG.Shape.RGB,
                'data'      : colors,
                'attributes': [new Attribute('aVertexColor',0,0)]
            }
        );
        this.shape.addVertexData(
            {
                'content'   : mwSG.Shape.INDICES,
                'data'      : indices
            }
        );

        this.shape.translate(-this.mol.centroid.x, -this.mol.centroid.y, -this.mol.centroid.z);
    }
    // HACK console.log(this.shape);
    return this.shape;
};

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

/**
 * Get scene
 *
 * @return {Scene} - Get the scene which is the root of the scene graph.
 *
 **/
Renderer.prototype.getScene = function () {
    return this.scene;
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

    // HACK Default shader program???
    this.program = new Program();
};

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
        // HACK console.log('RENDER CAM++ ' ,gl.viewportWidth,gl.viewportHeight);
        // HACK console.log(context);

        // Update viewport...
        var viewport = this.sgnode.callback.call(this,gl.viewportWidth,gl.viewportHeight);

        // Update Projection Matrix
        //mat4.perspective(this.sgnode.projMatrix,this.sgnode.fovy * this.sgnode.zoom,viewport.width / viewport.height,this.sgnode.zNear,this.sgnode.zFar);

        // Update uniforms
        this.sgnode.getRenderer().setUniform('uVMatrix', this.sgnode.viewMatrix);
        this.sgnode.getRenderer().setUniform('uPMatrix', this.sgnode.projMatrix);

        // Update GL viewport
        console.log(this.sgnode.name+' '+viewport.x+' '+viewport.y+' '+viewport.width+' '+viewport.height);
        gl.viewport(viewport.x, viewport.y, viewport.width, viewport.height);
    };


    exports.Camera = _Camera;


})(this.mwGL = this.mwGL || {} );

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
 * @class Scene
 * @memberof module:mwGL
 *
 *
 **/


/**
 * @constructor
 * @param {Node} node - Scene belonging to the scene graph
 * @extends module:mwGL.Node
 * @author Jean-Christophe Taveau
 **/


(function(exports) {
    function _Scene(node) {
        mwGL.Node.call(this,node);
    }

    _Scene.prototype = Object.create(mwGL.Node.prototype);

    _Scene.prototype.render = function(context) {
        var gl = context;

        // Clear Screen And Depth Buffer
        gl.clearColor(this.sgnode.backgroundColor.r,this.sgnode.backgroundColor.g,this.sgnode.backgroundColor.b,this.sgnode.backgroundColor.a);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    };


    exports.Scene = _Scene;


})(this.mwGL = this.mwGL || {} );

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
 * OpenGL part of Shape
 *
 * @class ShapeGL
 * @memberof module:mwGL
 *
 * @constructor
 **/
function ShapeGL(node) {
    mwGL.Node.call(this,node);

    this.numIndices = 0;
    this.numItems = 0;
    this.VBOs = [];
    this.GLTextures = [];
    this.shaderProgram = null;
}

ShapeGL.prototype = Object.create(mwGL.Node.prototype);

/**
 * Init of the OpenGL part: VBO creation
 *
 * @param {number} context - Graphics context
 **/
ShapeGL.prototype.init = function(context) {

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
ShapeGL.prototype.render = function(context) {
    // HACK console.log('>>> ShapeGL.prototype.render');
    var gl = context;
    // Update matrix
    mat4.multiply(this.workmatrix,this.sgnode.parent.getNodeGL().workmatrix,this.sgnode.matrix);
    this.sgnode.getRenderer().setUniform('uMMatrix', this.workmatrix);

    // Choose shader
    // HACK console.log(this.shaderProgram);
    this.shaderProgram.use();

    // TODO console.log('coordSize '+ this.numItems );


    // For this geometry, activate VBO
    for (var j=0; j < this.VBOs.length; j++) {
        var vbo = this.VBOs[j];
        if (vbo.type === 'indexed') {
            // HACK console.log('bind buffer '+ vbo.type + ' ' + vbo.ID+ ' ' + vbo.data);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vbo.ID);
        }
        else {
            // HACK console.log('bind buffer '+ vbo.type + ' ' + vbo.ID);
            gl.bindBuffer(gl.ARRAY_BUFFER, vbo.ID);
        }
        for (var k in vbo.attributes) {
            var attribute = vbo.attributes[k];
            // HACK console.log('enable ' + k + ':'+ attribute.name+' '+attribute.location+' '+attribute.size+' '+attribute.stride+' '+attribute.offset);
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
    if (this.numIndices != 0 ) {
        gl.drawElements(this.glType, this.numIndices, gl.UNSIGNED_SHORT, 0);
    }
    else {
        // HACK console.log('drawArrays');
        gl.drawArrays(this.glType, 0, this.numItems);
    }
};

ShapeGL.prototype.removeVBO = function (geom_content) {
    var gl = this.context;

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
ShapeGL.prototype._createVBO = function(context,geom) {
    var gl = context;
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
    var vbo = {};
    vbo.attributes = [];
    vbo.type = geom.type;
    vbo.content = geom.content;

    // Create VBO
    vbo.ID = gl.createBuffer();
    if (vbo.type === 'indexed') {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vbo.ID);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, geom.data, gl.STATIC_DRAW);
        this.numIndices = geom.data.length;
    }
    else {
        gl.bindBuffer(gl.ARRAY_BUFFER, vbo.ID);
        gl.bufferData(gl.ARRAY_BUFFER, geom.data, gl.STATIC_DRAW);
    }


    // Update attribute(s) associated to this VBO
    // HACK console.log('VBO attributes');
    // HACK console.log(geom.attributes);
    for (var j=0; j < geom.attributes.length; j++) {
        if ( (geom.content & mwSG.Shape.XYZ) === mwSG.Shape.XYZ) {
            var n = 32; // Highest value of Shape type(s) but Shape.INDICES
            var nItems = 0;
            while (n != 0) {
                if ( (geom.content & n) === n) {
                    nItems += mwSG.Shape.itemLength[n];
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
        // TODO console.log('location [' + vbo.attributes[j].name + ']= '+ vbo.attributes[j].location + ' '+vbo.attributes[j].size);
    }

    // HACK console.log('VBO ID: ' + JSON.stringify(vbo) );
    return vbo;

};

// Private
ShapeGL.prototype._createTexture = function(context, img) {
    var gl = context;
    var glTex = gl.createTexture();
    this.GLTextures.push(glTex);

    // TODO console.log('Create Texture from '+img.src + ' ' + img.complete);

    img.onload = function() {
        newTexture(img,glTex);
    };


    function newTexture(img,glTex) {
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

        function powerOfTwo(n) {
            return ( (n & (n - 1)) == 0);
        }
    }

};


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
            // HACK console.log('location [' + vbo.attributes[j].name + ']= '+ vbo.attributes[j].location + ' '+vbo.attributes[j].size);
        }
    }
};

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

(function(exports) {

    /**
     * Camera
     *
     * @class Camera
     * @memberof module:mwSG
     * @constructor
     * @augments Leaf
     **/
    function Camera() {
        mwSG.Leaf.call(this);

        this.ID = 'camera';
        this.eye = {x:0.0, y: 0.0, z:0.0}; // View position
        this.vd  = {x:0.0, y: 0.0, z:0.0}; // View direction vector
        this.up  = {x:0.0, y: 1.0, z:0.0}; // View up direction

        this.focallength;  // Focal Length along vd = distance between cam and objects center

        this.screenwidth,
        this.screenheight;

        this.callback = function(viewportW,viewportH) {
            return {
                x: 0,
                y: 0,
                width: viewportW,
                height: viewportH
            };
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
        this.zNear = 0.1;

        /**
         * Z-far Plane
         **/
        this.zFar  = 1000.0;

        // NodeGL
        this.nodeGL = new mwGL.Camera(this);

    }

    Camera.prototype = Object.create(mwSG.Leaf.prototype);

    Camera.prototype.constructor = Camera;

    /**
     * Camera position.
     *
     * @type {number}
     *
     */
    Object.defineProperty(Camera.prototype, 'position', {
        get: function() {
            return this.eye;
        },
        set: function(pos) {
            this.eye.x = pos.x;
            this.eye.y = pos.y;
            this.eye.z = pos.z;
        }
    });


    /**
     * Set the Y-Field of View.
     *
     * @param {number} angle_in_degrees - Angle of the Field of View expressed in degrees
     *
     **/
    Camera.prototype.setFovy = function (angle_in_degrees) {
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
    Camera.prototype.setPosition = function (posX, posY, posZ) {
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
    Camera.prototype.lookAt = function (center) {
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
    Camera.prototype.perspective = function (fovy, aspect, near, far) {
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
    Camera.prototype.frustum = function (left,right,bottom,top,near,far) {
        mat4.frustum(this.projMatrix, left, right, bottom, top, near, far);
    };

    /**
     * Set the Y-Field of View.
     *
     * @param {number} angle_in_degrees - Angle of the Field of View expressed in degrees
     *
     **/
    Camera.prototype.setZoom = function (zoomFactor) {
        this.zoom = zoomFactor;
    };

    Camera.prototype.setViewportFunc = function(callback) {
        this.callback = callback;
    }


    exports.Camera = Camera;


})(this.mwSG = this.mwSG || {} );

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

(function(exports) {


    /**
     * CameraGroup: A collection of shapes
     *
     * @class CameraGroup
     * @constructor
     * @memberof module:mwSG
     * @augments Composite
     **/
    function CameraGroup() {
        mwSG.Composite.call(this);

        this.ID = 'group[camera]';
        this.nodeGL = new NodeGL(this);

    }

    CameraGroup.prototype = Object.create(mwSG.Composite.prototype);

    CameraGroup.prototype.add = function(an_object) {
        if (an_object instanceof mwSG.Camera) {
            Composite.add.call(this,an_object);
        }
        else {
            // ERROR: Do nothing
        }
    };

    exports.CameraGroup = CameraGroup;
})(this.mwSG = this.mwSG || {} );

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

(function(exports) {


    /**
     * Geometry contains geometrical data like coordinates, normals, texCoords, colors,etc.
     *
     * @class Geometry
     * @memberof module:mwSG
     * @constructor
     **/
    function Geometry (options) {

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
        * The data - A [Float32Array]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array} array containing the vertex data
        *
        * @example
        * If the content is Shape.XYZ | Shape.RGB, it means that in the same array, one vertex is defined by three X,Y, and Z-coordinates plus
        * three Red, Green, and Blue color values like this...
        * var data [X Y Z R G B X Y Z R G B ... Z R G B ]
        **/
        this.data    = options.data;

        /**
        * The attributes - An array of {@link module:graphics.Attribute} used by the shader program
        *
        **/
        this.attributes = options.attributes; // || [];

        /**
        * The indices - A [UInt32Array]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint32Array} array of indices pointing to the vertex array
        *
        **/
        this.indices = options.indices;


        if (this.type === 'indexed') {
            this._isIndexed = true;
        }
        else {
            this._isIndexed = false;
        }

        // HACK console.log(this.attributes);
    }

    Geometry.prototype.getBuffer = function(name) {
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

    Geometry.prototype.isIndexed = function() {
        return this._isIndexed;
    };


    exports.Geometry = Geometry;


})(this.mwSG = this.mwSG || {} );

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

(function(exports) {

    /**
     * Light
     *
     * @class Light
     * @memberof module:graphics
     * @constructor
     * @augments Leaf
     **/
    function Light() {
        mwSG.Leaf.call(this);
        this.ID = 'light';

          // NodeGL
        this.nodeGL = new mwGL.Node(this);
    }

    Light.prototype = Object.create(mwSG.Leaf.prototype);

    Light.prototype.constructor = Light;


    exports.Light = Light;


})(this.mwSG = this.mwSG || {} );

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

(function(exports) {

    /**
     * Scene: Root of the scene graph
     *
     * @class Scene
     * @memberof module:mwSG
     * @constructor
     * @augments Composite
     **/
    function Scene() {
        mwSG.Composite.call(this);

        this.ID = 'scene';
        this.cameras = [];
        this.backgroundColor = {
            r:0.0,
            g:0.0,
            b:0.0,
            a:1.0
        };
        this.nodeGL = new mwGL.Scene(this);
    }

    Scene.prototype = Object.create(mwSG.Composite.prototype);

    /**
     * Set default scene with a camera and a light
     *
     **/
    Scene.prototype.setDefault = function() {
        this.ID = 'scene_default';
        // Add a camera
        var cam = new mwSG.Camera();
        this.add(cam);
        // Add a light
        this.add(new mwSG.Light()  );
    };

    Scene.prototype.add = function(an_object) {
        mwSG.Composite.prototype.add.call(this,an_object);

        // Special case of the camera
        if (an_object.ID === 'camera') {
            this.cameras.push(an_object);
        }
    };

    /**
     * Get Camera in the scene
     *
     * @return {Camera} Returns the current camera
     **/
    Scene.prototype.getCamera = function() {
        // TODO: must be improved if CameraGroup exists for stereo
        return this.children['camera_0'];
    };

    /**
     * Render this object and traverse its children
     * Function called by the renderer
     *
     * @param{number} OpenGL context
     **/
    Scene.prototype.render = function(context) {
        console.log('RENDER_Scene ' + this.ID );// HACK
        // HACK console.log(this.parent);
        // Update matrix
        if (!(this.parent instanceof Renderer) ) {
            mat4.multiply(this.getNodeGL().workmatrix,this.parent.getNodeGL().workmatrix,this.matrix);
        }

        // Sort children
        this.children.sort(
            function (a, b) {
                if (a.ID > b.ID) {
                    return 1;
                }
                if (a.ID < b.ID) {
                    return -1;
                }
                // a.ID === b.ID
                return 0;
            }
        );

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

    Scene.prototype.toString = function() {
        var str = this.ID+'\n';
        for (var i in this.children) {
            str += '+-'+this.children[i]+'\n';
        }
        return str;
    };

    exports.Scene = Scene;


})(this.mwSG = this.mwSG || {} );

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

(function (exports) {

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
     * @constructor
     * @augments mwSG.Leaf
     **/
    function Shape() {
        mwSG.Leaf.call(this);

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

        this.nodeGL = new ShapeGL(this);


    }

    Shape.prototype = Object.create(mwSG.Leaf.prototype);


    Shape.XYZ    = 1;
    Shape.XYZW   = 2;
    Shape.NXYZ   = 4;
    Shape.RGB    = 8;
    Shape.RGBA   = 16;
    Shape.ST     = 32;
    Shape.INDICES= 64;

    // Private
    Shape.itemLength = {
        1  : 3,
        2  : 4,
        4  : 3,
        8  : 3,
        16 : 4,
        32 : 2,
        64 : 1
    };

    /**
     * Set Program
     *
     * @param {Program} a_program - A shader program defining the rendering style
     *
     **/
    Shape.prototype.setProgram = function(a_program) {
        this.nodeGL.shaderProgram = a_program;
    };

    /**
     * Flag indicating if this shape contains indexed geometries
     *
     * @return {boolean}
     *
     **/
    Shape.prototype.isIndexedGeometry = function() {
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
    Shape.prototype.addVertexData = function(a_geom) {
        if ( (a_geom.content & Shape.INDICES) === Shape.INDICES) {
            this._isIndexed = true;
            this.geometries.push(
                new mwSG.Geometry({
                    'type'       : 'indexed',
                    'content'    : a_geom.content,
                    'data'       : new Uint16Array(a_geom.data),
                    'attributes' : []
                })
            );
        }
        else {
            this.geometries.push(
                new mwSG.Geometry( {
                    'type'     : 'vertex',
                    'content'    : a_geom.content,
                    'data'     : new Float32Array(a_geom.data),
                    'attributes' : a_geom.attributes
                })
            );
        }

        // HACK console.log(this.geometries);
        // Set the number of items in this shape
        // this.numItems = a_geom.data.length / itemSize;
    };


    Shape.prototype.addTexture = function(image_name) {
        var image = new Image();
        image.src = image_name;
        this.textures.push(image);
    };

    Shape.prototype.addUniformData = function(a_uniform) {
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
    Shape.prototype.removeVertexData = function(geom_content) {
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
    Shape.prototype.setCentroid = function(cg) {
        this.centroid = cg;
    };

    Shape.prototype.update = function (context) {
        // TODO
    };

    Shape.prototype.updateUniforms = function (context) {
        // TODO
    };


    exports.Shape = Shape;


})(this.mwSG = this.mwSG || {} );

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

(function(exports) {

    /**
     * ShapeGroup: A collection of shapes
     *
     * @class ShapeGroup
     * @constructor
     * @memberof module:mwSG
     * @augments Composite
     **/
    function ShapeGroup () {
        mwSG.Composite.call(this);

        this.ID = 'group[shape]';

        this.nodeGL = new mwGL.Node(this);

    }

    ShapeGroup.prototype = Object.create(mwSG.Composite.prototype);

    exports.ShapeGroup = ShapeGroup;


})(this.mwSG = this.mwSG || {} );

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

var ShaderFactory = (function () {

    // Storage for our various styles types
    var programs = {};
    var shaderProgram = new Program();

    var srcVrtxShader = {
        'template' : [
            'attribute vec3 aVertexPosition;',
            'attribute vec3 aVertexColor;',
            'uniform mat4 uMMatrix;',
            'uniform mat4 uVMatrix;',
            'uniform mat4 uPMatrix;',
            'varying vec3 vColor;',
            'void main(void) {',
            // '#{points}',
            'gl_Position = uPMatrix * uVMatrix * uMMatrix * vec4(aVertexPosition, 1.0);',
            'vColor = aVertexColor;',
            '}'
        ],
        'points' :[
            'gl_PointSize = 8.0;'
        ]
    };

    var srcFragShader = {
        'template' : [
            'precision mediump float;',
            'varying vec3 vColor;',
            // '#{func}',
            'void main(void) {',
            // '#{func_call}',
            'gl_FragColor = vec4( vColor,1.0);',
            '}'
        ],
        'disks_func' : [
            'void drawDisk(xy) {',
            'vec2 v = xy - vec2(0.5,0.5);',
            'float d = dot(v,v);',
            'if (d > 0.25) discard;',
            '}'
        ],
        'disks_call' : [
            'drawDisk(gl_PointCoord.xy);'
        ]
    };

    return {
        /**
         * Get shape
         *
         * @example
         * var shape = ShaderFactory.get({displayType:'wireframe', 'glContext': glContext});
         */
        get: function ( options ) {
            var isUndefined = false;
            var srcVrtx = '';
            var srcFrag = '';
            var namePrgm= '';
            switch (options.displayType) {
            case 'points':
                // Already compiled?
                namePrgm = 'disks';
                if (programs[namePrgm] === undefined) {
                    isUndefined = true;
                    srcVrtx = srcVrtxShader['template'].join('');
                    srcFrag = srcFragShader['template'].join('');
                }
                break;
            case 'wireframe':
                // Already compiled?
                namePrgm = 'wireframe';
                if (programs[namePrgm] === undefined) {
                    isUndefined = true;
                    var replacers = [
                        {
                            src : '#{func}',
                            dest: 'disks_func'
                        },
                        {
                            src : '#{func_call}',
                            dest: 'disks_call'
                        }
                    ];
                    srcVrtx = srcVrtxShader['template'].join('');
                    srcFrag = srcFragShader['template'].join('');
                    for (var i=0; i < replacers.length; i++) {
                        var re = new RegExp(replacers[i].src,'g');
                        srcVrtx = srcVrtx.replace(re,srcVrtxShader[replacers[i].dest].join(''));
                        srcFrag = srcFrag.replace(re,srcVrtxShader[replacers[i].dest].join(''));
                    }

                }
                break;
            default:
                // Do nothing ??
                return null;
            }
            if (isUndefined) {
                console.log('Compile+link ' + namePrgm);
                console.log('vs\n'+srcVrtx);
                console.log('fs\n'+srcFrag);
                var shaderProgram = new Program(options.glContext,namePrgm);
                shaderProgram.load('x-shader/x-vertex'  , srcVrtx);  // Load + compile
                shaderProgram.load('x-shader/x-fragment', srcFrag);  // Load + compile
                shaderProgram.link();
                // Get uniformLocation
                shaderProgram.setUniformLocation('uPMatrix');  // Projection Matrix of camera
                shaderProgram.setUniformLocation('uVMatrix');  // View Matrix of camera
                shaderProgram.setUniformLocation('uMMatrix');  // Model Matrix of shape
                programs[namePrgm] = shaderProgram;
            }
            return programs[namePrgm];
        }
    };
})();

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
 * Attribute class used by the shader program
 *
 * @class Attribute
 * @memberof module:graphics
 * @constructor
 **/
function Attribute (name,offset,stride) {

    /** 
    * The name
    * @type {string}
    *
    **/
    this.name = name;

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

    this.size = -1;

    this.location = -1;

}

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
function Program(context,name) {
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
};

/**
 * Load vertex or fragment source files for compilation and link
 *
 * @param {string} type: Source file types - **'vertex'** or **'fragment'**
 * @param {string} name: Source filename
 **/
Program.prototype.load = function(type,src) {
    var gl = this.ctx;

    if (type === 'x-shader/x-fragment') {
        this.fragment_shader = this._compile(gl.FRAGMENT_SHADER,src);
    }
    else if (type === 'x-shader/x-vertex') {
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
Program.prototype.loadHTTP = function(type,name) {
    var gl = this.ctx;
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
Program.prototype.loadDOM = function(type,name) {
    var gl = this.ctx;

    var shaderScript = document.getElementById(name);
    if (!shaderScript) {
        return null;
    }

    var str = '';
    var k = shaderScript.firstChild;
    while (k) {
        if (k.nodeType == 3) {
            str += k.textContent;
        }
        k = k.nextSibling;
    }


    if (shaderScript.type == 'x-shader/x-fragment') {
        this.fragment_shader = this._compile(gl.FRAGMENT_SHADER,str);
    }
    else if (shaderScript.type == 'x-shader/x-vertex') {
        this.vertex_shader = this._compile(gl.VERTEX_SHADER,str);
    }
    else {
        return null;
    }

    // Extract attribute from shader text and create objects
    this._createAttributesAndUniforms(str);

};


Program.prototype.link = function() {
    var gl = this.ctx;
    this.shaderProgram = gl.createProgram();
    gl.attachShader(this.shaderProgram, this.vertex_shader);
    gl.attachShader(this.shaderProgram, this.fragment_shader);
    gl.linkProgram(this.shaderProgram);

    if (!gl.getProgramParameter(this.shaderProgram, gl.LINK_STATUS)) {
        throw new ShaderLinkException('Could not link shaders');
    }
};

/**
 * Activate this shader program for rendering
 *
 **/
Program.prototype.use = function() {
    var gl = this.ctx;
    gl.useProgram(this.shaderProgram);
};


Program.prototype.getAttribLocation = function(attrib_name) {
    var gl = this.ctx;
    gl.useProgram(this.getID());
    return gl.getAttribLocation(this.getID(),attrib_name);
};

/**
 *  Get uniform location and set up the corresponding array.
 * The method's name is not really appropriate (set/getUniform[...])
 *
 *
 **/
Program.prototype.setUniformLocation=function(name) {
    var gl = this.ctx;
    gl.useProgram(this.getID());
    this.uniformLocation[name]=gl.getUniformLocation(this.getID(),name);
};

Program.prototype.getUniformLocation=function(name) {
    //var gl = this.ctx;
    return this.uniformLocation[name];
};

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
};

/**
 * Private method for compiling shader
 *
 */
Program.prototype._compile = function(type,text) {
    var gl = this.ctx;
    var shader = gl.createShader(type);
    gl.shaderSource(shader, text);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        throw new ShaderCompilationException(gl.getShaderInfoLog(shader) );
    }

    return shader;
};

/**
 * Private method to automatically detect in the shader source files the attribute(s) and uniform(s).
 * TODO - Must be improved to remove commented lines containing attributes and/or uniforms
 *
 */
Program.prototype._createAttributesAndUniforms=function(source) {
    // Remove comments
    // Works in most cases. However, does not take into account weird cases :-)
    var text = source.replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, '');
    var rows = text.split(';');
    var re = /[\s,;]+/;
    var type;
    var qualifier = 'x';

    for (var i in rows) {
        var a_row = rows[i];
        if (a_row.indexOf('attribute') != -1 || a_row.indexOf('uniform') != -1) {
            var words = a_row.trim().split(re); //  match(/[\S,;]+/g);
            var itemSize = 0;
            // HACK console.log(words);
            for (var j=0; j < words.length; j++) {
                switch (words[j]) {
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

/*
 * Constructor
 */
function Uniform (options) {
    this.name = options.name;

}




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

var ShapeFactory = (function () {

    // Storage for our various styles types
    var styles = {};
    return {
        /**
         * Get shape
         *
         * @example
         * var shape = ShapeFactory.get({'molecule': myStruct, 'displayType': 'wireframe', 'color': 'cpk','glContext': ctx});
         */
        get: function ( options ) {
            console.log(options);
            var style;
            switch (options.displayType) {
            case 'points':
                // Already computed for the given structure?
                // Pearson hashing see Wikipedia
                // pearsonHash(mol.getSequence().join('') );
                // <molID><chainID><Atom symbol#1><Atom symbol#1><Atom symbol#1>...<Atom symbol#1> selected
                // var style = types['atoms'] ????
                // if (style === undefined) then
                // Basic shape - only for debug
                style = new PointGeometer(options.molecule,ColorFactory.get(options.color) );
                style.getShape().setProgram(
                    ShaderFactory.get(
                        {
                            'displayType': 'points',
                            'glContext': options.glContext
                        }
                    )
                );
                return style.getShape();
            case 'backbone':
                // TODO
                break;
            case 'ball_sticks':
                // TODO
                break;
            case 'cartoon':
                // TODO
                break;
            case 'dots':
                // TODO
                break;
            case 'spacefill':
                // TODO
                break;
            case 'ribbons':
                // TODO
                break;
            case 'sticks':
                // TODO
                break;
            case 'strands':
                // TODO
                break;
            case 'trace':
                // TODO
                break;
            case 'wire':
                style = new WireGeometer(options.molecule,ColorFactory.get(options.color) );
                style.getShape().setProgram(
                    ShaderFactory.get(
                        {
                            'displayType': 'points',
                            'glContext': options.glContext
                        }
                    )
                );
                return style.getShape();
            default:
                // Do nothing ??
                return null;
            }
        }
    };
})();

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

/*
 * Constructor
 */

function Cube() {
    mwSG.Shape.call(this);
    this.ID = 'cube';
}

Cube.prototype = Object.create(mwSG.Shape.prototype );

/*
 * Set style of this cube:
 * @param{string} 'wireframe','solid','shaded','textured'
 */
Cube.prototype.setStyle = function(type) {
    switch (type) {
    case 'wireframe' :
        this.ID = 'cubeWire';
        // 1- Define geometry
        var _indices = [0,1,2,3,0,4,5,6,7,4,5,1,2,6,7,3];
        this.type = 'LINE_STRIP';
        this.addVertexData(
            {
                'content'   : Shape.XYZ,
                'data'      : Cube.verticesWire,
                'indices'   :_indices,
                'attributes': [new Attribute("aVertexPosition",0,0)]
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
                'content': Shape.XYZ,
                'data': Cube.vertices,
                'indices': Cube.indices,
                'attributes': [new Attribute("aVertexPosition",0,0)]
            }
        );
        this.addVertexData(
            {
                'content': Shape.RGB,
                'data': Cube.colors,
                'attributes': [new Attribute("aVertexColor",0,0)]
            }
        );

        this.addVertexData(
            {
                'content'   : Shape.XYZ | Shape.RGBA,
                'data'      : Cube.vertices,
                'indices'   : Cube.indices,
                'attributes': [new Attribute("aVertexPosition",0,7), new Attribute("aVertexColor",3,7)]
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


Cube.verticesWire = [
     1, 1,-1,
     1,-1,-1,
    -1,-1,-1,
    -1, 1,-1,
     1, 1, 1,
     1,-1, 1,
    -1,-1, 1,
    -1, 1, 1
];

Cube.vertices = [
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

Cube.indices = [
     0, 1, 2,      0, 2, 3,    // Front face
     4, 5, 6,      4, 6, 7,    // Back face
     8, 9, 10,     8, 10, 11,  // Top face
    12, 13, 14,   12, 14, 15, // Bottom face
    16, 17, 18,   16, 18, 19, // Right face
    20, 21, 22,   20, 22, 23  // Left face
];

function EMDBInfoParser() {

}


/**
 * Convert XML to JSON
 * @author David Walsh
 * https://davidwalsh.name/convert-xml-json
 */
EMDBInfoParser.prototype.xmlToJson = function (xml) {
	
	// Create the return object
	var obj = {};

	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}

	// do children
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = this.xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(this.xmlToJson(item));
			}
		}
	}
	return obj;
};

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
 *
 * @module raster
 *
 **/
 
 
 
/**
 * Constructor
 * @class PDBParser
 * @classdesc This class allows the parsing of the PDB file format version 3.30

 *
 * @constructor
 *
 * @example
 * parser = new PDBParser();
 * parser.parse(myText);
 * var mol = parser.getStructure();
 *
 * @author Jean-Christophe Taveau
 **/
function ImageParser() {
  this.raster = new Raster({});
}


/**
 * Return the 2D- or 3D-raster
 *
 * @return {Structure} - The 3D structure
 **/
ImageParser.prototype.getRaster = function () {
  return this.raster;
}

/**
 * Trigger the parsing of the PDB file
 *
 * @params {string} text - Text containing the PDB structure
 **/
ImageParser.prototype.parse = function (data) {


var pixelData = canvas.getContext('2d').getImageData(event.offsetX, event.offsetY, 1, 1).data;

}






function MMCIFParser() {

}


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

/*
 * Constructor
 *
 * @author: Jean-Christophe Taveau
 */

function PDBMLParser() {
    // TODO
}


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
 *
 * @module parser
 *
 **/



/**
 * Constructor
 * @class PDBParser
 * @classdesc This class allows the parsing of the PDB file format version 3.30

 *
 * @constructor
 *
 * @example
 * parser = new PDBParser();
 * parser.parse(myText);
 * var mol = parser.getStructure();
 *
 * @author Jean-Christophe Taveau
 **/
function PDBParser() {
  this.mol = new Molecule({});
  this.secondary = [];
  this.cubes = [];
  this.cube_side = 5.0; // 5 angstroems
}


PDBParser.TAGS = {
  'ANISOU': 0,
  'ATOM'  : 1,
  'AUTHOR': 2,
  'CAVEAT': 3,
  'CISPEP': 4,
  'COMPND': 5,
  'CONECT': 6,
  'CRYST1': 7,
  'DBREF1': 8,
  'DBREF2': 9,
  'DBREF' : 10,
  'END'   : 11,
  'ENDMDL': 12,
  'EXPDTA': 13,
  'FORMUL': 14,
  'HEADER': 15,
  'HELIX' : 16,
  'HET'   : 17,
  'HETATM': 18,
  'HETNAM': 19,
  'HETSYN': 20,
  'JRNL'  : 21,
  'KEYWDS': 22,
  'LINK'  : 23,
  'MASTER': 24,
  'MDLTYP': 25,
  'MODEL' : 26,
  'MODRES': 27,
  'MTRIX1': 28,
  'MTRIX2': 29,
  'MTRIX3': 30,
  'NUMMDL': 31,
  'OBSLTE': 32,
  'ORIGX1': 33,
  'ORIGX2': 34,
  'ORIGX3': 35,
  'REMARK': 36,
  'REVDAT': 37,
  'SCALE1': 38,
  'SCALE2': 39,
  'SCALE3': 40,
  'SEQADV': 41,
  'SEQRES': 42,
  'SHEET' : 43,
  'SITE'  : 44,
  'SOURCE': 45,
  'SPLT'  : 46,
  'SPRSDE': 47,
  'SSBOND': 48,
  'TER'   : 49,
  'TITLE' : 50
}

/**
 * Return the PDB structure
 *
 * @return {Structure} - The 3D structure of the molecule
 **/
PDBParser.prototype.getStructure = function () {
  return this.mol;
}

/**
 * Trigger the parsing of the PDB file
 *
 * @params {string} text - Text containing the PDB structure
 **/
PDBParser.prototype.parse = function (text) {
  // 1- Split the text in an array of rows
  var rows = text.split('\n');

  // 2- Main loop
  for (var i=0;i<rows.length;i++) {
    if (rows[i].length > 2) {
      var tag = PDBParser.TAGS[rows[i].substring(0,6).trim()];
      // console.log(rows[i].substring(0,6).trim()+' '+tag);
      switch (tag) {
      case PDBParser.TAGS.ATOM:
      case PDBParser.TAGS.HETATM:
        this.parseAtom(rows[i]);
        break;
      case PDBParser.TAGS.END:
        this.postProcess();
        break;
      case PDBParser.TAGS.HEADER:
        this.parseHeader(rows[i]);
        break;
      case PDBParser.TAGS.HELIX:
        this.parseHelix(rows[i]);
        break;
      case PDBParser.TAGS.SHEET:
        console.log("parse sheet");
        this.parseSheet(rows[i]);
        break;
      case PDBParser.TAGS.TITLE:
        this.parseTitle(rows[i]);
        break;
      default:
        // console.log('unimplemented tag = [' + rows[i].substring(0,6).trim()+']');
        // Do nothing
      }
    }
  }

    //  3- Finalization
    this.mol.centroid.x/=this.mol.atoms.length;
    this.mol.centroid.y/=this.mol.atoms.length;
    this.mol.centroid.z/=this.mol.atoms.length;
    mat4.translate(this.mol.matrix,this.mol.matrix, [-this.mol.centroid.x, -this.mol.centroid.y, -this.mol.centroid.z]);
    this.mol.bbox.center.x = (this.mol.bbox.min.x+this.mol.bbox.max.x)/2.0;
    this.mol.bbox.center.y = (this.mol.bbox.min.y+this.mol.bbox.max.y)/2.0;
    this.mol.bbox.center.z = (this.mol.bbox.min.z+this.mol.bbox.max.z)/2.0;
    this.mol.bbox.radius   = 
    (this.mol.bbox.min.x-this.mol.bbox.max.x)*(this.mol.bbox.min.x-this.mol.bbox.max.x)+
    (this.mol.bbox.min.y-this.mol.bbox.max.y)*(this.mol.bbox.min.y-this.mol.bbox.max.y)+
    (this.mol.bbox.min.z-this.mol.bbox.max.z)*(this.mol.bbox.min.z-this.mol.bbox.max.z);
    this.mol.bbox.radius   = Math.sqrt(this.mol.bbox.radius)/2.0;

    console.log('centroid '+this.mol.centroid.x+' '+this.mol.centroid.y+' '+this.mol.centroid.z);
    console.log(this.mol.atoms.length+' '+this.mol.bbox.radius+' '+this.mol.bbox.center.x+' '+this.mol.bbox.center.y+' '+this.mol.bbox.center.z);
}




/**
 *
 * @summary Parse ATOM and HETATM row - Private method
 *
 * @description
 *
 *
 * |COLUMNS   |    DATA  TYPE   | FIELD      |  DEFINITION
 * |----------|------------------------------|--------------------------------------------
 * |01 - 06   |    Record name  | "ATOM  "   |  |
 * |07 - 11   |    Integer      | serial     |  Atom  serial number.
 * |13 - 16   |    Atom         | name       |  Atom name.
 * |17        |    Character    | altLoc     |  Alternate location indicator.
 * |18 - 20   |    Residue name | resName    |  Residue name.
 * |22        |    Character    | chainID    |  Chain identifier.
 * |23 - 26   |    Integer      | resSeq     |  Residue sequence number.
 * |27        |    AChar        | iCode      |  Code for insertion of residues.
 * |31 - 38   |    Real(8.3)    | x          |  Orthogonal coordinates for X in Angstroms.
 * |39 - 46   |    Real(8.3)    | y          |  Orthogonal coordinates for Y in Angstroms.
 * |47 - 54   |    Real(8.3)    | z          |  Orthogonal coordinates for Z in Angstroms.
 * |55 - 60   |    Real(6.2)    | occupancy  |  Occupancy.
 * |61 - 66   |    Real(6.2)    | tempFactor |  Temperature  factor.
 * |77 - 78   |    LString(2)   | element    |  Element symbol, right-justified.
 * |79 - 80   |    LString(2)   | charge     |  Charge  on the atom.
 *
 **/

PDBParser.prototype.parseAtom = function (line) {
    var atom = {};
    atom.type = line.substring(0,6).trim();
    atom.serial = parseInt(line.substring(6,11));
    atom.name = line.substring(12,16).trim();
    atom.altLoc = line[16];
    atom.group = line.substring(17,20).trim();
    atom.chain = line[21];
    atom.groupID = parseInt(line.substring(22,26));
    atom.x = parseFloat(line.substring(30,38));
    atom.y = parseFloat(line.substring(38,46));
    atom.z = parseFloat(line.substring(46,54));
    atom.symbol = line.substring(76,78).trim();
    // If exists, set the secondary structure (previously parse in HELIX and SHEET)
    atom.secondary = 'X';
    var i = 0;
    while (i < this.secondary.length) {
        if (this.secondary[i].initChain === atom.chain && atom.groupID >= this.secondary[i].init && atom.groupID <= this.secondary[i].end ) {
            atom.secondary = this.secondary[i].label;
            // Stop
            i = this.secondary.length;
        }
        i++;
    }

    // Atom Label
    atom.label = this.mol.ID + "." + atom.chain + "["+atom.secondary+"]." + atom.group + "["+atom.groupID+"]." + atom.name + "["+atom.serial+"]."+atom.type.toLowerCase();
    //  if (atom.groupID===24 && atom.chain==="B") console.log(atom.secondary);

    this.mol.atoms.push(atom);

    // Update chain
    if (this.mol.chains.indexOf(atom.chain) == -1) {
        this.mol.chains.push(atom.chain);
    }
    // Update centroid and bounding box of the structure
    this.mol.centroid.x += atom.x;
    this.mol.centroid.y += atom.y;
    this.mol.centroid.z += atom.z;
    this.updateBBox(atom);

}


/**
 *
 * @summary Parse HEADER row - Private method
 *
 * @description
 *
 * |COLUMNS  |    DATA  TYPE   |  FIELD           |  DEFINITION
 * |---------|-----------------|------------------|---------------------------------------
 * |01 - 06  |    Record name  |  "HEADER"        |  |
 * |11 - 50  |    String(40)   |  classification  |  Classifies the molecule(s).
 * |51 - 59  |    Date         |  depDate         |  Deposition date. This is the date the coordinates were received at the PDB.
 * |63 - 66  |    IDcode       |  idCode          |  This identifier is unique within the PDB.
 *
 **/
PDBParser.prototype.parseHeader = function (row) {
  this.mol.classification = row.substring(10,50).trim();
  this.mol.date           = row.substring(50,59).trim();
  this.mol.ID             = row.substring(62,66).trim();
}


/**
 *
 * @summary Parse HELIX rows - Private method
 *
 * @description
 *
 *
 * |COLUMNS   |    DATA  TYPE   | FIELD          |  DEFINITION
 * |----------|-----------------|----------------|--------------------------------------------
 * |01 - 06   |    Record name  |    "HELIX      |  |
 * |08 - 10   |   Integer       |    serNum      | Serial number of the helix. This starts at 1 and increases incrementally.
 * |12 - 14   |    LString(3)   |    helixID     | Helix identifier.
 * |16 - 18   |    Residue name |    initResName | Name of the initial residue.
 * |20        |    Character    |    initChainID | Chain identifier for the chain containing this helix.
 * |22 - 25   |    Integer      |    initSeqNum  | Sequence number of the initial residue.
 * |26        |    AChar        |    initICode   | Insertion code of the initial residue.
 * |28 - 30   |    Residue name |    endResName  | Name of the terminal residue of the helix.
 * |32        |    Character    |    endChainID  | Chain identifier for the chain containing this helix.
 * |34 - 37   |    Integer      |    endSeqNum   | Sequence number of the terminal residue.
 * |38        |    AChar        |    endICode    | Insertion code of the terminal residue.
 * |39 - 40   |    Integer      |    helixClass  | Helix class (see below).
 * |41 - 70   |    String       |    comment     | Comment about this helix.
 * |72 - 76   |    Integer      |    length      | Length of this helix.
 **/
PDBParser.prototype.parseHelix = function(row) {
  this.secondary.push( {
    'type'      : 'H',
    'serial'    : parseInt(row.substring(7,10) ),
    'ID'        : row.substring(11,14).trim(),
    'strand'    : '',
    'initChain' : row[19],
    'init'      : parseInt(row.substring(21,25) ),
    'endChain'  : row[31],
    'end'       : parseInt(row.substring(33,37) ),
    'class'     : Structure.RIGHT_HANDED_ALPHA || parseInt(row.substring(38,40)),
    'label'     : 'H('+row.substring(11,14).trim()+';'+parseInt(row.substring(7,10) )+')'
   });
/****
   console.log('HELIX:'+ 'H{' + this.secondary[this.secondary.length-1].ID +'}'+
     ' first:' + this.secondary[this.secondary.length-1].init + this.secondary[this.secondary.length-1].initChain +
     ' last:'+ this.secondary[this.secondary.length-1].end + this.secondary[this.secondary.length-1].endChain);
*****/
}


/**
 *
 * @summary Parse SHEET rows - Private method - TODO
 *
 * @description
 *
 * |COLUMNS   |    DATA  TYPE    | FIELD          |  DEFINITION
 * |----------|------------------|----------------|--------------------------------------------
 * |01 - 06   |     Record name  | "SHEET "       |    |
 * |08 - 10   |     Integer      | strand         | Strand number which starts at 1 for each strand within a sheet and increases by one.
 * |12 - 14   |     LString(3)   | sheetID        | Sheet identifier.
 * |15 - 16   |     Integer      | numStrands     | Number of strands in sheet.
 * |18 - 20   |     Residue name | initResName    | Residue  name of initial residue.
 * |22        |     Character    | initChainID    | Chain identifier of initial residue in strand.
 * |23 - 26   |     Integer      | initSeqNum     | Sequence number of initial residue in strand.
 * |27        |     AChar        | initICode      | Insertion code of initial residue in  strand.
 * |29 - 31   |     Residue name | endResName     | Residue name of terminal residue.
 * |33        |     Character    | endChainID     | Chain identifier of terminal residue.
 * |34 - 37   |     Integer      | endSeqNum      | Sequence number of terminal residue.
 * |38        |     AChar        | endICode       | Insertion code of terminal residue.
 * |39 - 40   |     Integer      | sense          | Sense of strand. 0 if first strand, 1 if parallel,and -1 if anti-parallel.
 * |42 - 45   |     Atom         | curAtom        | Registration.  Atom name in current strand.
 * |46 - 48   |     Residue name | curResName     | Registration.  Residue name in current strand
 * |50        |     Character    | curChainId     | Registration. Chain identifier in current strand.
 * |51 - 54   |     Integer      | curResSeq      | Registration.  Residue sequence number in current strand.
 * |55        |     AChar        | curICode       | Registration. Insertion code in current strand.
 * |57 - 60   |     Atom         | prevAtom       | Registration.  Atom name in previous strand.
 * |61 - 63   |     Residue name | prevResName    | Registration.  Residue name in previous strand.
 * |65        |     Character    | prevChainId    | Registration.  Chain identifier in previous  strand.
 * |66 - 69   |     Integer      | prevResSeq     | Registration. Residue sequence number in previous strand.
 * |70        |     AChar        | prevICode      | Registration.  Insertion code in previous strand.
 **/
PDBParser.prototype.parseSheet = function (row) {

  this.secondary.push( {
    'type'      : 'E',
    'serial'    : 'x',
    'ID'        : row.substring(11,14).trim(),
    'strand'    : parseInt(row.substring(7,10)),
    'initChain' : row[21],
    'init'      : parseInt(row.substring(22,26) ),
    'endChain'  : row[32],
    'end'       : parseInt(row.substring(33,37) ),
    'sense'     : parseInt(row.substring(38,40) ),
    'label'     : 'E'+parseInt(row.substring(7,10))+'('+row.substring(11,14).trim()+';'+parseInt(row.substring(38,40) )+')'
  });
    console.log(this.secondary[this.secondary.length - 1]);
}

/**
 *
 * @summary Parse TITLE rows - Private method - TODO
 *
 * @description
 *
 * |COLUMNS   |    DATA  TYPE   | FIELD          |  DEFINITION
 * |----------|-----------------|----------------|--------------------------------------------
 * |01 -  6   |    Record name  |  "TITLE "      |  |
 * |09 - 10   |    Continuation |  continuation  | Allows concatenation of multiple records.
 * |11 - 80   |    String       |  title         | Title of the  experiment.
 *
 **/
PDBParser.prototype.parseTitle = function (row)
{
  if (parseInt(row.substring(8,10).trim()) == 1) {
    this.mol.title = row.substring(10,80).trim();
  }
  else {
    this.mol.title = ' ' + row.substring(10,80).trim();
  }
}

PDBParser.prototype.updateBBox = function (a) {
  if (this.mol.bbox.min.x > a.x)
    this.mol.bbox.min.x = a.x;
  if (this.mol.bbox.min.y > a.y)
    this.mol.bbox.min.y = a.y;
  if (this.mol.bbox.min.z > a.z)
    this.mol.bbox.min.z = a.z;
  if (this.mol.bbox.max.x < a.x)
    this.mol.bbox.max.x = a.x;
  if (this.mol.bbox.max.y < a.y)
    this.mol.bbox.max.y = a.y;
  if (this.mol.bbox.max.z < a.z)
    this.mol.bbox.max.z = a.z;
}

PDBParser.prototype.postProcess = function () {
  console.log('PostProcess');
  // Now, don't know what to do.
  // Check data ?
}

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

/*
 * Constructor
 *
 * @author: Jean-Christophe Taveau
 */

function XYZParser() {
  this.mol = new Molecule({});
}

XYZParser.prototype.getStructure = function () {
  return this.mol;
}

/**
 * File format described in Wikipedia:
 * https://en.wikipedia.org/wiki/XYZ_file_format
 * Example from Wikipedia:
 *
 * 5
 * methane molecule (in Angströms)
 * C        0.000000        0.000000        0.000000
 * H        0.000000        0.000000        1.089000
 * H        1.026719        0.000000       -0.363000
 * H       -0.513360       -0.889165       -0.363000
 * H       -0.513360        0.889165       -0.363000
 *
 **/
XYZParser.prototype.parse = function (text) {
    // 1- Split the text in an array of rows
    var rows = text.split('\n');
    console.log(rows);
    // 2- Search for row #0
    var start = 0;
    while (/^\d+$/.test(rows[start]) == false) {
        start++;
    }
    // 3- Read title aka row #1
    this.mol.title = rows[start + 1];
    // 4- Main loop
    for (var i = start + 2; i < rows.length; i++) {
        if (rows[i] !== undefined && rows[i].length > 0) {
            this.parseAtom(rows[i],i - 1 - start);
        }
    }
}



XYZParser.prototype.parseAtom = function (line, row_number) {
  var words = line.match(/(\S+)/g);
  console.log(words);
  var atom = {};
  atom.type = "ATOM";
  atom.serial = row_number;
  atom.name = words[0].trim();
  atom.group = "XXX";
  atom.chain = "A";
  atom.groupID = 1;
  atom.x = parseFloat(words[1].trim());
  atom.y = parseFloat(words[2].trim());
  atom.z = parseFloat(words[3].trim());
  atom.symbol = atom.name;
  // If exists, set the secondary structure (previously parse in HELIX and SHEET)
  atom.secondary = 'X';
  this.mol.atoms.push(atom);

  // Update centroid and bounding box of the structure
  this.mol.cg.x += atom.x;
  this.mol.cg.y += atom.y;
  this.mol.cg.z += atom.z;
  this.updateBBox(atom);

}
XYZParser.prototype.updateBBox = function (a) {
  if (this.mol.bbox.min.x > a.x)
    this.mol.bbox.min.x = a.x;
  if (this.mol.bbox.min.y > a.y)
    this.mol.bbox.min.y = a.y;
  if (this.mol.bbox.min.z > a.z)
    this.mol.bbox.min.z = a.z;
  if (this.mol.bbox.max.x < a.x)
    this.mol.bbox.max.x = a.x;
  if (this.mol.bbox.max.y < a.y)
    this.mol.bbox.max.y = a.y;
  if (this.mol.bbox.max.z < a.z)
    this.mol.bbox.max.z = a.z;
}

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
 * @module mol
 **/


/**
 * Factory of various readers of atomic models: pdb, cif, xyz
 *
 * @class StructureReader
 * @constructor
 */
var RasterReader = function () {

}

RasterReader.prototype.getFromDOM = function(document_id,format) {
    var img = document.getElementById(document_id);
    var canvas = document.createElement('mwCanvas2D');
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);

    var pix = canvas.getContext('2d').getImageData(x, y, img.width, img.height).data;
    return this._createStructure(pix,format);
}

RasterReader.prototype.getFromURL = function(url,callback) {
    var extension = url.split('.').pop().toLowerCase();
    console.log(extension);

    if (extension === "png" || extension === "jpg" || extension === "jpeg" || extension === "gif") {
        loadThruImageObj(url, callback);
    }
    else {
         if (window.XMLHttpRequest) {
           // code for IE7+, Firefox, Chrome, Opera, Safari
           var req = new XMLHttpRequest();
           // We need an asynchronous request (3rd argument true) - Wait until completion
           req.open('GET', url, true);
           var cFunc = this.createStructure;
           req.onreadystatechange = function (aEvt) {
               if (req.readyState == 4) {
                   if(req.status == 200) {
                       var mol = cFunc(req.responseText,extension);
                       callback(mol);
                   }
                   else {
                       alert("ERROR:: Can't load image/volume file." + aEvt.description+"\n");
                   }
               }
           };
           req.send(null);
         }
         else {
           alert('Please update your browser');
         }
    }


    function loadThruImageObj(url,callback) {
        var canvas = document.createElement('mwCanvas2D');
        var ctx = canvas.getContext('2d');

        var img = new Image();
        img.src = url;
        img.onload = function() {
            // Load image and decompress data
            ctx.drawImage(img, 0, 0, img.width,img.height);
            this.style.display = 'none';
            canvas.width  = this.naturalWidth;
            canvas.height = this.naturalHeight;
            // Get pixels aka ImageData object
            var pix = ctx.getImageData(0, 0, this.width, this.height).data;
            callback(pix);
        }
    }
}

RasterReader.prototype.getFromID = function(pdb_id,callback) {
    // TODO
    // return this.getFromURL("http://www.rcsb.org/pdb/files/"+pdb_id+".pdb",callback);
    return null;
}

RasterReader.prototype._createStructure = function(pix,format) {

  // 1- Choose the good parser
  var parser = null;

  if (format === 'png') {
    parser = new PDBParser();
  }
  else if (format === 'jpg') {
    parser = new MMCIFParser();
  }
  else if (format === 'xml') {
    parser = new PDBMLParser();
  }
  else if (format === 'xyz') {
    parser = new XYZParser();
  }
  else {
  // Unknown format
  }

    // 2- Parse the file
    parser.parse(text);
    var mol = parser.getStructure();

    // 3- Compute Bonds
    computeBonds(mol);

    return mol;

    // Private
    function computeBonds (a_mol) {
        // TODO
    }
}

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
 * @module mol
 **/


/**
 * Factory of various readers of atomic models: pdb, cif, xyz
 *
 * @class StructureReader
 * @constructor
 */
var StructureReader = function () {

}

StructureReader.prototype.getFromDOM = function(document_id,format) {
  var text = document.getElementById(document_id).innerHTML;
  var mol = this.createStructure(text,format);
  return mol;
}

StructureReader.prototype.getFromURL = function(url,callback) {
  var extension = url.split('.').pop().toLowerCase();
  console.log(extension);

  if (window.XMLHttpRequest)
  {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    var req = new XMLHttpRequest();
    // We need a asynchronous request (3rd argument true) - Wait until completion
    req.open('GET', url, true);
    var cFunc = this.createStructure;
    req.onreadystatechange = function (aEvt) {
        if (req.readyState == 4) {
            if(req.status == 200) {
                var mol = cFunc(req.responseText,extension);
                callback(mol);
            }
            else {
                console.log("ERROR:: Can't download PDB file."+aEvt.description+"\n");
            }
        }
    };
    req.send(null);
  }
  else {
    alert('Please update your browser');
  }

}

StructureReader.prototype.getFromID = function(pdb_id,callback) {
  return this.getFromURL("http://www.rcsb.org/pdb/files/"+pdb_id+".pdb",callback);

}

StructureReader.prototype.createStructure = function(text,format) {

  // 1- Choose the good parser
  var parser = null;

  if (format === 'pdb') {
    parser = new PDBParser();
  }
  else if (format === 'cif') {
    parser = new MMCIFParser();
  }
  else if (format === 'xml') {
    parser = new PDBMLParser();
  }
  else if (format === 'xyz') {
    parser = new XYZParser();
  }
  else {
  // Unknown format
  }

    // 2- Parse the file
    parser.parse(text);
    var mol = parser.getStructure();

    // 3- Compute Bonds
    computeBonds(mol);

    return mol;

    // Private
    function computeBonds (a_mol) {
        // TODO
    }
}

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


// class Cube
function IsoCube(x,y,z,size) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.size = size;
    this.voxels = [];
    this.edges=[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
    this.key=0;
}

IsoCube.prototype.getVertex = function (index) {
    switch (index) {
    case 0:
        return {'x':this.x,           'y':this.y,           'z':this.z, 'voxel':this.voxels[0] }; // v0
    case 1:
        return {'x':this.x+this.size, 'y':this.y,           'z':this.z, 'voxel':this.voxels[1] }; // v1
    case 2:
        return {'x':this.x+this.size, 'y':this.y+this.size, 'z':this.z, 'voxel':this.voxels[2] }; // v2
    case 3:
        return {'x':this.x,           'y':this.y+this.size, 'z':this.z, 'voxel':this.voxels[3] }; // v3
    case 4:
        return {'x':this.x,           'y':this.y,           'z':this.z+this.size, 'voxel':this.voxels[4] }; // v4
    case 5:
        return {'x':this.x+this.size, 'y':this.y,           'z':this.z+this.size, 'voxel':this.voxels[5] }; // v5
    case 6:
        return {'x':this.x+this.size, 'y':this.y+this.size, 'z':this.z+this.size, 'voxel':this.voxels[6] }; // v6
    case 7:
        return {'x':this.x,           'y':this.y+this.size, 'z':this.z+this.size, 'voxel':this.voxels[7] }; // v7
    }
};

IsoCube.prototype.setVoxels = function (stack) {
    this.voxels[0]=stack.getVoxel(this.x          ,this.y          ,this.z          ); // v0
    this.voxels[1]=stack.getVoxel(this.x+this.size,this.y          ,this.z          ); // v1
    this.voxels[2]=stack.getVoxel(this.x+this.size,this.y+this.size,this.z          ); // v2
    this.voxels[3]=stack.getVoxel(this.x          ,this.y+this.size,this.z          ); // v3
    this.voxels[4]=stack.getVoxel(this.x          ,this.y          ,this.z+this.size); // v4
    this.voxels[5]=stack.getVoxel(this.x+this.size,this.y          ,this.z+this.size); // v5
    this.voxels[6]=stack.getVoxel(this.x+this.size,this.y+this.size,this.z+this.size); // v6
    this.voxels[7]=stack.getVoxel(this.x          ,this.y+this.size,this.z+this.size); // v7
};

IsoCube.prototype.calcKey = function (threshold) {
    var keystr = '';
    keystr +=(this.voxels[7] > threshold)?'1':'0';
    keystr +=(this.voxels[6] > threshold)?'1':'0';
    keystr +=(this.voxels[5] > threshold)?'1':'0';
    keystr +=(this.voxels[4] > threshold)?'1':'0';
    keystr +=(this.voxels[3] > threshold)?'1':'0';
    keystr +=(this.voxels[2] > threshold)?'1':'0';
    keystr +=(this.voxels[1] > threshold)?'1':'0';
    keystr +=(this.voxels[0] > threshold)?'1':'0';

    this.key = parseInt(keystr,2);
};

IsoCube.prototype.toString = function () {
    var str='[';
    for (var i=0;i<12;i++) {
        str+=(this.edges[i]+'; ');
    }
    return ('Cube['+this.key+']=(' + this.x +' '+this.y+' '+this.z +') '+str+']');
};

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
 * Slice used by IsoSurfacer class to store temporary cubes (probes in Marching Cubes algorithm)
 * @class IsoSlice
 * @constructor
 *
 * @author Jean-Christophe Taveau
 */
function IsoSlice(cubes_per_row, cubes_per_column) {
    this.cubes = [];
    this.count = 0;
    this.w = cubes_per_row;
    this.h = cubes_per_column;
}

IsoSlice.prototype.reset_count = function () {
    this.count=0;
};

IsoSlice.prototype.push = function (a_cube) {
    this.cubes[this.count++] = a_cube;
};

IsoSlice.prototype.previous = function () {
    return this.cubes[this.count - 1];
};

IsoSlice.prototype.above = function () {
    return this.cubes[this.count - this.w];
};

IsoSlice.prototype.back = function () {
    return this.cubes[this.count];
};

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
 * IsoSurface Generator based on the Marching Cubes algorithm
 * All the details explained in http://crazybiocomputing.blogspot.fr/2014/11/graphics-marching-cubes-implementation.html
 *
 * @class IsoSurfacer
 * @constructor
 *
 * @author Jean-Christophe Taveau
 */
function IsoSurfacer(map) {
    if (map instanceof Raster) {
        this.map = map;
        this.mesh = {};
        this.mesh.vertices = [];
        this.mesh.faces = [];

        // Default Marching Cubes Parameters
        this.threshold = 128;
        this.cubeSize = 2;
        this.interpolate = function (v0,v1) {
            var x = ( v0.x + v1.x )/2.0;
            var y = ( v0.y + v1.y )/2.0;
            var z = ( v0.z + v1.z )/2.0;
            return {'x':x,'y':y,'z':z};
        };
    }
    else {
        MOWGLI.alert('This structure is not a raster/map');
    }
}

IsoSurfacer.prototype.setInterpolation = function(mode) {
    function interpolateNone(v0,v1) {
        var x = ( v0.x + v1.x )/2.0;
        var y = ( v0.y + v1.y )/2.0;
        var z = ( v0.z + v1.z )/2.0;
        return {'x':x,'y':y,'z':z};
    }

    function interpolateBilinear(v0,v1) {
        var k = (this.threshold - v0.voxel)/(v1.voxel - v0.voxel);
        var x = v0.x + (v1.x - v0.x) * k;
        var y = v0.y + (v1.y - v0.y) * k;
        var z = v0.z + (v1.z - v0.z) * k;
        return {'x':x, 'y':y, 'z':z};
    }
    if (mode === 'None') {
        this.interpolate = interpolateNone;
    }
    else if (mode === 'Bilinear') {
        this.interpolate = interpolateBilinear;
    }
};

IsoSurfacer.prototype.getMesh = function() {
    return this.mesh;
};

IsoSurfacer.prototype.compute = function(threshold) {

    var slice= new IsoSlice(Math.floor( (nx -1)/this.cubeSize ),Math.floor( (ny-1)/this.cubeSize ) );

    // M a i n   L o o p
    var nx = this.map.width;
    var ny = this.map.height;
    var nz = this.map.depth;
    console.log('Start of the main loop... Please wait.');
    for (var z=0; z < nz-this.cubeSize; z+=this.cubeSize) {
        slice.reset_count();
        for (var y=0; y < ny-this.cubeSize; y += this.cubeSize) {
            for (var x=0; x < nx-this.cubeSize; x += this.cubeSize) {
                // 1- Create a new marching cube
                var cube = new IsoCube(x,y,z,this.cubeSize);
                // 2- Set voxels in the cube
                cube.setVoxels(this.map.data);
                // 3- Calc configuration
                cube.calcKey(threshold);
                // 4- Create vertices and triangles
                if (cube.key != 0 && cube.key != 255) {
                    createTriangles(cube);
                }
                // 5- Update slice
                slice.push(cube);
            }
        }
        if ( (z%10) == 0) console.log('z=' + z);
    }

    function createTriangles(probe) {
        //console.log('key '+probe.key+' '+ probe.x +' '+probe.y+' '+probe.z);
        var vertex = null;
        var edges = IsoSurfacer.triangles[probe.key];
        for (var i=0;i<edges.length;i++) {
            var index=-1;
            var edge = edges[i];
            //IJ.log('edge '+edge);
            if (probe.edges[edge] != -1) {
                // Edge already calculated
                index = probe.edges[edge];
            }
            else {
                switch (edge) {
                case 0:
                    if (probe.y != 0) {
                        probe.edges[edge] = slice.above().edges[2];
                        index = probe.edges[edge];
                    }
                    else {
                        vertex=this.interpolate(probe.getVertex(0),probe.getVertex(1) );
                        this.mesh.vertices.push(vertex);
                        index = this.mesh.vertices.length-1;
                        probe.edges[edge]= index;
                    }
                    break;
                case 1:
                    if (probe.z != 0) {
                        probe.edges[edge] = slice.back().edges[5];
                        index = probe.edges[edge];
                    }
                    else {
                        vertex= this.interpolate(probe.getVertex(1),probe.getVertex(2) );
                        this.mesh.vertices.push(vertex);
                        index = this.mesh.vertices.length-1;
                        probe.edges[edge]= index;
                    }
                    break;
                case 2:
                    if (probe.z != 0) {
                        probe.edges[edge] = slice.back().edges[6];
                        index = probe.edges[edge];
                    }
                    else {
                        vertex=this.interpolate(probe.getVertex(2),probe.getVertex(3) );
                        this.mesh.vertices.push(vertex);
                        index = this.mesh.vertices.length-1;
                        probe.edges[edge]= index;
                    }
                    break;
                case 3:
                    if (probe.x != 0) {
                        probe.edges[edge] = slice.previous().edges[1];
                        index = probe.edges[edge];
                    }
                    else {
                        vertex=this.interpolate(probe.getVertex(0),probe.getVertex(3) );
                        this.mesh.vertices.push(vertex);
                        index = this.mesh.vertices.length-1;
                        probe.edges[edge]= index;
                    }
                    break;
                case 4:
                    if (probe.y != 0) {
                        probe.edges[edge] = slice.above().edges[6];
                        index = probe.edges[edge];
                    }
                    else {
                        vertex=this.interpolate(probe.getVertex(4),probe.getVertex(5) );
                        this.mesh.vertices.push(vertex);
                        index = this.mesh.vertices.length-1;
                        probe.edges[edge]= index;
                    }
                    break;
                case 5:
                    vertex=this.interpolate(probe.getVertex(5),probe.getVertex(6) );
                    this.mesh.vertices.push(vertex);
                    index = this.mesh.vertices.length-1;
                    probe.edges[edge]= index;
                    break;
                case 6:
                    vertex=this.interpolate(probe.getVertex(6),probe.getVertex(7) );
                    this.mesh.vertices.push(vertex);
                    index = this.mesh.vertices.length-1;
                    probe.edges[edge]= index;
                    break;
                case 7:
                    if (probe.x != 0) {
                        probe.edges[edge] = slice.previous().edges[5];
                        index = probe.edges[edge];
                    }
                    else {
                        vertex = this.interpolate(probe.getVertex(4),probe.getVertex(7) );
                        this.mesh.vertices.push(vertex);
                        index = this.mesh.vertices.length-1;
                        probe.edges[edge]= index;
                    }
                    break;
                case 8:
                    if (probe.x != 0) {
                        probe.edges[edge] = slice.previous().edges[9];
                        index = probe.edges[edge];
                    }
                    else {
                        vertex = this.interpolate(probe.getVertex(0),probe.getvertex(4) );
                        this.mesh.vertices.push(vertex);
                        index = this.mesh.vertices.length-1;
                        probe.edges[edge]= index;
                    }
                    break;
                case 9:
                    if (probe.y != 0) {
                        probe.edges[edge] = slice.above().edges[11];
                        index = probe.edges[edge];
                    }
                    else {
                        vertex = this.interpolate(probe.getVertex(1),probe.getVertex(5) );
                        this.mesh.vertices.push(vertex);
                        index = this.mesh.vertices.length-1;
                        probe.edges[edge]= index;
                    }
                    break;
                case 10:
                    if (probe.x != 0) {
                        probe.edges[edge] = slice.previous().edges[11];
                        index = probe.edges[edge];
                    }
                    else {
                        vertex  = this.interpolate(probe.getVertex(3),probe.getVertex(7) );
                        this.mesh.vertices.push(vertex);
                        index = this.mesh.vertices.length-1;
                        probe.edges[edge]= index;
                    }
                    break;
                case 11:
                    vertex = this.interpolate(probe.getVertex(2),probe.getVertex(6) );
                    this.mesh.vertices.push(vertex);
                    index = this.mesh.vertices.length-1;
                    probe.edges[edge]= index;
                    break;
                }
            //IJ.log ('faces['+(mesh.faces.length-1)+']= '+index);
            }
            this.mesh.faces.push(index);
        }
    }

};


// triangles to be drawn in each case
IsoSurfacer.triangles = [
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




/*

// F U N C T I O N S

function dialog() {
  var gd = new GenericDialog('Marching Cubes');
  gd.addNumericField('Threshold: ', threshold, 0);
  gd.addNumericField('Cube Size: ', this.cubeSize, 0);
  gd.addChoice('Interpolation: ', ['None','Bilinear'], 0);
  gd.showDialog();
  if (gd.wasCanceled()) {
    return;
  }
  threshold = gd.getNextNumber();
  this.cubeSize = gd.getNextNumber();
  mode = gd.getNextChoiceIndex();

  if (mode ==0) {
    interpolate = function (v0,v1) {
      return interpolateNone(v0,v1);
    }
  }
  else {
    interpolate = function (v0,v1) {
      return interpolateBilinear(v0,v1);
    }
  }

  var saveDialog = new SaveDialog('Save OBJ File As ...','Untitled','.obj');
  filename=saveDialog.getDirectory()+saveDialog.getFileName();

  IJ.log(filename);

}





function interpolateBilinear(v0,v1) {
  var k = (threshold - v0)/(v1 - v0);
  var x = x0 + (x1 - x0) * k;
  var y = y0 + (y1 - y0) * k;
  var z = z0 + (z1 - z0) * k;
  return {'x':x,'y':y,'z':z};
}


function saveAsOBJ() {
  IJ.log('Preparing file ...');
  var text='';
  // Header
  text+='# Marching Cubes\n';
  text+='# Jean-Christophe Taveau\n';
  text+='# CrazyBioComputing\n';
  text+='# WaveFront OBJ File Format\n';
  text+='# Vertices: '+mesh.vertices.length+'\n';
  text+='\n';
  text+='o '+imp.getTitle()+'\n';
  text+='\n';

  // Write output text in file
  var file = new java.io.File(filename);
  var  printWriter = new java.io.PrintWriter (filename);

  IJ.log('Writing header...');
  printWriter.println (text);

  // Vertices
  for (var i=0;i<mesh.vertices.length;i++) {
    printWriter.println ('v '+ (mesh.vertices[i].x - center.x)+' '+ (mesh.vertices[i].y - center.y) + ' ' + (mesh.vertices[i].z - center.z) );
  }
  IJ.log('Writing vertices...');
  printWriter.println (' ');

  // Faces (aka lines)
  // *Note*: The first vertex in OBJ format has the index 1 (and not 0).
  for (var i=0;i<mesh.faces.length;i+=3)
    printWriter.println ('f '+(mesh.faces[i]+1) +' '+ (mesh.faces[i+1]+1) +' '+ (mesh.faces[i+2]+1) );

  IJ.log('Writing faces...');

  // Close file
  printWriter.close ();
}


}
*/

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
 * Constructor
 * @class Atom
 * @memberof module:mol
 * @constructor
 *
 * @author Jean-Christophe Taveau
 **/
function Atom() {
   
   /**
    * Type - ATOM or HETATM
    *
    * @type {string}
    **/
   this.type; 
   
   /**
    * ID of the atom in the file
    *
    * @type {number}
    **/
   this.serial; 

   /**
    * Atom name according to the chemical nomenclature
    *
    * @type {string}
    **/
   this.name;

   /**
    * Alternate Location of the atom
    *
    * @type {string}
    **/
   this.altLoc; 

   /**
    * Group name the atom belongs (three//chars code)
    *
    * @type {string}
    **/
   this.group;

   /**
    * Location of the group (residue or nucleotide) in the chain.
    *
    * @type {number}
    **/
   this.groupID; 

   /**
    * Chain ID
    *
    * @type {char}
    **/
   this.chain; 

   /**
    * X- coordinate
    *
    * @type {string}
    **/
   this.x;  

   /**
    * Y- coordinate 
    *
    * @type {string}
    **/
   this.y; 

   /**
    * Z-coordinate 
    *
    * @type {number}
    **/
   this.z; 

   /**
    * Chemical symbol
    *
    * @type {string}
    **/
   this.symbol;

}



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
 * Bond
 *
 * @class Bond
 * @constructor
 * @memberof module:mol
 *
 * @param {Atom} atom1 - First atom
 * @param {Atom} atom2 - Second atom
 *
 * @author: Jean-Christophe Taveau
 */
function Bond(atom1, atom2)  {
  /**
   * Bond Type
   *
   * @property {number} Bond.NONE - Unknown type
   * @property {number} Bond.COVALENT - Covalent bond
   * @property {number} Bond.SSBOND - Disulfide bridge
   * @property {number} Bond.HBOND - Hydrogen bond
   **/
  this.type  = Bond.NONE;

  /**
   * First atom
   **/
  this.atom1 = atom1;

  /**
   * Second atom
   **/
  this.atom2 = atom2;

  /**
   * Mid-point
   **/
  this.middle = {
    'x': (this.atom1.x + this.atom2.x)/2.0,  
    'y': (this.atom1.y + this.atom2.y)/2.0,  
    'z': (this.atom1.z + this.atom2.z)/2.0,  
  };
}

Bond.NONE     = 0;
Bond.COVALENT = 1;
Bond.SSBOND   = 2;
Bond.HBOND    = 4;

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
 * Constructor
 * @constructor
 * @author: Jean-Christophe Taveau
 */
function BondCalculator(structure)  {

    var isDirty = true;
    var volume = {};
    var width  = 0;
    var height = 0;
    var depth  = 0;
    var cov_bonds = [];
    var h_bonds   = [];
    var ss_bonds  = [];


    function calcSubVolumes(mol) {
        var cube_side = 5.0; // 5 Angstroems
        width  = Math.round( (mol.bbox.max.x - mol.bbox.min.x) / cube_side);
        height = Math.round( (mol.bbox.max.y - mol.bbox.min.y) / cube_side);
        depth  = Math.round( (mol.bbox.max.z - mol.bbox.min.z) / cube_side);

        for (var i in mol.atoms ) {
            var an_atom = mol.atoms[i];
            var x_cell = Math.floor( (an_atom.x - mol.bbox.min.x) / cube_side);
            var y_cell = Math.floor( (an_atom.y - mol.bbox.min.y) / cube_side);
            var z_cell = Math.floor( (an_atom.z - mol.bbox.min.z) / cube_side);
            var key = (x_cell + y_cell * width + z_cell * width * height);
            if (volume[key] === undefined) {
                // Create a new cube
                volume[key]={'key':key,'atoms':[]};
            }
            volume[key].atoms.push(an_atom);
        }
    }

    function calcAllBonds(mol) {
        for (var i in volume) {
            var cell = volume[i];
            for (var z = -1; z <= 1; z++) {
                for (var y = -1; y <= 1; y++) {
                    for (var x = -1; x <= 1; x++) {
                        var key = volume[i].key + x+ y* width + z* width*height;
                        if (volume[key] !== undefined) {
                            calcBonds(cell, volume[key]);
                        }
                    }
                }
            }
        }

        // open checkResult RasMol like !!
        console.log('covalent bonds .... ' + cov_bonds.length);
        console.log('hydrogen bonds .... ' + h_bonds.length);
        console.log('disulfide bonds ... ' + ss_bonds.length);

        // close checkResult
        mol.bonds = cov_bonds;
        mol.hBonds = h_bonds;
        mol.ssBonds = ss_bonds;

    /***
    for (var i in cov_bonds) {
      console.log('Bond['+cov_bonds[i].atom1.serial+';'+cov_bonds[i].atom2.serial+'] = '+'Bond['+cov_bonds[i].atom1.name+';'+cov_bonds[i].atom2.name+']');
    }
    ***/
    }

    function calcBonds(cell1, cell2 ) {
        for (var i in cell1.atoms) {
            var atom1 = cell1.atoms[i];
            for (var j in cell2.atoms) {
                var atom2 = cell2.atoms[j];
                if (atom1.serial < atom2.serial) {
                    var flag = isBonded(atom1, atom2);
                    switch (flag) {
                    case Bond.COVALENT:
                        var bond = new Bond(atom1, atom2);
                        cov_bonds.push(bond);
                        break;
                    case Bond.HBOND:
                        var bond = new Bond(atom1, atom2);
                        h_bonds.push(bond);
                        break;
                    case Bond.SSBOND:
                        var bond = new Bond(atom1, atom2);
                        ss_bonds.push(bond);
                        break;
                    default:
                    // Do nothing
                    }
                }
            }
        }
    }

    function isBonded(at1, at2) {
        var minlength2 = 0.5 * 0.5;
        var maxlength2 = 1.9 * 1.9;
        var maxlength_sbond2 = 2.2 * 2.2;
        var maxlength_hbond2 = 3.5 * 3.5;

        var d2 = (at2.x - at1.x)*(at2.x - at1.x) + (at2.y - at1.y)*(at2.y - at1.y) + (at2.z - at1.z)*(at2.z - at1.z);

        if (at1.name === 'SG' && at2.name === 'SG' && d2 < maxlength_sbond2) {
            return Bond.SSBOND;
        }
        else if ( minlength2 < d2 && d2 < maxlength2) {
            return Bond.COVALENT;
        }
        else if ( (at1.name === 'O' && at2.name === 'N' && d2 < maxlength_hbond2 )
             || (at1.name === 'N' && at2.name === 'O' && d2 < maxlength_hbond2 )
             || (at1.name === 'C' && at2.name === 'O' && d2 < maxlength_hbond2 )
             || (at1.name === 'O' && at2.name === 'C' && d2 < maxlength_hbond2 ) ) {
            return Bond.HBOND;
        }
        else {
            return Bond.NONE;
        }
    }

    // Main
    calcSubVolumes(structure);
    calcAllBonds(structure);

}

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

/*
 * Constructor
 */
 var MowgliViewer = function (canvasID) {
 
    // 0- Create a renderer for this canvas
    this.renderer = new Renderer(canvasID);

    // 1- Create a scene with a default light and camera
    this.scene = new Scene();
    this.renderer.addScene(scene);

    // 2- Update renderer
    this.renderer.update();

    // 3- Add a sensor
    var mouse = new MouseSensor(canvasID);
    this.mouse.attach(this.scene);

    this.renderer.addSensor(mouse);

 }
 
MowgliViewer.prototype.getScene = function () {
    return this.scene;
}


MowgliViewer.prototype.render = function () {
    this.renderer.drawScene();
}



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
 * Atomic model
 * @class Molecule
 * @memberof module:structure
 * @constructor
 * @extends module:structure.Structure
 *
 * @author Jean-Christophe Taveau
 **/
function Molecule(other) {
    // super()
    Structure.call(this, other);

   /**
    * Molecule Classification
    *
    * @type {string}
    **/
    this.information.classification = other.classification || 'Unknown';

   /**
    * Atoms - Array of {@link module:mol.Atom}
    *
    * @see {@link module:mol.Atom}
    * @type {Array(Atom)}
    *
    * @property {Atom} atom
    * @property {string} atom.type - ATOM or HETATM
    * @property {number} atom.serial - ID of the atom in the file
    * @property {string} atom.name - Atom name according to the chemical nomenclature
    * @property {char} atom.altLoc - Alternate Location of the atom
    * @property {string} atom.group - Group name the atom belongs (three-chars code)
    * @property {string} atom.groupID  - Location of the group (residue or nucleotide) in the chain.
    * @property {char} atom.chain -Chain ID
    * @property {number} atom.x - X-coordinate
    * @property {number} atom.y - Y-coordinate
    * @property {number} atom.z - Z-coordinate
    * @property {string} atom.symbol - Chemical symbol
    *
    **/
    this.atoms = other.atoms || [];

  /**
   * Bonds
   *
   * @type {Array(Bond)}
   * @see {@link mol.Bond}
   *
   **/
    this.bonds=[];

   /**
    * RGB Colors
    *
    * @type {Array(RGBColor)}
    *
    **/
    this.colors = [];

   /**
    * Chains
    **/
    this.chains = other.chains || [];

}

Molecule.prototype = Object.create(Structure.prototype);

Molecule.RIGHT_HANDED_ALPHA = 1;
Molecule.RIGHT_HANDED_OMEGA = 2;
Molecule.RIGHT_HANDED_PI    = 3;
Molecule.RIGHT_HANDED_GAMMA = 4;
Molecule.RIGHT_HANDED_3_10  = 5;
Molecule.LEFT_HANDED_ALPHA  = 6;
Molecule.LEFT_HANDED_OMEGA  = 7;
Molecule.LEFT_HANDED_GAMMA  = 8;
Molecule.RIBBON_HELIX_2_7   = 9;
Molecule.POLYPROLINE        = 10;

/**
 * Three to One Letter Converter for amino-acids and nucleotides
 *
 * @type {string}
 *
 * @example
 * var aa   = Structure.threeToOne('GLN'); // returns 'Q' in uppercase
 * var nucl = Structure.threeToOne('DA'); // returns 'a' in lowercase
 *
 **/
Molecule.threeToOne = {
    'ALA' : 'A', // Alanine
    'ARG' : 'R', // Arginine
    'ASN' : 'N', // Asparagine
    'ASP' : 'D', // Aspartic_acid
    'CYS' : 'C', // Cysteine
    'GLU' : 'E', // Glutamic_acid
    'GLN' : 'Q', // Glutamine
    'GLY' : 'G', // Glycine
    'HIS' : 'H', // Histidine
    'ILE' : 'I', // Isoleucine
    'LEU' : 'L', // Leucine
    'LYS' : 'K', // Lysine
    'MET' : 'M', // Methionine
    'PHE' : 'F', // Phenylalanine
    'PRO' : 'P', // Proline
    'SER' : 'S', // Serine
    'THR' : 'T', // Threonine
    'TRP' : 'W', // Tryptophan
    'TYR' : 'Y', // Tyrosine
    'VAL' : 'V', // Valine
    'SEC' : 'U', // Selenocysteine
    'PYL' : 'O', // Pyrrolysine
    'ASX' : 'B', // Asparagine_or_aspartic_acid
    'GLX' : 'Z', // Glutamine_or_glutamic_acid
    'XLE' : 'J', // Leucine_or_Isoleucine
    'XAA' : 'X', // Unspecified_or_unknown_amino_acid
    'XXX' : 'X', // Unspecified_or_unknown_amino_acid
    'A'   : 'a', // Adenosine (nucleic)
    'T'   : 't', // Thymine (nucleic)
    'G'   : 'g', // Guanosine (nucleic)
    'C'   : 'c', // Guanosine (nucleic)
    'U'   : 'u', // Uracyl (nucleic)
    'DA'  : 'a', // Adenosine (nucleic)
    'DT'  : 't', // Thymine (nucleic)
    'DG'  : 'g', // Guanosine (nucleic)
    'DC'  : 'c'  // Guanosine (nucleic)
};


/**
 * Get first atom corresponding to the pattern  In MOWGLI, each atom has a label following the following syntax:
 * - &lt;PDBID&gt;.&lt;modelID&gt;.&lt;chainID&gt;[&lt;secStruct&gt;].&lt;groupName&gt;([&lt;groupSerial&gt;].&lt;atomName&gt;[&lt;atomSerial&gt;]
 * - __A*.*[1].CA__ corresponds to the alpha carbon belonging to the first residue of chain A of the PDB structure 1ZNI
 * - __.CA__ corresponds to the first alpha carbon found in this structure
 *
 * @param {string} pattern - A simplified regular expression
 *
 * @return {Atom}
 *
 * @example
 *
 * // Get the first atom carbon alpha (CA) found in chain B
 * var atom = mystructure.getAtomByLabel('B*.CA');
 *
 *
 **/
Molecule.prototype.getAtomByLabel = function(pattern) {
    var atom;
    // Escape characters
    var motif = pattern.replace(/([.\[\]])/g,'\\$1');
    motif = motif.replace(/\*/g,'.+');
    console.log(motif);
    var regexp = new RegExp(motif,'i');
    var i= 0;
    var match = false;
    while (!match && i < this.atoms.length) {
        match = regexp.test(this.atoms[i].label);
        if (match) {
            atom = this.atoms[i];
        }
        i++;
    }
    return atom;
};

/**
 * Filter the atoms or bonds in function of their properties
 *
 * @param {string} src - The type of objects (ATOM or BOND ) on which the filter is applied
 * @param {function} callback - A function for filtering
 *
 * @return {Array(Atom)}
 *
 * @example
 * // Extract CA atoms from mystructure
 * var selA = mystructure.finder(
 *     'ATOM',
 *     function (atom) {
 *         if ( atom.name === 'CA') {
 *              return true;
 *         }
 *     }
 * );
 *
 *
 **/
Molecule.prototype.finder = function (src,callback) {
    if (src === 'ATOM') {
        return this.atoms.filter(callback);
    }
    else {
        return this.bonds.filter(callback);
    }
};

/**
 * Filter the atoms in function of their properties
 *
 * @param {function} callback - A function for filtering
 *
 * @return {Array(Atom)}
 *
 * @example
 * // Extract CA atoms from mystructure
 * var selA = mystructure.atomFinder(
 *     function (atom) {
 *         if ( atom.name === 'CA') {
 *              return true;
 *         }
 *     }
 * );
 *
 *
 **/
Molecule.prototype.atomFinder = function (callback) {
    return this.atoms.filter(callback);
};

Molecule.prototype.bondFinder = function (callback) {
    return this.bonds.filter(callback);
};

/**
 * Return the primary sequence in FASTA format
 *
 * @return {string} The sequence in FASTA format
 *
 **/
Molecule.prototype.fasta = function () {
    var fasta = '> ' + this.ID + ':' + this.atoms[0].chain + ' | ' + this.information.title + '\n';
    var current_chain = this.atoms[0].chain;
    var count = 0;
    for (var i= 0; i < this.atoms.length; i++) {
        // console.log(this.atoms[i].chain+' '+current_chain);
        if (this.atoms[i].chain != current_chain && this.atoms[i].type=== 'ATOM') {
            fasta += '\n> ' + this.ID + ':' + this.atoms[i].chain + ' | ' + this.information.title + '\n';
            current_chain = this.atoms[i].chain;
            count = 0;
        }
        if ( (this.atoms[i].name==='CA' || this.atoms[i].name==='O4*'|| this.atoms[i].name==='O4\'') && this.atoms[i].chain == current_chain) {
            fasta += Molecule.threeToOne[this.atoms[i].group];
            count++;
            if ( (count % 80) == 0) {
                fasta += '\n';
                count = 0;
            }
        }
    }
    return fasta;
};

/**
 * Return the secondary structures in FASTA format -- if available.
 *
 * @return {string} The secondary structures of sequence in FASTA format
 *
 **/
Molecule.prototype.secondary = function () {
    var fasta_sec = '> ' + this.ID + ':' + this.atoms[0].chain + ' | ' + this.information.title + '\n';
    var current_chain = this.atoms[0].chain;
    var count = 0;
    for (var i= 0; i < this.atoms.length; i++) {
        if (this.atoms[i].secondary ==='X') {
            this.atoms[i].secondary = '.';

        }
        if (this.atoms[i].chain != current_chain && this.atoms[i].type=== 'ATOM') {
            fasta_sec+= '\n> ' + this.ID + ':' + this.atoms[i].chain + ' | ' + this.information.title + '\n';
            current_chain = this.atoms[i].chain;
            count = 0;
        }
        if ( (this.atoms[i].name==='CA' || this.atoms[i].name==='O4*'|| this.atoms[i].name==='O4\'') && this.atoms[i].chain == current_chain) {
            fasta_sec += this.atoms[i].secondary[0];
            count++;
            if ( (count % 80) == 0) {
                fasta += '\n';
                count = 0;
            }
        }
    }
    return fasta_sec;
};


/**
 * Compute the phi and psi dihedral angles of this structure.
 * The angles are stored in the CA atom of each group.
 *
 * @example
 * // Compute phi and psi dihedral angles from mystructure
 * mystructure.calcPhiPsi();
 * console.log(mystructure.getAtomByLabel('[10].CA').phi);  //
 *
 **/
Molecule.prototype.calcPhiPsi = function () {
    var ca      = 0;
    var ca_next = 0;
    var points  = [];
    var names   = { 'N': 0, 'CA': 1, 'C': 2};
    var count   = 0;
    var gp      = 0; // current group index
    var ch      = ' '; // Current chain ID
    var oldPhi  = undefined;

    // Assume that the atoms are sorted by ascending index
    for (var i in this.atoms) {
        // New chain
        if (this.atoms[i].chain != ch) {
            if (ch != ' ') {
                // Last point of the current chain
                this.atoms[ca].phi = oldPhi;
                this.atoms[ca].psi = undefined;
            }
            // Reset variables
            oldPhi  = undefined;
            gp = this.atoms[i].groupID;
            ch = this.atoms[i].chain;
            count = 0;
        }

        // sort N, CA, C, N', CA', C' of the same chain
        if (this.atoms[i].chain == ch
        &&  this.atoms[i].groupID >= gp
        &&  this.atoms[i].groupID <= gp+1
        && (this.atoms[i].name === 'N' || this.atoms[i].name === 'CA' || this.atoms[i].name === 'C' ) ) {
            var ii = (this.atoms[i].groupID - gp ) * 3 + names[this.atoms[i].name];
            if (ii == 1) {
                ca = i;
            }
            else if (ii == 4) {
                ca_next = i;
            }
            points[ii] = this.atoms[i];
            count++;
        }
        else if (count == 6){
            var angles = calcPhiPsi(points);
            this.atoms[ca].phi = oldPhi;
            this.atoms[ca].psi = angles[1];

            // Update variables for next group
            oldPhi=angles[0];
            gp=points[count-1].groupID;
            ca = ca_next;
            points[0]=points[3];
            points[1]=points[4];
            points[2]=points[5];
            count=3;
        }
    }
    // Last point of this chain
    this.atoms[ca].phi = oldPhi;
    this.atoms[ca].psi = undefined;

    // Private
    function calcPhiPsi(points)
    {
        var psi=calcDihedralAngle(points[0],points[1],points[2],points[3]); // [0,1,2,3]);
        var phi=calcDihedralAngle(points[2],points[3],points[4],points[5]); // [2,3,4,5]);
        return [phi, psi];
    }

    // Private
    function calcDihedralAngle(point0,point1,point2,point3) {
        // UA = (A2−A1) × (A3−A1) is orthogonal to plane A and UB = (B2−B1) × (B3−B1)

        var v1 = vec3.fromValues(point1.x-point0.x,point1.y-point0.y, point1.z-point0.z);
        var v2 = vec3.fromValues(point2.x-point1.x,point2.y-point1.y, point2.z-point1.z);
        var v3 = vec3.fromValues(point3.x-point2.x,point3.y-point2.y, point3.z-point2.z);
        var na=vec3.create();
        var nb=vec3.create();
        vec3.cross(na,v1,v2);
        vec3.cross(nb,v2,v3);
        var sinAngle=vec3.dot(v1,nb) * vec3.length(v2);
        var cosAngle=vec3.dot(na,nb);
        return Math.atan2(sinAngle,cosAngle)/Math.PI*180.0;
    }
};

Molecule.prototype.calcBonds = function () {
    var bondCalc = new BondCalculator(this);
};

Molecule.prototype.toString = function () {
    var quote='';
    var out='{\n';

    for (var i in this.atoms)
    {
        out+='{';
        out+='type: \''  + this.atoms[i].type + '\', ' +
         'serial: ' + this.atoms[i].serial + ', ' +
         'name: \''  + this.atoms[i].name + '\', ' +
         'struct:\'' + this.atoms[i].struct + '\', ' +
         'x :'    + this.atoms[i].x + ', ' +
         'y :'    + this.atoms[i].y + ', ' +
         'z :'    + this.atoms[i].z + ', ' +
         'symbol:\'' + this.atoms[i].symbol + '\'},\n ';
    }
    out+= 'center: {' + this.cg.x + ',y: '+ this.cg.y + ',z: '+ this.cg.z + '} } ';
    out+=('}\n');
    return out;
};

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
 * Voxels maps
 * @class Raster
 * @memberof module:structure
 * @constructor
 * @extends module:structure.Structure
 * @author Jean-Christophe Taveau
 **/
function Raster(other) {
    // super()
    Structure.call(this,other);

   /**
    * Pixels/Voxels
    *
    * @type {Array(RGBColor)}
    *
    **/
    this.data = other.data || new Uint8ClampedArray();

    // mode 8-bit, 16-bit, 32-bit, rgb, rgba
    this.information.mode = other.mode || '8-bit';
    this.information.width = other.width;
    this.information.height = other.height;
    this.information.depth = other.depth || 1;

    this.width = this.information.width;
    this.height = this.information.height;
    this.depth = this.information.depth;

    this.bbox = {
        'min': {'x': 0,'y': 0,'z': 0},
        'max': {'x': this.width,'y': this.height,'z': this.depth},
        'center':  {'x': this.width/2.0,'y': this.height/2.0,'z': this.depth/2.0},
        'radius': Math.sqrt(this.width * this.width + this.height * this.height + this.depth * this.depth)/2.0
    };

    this.centroid = {'x': this.width/2.0,'y': this.height/2.0,'z': this.depth/2.0};

    this.bins;
}

Raster.prototype = Object.create(Structure.prototype);

Raster.prototype.getPixel = function(x,y) {
    return this.data(x + this.width * y);
};

Raster.prototype.getVoxel = function(x,y,z) {
    return this.data(x + this.width * y + this.width * this.height * z);
};

Raster.prototype.histogram = function() {
    if (this.bins === undefined) {
        this.bins = [];
        for (var i=0; i < this.data.length; i++) {
            this.bins[this.data[i]]++;
        }
    }
    return this.bins;
};

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


'use strict';

/**
 * Root class for 3D objects: atomic ({@link module:structure.Molecule}), map, or any 3D graphics vectorial object
 * @class Structure
 * @memberof module:structure
 * @constructor
 *
 * @author Jean-Christophe Taveau
 **/
function Structure(other) {

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
Structure.prototype.isMolecule = function() {
    return (this instanceof Molecule);
};


/**
 * Is this structure a 2D/3D-raster? (instance of class Raster)
 *
 * @return {boolean} - true if this structure is a 2D- or 3D-raster (image or volume/map).
 *
 **/
Structure.prototype.isRaster = function() {
    return (this instanceof Raster);
};


 /**
 * Set Title
 *
 * @param {string} str - Set a new title
 *
 **/
Structure.prototype.setTitle = function (str) {
    this.information.title = str;
};

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
 * 3D Vectorial Object
 * @class VecObj
 * @memberof module:structure
 * @constructor
 *
 * @author Jean-Christophe Taveau
 **/
function VecObj() {
    // super()
    Structure.call(this);

    // TODO Is it redundant with the Shape class?????
}

VecObj.prototype = Object.create(Structure.prototype);

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

/*
 * Constructor
 */

function Console() {

}

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

function EventManager() {

}


EventManager.prototype.add = function(type, a_callback) {


}



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

(function(exports) {

    /**
     * MouseSensor
     * @class MouseSensor
     * @constructor
     * @memberof module:mwUI
     */
    function MouseSensor(canvas_id) {
        var mousePosition=[0.0,0.0];
        var currentAngle=[0.0,0.0];

        var lastX = -1;
        var lastY = -1;
        var dragging = false;

        var zoom = 0;
        var zoomDelta=0.01;

        var canvas = document.getElementById(canvas_id);

        var shapes = [];
        var renderer = null;

        canvas.onmousedown = function(ev) {
            //Mouse is pressed
            var x = ev.clientX;
            var y = ev.clientY;

            var rect = ev.target.getBoundingClientRect();
            if(rect.left <= x && x <= rect.right && rect.top <= y && y <= rect.bottom) {
                lastX = x;
                lastY = y;
                mousePosition[0] = x;
                mousePosition[1] = canvas.height - y;
                dragging = true;
            }
        };

        canvas.onmouseup = function(ev){
            //Mouse is released
            dragging = false;
        };

        canvas.onmousemove = function(ev) {
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
                for (var i in shapes) {
                    mat4.multiply(shapes[i].matrix,tmp,shapes[i].matrix);
                }
                // Update Display
                renderer.drawScene();
            }
            lastX = x;
            lastY = y;
        };

        return {
            attach : function (a_shape) {
                shapes.push(a_shape);
            },

            setRenderer : function (a_renderer) {
                renderer = a_renderer;
            }
        };
    }

    exports.MouseSensor = MouseSensor;

})(this.mwUI = this.mwUI || {} );

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

(function(exports) {

    /**
     * ZoomSensor
     * @class ZoomSensor
     * @constructor
     * @memberof module:mwUI
     */
    function ZoomSensor(canvas_id) {
        this.nodes = [];
        this.zoom = 1.0;
        this.zoomDelta = 0.05;

        this.canvas = document.getElementById(canvas_id);

        this.handleEvent = function(event) {
            this.zoom += (this.zoomDelta * event.deltaY / Math.abs(event.deltaY) );
            for (var i=0; i < this.nodes.length; i++) {
                this.nodes[i].setZoom(this.zoom);
            }
            // Update Display
            this.nodes[0].getRenderer().drawScene();
            event.preventDefault();
            return false;
        };

        this.canvas.addEventListener('wheel',this,false);
    }

    ZoomSensor.prototype.attach = function(camera) {
        if (camera instanceof mwSG.Camera) {
            this.nodes.push(camera);
        }
    };

    exports.ZoomSensor = ZoomSensor;

})(this.mwUI = this.mwUI || {} );

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

(function(exports) {

    /**
     * ZoomToucher    pinch-zoom gesture
     * Think about what a pinch event is: two fingers on an element, moving toward or away from each other. 
     * Gesture events are, to my knowledge, a fairly new standard, so probably the safest way to go about 
     * this is to use touch events like so:

     * @class ZoomToucher
     * @constructor
     * @memberof module:mwUI
     */
    function ZoomToucher(canvas_id) {


/*
(ontouchstart event)

if(e.touches.length == 2) {
    scaling = true;
    pinchStart(e);
}

(ontouchmove event)

if(scaling) {
    pinchMove(e);
}
(ontouchend event)

if(scaling) {
    pinchEnd(e);
    scaling = false;
}
To get the distance between the two fingers, use pythagorean theorem:

var dist = Math.sqrt(
    (e.touches[0].x-e.touches[1].x) * (e.touches[0].x-e.touches[1].x) +
    (e.touches[0].y-e.touches[1].y) * (e.touches[0].y-e.touches[1].y));
*/


        canvas.addEventListener("touchstart", startZoom, false);
        canvas.addEventListener("touchstart", startZoom, false);

        function pinchStart(e) {
            if (e.targetTouches.length != 2) {
                return;
            }

            var touch1 = e.targetTouches[0],
                touch2 = e.targetTouches[1],
                dX = touch1.clientX - touch2.clientX,
                dY = touch1.clientY - touch2.clientY,
                startDist = Math.sqrt(dX * dX + dY * dY),
                scale = +this.getAttribute("data-scale") || 1;

            function pinchMove(e) {
                if (e.targetTouches.length != 2) {
                    return;
                }

                var touch1 = e.targetTouches[0],
                    touch2 = e.targetTouches[1],
                    dX = touch1.clientX - touch2.clientX,
                    dY = touch1.clientY - touch2.clientY,
                    newDist = Math.sqrt(dX * dX + dY * dY),
                    newScale = scale * newDist / startDist;
                this.style.webkitTransform = "scale(" + newScale + ")";
                this.setAttribute("data-scale", newScale);
                e.preventDefault();
            }

            function pinchEnd() {
                this.removeEventListener("touchmove", pinchMove);
                this.removeEventListener("touchend", pinchEnd);
            }

            this.addEventListener("touchmove", pinchMove, false);
            this.addEventListener("touchend", pinchEnd, false);
        };
    }
    
    exports.ZoomToucher = ZoomToucher;

})(this.mwUI = this.mwUI || {} );
