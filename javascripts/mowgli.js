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

/**
 * Constructor
 * @class CheckBox
 * @memberof module:mwGUI
 * @constructor
 *
 * @author Jean-Christophe Taveau
 **/
 function CheckBox(options) {
     // Do nothing?
}

CheckBox.prototype.update = function(el,value) {
    // Needs the parent <ul>
    var list = el.parentNode;
    for (var i=0; i < list.children.length; i++) {
        if (list.children[i].children[0].dataset.value === value) {
            list.children[i].className = "checked";
        }
        else {
            list.children[i].className = "checkbox_item";
        }
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
                     var tab='<table id="tabphi">'
                      tab+='<tr><th>Chain</th><th>Group</th><th>GroupID</th><th>Phi</th><th>Psi</th></tr>'
                    for (var i=0; i < selection.length; i++) {
                        tab+='<tr><td>'+selection[i].chain+'</td>'+'<td>'+selection[i].group+'</td>'+'<td>'+selection[i].groupID+'</td>'+'<td>'+selection[i].phi+'</td>'+'<td>'+selection[i].psi+'</td></tr>';
                        
                    }
                    tab+='</table>'
                    tab=tab.replace(/undefined/g,"-");
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
            if( MOWGLI.structure.isMolecule() ) {
                 MOWGLI.structure.secondary();
                var selection=MOWGLI.structure.finder(
                    'ATOM', 
                    function (atom) {
                        if ( atom.name === 'CA') {
                            return true;
                         } 
                    }
                );
                console.log(selection);
                 var Secondary_content=function(array){
                   var str="Sequence and secondary sructure for "+MOWGLI.structure.ID;
                    var seq="";
                    var sec="";
                    for (var i=0; i < selection.length; i++) {
                        if (i%10 == 0) seq+=" ", sec+=" ";
                        if (i%50 == 0) str+=seq+"\n"+sec+"\n"+"\n",sec="",seq="";
                        sec+=(selection[i].secondary[0]=='X') ?'.' : selection[i].secondary[0] ;
                        seq+=Molecule.threeToOne[selection[i].group];
                    }
                    str+=seq+"\n"+sec;
                    return str 


                };

                var content=Secondary_content(selection);
                
                
                // Display modal window
                var popup = new Modal({
                    headerTitle : "Secondary structure...",
                    headerImage : "url('images/headprot.jpg')",
                    body  :"<pre>"+content+"</pre>"
                            
                        
                });
                }
                
                else {
                    MOWGLI.alert("No Secondary Structure are available for this structure");
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
 * var aa   = Structure.threeToOne("GLN"); // returns 'Q' in uppercase
 * var nucl = Structure.threeToOne("DA"); // returns 'a' in lowercase 
 *
 **/
Molecule.threeToOne = {
    "ALA" : "A", // Alanine
    "ARG" : "R", // Arginine
    "ASN" : "N", // Asparagine
    "ASP" : "D", // Aspartic_acid
    "CYS" : "C", // Cysteine
    "GLU" : "E", // Glutamic_acid
    "GLN" : "Q", // Glutamine
    "GLY" : "G", // Glycine
    "HIS" : "H", // Histidine
    "ILE" : "I", // Isoleucine
    "LEU" : "L", // Leucine
    "LYS" : "K", // Lysine
    "MET" : "M", // Methionine
    "PHE" : "F", // Phenylalanine
    "PRO" : "P", // Proline
    "SER" : "S", // Serine
    "THR" : "T", // Threonine
    "TRP" : "W", // Tryptophan
    "TYR" : "Y", // Tyrosine
    "VAL" : "V", // Valine
    "SEC" : "U", // Selenocysteine
    "PYL" : "O", // Pyrrolysine
    "ASX" : "B", // Asparagine_or_aspartic_acid
    "GLX" : "Z", // Glutamine_or_glutamic_acid
    "XLE" : "J", // Leucine_or_Isoleucine
    "XAA" : "X", // Unspecified_or_unknown_amino_acid
    "XXX" : "X", // Unspecified_or_unknown_amino_acid
    "A"   : "a", // Adenosine (nucleic)
    "T"   : "t", // Thymine (nucleic)
    "G"   : "g", // Guanosine (nucleic)
    "C"   : "c", // Guanosine (nucleic)
    "U"   : "u", // Uracyl (nucleic)
    "DA"  : "a", // Adenosine (nucleic)
    "DT"  : "t", // Thymine (nucleic)
    "DG"  : "g", // Guanosine (nucleic)
    "DC"  : "c"  // Guanosine (nucleic)
}


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
 * var atom = mystructure.getAtomByLabel("B*.CA");
 *
 *
 **/
Molecule.prototype.getAtomByLabel = function(pattern) {
    var atom;
    // Escape characters
    var motif = pattern.replace(/([.\[\]])/g,"\\$1");
    motif = motif.replace(/\*/g,".+");
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
}

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
}

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
}

Molecule.prototype.bondFinder = function (callback) {
  return this.bonds.filter(callback);
}

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
        console.log(this.atoms[i].chain+" "+current_chain);
        if (this.atoms[i].chain != current_chain && this.atoms[i].type=== "ATOM") {
            fasta += '\n> ' + this.ID + ':' + this.atoms[i].chain + ' | ' + this.information.title + '\n';
            current_chain = this.atoms[i].chain;
            count = 0;
        }
        if ( (this.atoms[i].name==="CA" || this.atoms[i].name==="O4*"|| this.atoms[i].name==="O4'") && this.atoms[i].chain == current_chain) {
            fasta += Molecule.threeToOne[this.atoms[i].group];
            count++;
            if ( (count % 80) == 0) {
                fasta += '\n';
                count = 0;
            }
        }
    }
    return fasta;
}

/**
 * Return the secondary structures in FASTA format -- if available.
 *
 * @return {string} The secondary structures of sequence in FASTA format
 *
 **/
Molecule.prototype.secondary = function () {
    var fasta = '> ' + this.ID + ':' + this.atoms[0].chain + ' | ' + this.title + '\n';
    var current_chain = this.atoms[0].chainID;
    var count = 0;
    for (var i= 0; i < this.atoms.length; i++) {
        if (this.atoms[i].chainID != current_chain) {
            fasta += '\n> ' + this.ID + ':' + this.atoms[i].chain + ' | ' + this.title + '\n';
            current_chain = this.atoms[i].chainID;
            count = 0;
        }
        if (this.atoms[i].name==="CA" && this.atoms[i].chainID == current_chain) {
            fasta += this.atoms[i].secondary;
            count++;
            if ( (count % 80) == 0) {
                fasta += '\n';
                count = 0;
            }
        }
    }
}


/**
 * Compute the phi and psi dihedral angles of this structure.
 * The angles are stored in the CA atom of each group.
 *
 * @example
 * // Compute phi and psi dihedral angles from mystructure
 * mystructure.calcPhiPsi();
 * console.log(mystructure.getAtomByLabel("[10].CA").phi);  // 
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
}

Molecule.prototype.calcBonds = function () {
  var bondCalc = new BondCalculator(this);
}

Molecule.prototype.toString = function () {
  var quote='';
  var out='{\n';

  for (var i in this.atoms)
  {
    out+="{";
    out+="type: '"  + this.atoms[i].type + "', " +
     "serial: " + this.atoms[i].serial + ", " +
     "name: '"  + this.atoms[i].name + "', " +
     "struct:'" + this.atoms[i].struct + "', " +
     "x :"    + this.atoms[i].x + ", " + 
     "y :"    + this.atoms[i].y + ", " + 
     "z :"    + this.atoms[i].z + ", " + 
     "symbol:'" + this.atoms[i].symbol + "'},\n ";
  }
  out+= 'center: {' + this.cg.x + ',y: '+ this.cg.y + ',z: '+ this.cg.z + '} } ';
  out+=("}\n");
  return out;
}

