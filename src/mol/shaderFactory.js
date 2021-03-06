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

var ShaderFactory = (function () {

    // Storage for our various styles types
    var programs = {};
    var shaderProgram = new Program();

    var wireframe = {
        src : {
            // Literal strings in ES6
            vs : `
                attribute vec3 aVertexPosition;
                attribute vec3 aVertexColor;
                uniform mat4 uMMatrix;
                uniform mat4 uVMatrix;
                uniform mat4 uPMatrix;
                varying vec3 vColor;

                void main(void) {
                    gl_Position = uPMatrix * uVMatrix * uMMatrix * vec4(aVertexPosition, 1.0);
                    vColor = aVertexColor;
                }
            `,
            fs : `
                precision mediump float;
                varying vec3 vColor;

                void main(void) {
                    gl_FragColor = vec4( vColor,1.0);
                }`
        },
        attributes : [],
        uniforms : []
    };

    var srcVrtxShader = {
        'template' : [
            'attribute vec3 aVertexPosition;',
            'attribute vec3 aVertexColor;',
            'uniform mat4 uMMatrix;',
            'uniform mat4 uVMatrix;',
            'uniform mat4 uPMatrix;',
            'varying vec3 vColor;',
            'void main(void) {',
            // '#{points}',
            'gl_Position = uPMatrix * uVMatrix * uMMatrix * vec4(aVertexPosition, 1.0);',
            'vColor = aVertexColor;',
            '}'
        ],
        'points' :[
            'gl_PointSize = 8.0;'
        ]
    };

    var srcFragShader = {
        'template' : [
            'precision mediump float;',
            'varying vec3 vColor;',
            // '#{func}',
            'void main(void) {',
            // '#{func_call}',
            'gl_FragColor = vec4( vColor,1.0);',
            '}'
        ],
        'disks_func' : [
            'void drawDisk(xy) {',
            'vec2 v = xy - vec2(0.5,0.5);',
            'float d = dot(v,v);',
            'if (d > 0.25) discard;',
            '}'
        ],
        'disks_call' : [
            'drawDisk(gl_PointCoord.xy);'
        ]
    };

    return {
        /**
         * Get shape
         *
         * @example
         * var shape = ShaderFactory.get({displayType:'wireframe', 'glContext': glContext});
         */
        get: function ( options ) {
            var isUndefined = false;
            var srcVrtx = '';
            var srcFrag = '';
            var namePrgm= '';
            switch (options.displayType) {
            case 'points':
                // Already compiled?
                namePrgm = 'disks';
                if (programs[namePrgm] === undefined) {
                    isUndefined = true;
                    srcVrtx = srcVrtxShader['template'].join('');
                    srcFrag = srcFragShader['template'].join('');
                }
                break;
            case 'wireframe':
                // Already compiled?
                namePrgm = 'wireframe';
                if (programs[namePrgm] === undefined) {
                    isUndefined = true;
                    var replacers = [
                        {
                            src : '#{func}',
                            dest: 'disks_func'
                        },
                        {
                            src : '#{func_call}',
                            dest: 'disks_call'
                        }
                    ];
                    srcVrtx = srcVrtxShader['template'].join('');
                    srcFrag = srcFragShader['template'].join('');
                    for (var i=0; i < replacers.length; i++) {
                        var re = new RegExp(replacers[i].src,'g');
                        srcVrtx = srcVrtx.replace(re,srcVrtxShader[replacers[i].dest].join(''));
                        srcFrag = srcFrag.replace(re,srcVrtxShader[replacers[i].dest].join(''));
                    }

                }
                break;
            default:
                // Do nothing ??
                return null;
            }
            if (isUndefined) {
                console.log('Compile+link ' + namePrgm);
                console.log('vs\n'+srcVrtx);
                console.log('fs\n'+srcFrag);
                var shaderProgram = new Program(options.glContext,namePrgm);
                shaderProgram.load('x-shader/x-vertex'  , srcVrtx);  // Load + compile
                shaderProgram.load('x-shader/x-fragment', srcFrag);  // Load + compile
                shaderProgram.link();
                // Get uniformLocation
                shaderProgram.setUniformLocation('uPMatrix');  // Projection Matrix of camera
                shaderProgram.setUniformLocation('uVMatrix');  // View Matrix of camera
                shaderProgram.setUniformLocation('uMMatrix');  // Model Matrix of shape
                programs[namePrgm] = shaderProgram;
            }
            return programs[namePrgm];
        }
    };
})();
