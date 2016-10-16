//require("./material.js");
//require("./ripples.js");
const STORYURL = 'http://10.81.238.148:3000/stories';

$(document).ready(function getStories() {
    $.getJSON(STORYURL, function( data ) {
        for (var j = 0; j < data.stories.length; j++) {
            $('#storyList').append("\<li id='" + data.stories[j].id + "'\>" + data.stories[j].title + "\</li>");
        }
    });
});