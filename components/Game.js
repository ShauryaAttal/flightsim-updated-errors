AFRAME.registerComponent("game", {
  schema: {
    elementId: { type: "string", default: "#rings1" },
  },

  init: function () {
    var duration = 1500;
    var timerEl = document.querySelector("#timer");
    this.startTimer(duration, timerEl);
  },

  update: function () {
    this.isCollided(this.data.elementId);
  },

  startTimer: function (duration, timeEl) {
    var minutes;
    var seconds;

    setInterval(() => {
      if (duration >= 0) {
        minutes = parseInt(duration / 60);
        seconds = parseInt(duration % 60);

        if (minutes < 10) {
          minutes = "0" + minutes;
        }

        if (seconds < 10) {
          seconds = "0" + seconds;
        }

        timeEl.setAttribute("text", {
          value: minutes + ":" + seconds,
        });

        duration -= 1;
      } else {
        this.gameOver();
      }

      if (currentTargets === 0){
        this.scored()
      }
    }, 1000);
  },

  isCollided: function (elementId) {
    var element = document.querySelector(elementId);
    //console.log("What is element id" + elementId);
    element.addEventListener("collide", (e) => {
      if (elementId.includes("#rings")) {
        //console.log("ring collision");
        this.updateScore();
        this.updateTargets();
      } else if (elementId.includes("#birds")) {
        //console.log("bird collision");
        this.updateScore();
        this.updateTargets();
      }
    });
  },

  updateTargets: function () {
    var element = document.querySelector("#targets");
    var count = element.getAttribute("text").value;
    var currentTargets = parseInt(count);
    currentTargets -= 1;
    element.setAttribute("text", {
      value: currentTargets,
    });

    
  },

  updateScore: function () {
    var element = document.querySelector("#Score");
    var count = element.getAttribute("text").value;
    var currentScore = parseInt(count);
    currentScore += 50;
    element.setAttribute("text", {
      value: currentScore,
    });
  },

  gameOver: function(){
    var plane = document.querySelector("#plane")
    var element = document.querySelector("#gameOver")
    element.setAttribute("visible", true)
    plane.setAttribute("dynamic-body", {
      mass: 1
    })
  },

  scored: function(){
    var reached = document.querySelector("#targetReached")
    var plane = document.querySelector("#plane")
  
    reached.setAttribute("visible", true)
    plane.setAttribute("dynamic-body", {
      mass: 1
    })
  },
});
