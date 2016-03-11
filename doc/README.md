This folder **src** contains all the codes required for mowgli-core.
- graphics
  - shaders
  - shapes
- mol
- parser
- styles
- ui

## 1. Introduction

Various objects required to build the scene graph.

### 1.1. Example of a simple scene graph


* Renderer
  * Camera
  * Light
  * ShapeGroup
    * Shape #1
      *  Geometry (vertex data)
      *  Shader
    * Shape #2
    * ...
    * Shape #n

### 1.2. Corresponding code


```javascript
  // 0- Create a renderer for this canvas
  var renderer = new Renderer('canvas');

  // 1- Create a scene with a default light and camera
  var scene = new Scene();
  console.log(scene);
  renderer.addScene(scene);

  // 2- Create a shape with geometry and colors
    var shape = new Cube();
    shape.setStyle('wireframe');
    console.log(shape);

  // 2ter- Define shader program by hand 
  var shaderProgram = new Program(renderer.getContext(),'wireframe-cpk');
  shaderProgram.loadDOM("vertex"  ,"wireframe-vs");
  shaderProgram.loadDOM("fragment","wireframe-fs");
  shaderProgram.link();
  // Get uniformLocation
  shaderProgram.setUniformLocation("uPMatrix");
  shaderProgram.setUniformLocation("uVMatrix");
  shaderProgram.setUniformLocation("uMMatrix");

  shape.setProgram(shaderProgram);

  scene.add(shape);
  
  // Move camera to see the structure in its entirety
  mat4.translate(scene.getCamera().viewMatrix,scene.getCamera().viewMatrix,[0.0,0.0,-5.0]);

  // 3- Add a sensor
  var mouse = new MouseSensor('canvas');
  mouse.attach(shape);

  renderer.addSensor(mouse);

  // 4- Init renderer
  renderer.init();
  
  // 5- Draw Scene
  renderer.drawScene();
}

```




## 2. graphics

This directory contains all the nodes of the scene graph. 

Each node is split in two parts: 
1. the pure javascript is located in this directory. 
2. All the WebGL code is located in **gl** directory.



### 2.1. shaders

The folder containing the various WebGL shaders

### 2.2. shapes

The folder containing the basic graphics objects used as tests.

## 4. parser

### 4.1. vector

### 4.2. raster




## 3. mol

Source of all the objects related to a structure (aka molecule).




## 5. styles

This folder contains all the drawing styles of mowgli
<ul>
<li>Vectorial approaches (points, lines, triangles)</li>
  <ul>
    <li>Wireframe (lines)</li>
    <li>Dots (points)</li>
    <li>Strands (lines)</li>
    <li>Ribbon (triangles)</li>
    <li>Cartoon (triangles)</li>
</ul>
<li>Impostor approaches (spheres, cylinders)</li>
  <ul>
    <li>SpaceFill (spheres)</li>
    <li>Sticks (cylinders)</li>
    <li>Backbone (cylinders)</li>
    <li>Trace (cylinders)</li>
    <li>Ball & Sticks (spheres + cylinders)</li>
    <li>Wireframe</li>
</ul>

</ul>
