console.log('Main loaded');
 
// Player Info
let playerOne = "Speler 1";
let playerOneScore = 0;
let playerTurn = true;
 
// Game Info
let gameTime = 90;
let timer = document.querySelector(".time-bar");
let diceOne = 1;
let diceTwo = 1;
let result = 0;
let gameStarted = false;
 
// Computer Info
let playerTwo = "Computer";
let playerTwoScore = 0;
let computerNumber = 0;
let computerGuess = null;
let computerGuessNumber = 0;
const guessArray = [
    'Lager',
    'Hoger'
];
 
// Buttons
const goButton = document.getElementById("go-button");
const higherButton = document.getElementById("higher-button");
const lowerButton = document.getElementById("lower-button");
 
// Extra
let playerOneScoreText = document.querySelector(".player-one-score");
let playerTwoScoreText = document.querySelector(".player-two-score");
 
// Tijd converten
// Source = https://stackoverflow.com/questions/3733227/javascript-seconds-to-minutes-and-seconds/50495400#:~:text=var%20mind%20%3D%20time%20%25%20(60,ceil(secd)%3B
function mmSS(duration, isValueInMinsFormat = false)
{
  if (isValueInMinsFormat) {
    duration *= 60;
  }
 
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
 
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
 
timer.innerText = mmSS(gameTime);
 
function rollDice() {
    diceOne = Math.round(Math.random() *  (6 - 1) + 1);
    diceTwo = Math.round(Math.random() *  (6 - 1) + 1);
 
    result = diceOne + diceTwo
}
 
function checkOption() {
    higherButton.addEventListener("click", function() {
        if (playerTurn == true) {
            if (result > 6 ) {
                playerOneScore += 1;
                playerOneScoreText.innerText = playerOneScore;
                console.log("Je hebt het goed geraden, beide dobbelstenen bij elkaar zijn boven de 6 en je hebt gewonnen");
            } else {
                console.log("Sorry, je hebt het fout gegokt");
            }
 
            playerTurn = false;
        }
    });
   
    lowerButton.addEventListener("click", function() {
        if (playerTurn == true) {
            if (result < 6 ) {
                playerOneScore += 1;
                playerOneScoreText.innerText = playerOneScore;
                console.log("Je hebt het goed geraden, beide dobbelstenen bij elkaar zijn onder de 6 en je hebt gewonnen");
            } else {
                console.log("Sorry, je hebt het fout gegokt");
            }
 
            playerTurn = false;
        }
    });
 
    // Checking random dice numbers and adding them up
    console.log(`${diceOne} + ${diceTwo} = ${diceOne + diceTwo}`)
}
 
function computerGuessFunc() {
    rollDice();
 
    computerNumber = result;
    computerGuessNumber = Math.floor(Math.random()*guessArray.length);
    computerGuess = guessArray[computerGuessNumber];
 
    if (computerGuess == "Hoger" && computerNumber > 6) {
        console.log("Goed gegokt");
    } else if (computerGuess == "Lager" && computerNumber < 6) {
        console.log("Goed gegokt");
    } else {
        console.log("Fout gegokt");
    }
}
 
computerGuessFunc();
 
// Button Click Events
goButton.addEventListener("click", function() {
    this.parentNode.removeChild(goButton);
 
    // Game start function
    if (gameStarted == false) {
        gameStarted = true;
 
        let countdown = setInterval(() => {
            if (gameTime > 0) {
                gameTime -= 1;
                timer.innerText = mmSS(gameTime);
            } else {
                clearInterval(countdown);
                console.log("Game Over");
            }
        }, 1000);
 
        rollDice();
 
        checkOption();
    } else {
        console.log("Something went wrong with starting the game");
    }
});