class Phrase {
    constructor(phrase){
        this.phrase = phrase;
    }

    //takes activePhrase assigned in startGame() in Game.js, makes characters lowercased, and puts in empty ul in index.html
    addPhraseToDisplay() {
        const lowerCased = this.phrase.toLowerCase();
        console.log(lowerCased);
        for(let char of lowerCased.split("")){
            if(char === " "){
                phraseList.innerHTML += `<li class="space">${char}</li>`;
            } else {
                phraseList.innerHTML += `<li class="hide letter ${char}">${char}</li>`;
            }
        };
    }

    //simple method that returns boolean based on if key chosen by user equals characters in ul
    checkLetter() {
            if((this.phrase.split("")).indexOf(target) !== -1){
                return true;
            } else {
                return false;
            }
    }

    //reveals correct keys chosen by user by using target variable(last assigned in line 43 in Game.js) as a class name and adding "show" class and removing "hide" class
    showMatchedLetter(){
        for(let i = 0; i < document.getElementsByClassName(target).length; i++){
            let targetClass = document.getElementsByClassName(target);
            targetClass[i].classList.add("show");
            targetClass[i].classList.remove("hide");
        }
    }
}
