
var buttonColours = ["red", "blue", "green", "yellow"];
var isStart = false;
var gamePattern = [];
var userClickedPattern;
var level = 0;

$(document).keypress(function(event){
        if(!isStart){
            nextSequence();
            isStart = true;
        }
});

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    animatedPress(userChosenColour);
    playAudio(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})


function nextSequence(){
    level++;
    $("#level-title").text("Level "+ level);
    userClickedPattern = [];
    var randomNumber = getRandomIndex();
    var randomChosenColour = buttonColours[randomNumber];
    
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playAudio(randomChosenColour);
}

function getRandomIndex(){
    return Math.floor(Math.random()*4);
}

function playAudio(audioName){
    var audio = new Audio("sounds/" + audioName + ".mp3");
    audio.play();
}

function animatedPress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentIndex){
    if(gamePattern[currentIndex] === userClickedPattern[currentIndex])
        {
            console.log("success");
            if(userClickedPattern.length == gamePattern.length)
            {
                setTimeout( 
                    function(){nextSequence();} ,
                    1000
                    );
            }
        }
    else
    {
        $("body").addClass("game-over");
        setTimeout(
            function(){ $("body").removeClass("game-over"); } ,
            200
        );
        playAudio("wrong");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    isStart = false;
}