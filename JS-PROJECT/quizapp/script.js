let hintText = document.querySelector('.hint-text');
let guessText = document.querySelector('.guess-text');
let wordDisplay = document.querySelector('.worddisplay')
let btn = document.querySelectorAll('.keyboard button')
let hangmanImg = document.querySelector('img')
const maxAttempts = 6;
let currentWord = '';
let wrongattempts = 0;

function loadRandomWord() {
    const random = wordList[Math.floor(Math.random() * wordList.length)];
    hintText.innerText = `Hint : ${random.hint}`;
    currentWord = random.word;
    updateGuessText();
    generateWordDisplay();
}

function updateGuessText(){
    guessText.textContent = `${wrongattempts}/ ${maxAttempts}`;
}

function generateWordDisplay(){
    wordDisplay.innerHTML = '';
    for (let val of currentWord){
        wordDisplay.innerHTML += '<li class="letter"></li>';
    }
}

function handlekeyboard(){
    for (let i=0; i<btn.length; i++){
        btn[i].addEventListener('click', ()=>{
            let letter = btn[i].innerText;
            btn[i].disabled = true;

            let found = false;

            for (let j=0; j<currentWord.length; j++){
                if (currentWord[j] === letter){
                    wordDisplay.children[j].textContent = letter;
                    found = true;
                }
            }

            if (!found){
                setTimeout(()=>{
                    wrongattempts += 1;
                    updateGuessText();
                    updateHangmanImage();

                    if (wrongattempts === maxAttempts){
                        alert("Game Over! Play Again.");
                        resetGame();
                    }
                }, 50);
            } else {
                setTimeout(()=>{
                    let allRevealed = true;

                    for (let k=0; k<currentWord.length; k++){
                        if (wordDisplay.children[k].textContent === ''){
                            allRevealed = false;
                        }
                    }

                    if (allRevealed){
                        alert("Congratulations! You Won 🎉🎊");
                        resetGame();
                    }
                }, 50);
            }
        });
    }
}

function updateHangmanImage(){
    hangmanImg.src = `../images/hangman-${wrongattempts}.svg`;
}

function resetGame(){
    wrongattempts = 0;
    updateGuessText();
    loadRandomWord();

    for (let b of btn){
        b.disabled = false;
    }

    hangmanImg.src = `../images/hangman-0.svg`;
}

loadRandomWord();
handlekeyboard();