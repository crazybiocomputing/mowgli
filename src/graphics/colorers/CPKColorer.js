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
 * CPK Colorer generates given RGB color depending an atom
 *
 * @class CPKColorer
 * @memberof module:graphics
 * @constructor
 * @author Jean-Christophe Taveau
 **/
function CPKColorer() {
    this.name = 'CPK';
}

CPKColorer.prototype.get = function(atom) {
    var rgb = CPKColorer.colors[atom.symbol].rgb;

    return rgb;
};


CPKColorer.colors = {
    'H':{
        'symbol':'H',
        'rgb':[1,1,1],
        'rgbRasmol':[1,1,1]
    },
    'HE':{
        'symbol':'He',
        'rgb':[0.8509803921568627,1,1],
        'rgbRasmol':[1,0.7529411764705882,0.796078431372549]
    },
    'LI':{
        'symbol':'Li',
        'rgb':[0.8,0.5019607843137255,1],
        'rgbRasmol':[0.6980392156862745,0.13333333333333333,0.13333333333333333]
    },
    'BE':{
        'symbol':'Be',
        'rgb':[0.7607843137254902,1,0],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'B':{
        'symbol':'B',
        'rgb':[1,0.7098039215686275,0.7098039215686275],
        'rgbRasmol':[0,1,0]
    },
    'C':{
        'symbol':'C',
        'rgb':[0.5647058823529412,0.5647058823529412,0.5647058823529412],
        'rgbRasmol':[0.7843137254901961,0.7843137254901961,0.7843137254901961]
    },
    'N':{
        'symbol':'N',
        'rgb':[0.18823529411764706,0.3137254901960784,0.9725490196078431],
        'rgbRasmol':[0.5607843137254902,0.5607843137254902,1]
    },
    'O':{
        'symbol':'O',
        'rgb':[1,0.050980392156862744,0.050980392156862744],
        'rgbRasmol':[0.9411764705882353,0,0]
    },
    'F':{
        'symbol':'F',
        'rgb':[0.5647058823529412,0.8784313725490196,0.3137254901960784],
        'rgbRasmol':[0.8549019607843137,0.6470588235294118,0.12549019607843137]
    },
    'NE':{
        'symbol':'Ne',
        'rgb':[0.7019607843137254,0.8901960784313725,0.9607843137254902],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'NA':{
        'symbol':'Na',
        'rgb':[0.6705882352941176,0.3607843137254902,0.9490196078431372],
        'rgbRasmol':[0,0,1]
    },
    'MG':{
        'symbol':'Mg',
        'rgb':[0.5411764705882353,1,0],
        'rgbRasmol':[0.13333333333333333,0.5450980392156862,0.13333333333333333]
    },
    'AL':{
        'symbol':'Al',
        'rgb':[0.7490196078431373,0.6509803921568628,0.6509803921568628],
        'rgbRasmol':[0.5019607843137255,0.5019607843137255,0.5647058823529412]
    },
    'SI':{
        'symbol':'Si',
        'rgb':[0.9411764705882353,0.7843137254901961,0.6274509803921569],
        'rgbRasmol':[0.8549019607843137,0.6470588235294118,0.12549019607843137]
    },
    'P':{
        'symbol':'P',
        'rgb':[1,0.5019607843137255,0],
        'rgbRasmol':[1,0.6470588235294118,0]
    },
    'S':{
        'symbol':'S',
        'rgb':[1,1,0.18823529411764706],
        'rgbRasmol':[1,0.7843137254901961,0.19607843137254902]
    },
    'CL':{
        'symbol':'Cl',
        'rgb':[0.12156862745098039,0.9411764705882353,0.12156862745098039],
        'rgbRasmol':[0,1,0]
    },
    'AR':{
        'symbol':'Ar',
        'rgb':[0.5019607843137255,0.8196078431372549,0.8901960784313725],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'K':{
        'symbol':'K',
        'rgb':[0.5607843137254902,0.25098039215686274,0.8313725490196079],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'CA':{
        'symbol':'Ca',
        'rgb':[0.23921568627450981,1,0],
        'rgbRasmol':[0.5019607843137255,0.5019607843137255,0.5647058823529412]
    },
    'SC':{
        'symbol':'Sc',
        'rgb':[0.9019607843137255,0.9019607843137255,0.9019607843137255],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'TI':{
        'symbol':'Ti',
        'rgb':[0.7490196078431373,0.7607843137254902,0.7803921568627451],
        'rgbRasmol':[0.5019607843137255,0.5019607843137255,0.5647058823529412]
    },
    'V':{
        'symbol':'V',
        'rgb':[0.6509803921568628,0.6509803921568628,0.6705882352941176],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'CR':{
        'symbol':'Cr',
        'rgb':[0.5411764705882353,0.6,0.7803921568627451],
        'rgbRasmol':[0.5019607843137255,0.5019607843137255,0.5647058823529412]
    },
    'MN':{
        'symbol':'Mn',
        'rgb':[0.611764705882353,0.47843137254901963,0.7803921568627451],
        'rgbRasmol':[0.5019607843137255,0.5019607843137255,0.5647058823529412]
    },
    'FE':{
        'symbol':'Fe',
        'rgb':[0.8784313725490196,0.4,0.2],
        'rgbRasmol':[1,0.6470588235294118,0]
    },
    'CO':{
        'symbol':'Co',
        'rgb':[0.9411764705882353,0.5647058823529412,0.6274509803921569],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'NI':{
        'symbol':'Ni',
        'rgb':[0.3137254901960784,0.8156862745098039,0.3137254901960784],
        'rgbRasmol':[0.6470588235294118,0.16470588235294117,0.16470588235294117]
    },
    'CU':{
        'symbol':'Cu',
        'rgb':[0.7843137254901961,0.5019607843137255,0.2],
        'rgbRasmol':[0.6470588235294118,0.16470588235294117,0.16470588235294117]
    },
    'ZN':{
        'symbol':'Zn',
        'rgb':[0.49019607843137253,0.5019607843137255,0.6901960784313725],
        'rgbRasmol':[0.6470588235294118,0.16470588235294117,0.16470588235294117]
    },
    'GA':{
        'symbol':'Ga',
        'rgb':[0.7607843137254902,0.5607843137254902,0.5607843137254902],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'GE':{
        'symbol':'Ge',
        'rgb':[0.4,0.5607843137254902,0.5607843137254902],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'AS':{
        'symbol':'As',
        'rgb':[0.7411764705882353,0.5019607843137255,0.8901960784313725],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'SE':{
        'symbol':'Se',
        'rgb':[1,0.6313725490196078,0],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'BR':{
        'symbol':'Br',
        'rgb':[0.6509803921568628,0.1607843137254902,0.1607843137254902],
        'rgbRasmol':[0.6470588235294118,0.16470588235294117,0.16470588235294117]
    },
    'KR':{
        'symbol':'Kr',
        'rgb':[0.3607843137254902,0.7215686274509804,0.8196078431372549],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'RB':{
        'symbol':'Rb',
        'rgb':[0.4392156862745098,0.1803921568627451,0.6901960784313725],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'SR':{
        'symbol':'Sr',
        'rgb':[0,1,0],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'Y':{
        'symbol':'Y',
        'rgb':[0.5803921568627451,1,1],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'ZR':{
        'symbol':'Zr',
        'rgb':[0.5803921568627451,0.8784313725490196,0.8784313725490196],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'NB':{
        'symbol':'Nb',
        'rgb':[0.45098039215686275,0.7607843137254902,0.788235294117647],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'MO':{
        'symbol':'Mo',
        'rgb':[0.32941176470588235,0.7098039215686275,0.7098039215686275],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'TC':{
        'symbol':'Tc',
        'rgb':[0.23137254901960785,0.6196078431372549,0.6196078431372549],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'RU':{
        'symbol':'Ru',
        'rgb':[0.1411764705882353,0.5607843137254902,0.5607843137254902],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'RH':{
        'symbol':'Rh',
        'rgb':[0.0392156862745098,0.49019607843137253,0.5490196078431373],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'PD':{
        'symbol':'Pd',
        'rgb':[0,0.4117647058823529,0.5215686274509804],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'AG':{
        'symbol':'Ag',
        'rgb':[0.7529411764705882,0.7529411764705882,0.7529411764705882],
        'rgbRasmol':[0.5019607843137255,0.5019607843137255,0.5647058823529412]
    },
    'CD':{
        'symbol':'Cd',
        'rgb':[1,0.8509803921568627,0.5607843137254902],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'IN':{
        'symbol':'In',
        'rgb':[0.6509803921568628,0.4588235294117647,0.45098039215686275],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'SN':{
        'symbol':'Sn',
        'rgb':[0.4,0.5019607843137255,0.5019607843137255],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'SB':{
        'symbol':'Sb',
        'rgb':[0.6196078431372549,0.38823529411764707,0.7098039215686275],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'TE':{
        'symbol':'Te',
        'rgb':[0.8313725490196079,0.47843137254901963,0],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'I':{
        'symbol':'I',
        'rgb':[0.5803921568627451,0,0.5803921568627451],
        'rgbRasmol':[0.6274509803921569,0.12549019607843137,0.9411764705882353]
    },
    'XE':{
        'symbol':'Xe',
        'rgb':[0.25882352941176473,0.6196078431372549,0.6901960784313725],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'CS':{
        'symbol':'Cs',
        'rgb':[0.3411764705882353,0.09019607843137255,0.5607843137254902],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'BA':{
        'symbol':'Ba',
        'rgb':[0,0.788235294117647,0],
        'rgbRasmol':[1,0.6470588235294118,0]
    },
    'LA':{
        'symbol':'La',
        'rgb':[0.4392156862745098,0.8313725490196079,1],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'CE':{
        'symbol':'Ce',
        'rgb':[1,1,0.7803921568627451],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'PR':{
        'symbol':'Pr',
        'rgb':[0.8509803921568627,1,0.7803921568627451],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'ND':{
        'symbol':'Nd',
        'rgb':[0.7803921568627451,1,0.7803921568627451],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'PM':{
        'symbol':'Pm',
        'rgb':[0.6392156862745098,1,0.7803921568627451],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'SM':{
        'symbol':'Sm',
        'rgb':[0.5607843137254902,1,0.7803921568627451],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'EU':{
        'symbol':'Eu',
        'rgb':[0.3803921568627451,1,0.7803921568627451],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'GD':{
        'symbol':'Gd',
        'rgb':[0.27058823529411763,1,0.7803921568627451],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'TB':{
        'symbol':'Tb',
        'rgb':[0.18823529411764706,1,0.7803921568627451],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'DY':{
        'symbol':'Dy',
        'rgb':[0.12156862745098039,1,0.7803921568627451],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'HO':{
        'symbol':'Ho',
        'rgb':[0,1,0.611764705882353],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'ER':{
        'symbol':'Er',
        'rgb':[0,0.9019607843137255,0.4588235294117647],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'TM':{
        'symbol':'Tm',
        'rgb':[0,0.8313725490196079,0.3215686274509804],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'YB':{
        'symbol':'Yb',
        'rgb':[0,0.7490196078431373,0.2196078431372549],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'LU':{
        'symbol':'Lu',
        'rgb':[0,0.6705882352941176,0.1411764705882353],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'HF':{
        'symbol':'Hf',
        'rgb':[0.30196078431372547,0.7607843137254902,1],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'TA':{
        'symbol':'Ta',
        'rgb':[0.30196078431372547,0.6509803921568628,1],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'W':{
        'symbol':'W',
        'rgb':[0.12941176470588237,0.5803921568627451,0.8392156862745098],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'RE':{
        'symbol':'Re',
        'rgb':[0.14901960784313725,0.49019607843137253,0.6705882352941176],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'OS':{
        'symbol':'Os',
        'rgb':[0.14901960784313725,0.4,0.5882352941176471],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'IR':{
        'symbol':'Ir',
        'rgb':[0.09019607843137255,0.32941176470588235,0.5294117647058824],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'PT':{
        'symbol':'Pt',
        'rgb':[0.8156862745098039,0.8156862745098039,0.8784313725490196],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'AU':{
        'symbol':'Au',
        'rgb':[1,0.8196078431372549,0.13725490196078433],
        'rgbRasmol':[0.8549019607843137,0.6470588235294118,0.12549019607843137]
    },
    'HG':{
        'symbol':'Hg',
        'rgb':[0.7215686274509804,0.7215686274509804,0.8156862745098039],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'TL':{
        'symbol':'Tl',
        'rgb':[0.6509803921568628,0.32941176470588235,0.30196078431372547],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'PB':{
        'symbol':'Pb',
        'rgb':[0.3411764705882353,0.34901960784313724,0.3803921568627451],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'BI':{
        'symbol':'Bi',
        'rgb':[0.6196078431372549,0.30980392156862746,0.7098039215686275],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'PO':{
        'symbol':'Po',
        'rgb':[0.6705882352941176,0.3607843137254902,0],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'AT':{
        'symbol':'At',
        'rgb':[0.4588235294117647,0.30980392156862746,0.27058823529411763],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'RN':{
        'symbol':'Rn',
        'rgb':[0.25882352941176473,0.5098039215686274,0.5882352941176471],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'FR':{
        'symbol':'Fr',
        'rgb':[0.25882352941176473,0,0.4],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'RA':{
        'symbol':'Ra',
        'rgb':[0,0.49019607843137253,0],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'AC':{
        'symbol':'Ac',
        'rgb':[0.4392156862745098,0.6705882352941176,0.9803921568627451],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'TH':{
        'symbol':'Th',
        'rgb':[0,0.7294117647058823,1],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'PA':{
        'symbol':'Pa',
        'rgb':[0,0.6313725490196078,1],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'U':{
        'symbol':'U',
        'rgb':[0,0.5607843137254902,1],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'NP':{
        'symbol':'Np',
        'rgb':[0,0.5019607843137255,1],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'PU':{
        'symbol':'Pu',
        'rgb':[0,0.4196078431372549,1],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'AM':{
        'symbol':'Am',
        'rgb':[0.32941176470588235,0.3607843137254902,0.9490196078431372],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'CM':{
        'symbol':'Cm',
        'rgb':[0.47058823529411764,0.3607843137254902,0.8901960784313725],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'BK':{
        'symbol':'Bk',
        'rgb':[0.5411764705882353,0.30980392156862746,0.8901960784313725],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'CF':{
        'symbol':'Cf',
        'rgb':[0.6313725490196078,0.21176470588235294,0.8313725490196079],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'ES':{
        'symbol':'Es',
        'rgb':[0.7019607843137254,0.12156862745098039,0.8313725490196079],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'FM':{
        'symbol':'Fm',
        'rgb':[0.7019607843137254,0.12156862745098039,0.7294117647058823],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'MD':{
        'symbol':'Md',
        'rgb':[0.7019607843137254,0.050980392156862744,0.6509803921568628],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'NO':{
        'symbol':'No',
        'rgb':[0.7411764705882353,0.050980392156862744,0.5294117647058824],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'LR':{
        'symbol':'Lr',
        'rgb':[0.7803921568627451,0,0.4],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'RF':{
        'symbol':'Rf',
        'rgb':[0.8,0,0.34901960784313724],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'DB':{
        'symbol':'Db',
        'rgb':[0.8196078431372549,0,0.30980392156862746],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'SG':{
        'symbol':'Sg',
        'rgb':[0.8509803921568627,0,0.27058823529411763],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'BH':{
        'symbol':'Bh',
        'rgb':[0.8784313725490196,0,0.2196078431372549],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'HS':{
        'symbol':'Hs',
        'rgb':[0.9019607843137255,0,0.1803921568627451],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    },
    'MT':{'symbol':'Mt',
        'rgb':[0.9215686274509803,0,0.14901960784313725],
        'rgbRasmol':[1,0.0784313725490196,0.5764705882352941]
    }
};
