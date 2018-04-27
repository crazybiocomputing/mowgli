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
 * Sliab used by IsoSurfacer class to store temporary cubes (probes in Marching Cubes algorithm)
 * @class IsoSlab
 *
 * @author Jean-Christophe Taveau
 */
export class IsoSlab {
  /**
   * @constructor
   */
  constructor(cubes_per_row, cubes_per_column) {
    this.cubes = [];
    this.count = 0;
    this.w = cubes_per_row;
    this.h = cubes_per_column;
  }

  reset_count() {
    this.count = 0;
  };

  push(a_cube) {
    this.cubes[this.count++] = a_cube;
  };

  previous() {
    return this.cubes[this.count - 1];
  };

  above() {
    return this.cubes[this.count - this.w];
  };

  back() {
    return this.cubes[this.count];
  };
}

