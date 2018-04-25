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
