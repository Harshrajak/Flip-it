let firstCard, secondCard;
let flipCount = 14;
let hideCount = 0;
let flag = false;
let difficultyLevel;
let overCount = 8;
let score = 0;
let scoreOutOfValue = 80;

const gameContainer = document.querySelector(".game-container");
const refreshButton = document.querySelector(".reset-btn");
const restartButton = document.querySelector(".restart-btn");
const endOverlay = document.querySelector(".end-overlay");
const startButton = document.querySelector(".start-btn");
const startOverlay = document.querySelector(".start-overlay");
const cards = document.querySelectorAll(".card");
const radios = document.querySelectorAll('input');
const flipValue = document.querySelector('.flip-value');
const flipValueEnd = document.querySelector('.flip-value-end');
const scoreValue = document.querySelector('.score-value');
const scoreValueEnd = document.querySelector('.score-value-end');
const statusHeading = document.querySelector('.congo');
const statusMessage = document.querySelector('.msg');

const checkDifficulty = () => {
  radios.forEach((radio) => {
    if(radio.checked) {
      difficultyLevel = radio.value;
      return;
    }
  });
};

const checkFlipCount = () => {
  if(flipCount === 0 && hideCount === 0) {
    gameOver('no');
  } else if(flipCount === 0 && hideCount === overCount) {
    gameOver('pass');
  } else if(flipCount === 0 && hideCount !== overCount) {
    gameOver('fail');
  }
};

const shakeCards = (c1, c2) => {
  c1.classList.add("shake");
  c2.classList.add("shake");
  setTimeout(() => {
    c1.classList.remove("shake");
    c2.classList.remove("shake");
  }, 800);
};

const togglePointerEventsOnGameContainer = (value) => {
  gameContainer.style.pointerEvents = `${value}`;
};

const togglePointerEventsOnCard = (card, value) => {
  card.style.pointerEvents = `${value}`;
};

cards.forEach((card) => {
  card.addEventListener("click", (e) => {
    card.classList.add("flipped");
    if (!flag) {
      firstCard = e.target;
      flag = true;
      togglePointerEventsOnCard(firstCard.parentElement, 'none');
    } else {
      secondCard = e.target;
      matchPattern(firstCard, secondCard);
      flag = false;
    }
    flipValue.textContent = `${flipCount}`;
    setTimeout(() => {
      checkFlipCount();
    }, 1000);
  });
});

const matchPattern = (card1, card2) => {
  togglePointerEventsOnGameContainer('none');
  if(card1 != null && card2 != null)
  {
    if (card1.attributes.id.value === card2.attributes.id.value) {
      score += 10;
      scoreValue.textContent = `${score}`;
      setTimeout(() => {
        hideCards(card1, card2);
      }, 1000);
    } else {
      flipCount--;
      setTimeout(() => {
        flipCards(card1, card2);
      }, 800);
    }
  }
  setTimeout(() => {
    togglePointerEventsOnGameContainer('all');
    togglePointerEventsOnCard(firstCard.parentElement, 'inherit');
  }, 1200);
};

const flipCards = (card1, card2) => {
  if(card1 != null && card2 != null) {
    let c1 = card1.parentElement;
    let c2 = card2.parentElement;
    shakeCards(c1, c2);
    setTimeout(() => {
      c1.classList.remove("flipped");
      c2.classList.remove("flipped");
    }, 200);
  }
};

const hideCards = (card1, card2) => {
  if(card1 != null && card2 != null) {
    let c1 = card1.parentElement;
    let c2 = card2.parentElement;
    c1.style.scale = 0;
    c2.style.scale = 0;
  
    hideCount++;
    if(hideCount === overCount) gameOver('pass');

    setTimeout(() => {
      flipCards(card1, card2);
    }, 1500);
  }
};

const showCards = () => {
    cards.forEach((card) => {
        card.style.scale = 1;
        card.classList.remove('flipped');
    });
};

const gameOver = (status) => {

  flipValueEnd.textContent = `${flipValue.textContent}`;
  scoreValueEnd.textContent = `${scoreValue.textContent}/${scoreOutOfValue}`;

  if(status === 'fail') {
    statusHeading.style.color = '#E23D28';
    statusHeading.textContent = `OOPS!`;
    statusMessage.textContent = `You Missed ${overCount - hideCount} Pairs`;
  } else if(status === 'pass') {
    statusHeading.style.color = '#177245';
    statusHeading.textContent = `Hurrah!`;
    statusMessage.textContent = `You Flipped All Pairs`;
  } else {
    statusHeading.style.color = '#E23D28';
    statusHeading.textContent = `Oh No!`;
    statusMessage.textContent = `You Missed All Pairs`;
  }

  setTimeout(() => {
    endOverlay.classList.add("show");
  }, 1200);

  setTimeout(() => {
    showCards();
  }, 1600);
};

const restartGame = () => {
  showCards();
  checkDifficulty();
  createNewGrid(difficultyLevel);
  hideCount = 0;
  score = 0;
  flag = false;
  flipValue.textContent = `${flipCount}`;
  scoreValue.textContent = `${score}`;
};

refreshButton.addEventListener('click', () => {
    togglePointerEventsOnCard(firstCard.parentElement, 'inherit');
    restartGame();
});

startButton.addEventListener("click", () => {
  restartGame();
  startOverlay.classList.add("hide");
});

restartButton.addEventListener('click', () => {
    restartGame();
    endOverlay.classList.remove('show');
});

const toggleDisplayCard = () => {
  cards.forEach((card) => {
    card.style.display = 'none';
  });
};

const gridContent1 = [
  '<div class="front" id="kiwi"><i class="fa-solid fa-paw"></i></div><div class="back"><i class="fa-solid fa-kiwi-bird"></i></div>',
  '<div class="front" id="fish"><i class="fa-solid fa-paw"></i></div><div class="back"><i class="fa-solid fa-fish-fins"></i></div>',
  '<div class="front" id="snowman"><i class="fa-solid fa-paw"></i></div><div class="back"><i class="fa-solid fa-snowman"></i></div>',
  '<div class="front" id="kiwi"><i class="fa-solid fa-paw"></i></div><div class="back"><i class="fa-solid fa-kiwi-bird"></i></div>',
  '<div class="front" id="dove"><i class="fa-solid fa-paw"></i></div><div class="back"><i class="fa-solid fa-dove"></i></div>',
  '<div class="front" id="fish"><i class="fa-solid fa-paw"></i></div><div class="back"><i class="fa-solid fa-fish-fins"></i></div>',
  '<div class="front" id="spider"><i class="fa-solid fa-paw"></i></div><div class="back"><i class="fa-solid fa-spider"></i></div>',
  '<div class="front" id="cat"><i class="fa-solid fa-paw"></i></div><div class="back"><i class="fa-solid fa-cat"></i></div>',
  '<div class="front" id="spider"><i class="fa-solid fa-paw"></i></div><div class="back"><i class="fa-solid fa-spider"></i></div>',
  '<div class="front" id="dove"><i class="fa-solid fa-paw"></i></div><div class="back"><i class="fa-solid fa-dove"></i></div>',
  '<div class="front" id="dog"><i class="fa-solid fa-paw"></i></div><div class="back"><i class="fa-solid fa-dog"></i></div>',
  '<div class="front" id="cat"><i class="fa-solid fa-paw"></i></div><div class="back"><i class="fa-solid fa-cat"></i></div>',
  '<div class="front" id="mosquito"><i class="fa-solid fa-paw"></i></div><div class="back"><i class="fa-solid fa-mosquito"></i></div>',
  '<div class="front" id="dog"><i class="fa-solid fa-paw"></i></div><div class="back"><i class="fa-solid fa-dog"></i></div>',
  '<div class="front" id="snowman"><i class="fa-solid fa-paw"></i></div><div class="back"><i class="fa-solid fa-snowman"></i></div>',
  '<div class="front" id="mosquito"><i class="fa-solid fa-paw"></i></div><div class="back"><i class="fa-solid fa-mosquito"></i></div>',
]; // 16

const gridContent2 = [
  '<div class="front" id="kiwi"><i class="fa-solid fa-paw"></i></div><div class="back"><i class="fa-solid fa-kiwi-bird"></i></div>',
  '<div class="front" id="fish"><i class="fa-solid fa-paw"></i></div><div class="back"><i class="fa-solid fa-fish-fins"></i></div>',
  '<div class="front" id="snowman"><i class="fa-solid fa-paw"></i></div><div class="back"><i class="fa-solid fa-snowman"></i></div>',
  '<div class="front" id="kiwi"><i class="fa-solid fa-paw"></i></div><div class="back"><i class="fa-solid fa-kiwi-bird"></i></div>',
  '<div class="front" id="dove"><i class="fa-solid fa-paw"></i></div><div class="back"><i class="fa-solid fa-dove"></i></div>',
  '<div class="front" id="fish"><i class="fa-solid fa-paw"></i></div><div class="back"><i class="fa-solid fa-fish-fins"></i></div>',
  '<div class="front" id="spider"><i class="fa-solid fa-paw"></i></div><div class="back"><i class="fa-solid fa-spider"></i></div>',
  '<div class="front" id="cat"><i class="fa-solid fa-paw"></i></div><div class="back"><i class="fa-solid fa-cat"></i></div>',
  '<div class="front" id="spider"><i class="fa-solid fa-paw"></i></div><div class="back"><i class="fa-solid fa-spider"></i></div>',
  '<div class="front" id="dove"><i class="fa-solid fa-paw"></i></div><div class="back"><i class="fa-solid fa-dove"></i></div>',
  '<div class="front" id="dog"><i class="fa-solid fa-paw"></i></div><div class="back"><i class="fa-solid fa-dog"></i></div>',
  '<div class="front" id="cat"><i class="fa-solid fa-paw"></i></div><div class="back"><i class="fa-solid fa-cat"></i></div>',
  '<div class="front" id="mosquito"><i class="fa-solid fa-paw"></i></div><div class="back"><i class="fa-solid fa-mosquito"></i></div>',
  '<div class="front" id="dog"><i class="fa-solid fa-paw"></i></div><div class="back"><i class="fa-solid fa-dog"></i></div>',
  '<div class="front" id="snowman"><i class="fa-solid fa-paw"></i></div><div class="back"><i class="fa-solid fa-snowman"></i></div>',
  '<div class="front" id="heart"><i class="fa-solid fa-paw"></i></div><div class="back"><i class="fa-solid fa-heart"></i></div>',
  '<div class="front" id="skull"><i class="fa-solid fa-paw"></i></div><div class="back"><i class="fa-solid fa-skull-crossbones"></i></div>',
  '<div class="front" id="mosquito"><i class="fa-solid fa-paw"></i></div><div class="back"><i class="fa-solid fa-mosquito"></i></div>',
  '<div class="front" id="heart"><i class="fa-solid fa-paw"></i></div><div class="back"><i class="fa-solid fa-heart"></i></div>',
  '<div class="front" id="skull"><i class="fa-solid fa-paw"></i></div><div class="back"><i class="fa-solid fa-skull-crossbones"></i></div>',
]; // 20

const gridContent3 = [
  '<div class="front" id="kiwi"><i class="fa-solid fa-paw"></i></div><div class="back"><i class="fa-solid fa-kiwi-bird"></i></div>',
  '<div class="front" id="fish"><i class="fa-solid fa-paw"></i></div><div class="back"><i class="fa-solid fa-fish-fins"></i></div>',
  '<div class="front" id="snowman"><i class="fa-solid fa-paw"></i></div><div class="back"><i class="fa-solid fa-snowman"></i></div>',
  '<div class="front" id="kiwi"><i class="fa-solid fa-paw"></i></div><div class="back"><i class="fa-solid fa-kiwi-bird"></i></div>',
  '<div class="front" id="dove"><i class="fa-solid fa-paw"></i></div><div class="back"><i class="fa-solid fa-dove"></i></div>',
  '<div class="front" id="fish"><i class="fa-solid fa-paw"></i></div><div class="back"><i class="fa-solid fa-fish-fins"></i></div>',
  '<div class="front" id="spider"><i class="fa-solid fa-paw"></i></div><div class="back"><i class="fa-solid fa-spider"></i></div>',
  '<div class="front" id="cat"><i class="fa-solid fa-paw"></i></div><div class="back"><i class="fa-solid fa-cat"></i></div>',
  '<div class="front" id="spider"><i class="fa-solid fa-paw"></i></div><div class="back"><i class="fa-solid fa-spider"></i></div>',
  '<div class="front" id="dove"><i class="fa-solid fa-paw"></i></div><div class="back"><i class="fa-solid fa-dove"></i></div>',
  '<div class="front" id="dog"><i class="fa-solid fa-paw"></i></div><div class="back"><i class="fa-solid fa-dog"></i></div>',
  '<div class="front" id="cat"><i class="fa-solid fa-paw"></i></div><div class="back"><i class="fa-solid fa-cat"></i></div>',
  '<div class="front" id="mosquito"><i class="fa-solid fa-paw"></i></div><div class="back"><i class="fa-solid fa-mosquito"></i></div>',
  '<div class="front" id="dog"><i class="fa-solid fa-paw"></i></div><div class="back"><i class="fa-solid fa-dog"></i></div>',
  '<div class="front" id="snowman"><i class="fa-solid fa-paw"></i></div><div class="back"><i class="fa-solid fa-snowman"></i></div>',
  '<div class="front" id="heart"><i class="fa-solid fa-paw"></i></div><div class="back"><i class="fa-solid fa-heart"></i></div>',
  '<div class="front" id="skull"><i class="fa-solid fa-paw"></i></div><div class="back"><i class="fa-solid fa-skull-crossbones"></i></div>',
  '<div class="front" id="mosquito"><i class="fa-solid fa-paw"></i></div><div class="back"><i class="fa-solid fa-mosquito"></i></div>',
  '<div class="front" id="heart"><i class="fa-solid fa-paw"></i></div><div class="back"><i class="fa-solid fa-heart"></i></div>',
  '<div class="front" id="skull"><i class="fa-solid fa-paw"></i></div><div class="back"><i class="fa-solid fa-skull-crossbones"></i></div>',
  '<div class="front" id="basketball"><i class="fa-solid fa-paw"></i></div><div class="back"><i class="fa-solid fa-basketball"></i></div>',
  '<div class="front" id="hammer"><i class="fa-solid fa-paw"></i></div><div class="back"><i class="fa-solid fa-hammer"></i></div>',
  '<div class="front" id="hammer"><i class="fa-solid fa-paw"></i></div><div class="back"><i class="fa-solid fa-hammer"></i></div>',
  '<div class="front" id="basketball"><i class="fa-solid fa-paw"></i></div><div class="back"><i class="fa-solid fa-basketball"></i></div>',
]; // 24

const createNewGrid = (difficultyLevel) => {
  gridContent1.sort(() => Math.random() - 0.5);
  gridContent2.sort(() => Math.random() - 0.5);
  gridContent3.sort(() => Math.random() - 0.5);

  toggleDisplayCard();

  if(difficultyLevel === 'easy') {
    for(var i=0; i<16; i++) {
      cards[i].innerHTML = gridContent1[i];
      cards[i].style.display = 'block';
    }
    gameContainer.style.height = '330px';
    overCount = 8;
    flipCount = 12;
    scoreOutOfValue = 80;
  } else if(difficultyLevel === 'medium') {
    for(var i=0; i<20; i++) {
      cards[i].innerHTML = gridContent2[i];
      cards[i].style.display = 'block';
    }
    gameContainer.style.height = '410px';
    overCount = 10;
    flipCount = 14;
    scoreOutOfValue = 100;
  } else {
    for(var i=0; i<24; i++) {
      cards[i].innerHTML = gridContent3[i];
      cards[i].style.display = 'block';
    }
    gameContainer.style.height = '510px';
    overCount = 12;
    flipCount = 16;
    scoreOutOfValue = 120;
  }
}; createNewGrid('easy');
