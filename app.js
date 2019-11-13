/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, gamePlaying;
 
init()



document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying){
        //1. Random number
    let dice = Math.floor(Math.random() * 6 ) + 1;
    let dice2 = Math.floor(Math.random() * 6 ) + 1;

    //2. Display the result
    let diceDom = document.querySelector('.dice');
    let diceDom2 = document.querySelector('#dice');
    diceDom.style.display = 'block';
    diceDom2.style.display = 'block';
    diceDom.src = 'dice-' + dice + '.png';
    diceDom2.style.display = 'block';
    diceDom2.src =  'dice-' + dice2 + '.png';

    //3. Update the round score if the rolled number is not 1
    if(dice !== 1 || dice2 !== 1) {
        //Add score
        roundScore += dice + dice2;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
        nextPlayer()
    }
    }
    
})


document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {
         //Add Current Score to Global score
    scores[activePlayer] += roundScore;
    //Update the UI
    let playerScore = document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    //Set finale score
    let setFinalScore = document.querySelector('#set-final-score').value;

    //Check if player WON the game
    if (playerScore >= 100 || setFinalScore) {
        //Update player name to WINNER
        document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        document.getElementById('current-' + activePlayer).textContent = '0';
        gamePlaying = false;

    } else {
        //Next Player
        nextPlayer()
    }
    }
    
})


function nextPlayer() {
    //Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('#dice').style.display = 'none';
}


document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('#dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}



// dice = Math.floor(Math.random() * 6 ) + 1;


// document.querySelector('#current-' + activePlayer).textContent = dice;
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';