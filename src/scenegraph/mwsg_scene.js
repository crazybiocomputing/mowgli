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
            // Observe the renderer for canvas resize
            this.parent.subscribe(an_object);
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
