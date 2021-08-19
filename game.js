var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];


$(".btn").click(function() {

  var userChosenColor = $(this).attr("id");

  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);

  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);

  //console.log(userClickedPattern);

});

var level = 0;

var started = false;

$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
  }
});

function nextSequence() {

  userClickedPattern = [];

  level++;

  $("#level-title").text("level " + level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);


}

function playSound(name) {

  var playSound = new Audio("sounds/" + name + ".mp3");
  playSound.play();

}

function animatePress(currentColor) {

  var pressing = $("." + currentColor);
  pressing.addClass("pressed");

  setTimeout(function() {
    pressing.removeClass("pressed");

  }, 100);

}

function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

    //console.log("Success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  }
  else {
    var wrongSound = new Audio("sounds/wrong.mp3");
    wrongSound.play();

    var gameOver = $("body");
    gameOver.addClass("game-over");

    setTimeout(function() {
      gameOver.removeClass("game-over");

    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();

    //console.log("wrong");
  }

  }

  function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }
