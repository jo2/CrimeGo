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

/* GET the waypoint # of the story # */
router.get('/story/:id/:waypoint', function(req, res) {
  // find the appropriate story
  var story;
  stories.forEach(function(element) {
    if (element.id == req.params.id) story = element;
  });

  if (!story) {
    res.sendStatus(404);
    return;
  }

  // find the specified waypoint
  var waypoint;
  story.waypoints.forEach(function(element, index) {
    if (index == req.params.waypoint) waypoint = element;
  });

  if (!waypoint) {
    res.sendStatus(404);
    return;
  }

  res.send({
    id: req.params.id,
    waypoint: waypoint
  });
});

module.exports = router;
