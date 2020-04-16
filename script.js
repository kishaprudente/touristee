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
    console.log("Latitude:", userLatitude, "Longitude:", userLongitude, "Accuracy(meters):", position.coords.accuracy);
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
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
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
// //This is for restaurants and it works!
// var lat;
// var lon;
// var distance
// var settings = {
// 	"async": true,
// 	"crossDomain": true,
// 	// "url": `https://us-restaurant-menus.p.rapidapi.com/restaurants/search/geo?page=1&lon=${lon}&lat=${lat}&distance=${distance}`,
//     "url": "https://us-restaurant-menus.p.rapidapi.com/restaurants/search/geo?page=1&lon=-73.992378&lat=40.68919&distance=1",
//     "method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "us-restaurant-menus.p.rapidapi.com",
// 		"x-rapidapi-key": "71b129468dmshc94f372540c81d1p1267d0jsnb5997d7a1653"
// 	}
// }

//New restaurant code.
$.ajax(settings).done(function (response) {
    console.log(response);
    console.log(response.result.data);
    for (var m = 0; m<5; m++){
        var name= response.result.data[m].restaurant_name;
        var address = response.result.data[m].address.formatted;
        var cuisine =response.result.data[m].cuisines[0];
        var lat2 = response.result.data[m].geo.lat;
        var lon2 = response.result.data[m].geo.lon;
        console.log(name);
        console.log(address);
        console.log(cuisine);
        console.log(lon2);
        var div=$("<div>");
        // div.id ='r'+m;
        var p=$("<p>");
        var p2=$("<p>");
        var distance;
        p.html(`Name:${name}   Distance:${distance}`);
        p2.html(`Address:${address}   Cuissine:${cuisine}`);
        $(".testDiv").append(div);
        div.append(p);
        div.append(p2);
    }
});
