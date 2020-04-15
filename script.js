// if user does not allow tracking, then show that geolocation is not supported by user browser
// set arbitrary coordinates (the met)
// coordinates of the met:
// longitude 40.7794° N
// latitude 73.9632° W

// initial data to store user latitude and longitude coordinates
var userLatitude;
var userLongitude;
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
 * position: user position
 * success callback function for getCurrentPosition
 * if user allows location tracking, then get the coordinates of the user's current position
 */
function success(position) {
    console.log("success");
    userLatitude = position.coords.latitude;
    userLongitude = position.coords.longitude;
    console.log("Latitude:", userLatitude, "Longitude:", userLongitude, "Accuracy(meters):", position.coords.accuracy);
}

/**
 * function failure(position)
 * position: user position
 * error callback function for getCurrentPosition
 * if user's position is unable to be obtained, then use default coordinates set to the location of the Met
 */
function failure() {
    console.log("failed");
    userLatitude = metLongitude;
    userLongitude = metLongitude;
}

// TODO: delete console log
console.log(window);
findUserLocation();
