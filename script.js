// initial data to store user latitude and longitude coordinates
var userLatitude;
var userLongitude;
// coordinates of the Metropolitan Museum of Art
var metLatitude = 40.7794;
var metLongitude = -73.9632;

// getCurrentPosition takes 3 parameters: success callback, failure callback, options object
// options object to specify parameters for getCurrentPosition
// get more accurate location, do not cache location data, wait 15 seconds for location before going to failure callback
var options = {
  enableHighAccuracy: true,
  maximumAge: 0,
  timeout: 15000,
};

// hook up event listener for dropdown

$("#activity-tab").on("click", function () {
  console.log("activity-tab");
});
$("#restaurant-tab").on("click", function () {
  console.log("restaurant-tab");
});
$("#range-item-1").on("click", function () {
  console.log("range-item-1");
});
$("#range-item-5").on("click", function () {
  console.log("range-item-5");
});
$("#range-item-10").on("click", function () {
  console.log("range-item-10");
});

/**
 * function findUserLocation()
 * try to get user location from browser
 * if successful, call success function
 * if error occurs, call failure function
 * if geolocation DOM is not available in browser, then set default coordinates to the Met
 */
function findUserLocation() {
  // user must allow location tracking
  if (!navigator.geolocation) {
    // status.textContent = 'Geolocation is not supported by your browser';
    userLatitude = metLongitude;
    userLongitude = metLatitude;
  } else {
    navigator.geolocation.getCurrentPosition(success, failure);
  }
}

/**
 * function success(position)
 * success callback function for getCurrentPosition
 * if user allows location tracking, then get the coordinates of the user's current position
 *
 * Parameter:   position = user position
 */
function success(position) {
  console.log("success");
  userLatitude = position.coords.latitude;
  userLongitude = position.coords.longitude;
  console.log(
    "Latitude:",
    userLatitude,
    "Longitude:",
    userLongitude,
    "Accuracy(meters):",
    position.coords.accuracy
  );
}

/**
 * function failure(position)
 * error callback function for getCurrentPosition
 * if user's position is unable to be obtained, then use default coordinates set to the location of the Met
 *
 * Parameter:   position = user position
 */
function failure() {
  console.log("failed");
  userLatitude = metLongitude;
  userLongitude = metLongitude;
}

/**
 * function distance(lat1, lon1, lat2, lon2)
 * Calculates the distance between two give coordinates in miles
 *
 * Parameters:
 * lat1 = latitude of first coordinate
 * lon1 = longitude of first coordinate
 * lat2 = latitude of second coordinate
 * lon2 = longitude of second coordinate
 *
 * Return:  distance (in miles)
 */

function distance(lat1, lon1, lat2, lon2) {
  if (lat1 == lat2 && lon1 == lon2) {
    return 0;
  } else {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    return dist;
  }
}

// TODO: delete console log
console.log(window);
// when document is ready, find the user's location
document.ready(findUserLocation);
