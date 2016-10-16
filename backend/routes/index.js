var express = require('express');
var router = express.Router();

var stories = require('../data/stories.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CrimeGo' });
});

/* GET the titles of the stories */
router.get('/stories/', function (req, res) {
  titles = [];
  stories.forEach(function (story) {
    titles.push({ id: story.id, title: story.title });
  });
  res.send({
    stories: titles
  });
});

/* GET all waypoints of the story X */
router.get('/story/:id', function (req, res) {
  // find the specified story
  var story = findStoryById(req.params.id);
  if (!story) {
    res.sendStatus(404);
    return;
  }

  res.send({
    id: story.id,
    waypoints: story.waypoints
  });
});

/* GET the waypoint X of the story Y */
router.get('/story/:id/:waypoint', function(req, res) {
  // find the specified story
  var story = findStoryById(req.params.id);
  if (!story) {
    res.sendStatus(404);
    return;
  }

  // find the specified waypoint
  var waypoint = findWaypoint(req.params.waypoint, story);
  if (!waypoint) {
    res.sendStatus(404);
    return;
  }

  res.send({
    id: req.params.id,
    waypoint: waypoint
  });
});

function findStoryById(id) {
  var story = false;
  stories.forEach(function(element) {
    if (element.id == id) story = element;
  });
  return story;
}

function findWaypoint(waypoint, story) {
  var waypoint = false;
  story.waypoints.forEach(function(element, index) {
    if (index == waypoint) waypoint = element;
  });
  return waypoint;
}

module.exports = router;
