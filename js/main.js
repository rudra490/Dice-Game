

document.addEventListener('DOMContentLoaded', function () {
    // dice imgs ::
    const playerDice1 = document.getElementById('player-dice-1');
    const playerDice2 = document.getElementById('player-dice-2');

    const computerDice1 = document.getElementById('computer-dice-1');
    const computerDice2 = document.getElementById('computer-dice-2');

    // Score DOM ELements::
    const playerRoundScoreEl = document.getElementById('player-round-score');
    const playerTotalScoreEl = document.getElementById('player-total-score');

    const computerRoundScoreEl = document.getElementById('computer-round-score');
    const computerTotalScoreEl = document.getElementById('computer-total-score');
    // buttons::
    const rollDiceBtn = document.getElementById('roll-dice');
    const newGameBtn = document.getElementById('new-game');

    // POP Ups
    const popup = document.getElementById('popup');
    const closeBtn = document.querySelector('.close');
    const popupMessage = document.getElementById('pop-up-message');
    const popUpHeading = document.getElementById('pop-up-title');

    // sounds
    const diceSound = document.getElementById('dice-sound');
    const resultSound = document.getElementById('game-end');

    let playerTotalScore = 0;
    let computerTotalScore = 0;
    let roundCount = 0;

    // get a number between 1-6:
    function rollDice() {
        return Math.floor(Math.random() * 6) + 1;
    }

    // update img with dice val ::
    function updateDiceImages(playerDiceValues, computerDiceValues) {
        playerDice1.src = `./images/dice/dice_${playerDiceValues[0]}.png`;
        playerDice2.src = `./images/dice/dice_${playerDiceValues[1]}.png`;
        computerDice1.src = `./images/dice/dice_${computerDiceValues[0]}.png`;
        computerDice2.src = `./images/dice/dice_${computerDiceValues[1]}.png`;
    }

    function calculateRoundScore(dice1, dice2) {
        if (dice1 === 1 || dice2 === 1) {
            return 0;
        } else if (dice1 === dice2) {
            return (dice1 + dice2) * 2;
        } else {
            return dice1 + dice2;
        }
    }
    // main feature func::
    function updateScores() {
        const playerDiceValues = [rollDice(), rollDice()];
        const computerDiceValues = [rollDice(), rollDice()];

        updateDiceImages(playerDiceValues, computerDiceValues);

        const playerRoundScore = calculateRoundScore(playerDiceValues[0], playerDiceValues[1]);
        const computerRoundScore = calculateRoundScore(computerDiceValues[0], computerDiceValues[1]);

        playerTotalScore += playerRoundScore;
        computerTotalScore += computerRoundScore;
        // show scores
        playerRoundScoreEl.textContent = playerRoundScore;
        playerTotalScoreEl.textContent = playerTotalScore;
        computerRoundScoreEl.textContent = computerRoundScore;
        computerTotalScoreEl.textContent = computerTotalScore;
        // Play dice roll sound
        diceSound.play();

        // inc the round count
        roundCount++;


        if (roundCount === 3) {

            setTimeout(() => {
                let winnerMessage;
                let popUpTitle;
                if (playerTotalScore > computerTotalScore) {
                    popUpTitle = 'Hurrah !'
                    winnerMessage = 'You\'ve won the game!';
                } else if (playerTotalScore < computerTotalScore) {
                    popUpTitle = 'Better Luck Next Time !'
                    winnerMessage = 'Computer wins!';
                } else {
                    popUpTitle = 'Ooops !'
                    winnerMessage = 'It\'s a tie!';
                }
                popUpHeading.textContent = popUpTitle;
                popupMessage.textContent = `${winnerMessage}`;
                popup.style.display = 'flex';

                resultSound.play();
            }, 100);
        }
    }

    function resetGame() {
        playerTotalScore = 0;
        computerTotalScore = 0;
        roundCount = 0;

        playerRoundScoreEl.textContent = '00';
        playerTotalScoreEl.textContent = '00';
        computerRoundScoreEl.textContent = '00';
        computerTotalScoreEl.textContent = '00';

        playerDice1.src = './images/dice/dice_2.png';
        playerDice2.src = './images/dice/dice_4.png';
        computerDice1.src = './images/dice/dice_6.png';
        computerDice2.src = './images/dice/dice_3.png';
    }

    rollDiceBtn.addEventListener('click', updateScores);
    newGameBtn.addEventListener('click', resetGame);

    // Close POP Up::
    closeBtn.addEventListener('click', () => {
        popup.style.display = 'none';
        resetGame()
    });

    // 
    // rules for rules
    // 
    const toggleButtons = document.querySelectorAll('.toggle-button');

    toggleButtons.forEach(button => {
        button.addEventListener('click', function () {
            const details = this.parentElement.nextElementSibling;

            if (details.classList.contains('closed')) {
                details.classList.remove('closed');
                this.textContent = 'Close ⬇️';
            } else {
                details.classList.add('closed');
                this.textContent = 'Open ⬆️';
            }
        });
    });

    // BGM::
    document.addEventListener('click', function() {
        const bgSound = document.getElementById('bg-sound');
        bgSound.volume = 0.3;
        bgSound.play();
    }, { once: true });

});