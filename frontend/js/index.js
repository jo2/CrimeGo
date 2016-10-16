//require("./material.js");
//require("./ripples.js");
const STORYURL = 'http://10.81.238.148:3000/stories';

$(document).ready(function getStories() {
    $.getJSON(STORYURL, function( data ) {
        for (var j = 0; j < data.stories.length; j++) {
            $('#storyList').append(`
                <li class="btn">
                    <a href="map.html?storyId=${data.stories[j].id}">
                    <div class="list-content col-xs-10">
                        <p>${data.stories[j].title}</p>
                    </div>
                    <i class="material-icons arrow-list-icon col-xs-2 text-right">keyboard_arrow_right</i>
                    </a>
                </li>
            `);
        }
    });
});