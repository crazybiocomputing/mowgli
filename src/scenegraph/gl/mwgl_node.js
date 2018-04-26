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


/**
 * @module mwGL
 */


/**
 * OpenGL node of the scene graph
 *
 * @class Node
 * @memberof module:mwGL
 *
 **/
export class Node {
  /**
   * @constructor
   * @param {Node} node - Object belonging to the scene graph
   * @extends module:mwGL.Node
   * @author Jean-Christophe Taveau
   */
  constructor(node) {
    this.sgnode = node;
    this.glType = -1;
    this._isDirty = true;

    // Matrix for rotation(s) and translation(s)
    this.workmatrix= mat4.create();
    mat4.identity(this.workmatrix);
  };

  isDirty() {
    return this._isDirty;
  };

  init(context) {
    // Do nothing
    this.isDirty = false;
  };

  pre_render(context) {
    // Do nothing
  };

  render(context) {
    // Do nothing
  };

  post_render(context) {
    // Do nothing
  };

};
