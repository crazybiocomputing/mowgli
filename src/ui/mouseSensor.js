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

/*
 * Singleton ??
 */
function MouseSensor(canvas_id) {
  var mousePosition=[0.0,0.0];
  var currentAngle=[0.0,0.0];
  
  var lastX = -1;
  var lastY = -1;
  var dragging = false;

  var zoom = 0;
  var zoomDelta=0.01;

  var canvas = document.getElementById(canvas_id);

  var shapes = [];
  var renderer = null;

/***
  canvas.onmousewheel = function(event) {
    console.log(event.wheelDelta);
    zoom+=(zoomDelta*event.wheelDelta/Math.abs(event.wheelDelta) );
    // Display
    renderer.drawScene();
    event.preventDefault();
  }
***/
 
  canvas.onmousedown = function(ev) {  
   //Mouse is pressed
     var x = ev.clientX;
     var y = ev.clientY;
 
     var rect = ev.target.getBoundingClientRect();
     if(rect.left <= x && x <= rect.right && rect.top <= y && y <= rect.bottom) {
       lastX = x;
       lastY = y;
       mousePosition[0] = x;
       mousePosition[1] = canvas.height - y;
       dragging = true;
 
     }
   };
 
  canvas.onmouseup = function(ev){ 
  //Mouse is released
     dragging = false;
   }
 
  canvas.onmousemove = function(ev) { 
  //Mouse is moved
     var x = ev.clientX;
     var y = ev.clientY;
     if(dragging) {
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
      console.log(currentAngle[0]+ ' '+ currentAngle[1])
      var tmp = mat4.create();
      mat4.identity(tmp);
      mat4.rotate(tmp,tmp,dx,[0,1,0]);
      mat4.rotate(tmp,tmp,dy,[1,0,0]);

      // Apply rotation to each registered shape
      for (var i in shapes) {
        mat4.multiply(shapes[i].matrix,tmp,shapes[i].matrix);
      }

      // Display
      renderer.drawScene();
     }
     lastX = x;
     lastY = y;
 
   }

  return {
    attach : function (a_shape) {
      shapes.push(a_shape);
    },
    
    setRenderer : function (a_renderer) {
      renderer = a_renderer;
    }
  };
}

