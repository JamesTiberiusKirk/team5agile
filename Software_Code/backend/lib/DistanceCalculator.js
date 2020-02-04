//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
function calcCrow(lat1, lon1, lat2, lon2) {
  // console.log(lat1, lon1, lat2, lon2)
  lat1 = parseFloat(lat1);
  lon1 = parseFloat(lon1);
  lat2 = parseFloat(lat2);
  lon2 = parseFloat(lon2);

  // if (isNaN(lon1) || isNaN(lon1) || isNaN(lat2) || isNaN(lon2)) {
    // return console.log("NAN");
  // }
  var R = 6371; // km
  var dLat = toRad(lat2 - lat1);
  var dLon = toRad(lon2 - lon1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);

  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return toMile(d);
}

// Converts numeric degrees to radians
function toRad(Value) {
  return Value * Math.PI / 180;
}

function toMile(Value) {
  return Value * 0.621371192;
}

module.exports = calcCrow;

// console.log(calcCrow("34.196159","-86.196898","34.557662","-85.79649"))

//Sourced from:
//https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates