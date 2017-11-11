var fs = require('fs');

var contents = fs.readFileSync('./t.json', 'utf8');
var jsonContents = JSON.parse(contents);

var data = jsonContents.objects.precincts.geometries;
for (var i in data) {
  var properties = data[i].properties;
  properties.BASICCAR = properties.number;
  var propParts = properties.number.split('');
  var counter = 0;
  for (var j in propParts) {
    if (/^[a-zA-Z]+$/.test(propParts[j])) {
      break;
    }
    counter++;
  }
  properties.AREA = properties.number.substring(0, counter);
}

jsonContents.objects.precincts.geometries = data;

var output = JSON.stringify(jsonContents);
fs.writeFileSync('./topology2.json', output, 'utf8');
