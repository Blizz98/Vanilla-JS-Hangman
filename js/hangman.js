const words = [
    "iss",
    "mir",
    "sputnik",
    "voyager",
    "apollo",
    "soyuz"
];

const hints = [
    "The only permanently habited station in space right now.",
    "The first space station that could be habited long term.",
    "The first artificial satellite orbiting earth. Created in Soviet Union in 1957.",
    "Furthest man-made object away from earth.",
    "American mission name that got humanity to land on the moon.",
    "Name of a russian spacecraft that was the only way to get people on the ISS until SpaceX's Crew Dragon."
];

let answer = "";
let hint = "";
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

const randomWord = () =>{
    let random = Math.floor(Math.random() * words.length);
    answer = words[random];
    hint = hints[random];
}

const generateButtons = () =>{
    let buttonsHTML = "abcdefghijklmnopqrstuvwxyz".split("").map(letter => 
        `
        <button 
            class="btn btn-lg btn-primary m-1" 
            id="` + letter + `" 
            onClick="handleGuess('` + letter + `')"
        >
            ` + letter + `
        </button>
        `).join("");
    
    document.getElementById("keyboard").innerHTML = buttonsHTML;
}

const guessedWord = () =>{
    wordStatus = answer.split("").map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join("");
    document.getElementById("word-spotlight").innerHTML = wordStatus;
}

const handleGuess = (chosenLetter) =>{
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
    document.getElementById(chosenLetter).setAttribute("disabled",true);
    
    if (answer.indexOf(chosenLetter) >= 0) {
        guessedWord();
        checkIfGameWon();
    }else if(answer.indexOf(chosenLetter) === -1){
        mistakes++;
        updateMistakes();
        checkIfGameLost();
        updateHangmanPicture();
    }
}

const showHint = () =>{
    document.getElementById("hint").innerHTML = hint;
    document.getElementById("btn-hint").setAttribute("disabled",true);
}

const checkIfGameWon = () =>{
    if (wordStatus === answer){
        document.getElementById("keyboard").innerHTML = "You Won!!!";
    }
}

const checkIfGameLost = () =>{
    if (mistakes === maxWrong){
        document.getElementById("word-spotlight").innerHTML = "The answer was: " + answer;
        document.getElementById("keyboard").innerHTML = "You Lost!!!";
    }
}

const updateMistakes = () =>{
    document.getElementById("mistakes").innerHTML = mistakes;
}

const reset = () =>{
    mistakes = 0;
    guessed = [];
    document.getElementById("hangman-pic").src = "./images/0.png";
    document.getElementById("hint").innerHTML = "Hint is hidden";
    document.getElementById("btn-hint").removeAttribute("disabled");

    randomWord();
    guessedWord();
    updateMistakes();
    generateButtons();
}

const updateHangmanPicture = () =>{
    document.getElementById("hangman-pic").src = "./images/" + mistakes + ".png";
}

document.getElementById("max-wrong").innerHTML = maxWrong;

randomWord();
generateButtons();
guessedWord();