Here is the repository of the various objects composing the scene graph.

Simple scene graph
--------------------

* Renderer
* +-- Camera
* +-- Light
* +-- ShapeGroup
*    +-- Shape #1
*       +-- Geometry (vertex data)
*       +-- Shader
*    +-- Shape #2
*    ...
*    +-- Shape #n

Code
--------------------

```javascript
var renderer = new Renderer();
var scene = new Scene();
renderer.add(scene);

```
