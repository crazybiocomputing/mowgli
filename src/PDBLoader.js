

var PDBLoader = function () {

}

PDBLoader.prototype.getFromDOM = function(document_id,format) {
  var text = document.getElementById(document_id).innerHTML;  
  var mol = this.createStructure(text,format);
  return mol;
}

PDBLoader.prototype.getFromURL = function(url) {
  var extension = url.substr(url.length-3,url.length-1);
  console.log(extension);
  
  if (window.XMLHttpRequest)
  {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    request=new XMLHttpRequest();
  }
  else
    alert('Please update your browser');
  try {
    request.open("GET",url,false);
    request.send();
  } catch (e) {
    alert(e.description);
  }
  
  var mol = this.createStructure(request.responseText,extension);
  return mol;
}

PDBLoader.prototype.getFromID = function(pdb_id) {
  return this.getFromURL("http://www.rcsb.org/pdb/files/"+pdb_id+".pdb");

}

PDBLoader.prototype.createStructure = function(text,format) {

  // 1- Choose the good parser
  var parser = null;

  if (format === 'pdb') {
    parser = new PDBParser();
  }
  else if (format === 'cif') {
    parser = new MMCIFParser();
  }
  else if (format === 'xml') {
    parser = new PDBMLParser();
  }
  else {
  // Unknown format
  }
  
  // 2- Parse the file
  parser.parse(text); 
  var mol = parser.getStructure(); 

  // 3- Compute Bonds
  this.computeBonds(mol); 

  return mol;
}

PDBLoader.prototype.computeBonds = function(a_mol) {
  // TODO
}

