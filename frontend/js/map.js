var sightPositions = [
    {
        name: 'Jacob´s University',
        pos: {
            lat: 53.166,
            lng: 8.654
        }
    }, {
        name: 'Rathaus Bremen',
        pos: {
            lat: 53.076,
            lng: 8.806
        }
    }, {
        name: 'Die Glocke Bremen',
        pos: {
            lat: 53.074,
            lng: 8.809
        }
    }, {
        name: 'Bremen HBF',
        pos: {
            lat: 53.083,
            lng: 8.8124
        }
    }
];

var seen = new Array();

var mylat;
var mylng;
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 15
    });
    var infoWindow = new google.maps.InfoWindow({map: map});

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            mylat = position.coords.latitude;
            mylng = position.coords.longitude;
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            for (var i = 0; i < sightPositions.length; i++) {
                var p1 = new google.maps.LatLng(pos.lat, pos.lng);
                var p2 = new google.maps.LatLng(sightPositions[i].pos.lat, sightPositions[i].pos.lng);
                alert('Distance: ' + calcDistance(p1, p2));
                if (calcDistance(p1, p2) < 20) {
                    placeMarker(map, pos, i);
                    seen.push(sightPositions[i])
                }
            }
            map.setCenter(pos);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function placeMarker(map, location, i) {
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
    var infowindow = new google.maps.InfoWindow({
        content: 'Sight: ' + sightPositions[i].name
    });
    infowindow.open(map,marker);
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}

function calcDistance(p1, p2) {
    return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2)).toFixed(0);
}

window.onkeydown = function(e) {
    var key = e.keyCode ? e.keyCode : e.which;

    //alert(mylat + " | " + mylng);

    if (key == 38) {
        mylat += 0.00001;
    } else if (key == 39) {
        mylng += 0.00001;
    } else if (key == 37) {
        mylng -= 0.00001;
    } else if (key == 40) {
        mylat -= 0.00001;
    }

    document.getElementById("latValue").value = mylat;
    document.getElementById("lngValue").value = mylng;
};

initMap()
