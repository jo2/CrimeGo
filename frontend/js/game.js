var gameState = {
  currentStageCounter: 0,
  story: null,
  checkPlaces: function (seen){
    var searchingFor = this.story.waypoints[this.currentStageCounter].name
    if(seen.includes(searchingFor))
      this.levelUp()
  },
  levelUp: function () {
    if(this.currentStageCounter + 1 < this.story.waypoints.length){ // Has next step
      this.currentStageCounter = this.currentStageCounter + 1
      console.log("Finished step " + this.currentStageCounter)
    }else{
      this.win()
    }
  },
  win: function() {
    console.log("You won-")
  }

}
