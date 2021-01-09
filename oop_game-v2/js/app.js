const phraseSection = document.getElementById("phrase");
const phraseList    = phraseSection.firstElementChild;
const ul            = document.querySelector("ul");
const letters       = document.getElementsByClassName("letter");
const keys          = document.getElementsByClassName("key");
const overlay       = document.getElementById("overlay");
const buttonReset   = document.getElementById("btn__reset");
const tries         = document.getElementsByClassName("tries");
const heartPng      = document.getElementsByTagName("img");
const show          = document.getElementsByClassName("show");
const hide          = document.getElementsByClassName("hide");
const gameMsg       = document.getElementById("game-over-message");
let   newGame; //variable to hold Game class globally. First assigned in line 28 of app.js
let   activePhrase; //variable to hold this.phrase globally in app. First assigned in line 12 of Game.js
let   target; //variable changes values in Game.js to assign different class names. First assigned in line 25 in Game.js

//function to control logic for start game button. This button also resets. It clears "wrong" and "chosen" class from keyboard, changes png file image for hearts at the bottom of screen, creates a Game class, and calls the startGame(), keyCode(), and handleInteraction() methods from Game.js.
const start = () =>{
    gameMsg.innerHTML += `Guess the correct phrase before the virus spreads throughout the system!`
    buttonReset.addEventListener("click", (e)=>{
        for(let i = 0; i < keys.length; i++){
            keys[i].disabled = false;
            keys[i].classList.remove("chosen");
            keys[i].classList.remove("wrong");
        }
        for(let i = 0; i < heartPng.length; i++){
            heartPng[i].src = "images/liveHeart.png"
        }
        ul.innerHTML = null;
        newGame = new Game;
        newGame.startGame();
        newGame.keyCode();
        newGame.handleInteraction();
    });
}

start();

