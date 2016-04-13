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
 * Load various samples for testing:
 * - from PDB: 1ZNI, 1HHO, and 3CRO (here in pre-loaded JSON files)
 * - from EMDB
 * - from ImageJ: [lena-std.tif](http://imagej.nih.gov/ij/images/lena-std.tif) and [T1-Head](t1-head.zip)
 *
 * @class Sample
 * @memberof module:mwGUI
 * @param {number} the_id - DOM element ID
 *
 * @author Jean-Christophe Taveau
 **/

/**
 * @function handleEvent
 * @memberof module:mwGUI.Sample
 * @desc Handle click events
 * @param {object} event - The DOM event
 *
 * @author Jean-Christophe Taveau
 **/


(function(exports) {

    function SampleGUI(the_id) {
        /**
         * DOM element ID
         *
         **/
        this.element = document.getElementById(the_id);

        /**
         * Handle various event types
         * @param event - The DOM event
        **/
        this.handleEvent = function(event) {
            switch(event.type) {
                case 'click':
                    // Load JSON file
                    console.log('Load Sample...'+the_id);
                    var url = "samples/1ZNI.json";
                    switch (the_id) {
                    case '1zni':
                        url = "samples/1ZNI.json";
                        loadJSON(url);
                        break;
                    case '1hho':
                        url = "samples/1HHO.json";
                        loadJSON(url);
                        break;
                    case '3cro':
                        url = "samples/3CRO.json";
                        loadJSON(url);
                        break;
                    case 'toricSolenoid.png':
                        url = "samples/toricSolenoid_vertical_128x128x86.png";
                        loadRaster(url,'8-bit','toricSolenoid');
                        break;
                    }
            }

            function loadJSON(url) {
                var xhr = new XMLHttpRequest();
                // We need a asynchronous request (3rd argument true) - Wait until completion
                xhr.open('GET', url, true);
                xhr.responseType = 'json';
                xhr.onreadystatechange = function (aEvt) {
                    if (xhr.readyState == 4) {
                        if(xhr.status == 200) {
                            var json = xhr.response; // JSON.parse(xhr.responseText);
                            MOWGLI.structure = new Molecule(json);
                            console.log(MOWGLI.structure instanceof Molecule);
                            // Calc phi+psi dihedral angles
                            MOWGLI.structure.calcPhiPsi();

                            // Init and create default scene graph
                            console.log('MOWGLI.init');
                            MOWGLI.init();

                            // Set default rendering display modes
                            MOWGLI.settings.displayAtoms= "points";
                            MOWGLI.settings.displayColors= "color_cpk";
                            // Create a shape wireframe + CPK for Molecule or a shape BBox for Raster
                            var shape = ShapeFactory.get({
                                'molecule': MOWGLI.structure,
                                'displayType': MOWGLI.settings.displayAtoms,
                                'color': MOWGLI.settings.displayColors,
                                'glContext': MOWGLI.renderer.getContext()
                            });

                            // Attach to the scene graph
                            var scene = MOWGLI.renderer.getScene();
                            var group = scene.getById("group[shape]");

                            group.add(shape);
                            scene.add(group);

                            // TODO: Must be set automatically from BBoxes of shapegroup
                            mat4.translate(
                                scene.getCamera().viewMatrix,
                                scene.getCamera().viewMatrix,
                                [0.0,0.0,-80.0]

                            );
                            // Adjust Camera settings
                            // TODO: scene.getCamera().set(...);
                            // Trigger the rendering infinite loop
                            MOWGLI.update();

                        }

                        else {
                            console.log("ERROR:: Can't load sample." + aEvt.description+"\n");
                        }
                    }
                };
                xhr.send(null);
            }

            function loadRaster(url,mode,title) {
                console.log("Load Raster...");
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');

                var img = new Image();
                img.src = url;
                img.crossOrigin = '*'; // no credentials flag. Same as img.crossOrigin=''
                img.onload = function() {
                    canvas.style.display = 'none';
                    canvas.width = this.width;
                    canvas.height = this.height;
                    ctx.drawImage(img, 0, 0, this.width, this.height);
                    var pix = ctx.getImageData(0, 0, this.width, this.height).data;
                    // Typed array? Uint8ClampedArray or Uint32Array
                    var data;
                    if (mode === '8-bit') {
                        data = new Uint8ClampedArray(pix.length/4);
                        for (var i=0, count=0; i<pix.length; i+=4,count++) {
                            // Only use the red channel
                            // An average could be better (r+g+b)/3
                            data[count] = pix[i];
                        }
                    }
                    else {
                        // Pack RGBA colors
                        data = new Uint32Array(pix.length/4);
                        for (var i=0, count=0; i<pix.length; i+=4,count++) {
                            data[count] = pix[i]<< 24 | pix[i+1]<< 16 | pix[i+2]<<8 | pix[i+3];
                        }
                    }

                    MOWGLI.structure = new Raster(
                        {
                            "ID"    : title,
                            "title" : title,
                            "mode"  : mode,
                            "width" : this.width,
                            "height": this.width,
                            "depth" : this.height/this.width,
                            "data"  : data
                        }
                    );
                    MOWGLI.alert(the_id.toUpperCase() + " successfully loaded...");
                };

            }
        };

        // Note that the listeners in this case are this, not this.handleEvent
        this.element.addEventListener('click', this, false);
    }

    exports.Sample = SampleGUI;

})(this.mwGUI = this.mwGUI || {} );
