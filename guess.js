let randomNumber = Math.floor(Math.random() * 100) + 1;

const submit = document.querySelector("#subt");
const userInput = document.querySelector("#guessField");
const guessSlot = document.querySelector(".guesses");
const remaining = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".low0rHi");
const startOver = document.querySelector(".resultParas");

let prevGuesses = [];
let numGuesses = 1;
let playGame = true;

// Event listener for submit button
submit.addEventListener("click", function (e) {
    e.preventDefault();
    const guess = parseInt(userInput.value);
    validateGuess(guess);
});

function validateGuess(guess) {
    if (isNaN(guess)) {
        alert("Please enter a valid number.");
    } else if (guess < 1) {
        alert("Please enter a number greater than or equal to 1.");
    } else if (guess > 100) {
        alert("Please enter a number less than or equal to 100.");
    } else {
        prevGuesses.push(guess);
        displayGuess(guess);
        checkGuess(guess);
    }
}

function checkGuess(guess) {
    if (guess === randomNumber) {
        displayMessage("Congratulations! You guessed it right.");
        endGame();
    } else if (guess < randomNumber) {
        displayMessage("Your guess is too low.");
    } else if (guess > randomNumber) {
        displayMessage("Your guess is too high.");
    }
    if (numGuesses === 11) {
        displayMessage(`Game Over! The correct number was ${randomNumber}.`);
        endGame();
    }
}

function displayGuess(guess) {
    userInput.value = '';
    guessSlot.textContent += `${guess}, `;
    numGuesses++;
    remaining.textContent = `${11 - numGuesses}`;
}

function displayMessage(message) {
    lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

function endGame() {
    userInput.value = '';
    userInput.setAttribute('disabled', '');
    submit.setAttribute('disabled', '');

    // Check if a new game button already exists
    let newGameButton = document.querySelector('.newGameButton');
    if (!newGameButton) {
        newGameButton = document.createElement('button');
        newGameButton.textContent = 'Start New Game';
        newGameButton.classList.add('newGameButton');
        startOver.appendChild(newGameButton);

        newGameButton.addEventListener('click', function() {
            resetGame();
        });
    }

    playGame = false;
}

function resetGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    prevGuesses = [];
    numGuesses = 1;
    guessSlot.textContent = '';
    remaining.textContent = '10';
    lowOrHi.innerHTML = '';
    userInput.removeAttribute('disabled');
    submit.removeAttribute('disabled');

    const newGameButton = document.querySelector('.newGameButton');
    startOver.removeChild(newGameButton); // Remove the button after starting a new game

    playGame = true;
}
