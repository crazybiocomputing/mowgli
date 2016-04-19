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
