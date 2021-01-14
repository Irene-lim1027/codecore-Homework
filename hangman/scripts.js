
let words = ["apple", "peach", "pear", "blueberry", "coconut", "fig", "pineapple", "orange", "banana", "plum"];

let answer = "";
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;
let keys = [];

function randomWord() {
    answer = words[Math.floor(Math.random() * words.length)];
}

function generateButtons() {
    let buttonsHTML='abcdefghijklmnopqrstuvwxyz'.split("").map(letter => 
        `
            <button 
            class="letterButtons"
            type ="submit"
            id='` + letter + `'
            onClick="handleGuess('` + letter + `')"
            onKey="handleGuess('` + letter + `')"
            >
                ` + letter + `
            </button>
        `).join('');
    document.getElementById('button').innerHTML = buttonsHTML;
}


function handleGuess(guessedLetter) {
    guessed.indexOf(guessedLetter) === -1 ? guessed.push(guessedLetter) : null;
    document.getElementById(guessedLetter).setAttribute('disabled', true);
    if (answer.indexOf(guessedLetter) >= 0) {
        guessedWord();
        checkIfGameWon();
    } else if (answer.indexOf(guessedLetter) === -1) {
        mistakes++;
        updateMistakes();
        checkIfGameLost();
        updateHangmanPicture();
    }
}
function updateHangmanPicture(){
    document.getElementById('hangman').src = './images/gallows' + mistakes + '.jpg';
}
function checkIfGameWon () {
    if (wordStatus === answer){
        document.getElementById('button').innerHTML = "Congratulations, you won!:" 
        setTimeout(() => {
            alert("You escaped the noose!"
        )},100);
    }
}
function checkIfGameLost () {
    if (mistakes === maxWrong){
        document.getElementById('button').innerHTML = 'Sorry, you lost!'
        document.getElementById('wordSpotlight').innerHTML = 'The word was: ' + answer
        setTimeout(() => {
            alert("Better luck next time!")
        }, 100)
    }
}
function guessedWord(){
    wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join("");
    document.getElementById('wordSpotlight').innerHTML = wordStatus;
}
function updateMistakes(){
    document.getElementById('mistakes').innerHTML = mistakes;
}
function reset(){
    mistakes = 0;
    guessed = [];
    keys = [];
    document.getElementById('hangman').src = './images/gallows0.jpg';
    randomWord();
    guessedWord();
    updateMistakes();
    generateButtons();
}
document.getElementById('maxWrong').innerHTML = maxWrong;
randomWord();
generateButtons();
guessedWord();
