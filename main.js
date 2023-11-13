'use strict';

const allLed = document.querySelectorAll('.led');
const led1 = document.querySelector('.led-1');
const led2 = document.querySelector('.led-2');
const led3 = document.querySelector('.led-3');
const led4 = document.querySelector('.led-4');
const led5 = document.querySelector('.led-5');
const led6 = document.querySelector('.led-6');

const leds = [led1, led2, led3, led4, led5, led6];

let myInterval;
let i = 0;
let increasing = true;
let player1Score = 0;
let player2Score = 0;

//************************************************* */ F: flash leds
function flashLeds() {
  for (let j = 0; j < leds.length; j++) {
    leds[j].classList.remove('active');
  }

  if (increasing) {
    leds[i].classList.add('active');
    i++;
    if (i === leds.length) {
      i = i - 1;
      increasing = false;
    }
  } else {
    i--;
    leds[i].classList.add('active');
    if (i === 0) {
      i = i + 1;
      increasing = true;
    }
  }
  //console.log(`Player1 Score:${player1Score} / Player2 Score:${player2Score}`);
}

//************************************************* */ F: change color
function changeColor() {
  flashLeds();
  if (!myInterval) {
    myInterval = setInterval(flashLeds, 500);
  }
}

changeColor();

// BUTTONS
let btnPlayer1 = document.querySelector('.btn-p1');
let btnPlayer2 = document.querySelector('.btn-p2');

btnPlayer1.addEventListener('click', () => checkScore(0));
btnPlayer2.addEventListener('click', () => checkScore(1));

function checkScore(player) {
  if (player === 0) {
    if (leds[0].classList.contains('active')) {
      player1Score++;
    } else {
      player1Score--;
    }
    scoreP1.innerText = player1Score;
    gameOver();
  } else if (player === 1) {
    if (leds[leds.length - 1].classList.contains('active')) {
      player2Score++;
    } else {
      player2Score--;
    }
  }
  scoreP2.innerText = player2Score;
  gameOver();
}

//************************************************* */ F: check key
let scoreP1 = document.querySelector('.p1score');
let scoreP2 = document.querySelector('.p2score');

function checkKey(event) {
  switch (true) {
    // Player 1
    case event.key === 'a':
      checkScore(0);
      break;
    // Player 2
    case event.key === 'l':
      checkScore(1);
      break;
    default:
      break;
  }
}

document.addEventListener('keydown', checkKey);

//************************************************* */ F: game over
const player1Container = document.querySelector('.player1');
const player2Container = document.querySelector('.player2');

function gameOver() {
  if (player1Score === 2) {
    player1Container.innerHTML = '';
    player1Container.innerHTML = `
          <div>
          <p>Player 1 </p> </br>
          <p> 🎉 You win! 🎉 </p>
          </div>`;
    player2Container.innerHTML = '';
    player2Container.innerHTML = `<div>
          <p>Player 2 </p> 
          </br>
          <p> 🎈 You lost!🎈 </p>
          </div>`;
    clearInterval(myInterval);
  } else if (player2Score === 2) {
    player2Container.innerHTML = '';
    player2Container.innerHTML = `
          <div>
          <p>Player 2 </p> </br>
          <p> 🎉 You win! 🎉 </p>
          </div>`;
    player1Container.innerHTML = '';
    player1Container.innerHTML = `<div>
          <p>Player 1 </p> 
          </br>
          <p> 🎈 You lost!🎈 </p>
          </div>`;
    clearInterval(myInterval);
  }
}
//************************************************ */ Button NEW GAME
const btnNewGame = document.querySelector('.new-game');
btnNewGame.addEventListener('click', function () {
  clearInterval(myInterval);
  myInterval = null;

  i = 0;
  increasing = true;
  player1Score = 0;
  player2Score = 0;

  player1Container.innerHTML = `
  <p>Player 1</p>
  <p class="description">Catch first light</p>
  <button class="btn-p1">Press button or "A"</button>
  <p>Score:<span class="p1score">0 </span></p>`;

  player2Container.innerHTML = `
  <p>Player 2</p>
  <p class="description">Catch last light</p>
  <button class="btn-p2">Press button or "L"</button>
  <p>Score:<span class="p2score">0 </span></p>
  `;

  btnPlayer1 = document.querySelector('.btn-p1');
  btnPlayer2 = document.querySelector('.btn-p2');

  btnPlayer1.addEventListener('click', () => checkScore(0));
  btnPlayer2.addEventListener('click', () => checkScore(1));

  scoreP1 = document.querySelector('.p1score');
  scoreP2 = document.querySelector('.p2score');

  changeColor();

  document.addEventListener('keydown', checkKey);
});
