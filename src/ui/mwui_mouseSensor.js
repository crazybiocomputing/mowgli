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
 * MouseSensor
 * @class MouseSensor
 * 
 * @memberof module:mwUI
 */
export class MouseSensor {
  /**
   * @constructor
   */
  constructor(canvas) {
  
    this.shapes = [];
    this.renderer;
    
    
    let mousePosition=[0.0,0.0];
    let currentAngle=[0.0,0.0];

    let lastX = -1;
    let lastY = -1;
    let dragging = false;

    let zoom = 0;
    let zoomDelta=0.01;


    
    let that = this;

    canvas.onmousedown = (ev) => {
      //Mouse is pressed
      let x = ev.clientX;
      let y = ev.clientY;

      let rect = ev.target.getBoundingClientRect();
      if(rect.left <= x && x <= rect.right && rect.top <= y && y <= rect.bottom) {
        lastX = x;
        lastY = y;
        mousePosition[0] = x;
        mousePosition[1] = canvas.height - y;
        dragging = true;
      }
    };

    canvas.onmouseup = (ev) => {
      //Mouse is released
      dragging = false;
    };

    canvas.onmousemove = (ev) => {
      //Mouse is moved
      var x = ev.clientX;
      var y = ev.clientY;
      if (dragging) {
        //put some kind of dragging logic in here
        //Here is a rotation example
        var factor = 0.05;
        var dx = factor * (x - lastX);
        var dy = factor * (y - lastY);
        //Limit x-axis rotation angle to -90 to 90 degrees
        currentAngle[0] = Math.max(Math.min(currentAngle[0] + dy, 90), -90);
        currentAngle[1] = currentAngle[1] + dx;

        mousePosition[0] = x;
        mousePosition[1] = canvas.height - y;

        // Update shape(s) matrix
        // HACK console.log(currentAngle[0]+ ' '+ currentAngle[1])
        var tmp = mat4.create();
        mat4.identity(tmp);
        mat4.rotate(tmp,tmp,dx,[0,1,0]);
        mat4.rotate(tmp,tmp,dy,[1,0,0]);

        // Apply rotation to each registered shape
        for (var i in that.shapes) {
          mat4.multiply(that.shapes[i].matrix,tmp,that.shapes[i].matrix);
        }
        // Update Display
        that.renderer.drawScene();
      }
      lastX = x;
      lastY = y;
    };
  }
  
  /**
   * Attach shape
   */
  attach(a_shape) {
    this.shapes.push(a_shape);
  }

  setRenderer(r) {
    this.renderer = r;
  }
  
} // End of class MouseSensor


