class Game {
    constructor(missed, phrases, activePhrase){
        this.missed = 0;
        this.phrases = ["a dime a dozen", "a piece of cake", "an arm and a leg", "a chip on your shoulder", "back to square one"];
        this.activePhrase = null;
    }

    //clears loading screen, chooses a random phrase, assigns active phrase to global variable, and adds active phrase to display
    startGame(){
        overlay.style.display = "none";
        this.activePhrase = this.getRandomPhrase(); 
        activePhrase = this.activePhrase
        newPhrase = new Phrase(activePhrase);
        newPhrase.addPhraseToDisplay();
    }

    //simple logic to create a random index to choose from this.phrases in constructor
    getRandomPhrase(){
        const phraseIdx = Math.floor(Math.random() * this.phrases.length);
        return this.phrases[phraseIdx];
    }

    //logic to use computer keyboard to type, it simply allows user to click buttons on display by using keyboard
    keyCode(){
        window.addEventListener("keydown", (e)=>{
            for(let i = 65; i < 91; i++){
                if(e.keyCode == `${i}`){
                    target = String.fromCharCode(i).toLowerCase();
                    for(let j = 0; j < keys.length; j++){
                        if(target === keys[j].textContent){
                            keys[j].click();
                        }
                    }
                }
            }
        });
    }
    
    //Method that assigns "wrong" and "chosen" class to buttons that do not and do match characters in phrase and reveals correct characters to display(ul)
    handleInteraction(){
        for(let i = 0; i < keys.length; i++){
            keys[i].addEventListener("click", (e)=>{
                target = e.target.textContent;
                e.target.disabled = true;
                if(newPhrase.checkLetter()){
                    e.target.classList.add("chosen");
                    newPhrase.showMatchedLetter();
                    this.checkForWin()
                } else {
                    this.removeLife();
                    e.target.classList.add("wrong");
                    this.checkForWin();
                }
            });
        }
    }

    //Method to increment incorrect attempts and change heart color at bottom of screen 
    removeLife(){
        this.missed++
        console.log(this.missed);
        heartPng[heartPng.length - this.missed].src = null;
        heartPng[heartPng.length - this.missed].src = "images/lostHeart.png";
    }

    //Method that uses amount of elements with "show" class and "letter" class to see if user has won or to see if amount of misses determines in a player has lost
    checkForWin(){
        if(show.length === letters.length){
            this.gameOver();
        } else if(this.missed === 5) {
            this.gameOver();
        }
    }

    //Method that loads start screen with a message based on if user has won or lost game as well as resets this.missed to 0
    gameOver(){
        overlay.style.display = "initial";
        if(show.length === letters.length){
            gameMsg.innerHTML = `Good job <em>PHRASE HUNTER</em>, you guessed the phrase with ${this.missed} characters missed!`;
        } else if(this.missed === 5){
            gameMsg.innerHTML = `Mission failed, the phrase has injected itself into the system, press start game to try again.`
        }
        this.missed = 0;
    }
}


