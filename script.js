let firstCard, secondCard;
let flipCount = 0;
let hideCount = 0;
let flag = false;

const refreshButton = document.querySelector(".reset-btn");
const restartButton = document.querySelector(".restart-btn");
const endOverlay = document.querySelector(".end-overlay");
const startButton = document.querySelector(".start-btn");
const startOverlay = document.querySelector(".start-overlay");
const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
  card.addEventListener("click", (e) => {
    card.classList.add("flipped");
    if (!flag) {
      firstCard = e.target;
      flag = true;
      flipCount++;
    } else {
      secondCard = e.target;
      matchPattern(firstCard, secondCard);
      flag = false;
      flipCount++;
    }
  });
});

const matchPattern = (card1, card2) => {
  if (card1.attributes.id.value === card2.attributes.id.value) {
    setTimeout(() => {
      hideCards(card1, card2);
    }, 1000);
  } else {
    setTimeout(() => {
      flipCards(card1, card2);
    }, 1000);
  }
};

const flipCards = (card1, card2) => {
  let c1 = card1.parentElement;
  let c2 = card2.parentElement;
  c1.classList.remove("flipped");
  c2.classList.remove("flipped");
};

const hideCards = (card1, card2) => {
  let c1 = card1.parentElement;
  let c2 = card2.parentElement;
  c1.style.scale = 0;
  c2.style.scale = 0;

  hideCount++;
  if (hideCount == 8) {
    gameOver();
  }

  setTimeout(() => {
    flipCards(card1, card2);
  }, 1500);
};

const showCards = () => {
    cards.forEach((card) => {
        card.style.scale = 1;
        card.classList.remove('flipped');
    });
};

const gameOver = () => {
  setTimeout(() => {
    endOverlay.classList.add("show");
  }, 1200);

  setTimeout(() => {
    showCards();
  }, 1600);
};

const restartGame = () => {
    showCards();
    createNewGrid();
    flipCount = 0;
    hideCount = 0;
    flag = false;
};

refreshButton.addEventListener('click', () => {
    restartGame();
});

startButton.addEventListener("click", () => {
  startOverlay.classList.add("hide");
});

restartButton.addEventListener('click', () => {
    endOverlay.classList.remove('show');
    restartGame();
});

const gridContent = [
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
];

const createNewGrid = () => {
  gridContent.sort(() => Math.random() - 0.5);
  cards.forEach((card, index) => {
    card.innerHTML = gridContent[index];
  });
}; createNewGrid();
