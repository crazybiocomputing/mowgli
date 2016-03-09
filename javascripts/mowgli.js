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
 * @namespace MOWGLI
 
var MOWGLI = (function() {
    var _mol;
    var _renderer;
    
    return {
        get molecule() {
            return _mol;
        },
        set molecule(a_mol) {
            _mol = a_mol;
        }
    };

})();
**/


(function(exports) {
    var _mol;
    var _renderer;
    
    /**
     * Active structure used by mowgli
     **/
    exports.molecule=undefined;


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
 * Constructor
 * @class AboutGUI
 * @memberof module:gui
 * @constructor
 *
 * @author Jean-Christophe Taveau
 **/
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
                headerTitle : "<p>About Mowgli... </p>",
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


window.onload = function() {

    var mol;
    
    // 1- File
    // 1-3 Samples
    var sample_1ZNI = new SampleGUI("1zni");
    var sample_3CRO = new SampleGUI("3cro");

    // 7- Help
    // About modal window
    console.log('Add event click on About...');
    var about = new AboutGUI("about");
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
 * Constructor
 * @class Modal
 * @memberof module:gui
 * @constructor
 *
 * @author Jean-Christophe Taveau
 **/
 function Modal(options) {
    var element = document.getElementById('modal');
    var html =  '<div class="container"><header id="modalhead">';
    html += '<a href="#close" title="Close modal window" class="droite">&#10060;</a>';
    html += options.headerTitle || 'Modal window';
    html += '</header>';
    html += '<article>';
    html += options.body || 'No information';
    html += '</section>';
    html += '<footer class="cf">';
    html += '<a href="#close" class="btn droite" title="Close modal window">Close</a>';
    html += '</footer></div>';

    element.innerHTML = html;
    
    var header = element.children[0].children[0];  // aka document.getElementById("modalhead");
    console.log(header);
    header.style.backgroundImage = options.headerImage || 'url("images/default-background.jpg")';

    // Display modal
    element.classList.toggle("oModal_target");

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
 * @class SampleGUI
 * @memberof module:gui
 * @constructor
 *
 * @author Jean-Christophe Taveau
 **/
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
        console.log(the_id); // 'Something Good', as this is the Something object
        switch(event.type) {
        case 'click':
            // Load JSON file
            console.log('Load JSON...');
            var xhr = new XMLHttpRequest();
            // We need a asynchronous request (3rd argument true) - Wait until completion
            var url = "samples/1ZNI.json";
            switch (the_id) {
            case '1zni': 
                url = "samples/1ZNI.json";
                break;
            case '1hho': 
                url = "samples/1HHO.json";
                break;
            case '3cro': 
                url = "samples/3CRO.json";
                break;
            }
            xhr.open('GET', url, true);
            xhr.responseType = 'json';
            xhr.onreadystatechange = function (aEvt) {
                if (xhr.readyState == 4) {
                    if(xhr.status == 200) {
                        MOWGLI.molecule = xhr.response; // JSON.parse(xhr.responseText);
                        console.log(MOWGLI.molecule);
                    }
                    else {
                        console.log("ERROR:: Can't download PDB file."+aEvt.description+"\n");
                    }
                }
            };
            xhr.send(null);
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
