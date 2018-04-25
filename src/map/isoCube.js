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


// class Cube
function IsoCube(x,y,z,size) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.size = size;
    this.voxels = [];
    this.edges=[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
    this.key=0;
}

IsoCube.prototype.getVertex = function (index) {
    switch (index) {
        case 0:
            return {'x':this.x,           'y':this.y,           'z':this.z, 'voxel':this.voxels[0] }; // v0
        case 1:
            return {'x':this.x+this.size, 'y':this.y,           'z':this.z, 'voxel':this.voxels[1] }; // v1
        case 2:
            return {'x':this.x+this.size, 'y':this.y+this.size, 'z':this.z, 'voxel':this.voxels[2] }; // v2
        case 3:
            return {'x':this.x,           'y':this.y+this.size, 'z':this.z, 'voxel':this.voxels[3] }; // v3
        case 4:
            return {'x':this.x,           'y':this.y,           'z':this.z+this.size, 'voxel':this.voxels[4] }; // v4
        case 5:
            return {'x':this.x+this.size, 'y':this.y,           'z':this.z+this.size, 'voxel':this.voxels[5] }; // v5
        case 6:
            return {'x':this.x+this.size, 'y':this.y+this.size, 'z':this.z+this.size, 'voxel':this.voxels[6] }; // v6
        case 7:
            return {'x':this.x,           'y':this.y+this.size, 'z':this.z+this.size, 'voxel':this.voxels[7] }; // v7
    }
}

IsoCube.prototype.setVoxels = function (stack) {
    this.voxels[0]=stack.getVoxel(x          ,y          ,z          ); // v0
    this.voxels[1]=stack.getVoxel(x+this.size,y          ,z          ); // v1
    this.voxels[2]=stack.getVoxel(x+this.size,y+this.size,z          ); // v2
    this.voxels[3]=stack.getVoxel(x          ,y+this.size,z          ); // v3
    this.voxels[4]=stack.getVoxel(x          ,y          ,z+this.size); // v4
    this.voxels[5]=stack.getVoxel(x+this.size,y          ,z+this.size); // v5
    this.voxels[6]=stack.getVoxel(x+this.size,y+this.size,z+this.size); // v6
    this.voxels[7]=stack.getVoxel(x          ,y+this.size,z+this.size); // v7
    }

IsoCube.prototype.calcKey = function (threshold) {
    var keystr = '';
    keystr +=(this.voxels[7] > threshold)?"1":"0";
    keystr +=(this.voxels[6] > threshold)?"1":"0";
    keystr +=(this.voxels[5] > threshold)?"1":"0";
    keystr +=(this.voxels[4] > threshold)?"1":"0";
    keystr +=(this.voxels[3] > threshold)?"1":"0";
    keystr +=(this.voxels[2] > threshold)?"1":"0";
    keystr +=(this.voxels[1] > threshold)?"1":"0";
    keystr +=(this.voxels[0] > threshold)?"1":"0";

    this.key = parseInt(keystr,2);
}

IsoCube.prototype.toString = function () {
    var str='[';
    for (var i=0;i<12;i++) {
        str+=(this.edges[i]+"; ");
    }
    return ("Cube["+this.key+"]=(" + this.x +" "+this.y+" "+this.z +") "+str+"]");
}
