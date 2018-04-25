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
 * @module mol
 **/


/**
 * Factory of various readers of atomic models: pdb, cif, xyz
 *
 * @class StructureReader
 * @constructor
 */
var RasterReader = function () {

}

RasterReader.prototype.getFromDOM = function(document_id,format) {
    var img = document.getElementById(document_id);
    var canvas = document.createElement('mwCanvas2D');
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);

    var pix = canvas.getContext('2d').getImageData(x, y, img.width, img.height).data;
    return this._createStructure(pix,format);
}

RasterReader.prototype.getFromURL = function(url,callback) {
    var extension = url.split('.').pop().toLowerCase();
    console.log(extension);

    if (extension === "png" || extension === "jpg" || extension === "jpeg" || extension === "gif") {
        loadThruImageObj(url, callback);
    }
    else {
         if (window.XMLHttpRequest) {
           // code for IE7+, Firefox, Chrome, Opera, Safari
           var req = new XMLHttpRequest();
           // We need an asynchronous request (3rd argument true) - Wait until completion
           req.open('GET', url, true);
           var cFunc = this.createStructure;
           req.onreadystatechange = function (aEvt) {
               if (req.readyState == 4) {
                   if(req.status == 200) {
                       var mol = cFunc(req.responseText,extension);
                       callback(mol);
                   }
                   else {
                       alert("ERROR:: Can't load image/volume file." + aEvt.description+"\n");
                   }
               }
           };
           req.send(null);
         }
         else {
           alert('Please update your browser');
         }
    }


    function loadThruImageObj(url,callback) {
        var canvas = document.createElement('mwCanvas2D');
        var ctx = canvas.getContext('2d');

        var img = new Image();
        img.src = url;
        img.onload = function() {
            // Load image and decompress data
            ctx.drawImage(img, 0, 0, img.width,img.height);
            this.style.display = 'none';
            canvas.width  = this.naturalWidth;
            canvas.height = this.naturalHeight;
            // Get pixels aka ImageData object
            var pix = ctx.getImageData(0, 0, this.width, this.height).data;
            callback(pix);
        }
    }
}

RasterReader.prototype.getFromID = function(pdb_id,callback) {
    // TODO
    // return this.getFromURL("http://www.rcsb.org/pdb/files/"+pdb_id+".pdb",callback);
    return null;
}

RasterReader.prototype._createStructure = function(pix,format) {

  // 1- Choose the good parser
  var parser = null;

  if (format === 'png') {
    parser = new PDBParser();
  }
  else if (format === 'jpg') {
    parser = new MMCIFParser();
  }
  else if (format === 'xml') {
    parser = new PDBMLParser();
  }
  else if (format === 'xyz') {
    parser = new XYZParser();
  }
  else {
  // Unknown format
  }

    // 2- Parse the file
    parser.parse(text);
    var mol = parser.getStructure();

    // 3- Compute Bonds
    computeBonds(mol);

    return mol;

    // Private
    function computeBonds (a_mol) {
        // TODO
    }
}
