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
     * Render this object and traverse its children
     * Function called by the renderer
     *
     * @param{number} OpenGL context
     **/
    Node.prototype.render = function(context) {
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
