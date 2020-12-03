var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

// SOUNDS
function playSound(name) {
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

// CLICK ANIMATION
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
};

// SIMON GAME SEQUENCING
function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    $("#level-title").text("Level " + level)
    level = gamePattern.length;
};

// USER SEQUENCING
$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

// START OF GAME
$(document).keydown(function () {
    if (started == false) {
        $("#level-title").text("Level " + level)
        nextSequence();
        started = true;
    };
});

// RESTART GAME
function startOver() {
    started = false;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
};

//Checking User clicks to Game Sequence
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        };
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("☠️Game Over, Press Any Key to Restart.☠️");
        startOver();
    }
};