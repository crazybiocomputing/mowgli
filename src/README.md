This folder **src** contains all the codes required for mowgli-core.

- graphics
  - colorers
  - geometers
  - scenegraph
    - gl
 -  shaders
 -  shapes
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
