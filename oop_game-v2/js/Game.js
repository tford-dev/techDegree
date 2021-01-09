class Game {
    constructor(){
        this.missed = 0;
        this.phrases = this.pushPhrase();
        this.activePhrase = null;
    }

    //clears loading screen, chooses a random Phrase class, assigns active phrase to global variable, and adds active phrase to display
    startGame(){
        overlay.style.display = "none";
        this.activePhrase = this.getRandomPhrase(); 
        activePhrase = this.activePhrase
        console.log(activePhrase);
        activePhrase.addPhraseToDisplay();
    }

    //simple logic to create a random index to choose class from pushPhrase() array in this.phrase in constructor
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
    
    //Method that assigns "wrong" and "chosen" class to buttons that do or do not match characters in phrase and reveals correct characters to display(ul) as well as calls gameOver() method if player has won or has 5 misses(this.missed)
    handleInteraction(){
        for(let i = 0; i < keys.length; i++){
            keys[i].addEventListener("click", (e)=>{
                target = e.target.textContent;
                e.target.disabled = true;
                if(activePhrase.checkLetter()){
                    e.target.classList.add("chosen");
                    activePhrase.showMatchedLetter();
                    this.checkForWin()
                } else {
                    this.removeLife();
                    e.target.classList.add("wrong");
                    this.checkForWin();
                };
                if(this.checkForWin() === true || this.missed === 5){
                    this.gameOver();   
                };
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

    //Method that checks to see if all letters are uncovered in the ul and then returns a boolean to check if user has won.
    checkForWin(){
        if(show.length === letters.length){
            return true;
        }
    }

    //Method that loads start screen with a message based on if user has won or lost game as well as resets this.missed to 0
    gameOver(){
        overlay.style.display = "initial";
        if(this.checkForWin() === true){
            overlay.classList.remove("lose");
            overlay.classList.add("win");
            gameMsg.innerHTML = `Good job <em>PHRASE HUNTER</em>, you guessed the phrase with ${this.missed} characters missed!`;
        } else if(this.missed === 5) {
            overlay.classList.remove("win");
            overlay.classList.add("lose");
            gameMsg.innerHTML = `Mission failed, the phrase has injected itself into the system, press start game to try again.`
        }
        this.missed = 0;
    }

    //Method that returns an array of phrase classes with different strings for phrase property in Phrase class constructor
    pushPhrase(){
        const phraseArr = [
            new Phrase("a dime a dozen"),
            new Phrase("a piece of cake"),
            new Phrase("an arm and a leg"),
            new Phrase("a chip on your shoulder"),
            new Phrase("back to square one")
        ];
        return phraseArr;
    }
}
