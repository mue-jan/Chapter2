var buttonColours = [
    "red",
    "blue",
    "green",
    "yellow"
]
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

// START / STOP
$("h1").click(function() {
    $("body").css("background-color", "#011F3F");
    if (level === 0) {
        nextSequence();
    }
});

// GAME-LOGIC
function nextSequence() {
    var randomNumber = Math.floor((Math.random() * 10) % 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    level++;
    $("h1").text("Level: " + String(level));
    blink($("#" + randomChosenColour));
    playSound(randomChosenColour);

    // reset userClickedPattern
    userClickedPattern = [];
}

$(".btn").click(function(event) {
    if (level > 0) {
        userChosenColour = event.target.id;
        playSound(userChosenColour);
        userClickedPattern.push(userChosenColour);
        animatePress(userChosenColour);

        var match = true;

        console.log("gamePattern.length: " + String(gamePattern.length));
        console.log("userClickedPattern.length: " + String(userClickedPattern.length));

        // compare every input
        var newIndex = userClickedPattern.length - 1;

        var compare = gamePattern[newIndex].localeCompare(userClickedPattern[newIndex]);
        if (compare != 0)
            match = gameOver()

        // compare end of sequence
        if (gamePattern.length == userClickedPattern.length) {
            if (match) {
                setTimeout(nextSequence, 750);
            }
        }
    }
});

function gameOver() {
    match = false;
    playSound("wrong");
    $("body").css("background-color", "red");
    $("h1").text("Game Over, Press HERE to Restart");
    gamePattern = [];
    level = 0;
}


// HELPER (SOUND / ANIMATION / SLEEP)

function blink(element) {
    element.fadeOut(50);
    element.fadeIn(50);
}

function playSound(colour) {
    var audio = new Audio("sounds/" + colour + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
    console.log("#" + currentColour);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}