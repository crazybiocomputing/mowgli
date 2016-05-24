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
