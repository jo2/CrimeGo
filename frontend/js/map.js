const STORYURL = 'js/stories.json'
const SEEN_RADIUS = 20

var CurrentStage = 0

var infoWindow, map, positionMarker

function loadStories (callback) {
  $.getJSON(STORYURL, function (json) {
    callback(json)
    console.log(json) // this will show the info it in firebug console
  })
}

function initMap () {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 17
  })
  infoWindow = new google.maps.InfoWindow({map: map})
}

function initSightMarkers (sightPositions) {
  for (var i = 0; i < sightPositions.length; i++) {
    placeMarker(map, sightPositions[i].pos, sightPositions[i].name)
  }
}
function initOwnMarker (map, location, sightPositions) {
  positionMarker = new google.maps.Marker({
    position: location,
    map: map,
    icon: 'http://i.stack.imgur.com/orZ4x.png',
    draggable: true
  })
  var infowindow = new google.maps.InfoWindow({
    content: 'Your Position'
  })

  positionMarker.addListener('dragend', function () {
    checkDistance(sightPositions, positionMarker)
  })
}
function initCurrentPos (sightPositions) {
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      initOwnMarker(map, pos, sightPositions)
      map.setCenter(pos)
    }, function () {
      handleLocationError(true, infoWindow, map.getCenter())
    })
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter())
  }
}
function checkDistance (sightPositions, ownPositionMarker) {
  var ownPos = ownPositionMarker.getPosition()
  for (var i = 0; i < sightPositions.length; i++) {
    var p2 = new google.maps.LatLng(sightPositions[i].pos.lat, sightPositions[i].pos.lng)
    console.log('Distance to ' + sightPositions[i].name + ': ' + calcDistance(ownPos, p2))
    if (calcDistance(ownPos, p2) < SEEN_RADIUS) {
      console.log('Near ' + sightPositions[i].name)
      seen.push(sightPositions[i])
    }
  }
}

function placeMarker (map, location, description) {
  var markerConf = {
    position: location,
    map: map
  }
  var marker = new google.maps.Marker(markerConf)
  var infowindow = new google.maps.InfoWindow({
    content: description
  })
  infowindow.open(map, marker)
}

function handleLocationError (browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos)
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    "Error: Your browser doesn't support geolocation.")
}

function calcDistance (p1, p2) {
  return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2)).toFixed(0)
}

initMap()
loadStories(function (storiesJson) {
  initSightMarkers(storiesJson[0].sightPositions)
  initCurrentPos(storiesJson[0].sightPositions)
})
