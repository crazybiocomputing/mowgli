

var PDBLoader = function () {

}

PDBLoader.prototype.getFromURL = function(url) {
  var extension = url.substr(url.length-4,url.length-1);
  
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
  
  var parser = null;
  
  if (extension === 'pdb') {
    parser = new PDBParsert(text);
  }
  else if (extension === 'cif') {
    parser = new MMCIFParser(text);
  }
  else if (extension === 'xml') {
    parser = new PDBMLParser(text);

  }
  else {
  // Unknown format
  }
  
  // Parse the PDB file
    parser.parse(request.responseText);
}

PDBLoader.prototype.getFromID = function(pdb_id) {
  this.getFromURL("http://www.rcsb.org/pdb/files/"+pdb_id+".pdb");

}

