/**
 * Created by Johannes Teklote on 15.10.2016.
 */
var prex;
var prey;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert('Die Bestimmung Ihrer position war leider nicht möglich');
        prex = 50.0;
        prey = 10.0;
    }
}
function initialize() {
    getLocation();
    alert('x: ' + prex + " / y: " + prey);
    var latlng = new google.maps.LatLng(prex, prey);
    var mapOptions = {
        zoom: 11,
        center: latlng,
        panControl: true,
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: true,
        overviewMapControl: true,
        rotateControl: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);
}
