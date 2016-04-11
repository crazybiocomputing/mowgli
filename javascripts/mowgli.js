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


/*
function MOWGLI() {
    this.structure;
}
*/

(function(exports) {
    var _mol;
    var _renderer;
    
    exports.alert = function(msg) {
        document.querySelector(".alert .modal-header h2").innerHTML = 'MOWGLI: Info';
        document.querySelector(".alert .modal-body").innerHTML='<p>'+msg+'</p>';
        // Trigger display of the alert
        document.querySelector('.alert #modal-alert').checked = true;
    }
    
    
    /**
     * Active structure used by mowgli
     **/
    exports.structure = undefined;


})(this.MOWGLI = {});


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
 * Display an alert modal window
 * @class Alert
 * @memberof module:mwGUI
 * @constructor
 *
 * @author Jean-Christophe Taveau
 **/

function Alert(msg) {
    document.querySelector("#alert header #body").innerHTML = '<p>Alert!!</p>';
    var el = document.querySelector("#alert article");
    el.innerHTML='<p>'+msg+'</p>';
    
    // Display alert
    document.getElementById('alert').classList.toggle('alert_target');
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


window.onload = function() {

    // 1- File
    // 1-1 Open...PDB
    //var openPDB = mwGUI.Opener("pdb");
    // 1-2 Open...EMDB
    //var openEMDB = mwGUI.Opener("emdb");
    // 1-3 Open...Samples
    var sample_1ZNI = new mwGUI.Sample("1zni");
    var sample_3CRO = new mwGUI.Sample("3cro");
    var sample_Toric = new mwGUI.Sample("toricSolenoid.png");
    // 1-4 Export
    var export_menuitem = new mwGUI.SaveAs("export");

    // 2- Structure
    // 2-3- Structure...Sequence
    // 2-3-1 Structure...Sequence...FASTA
    var sequence_fasta = new mwGUI.Fasta("fasta");

    // 2-3-2 Structure...Sequence...Sec.Structures
    var second_struct = new mwGUI.SecStruct("secstruct");

    // 2-3-3 Structure...Sequence...Phipsi
    var phipsi = new mwGUI.Phipsi("phipsi");
    // 2-3-4 Structure...Sequence...Ramachandran

    // 3- Display

    // 4- Colors

    // 5- Settings
    // 5-1 FullScreen
    var fullscreen = new mwGUI.FullScreen("fullscreen");

    // 5-2 Camera
    var camera_settings = new mwGUI.Camera("camera");

    // 6- Tools

    // 7- Help
    // About modal window
    console.log('Add event click on About...');
    var about = new mwGUI.About("about");
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
 * Constructor
 * @class Modal
 * @memberof module:mwGUI
 * @constructor
 *
 * @author Jean-Christophe Taveau
 **/
 function Modal(options) {
    // Header
    var header = document.querySelector(".mwModal .modal-header");
    header.style.backgroundImage = options.headerImage || 'url("images/default-background.jpg")';
    document.querySelector(".mwModal .modal-header h2").innerHTML = options.headerTitle || 'Modal window';
    
    // Body
    var body = document.querySelector(".mwModal .modal-body");
    body.innerHTML= options.body || '<p>No information</p>';
    body.style.fontSize = options.fontSize || "1.1em";
    body.style.fontFamily = options.fontFamily || "Lato";
    
    // Display modal
    document.querySelector('.mwModal #modal-one').checked = true;

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
 * @module mwGUI
 **/
 
 /**
 * Constructor
 * @class About
 * @memberof module:mwGUI
 * @param {number} the_id - DOM element ID
 *
 * @author Jean-Christophe Taveau
 **/
 
/**
 * @function handleEvent
 * @memberof module:mwGUI.About
 * @desc Handle various event types
 * @param event - The DOM event
 *
 * @author Jean-Christophe Taveau
 **/


(function(exports) {

    function AboutGUI(the_id) {
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
            console.log(the_id); // 'Something Good', as this is the Something object
            switch(event.type) {
            case 'click':
                // Display modal window
                var popup = new Modal({
                    headerTitle : "About Mowgli...",
                    headerImage : "url('images/headprot.jpg')",
                    body  : content.reduce(
                            function(prev, current, index, array){
                                return prev + current;
                            }
                        )
                });
                break;
            case 'dblclick':
                // some code here...
                break;
            }
        };

        // Note that the listeners in this case are this, not this.handleEvent
        this.element.addEventListener('click', this, false);
        this.element.addEventListener('dblclick', this, false);

        // You can properly remove the listeners
        // this.element.removeEventListener('click', this, false);
        // this.element.removeEventListener('dblclick', this, false);
      
        var content = [
            "<p>MOWGLI &mdash; <b>MO</b>lecule <b>W</b>eb<b>GL</b> & <b>I</b>mage viewer &mdash; ",
            "is a collaborative project developed by students of the Master of Science in Bioinformatics, Bordeaux ",
            "during the course \"Structural Bioinformatics\". </p>",
            "<p>Maintained and supervised by Jean-Christophe Taveau</a></p>",
            "<h3>Contributors</h3>",
            "<h4>Promotion 2014</h4>",
            "<p>Nullam at enim at nibh mollis feugiat ac nec lorem. Mauris eu ornare erat. Integer facilisis aliquet leo a iaculis. </p>",
            "<h4>Promotion 2015</h4>",
            "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lobortis orci vel velit rutrum, a dapibus nisl convallis. ",
            "Nulla quis hendrerit dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>",
            "<h4>Promotion 2016</h4>",
            "<p>Integer commodo faucibus dui vitae maximus. Nullam at enim at nibh mollis feugiat ac nec lorem. Mauris eu ornare erat. </p>",
            "<p>Published with <a href=\"http://pages.github.com\">GitHub Pages</a></p>"
        ];
    }

    exports.About = AboutGUI;
    
    
})(this.mwGUI = this.mwGUI || {} );




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
 * @module mwGUI
 **/

 /**
 * Constructor
 * @class Camera
 * @memberof module:mwGUI
 * @param {number} the_id - DOM element ID
 *
 * @author Jean-Christophe Taveau
 **/

/**
 * @function handleEvent
 * @memberof module:mwGUI.Camera
 * @desc Handle various event types
 * @param event - The DOM event
 *
 * @author Jean-Christophe Taveau
 **/


(function(exports) {

    function Camera(the_id) {
        /**
         * DOM element ID
         *
         **/
        this.element = document.getElementById(the_id);
        this.checkbox = new CheckBox(the_id);

        /**
         * Handle various event types
         * @param event - The DOM event
        **/
        this.handleEvent = function(event) {
            switch(event.type) {
            case 'click':
                var value = event.target.dataset.value;
                if (value === 'cam_anaglyph') {
                    console.log('cam_anaglyph');
                }
                else if  (value === 'cam_cross') {
                    console.log('cam_cross');
                }
                else if  (value === 'cam_mono') {
                    // Default settings
                    console.log('cam_mono');
                }
                else {
                    console.log('cam_stereo');
                }

                // Update checkbox display
                this.checkbox.update(event.target.parentNode,value);
                break;
            }
        };

        // Note that the listeners in this case are this, not this.handleEvent
        this.element.addEventListener('click', this, false);


    }

    exports.Camera = Camera;


})(this.mwGUI = this.mwGUI || {} );

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
 * @module mwGUI
 **/
 
 /**
 * Constructor
 * @class Fasta
 * @memberof module:mwGUI
 * @param {number} the_id - DOM element ID
 *
 * @author Jean-Christophe Taveau
 **/
 
/**
 * @function handleEvent
 * @memberof module:mwGUI.Fasta
 * @desc Handle various event types
 * @param event - The DOM event
 *
 * @author Jean-Christophe Taveau
 **/


(function(exports) {

    function Fasta(the_id) {
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
            console.log(the_id); // 'Something Good', as this is the Something object
            switch(event.type) {
            case 'click':
                var fasta_content;
                if( MOWGLI.structure.isMolecule() ) {
                    fasta_content = MOWGLI.structure.fasta();
                    // Display modal window
                    var popup = new Modal({
                        headerTitle : "FASTA Sequence",
                        headerImage : "url('images/headprot.jpg')",
                        body  : '<pre>'+ fasta_content +'</pre>'
                    });
                }
                else {
                    MOWGLI.alert("No FASTA sequence is available for this structure");
                }
                break;
            case 'dblclick':
                // some code here...
                break;
            }
        };

        // Note that the listeners in this case are this, not this.handleEvent
        this.element.addEventListener('click', this, false);
        this.element.addEventListener('dblclick', this, false);

        // You can properly remove the listeners
        // this.element.removeEventListener('click', this, false);
        // this.element.removeEventListener('dblclick', this, false);
      
    }

    exports.Fasta = Fasta;
    
    
})(this.mwGUI = this.mwGUI || {} );




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
 * @module mwGUI
 **/

 /**
 * Constructor
 * @class FullScreen
 * @memberof module:mwGUI
 * @param {number} the_id - DOM element ID
 *
 * @author Jean-Christophe Taveau
 **/

/**
 * @function handleEvent
 * @memberof module:mwGUI.Fasta
 * @desc Handle various event types
 * @param event - The DOM event
 *
 * @author Jean-Christophe Taveau
 **/


(function(exports) {

    function FullScreen(the_id) {
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
                toggleFullScreen();
                break;
            }

            function toggleFullScreen() {
                if (!document.fullscreenElement &&    // alternative standard method
                    !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
                    if (document.documentElement.requestFullscreen) {
                        document.documentElement.requestFullscreen();
                    }
                    else if (document.documentElement.mozRequestFullScreen) {
                        document.documentElement.mozRequestFullScreen();
                    }
                    else if (document.documentElement.webkitRequestFullscreen) {
                        document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                    }
                } else {
                    if (document.cancelFullScreen) {
                        document.cancelFullScreen();
                    }
                    else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    }
                    else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    }
                }
            }
        };

        // Note that the listeners in this case are this, not this.handleEvent
        this.element.addEventListener('click', this, false);


    }

    exports.FullScreen = FullScreen;


})(this.mwGUI = this.mwGUI || {} );

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
 * @module mwGUI
 **/

 /**
 * Constructor
 * @class About
 * @memberof module:mwGUI
 * @param {number} the_id - DOM element ID
 *
 * @author Jean-Christophe Taveau
 **/

/**
 * @function handleEvent
 * @memberof module:mwGUI.Phipsi
 * @desc Handle various event types
 * @param event - The DOM event
 *
 * @author Jean-Christophe Taveau
 **/


(function(exports) {

    function PhipsiGUI(the_id) {
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
            console.log(the_id); // 'Something Good', as this is the Something object
            switch(event.type) {
            case 'click':
            if( MOWGLI.structure.isMolecule() ) {
                 MOWGLI.structure.calcPhiPsi();
                var selection=MOWGLI.structure.finder(
                    'ATOM',
                    function (atom) {
                        if ( atom.name === 'CA') {
                            return true;
                         }
                    }
                );

                var Phipsi_content=function(array){
                     var tab='<table id="tabphi" style="font-family: monospace">'
                      tab+='<tr><th>Chain</th><th>Group</th><th>GroupID</th><th>Phi</th><th>Psi</th></tr>'
                    for (var i=0; i < selection.length; i++) {
                        if (selection[i].phi === undefined) {
                            selection[i].phi = '-';
                        }
                        if (selection[i].psi === undefined) {
                            selection[i].psi = '-';
                        }

                        tab+='<tr>';
                        tab+='<td>'+selection[i].chain+'</td>';
                        tab+='<td>'+selection[i].group+'</td>';
                        tab+='<td>'+selection[i].groupID+'</td>';
                        if (!isNaN(selection[i].phi)) {
                            tab+='<td>'+selection[i].phi.toFixed(2)+'</td>';
                        }
                        else {
                            tab+='<td>'+selection[i].phi+'</td>';
                        }
                        if (!isNaN(selection[i].psi)) {
                            tab+='<td>'+selection[i].psi.toFixed(2)+'</td>';
                        }
                        else {
                            tab+='<td>'+selection[i].psi+'</td>';
                        }
                        tab+='</tr>';
                    }
                    tab+='</table>'
                    return tab
                }
                var content=Phipsi_content(selection);

                // Display modal window
                var popup = new Modal({
                    headerTitle : "Phi/Psi...",
                    headerImage : "url('images/headprot.jpg')",
                    body  : content


                });
                }
                else {
                    MOWGLI.alert("No Phi/Psi angles are available for this structure");
                }
                break;
            case 'dblclick':
                // some code here...
                break;
            }
        };

        // Note that the listeners in this case are this, not this.handleEvent
        this.element.addEventListener('click', this, false);
        this.element.addEventListener('dblclick', this, false);

        // You can properly remove the listeners
        // this.element.removeEventListener('click', this, false);
        // this.element.removeEventListener('dblclick', this, false);

    }

    exports.Phipsi = PhipsiGUI;


})(this.mwGUI = this.mwGUI || {} );

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
                            MOWGLI.alert(the_id.toUpperCase() + " successfully loaded...");
                            console.log(MOWGLI.structure instanceof Molecule);
                            MOWGLI.structure.calcPhiPsi();
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

        // You can properly remove the listeners
        // this.element.removeEventListener('click', this, false);
        // this.element.removeEventListener('dblclick', this, false);


    }

    exports.Sample = SampleGUI;

})(this.mwGUI = this.mwGUI || {} );

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
 * @module mwGUI
 **/
 
 /**
 * Constructor
 * @class Fasta
 * @memberof module:mwGUI
 * @param {number} the_id - DOM element ID
 *
 * @author Jean-Christophe Taveau
 **/
 
/**
 * @function handleEvent
 * @memberof module:mwGUI.Fasta
 * @desc Handle various event types
 * @param event - The DOM event
 *
 * @author Jean-Christophe Taveau
 **/


(function(exports) {

    function SaveAs(the_id) {
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
            console.log(the_id); // 'Something Good', as this is the Something object
            switch(event.type) {
            case 'click':
                // Display modal window
                MOWGLI.alert("Not implemented. Sorry for the inconvenience");
                break;
            }
        };

        // Note that the listeners in this case are this, not this.handleEvent
        this.element.addEventListener('click', this, false);

        // You can properly remove the listeners
        // this.element.removeEventListener('click', this, false);
        // this.element.removeEventListener('dblclick', this, false);
      
    }

    exports.SaveAs = SaveAs;
    
    
})(this.mwGUI = this.mwGUI || {} );




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
 * @module mwGUI
 **/
 
 /**
 * Constructor
 * @class SecStruct
 * @memberof module:mwGUI
 * @param {number} the_id - DOM element ID
 *
 * @author Jean-Christophe Taveau
 **/
 
/**
 * @function handleEvent
 * @memberof module:mwGUI.Secstruct
 * @desc Handle various event types
 * @param event - The DOM event
 *
 * @author Jean-Christophe Taveau
 **/


(function(exports) {

    function SecStructGUI(the_id) {
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
            console.log(the_id); // 'Something Good', as this is the Something object
            switch(event.type) {
            case 'click':
            var second_content;
                if( MOWGLI.structure.isMolecule() ) {
                    second_content = MOWGLI.structure.secondary();
                    console.log(second_content);
                    // Display modal window
                    var popup = new Modal({
                        headerTitle : "Secondary Structure",
                        headerImage : "url('images/headprot.jpg')",
                        body  : '<pre>'+ second_content +'</pre>'
                    });
                }
                else {
                    MOWGLI.alert("No Secondary structure sequence is available for this structure");
                }
                break;
            case 'dblclick':
                // some code here...
                break;
            }
        };

        // Note that the listeners in this case are this, not this.handleEvent
        this.element.addEventListener('click', this, false);
        this.element.addEventListener('dblclick', this, false);

        // You can properly remove the listeners
        // this.element.removeEventListener('click', this, false);
        // this.element.removeEventListener('dblclick', this, false);
      
    }

    exports.SecStruct = SecStructGUI;
    
    
})(this.mwGUI = this.mwGUI || {} );



