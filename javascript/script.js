var score;
var options = ["cover1", "cover2", "cover3", "cover4", "cover5", "cover6", "cover7", "cover8", "cover9"];
var computerSelection = [];
var userIndex = 0;
var time = 750;
var isplaying = true;


function load() {
    score = 0;
    var con = document.getElementById("container");
    con.style.display = "none";
    var btn = document.getElementById("end-btn");
    btn.style.display = "none";
}

function gameOver(id) {
    var sound = new Audio("../src/sounds/game over.mp3");
    sound.currentTime = 0;
	sound.play();
    var con = document.getElementById("container");
    var btn = document.getElementById("end-btn");
    btn.style.display = "";
    con.style.display = "none";
    isplaying = false;
}

function pressCheck(id) {
    if(id == computerSelection[userIndex]) {
        if(userIndex+1 != computerSelection.length) {
            userIndex = userIndex+1;
        }
        else {
            levelUp();
        }
    }
    else {
        gameOver(id);
    }
}

function clearSelections() {
    computerSelection = [];
    userIndex = 0;
    score = 0;
    isplaying = true;
}

function levelUp() {
    var sound = new Audio("../src/sounds/next level.mp3");
    sound.currentTime = 0;
	sound.play();
    if(time-25 > 100) {
        time = time - 25;
    }
    score = score+1;
    userIndex = 0;
    chooseAndGlow();
}

function chooseAndGlow() {
    var con = document.getElementById("container");
    con.style.zIndex = "-100";
    computerSelection.push(options[Math.floor(Math.random() * 10)]);
    setTimeout(async function(){
        for await (let i of computerSelection) {
            await new Promise(resolve=>setTimeout(resolve, time))
            glow(i);
            await new Promise(resolve=>setTimeout(resolve, time))
        }
    }, time);
    setTimeout(function(){
        con.style.zIndex = "100";
    }, Math.floor((((score+1)*2)*time)+time+(time/3)));
}

function startGame() {
    var sound = new Audio("../src/sounds/start game.mp3");
    sound.currentTime = 0;
	sound.play();
    var con = document.getElementById("container");
    var btn = document.getElementById("start-btn")
    btn.hidden = true;
    var btn2 = document.getElementById("end-btn")
    btn2.style.display = "none";
    con.style.display = "flex";
    chooseAndGlow();
}

function glow(id) {
    if(isplaying == true) {
        var element = document.getElementById(id);
        element.hidden = true;
        var sound = new Audio("../src/sounds/colors/"+id+".mp3");
        sound.currentTime = 0;
	    sound.play();
        setTimeout(function(){
            element.hidden = false;
            return false;
        }, time);
    }
}

function pressed(id) {
    glow(id);
    pressCheck(id);
}

function restartGame() {
    clearSelections();
    startGame();
}