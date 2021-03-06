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

/* scenegraph classes */
import * as mwsg from './scenegraph/index.js';

/* scenegraph/gl classes */
import * as mwgl from './scenegraph/gl/index.js';

/* ui/ classes */
import * as mwui from './ui/index.js';

/* scenegraph/gpu classes */
import * as gpu from './scenegraph/gpu_utils/index.js';

/* map/ classes */
import * as map from './map/index.js';

import {Structure} from './structure.js';

export {
  gpu,
  mwsg,
  mwgl,
  mwui,
  map,
  Structure
};
