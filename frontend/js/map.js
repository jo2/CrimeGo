var params = getSearchParameters();

const STORYID = params.storyId || 1
//const STORYURL = 'js/stories.json'
const STORYURL = 'http://localhost:3000/story/' + STORYID
const SEEN_RADIUS = 20

var infoWindow, map, positionMarker

function Game() {
  this.currentStageCounter= -1
  this.story =  null
  this.checkPlaces =  function (seen){
    var searchingFor = this.story[this.currentStageCounter+1].name
    if(seen.includes(searchingFor))
      this.levelUp()
  }
  this.levelUp= function () {
    if(this.currentStageCounter + 1 < this.story.length){ // Has next step
      this.currentStageCounter = this.currentStageCounter + 1
      createModal(this.story[this.currentStageCounter].hint)
      console.log("Finished step " + this.currentStageCounter)
    }else{
      this.askMurder()
    }
  },
  this.askMurder= function() {
    createFinishForm(this.murders)
    console.log("You won-")
  }

}

 var theGame = new Game()

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
    var seen = checkDistance(sightPositions, positionMarker)
    theGame.checkPlaces(seen)
  })
  positionMarker.addListener("click", function(){
    infowindow.open(map, positionMarker)
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
  var nearSights = []
  for (var i = 0; i < sightPositions.length; i++) {
    var p2 = new google.maps.LatLng(sightPositions[i].pos.lat, sightPositions[i].pos.lng)
    console.log('Distance to ' + sightPositions[i].name + ': ' + calcDistance(ownPos, p2))
    if (calcDistance(ownPos, p2) < SEEN_RADIUS) {
      console.log('Near ' + sightPositions[i].name)
      nearSights.push(sightPositions[i].name)
    }
  }
  return nearSights
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
  marker.addListener("click", function(){
    infowindow.open(map, marker)
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

function createFinishForm(MurderJson) {

   MurderJson.forEach(function(murder) {
     var radio = $('<div class="radio"><label><input type="radio" name="optionsMurder" id="' + murder.name + '" value="' + murder.name + '">' + murder.name + '</label></div>')

     $('#story-modal .modal-body').append(radio)
   })
}

function createModal(text) {
  $('#story-modal .modal-body').text(text)
  $('#story-modal').modal('show')
}

initMap()
loadStories(function (storiesJson) {
  theGame.story = storiesJson.waypoints
  theGame.levelUp()
  initSightMarkers(storiesJson.waypoints)
  initCurrentPos(storiesJson.waypoints)
})
$.getJSON("http://localhost:3000/story/" + STORYID + "/murder", function(json) {
  theGame.murders = json
  createFinishForm(json)
})
function getSearchParameters() {
    var prmstr = window.location.search.substr(1)
    return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {}
}
function transformToAssocArray( prmstr ) {
    var params = {}
    var prmarr = prmstr.split("&")
    for (var i = 0; i < prmarr.length; i++) {
        var tmparr = prmarr[i].split("=")
        params[tmparr[0]] = tmparr[1]
    }
    return params
}
