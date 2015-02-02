/******************

************/

var Structure = function () {

  // General Information
  this.ID             = '0UNK';
  this.classification = 'Unknown';
  this.title          = 'No Title';
  this.date           = '00-UNK-00';

  // Atoms
  this.atoms=[];

  //Bonds
  this.bonds=[];

  // Colors
  this.colors = [];

  // Center of Gravity
  this.cg={'x': 0.0,'y': 0.0,'z': 0.0};

  // Matrix for rotation(s) and translation(s)
  this.matrix=mat4.create();
  mat4.identity(this.matrix);

  // Bounding Box
  this.bbox={
    'min': {'x': Number.MAX_VALUE,'y': Number.MAX_VALUE,'z': Number.MAX_VALUE},
    'max': {'x': Number.MIN_VALUE,'y': Number.MIN_VALUE,'z': Number.MIN_VALUE},
    'center':  {'x': 0.0,'y': 0.0,'z': 0.0},
    'radius': 0.0
  };

}

Structure.prototype.toString = function () {
  var quote='';
  var out='{\n';

  for (var i in this.atoms)
  {
    out+="{";
    out+="type: '"  + this.atoms[i].type + "', " +
     "serial: " + this.atoms[i].serial + ", " +
     "name: '"  + this.atoms[i].name + "', " +
     "struct:'" + this.atoms[i].struct + "', " +
     "x :"    + this.atoms[i].x + ", " + 
     "y :"    + this.atoms[i].y + ", " + 
     "z :"    + this.atoms[i].z + ", " + 
     "symbol:'" + this.atoms[i].symbol + "'},\n ";
  }
  out+= 'center: {' + this.cg.x + ',y: '+ this.cg.y + ',z: '+ this.cg.z + '} } ';
  out+=("}\n");
  return out;
}

