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
 *
 */
(function (exports) {

    var _MOWGLI = function() {
        if (_MOWGLI.prototype._singletonInstance) {
          return _MOWGLI.prototype._singletonInstance;
        }

        _MOWGLI.prototype._singletonInstance = this;

        /**
         * Renderer used for display
         */
        this.renderer;

        /**
         * Active structure used by mowgli
         */
        this.structure = {};

        /**
         * Settings for graphics
         */
        this.settings = {};
    }

    /**
     * Init graphics
     */
    _MOWGLI.prototype.init = function () {
        if (this.renderer === undefined) {
            init();
        }

        function init() {
            console.log('INIt');
            var canvas = document.getElementById('mowgli');
            try {
                MOWGLI.renderer = new Renderer('mowgli');
            }
            catch (e) {
                MOWGLI.alert('ERR: Cannot get WebGL graphics context');
            }
            var scene = new Scene();
            scene.setDefault();
            MOWGLI.renderer.addScene(scene);

            var group = new ShapeGroup();
            scene.add(group);
            // 4- Add a sensor
            var mouse = new MouseSensor('mowgli');
            mouse.attach(group);

            MOWGLI.renderer.addSensor(mouse);

            // var gl = MOWGLI.renderer.context;
            // gl.clearColor(1.0,0.5,0.0,1.0);
        }
    };

    /**
     * Update graphics
     */
    _MOWGLI.prototype.update = function () {
        if (this.renderer === undefined) {
            MOWGLI.alert('ERR: No initialization done.')
        }
        this.renderer.init();
        this.renderer.drawScene();
    };

    /**
     * Alert window
     */
    _MOWGLI.prototype.alert = function(msg) {
        document.querySelector('.alert .modal-header h2').innerHTML = 'MOWGLI: Info';
        document.querySelector('.alert .modal-body').innerHTML='<p>'+msg+'</p>';
        // Trigger display of the alert
        document.querySelector('.alert #modal-alert').checked = true;
    };


    exports.MOWGLI = new _MOWGLI();

})(window);
