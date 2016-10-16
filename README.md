# CrimeGo
![CrimeGo Logo](https://github.com/jo2/CrimeGo/raw/notmyfaultsir/frontend/img/CrimeGo.png "CrimeGo Logo")

## Inspiration
We like crime stories and it would be exciting to solve them in the real world.

## What it does
There are several stories to choose from (all are self invented by members of our team). Each story has several waypoints with story sections. It's location based, so you physically have to go to the location where the next story section takes place (for testing purposes you can drag your current position around)

## How we built it
Two of us worked on the frontend and two of us on the backend. The two parts are completely modularized (they run in different servers and communicate with each other). The backend serves the stories and their specific data that is required in different GET-endpoints (using the node.js-express routing). The frontend contains the map for the waypoints and most of the game logic.

## What's next for CrimeGo
The next steps are finishing the translation so that all of our cases are avialable in german and english. Some ideas we ran into during developing CrimGo where to add a twilio interface, so that the user not only has the story as a text but that it is also read to him using a phone call. Another idea was, to create a AmazonAlexa task which would support the user like the famous Dr. Watson, giving hints and some basic facts relating crime and forensic medicine and so on. Furthermore: More stories, more Cities/Locations, User-Content

## Built With
- html
- javscript
- jquery
- css3
- node.js
- bootstrap
- intellij-idea
- atom
- git
- github
