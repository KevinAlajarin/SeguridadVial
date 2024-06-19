const cardsArray = [
    { name: 'card1', img: 'Imagenes/imagen1.png' },
    { name: 'card2', img: 'Imagenes/imagen2.png' },
    { name: 'card3', img: 'Imagenes/imagen3.png' },
    { name: 'card4', img: 'Imagenes/imagen4.png' },
    { name: 'card5', img: 'Imagenes/imagen5.png' },
    { name: 'card6', img: 'Imagenes/imagen6.png' },
    { name: 'card7', img: 'Imagenes/imagen7.png' },
    { name: 'card8', img: 'Imagenes/imagen8.png' },
    { name: 'card1', img: 'Imagenes/imagen1.png' },
    { name: 'card2', img: 'Imagenes/imagen2.png' },
    { name: 'card3', img: 'Imagenes/imagen3.png' },
    { name: 'card4', img: 'Imagenes/imagen4.png' },
    { name: 'card5', img: 'Imagenes/imagen5.png' },
    { name: 'card6', img: 'Imagenes/imagen6.png' },
    { name: 'card7', img: 'Imagenes/imagen7.png' },
    { name: 'card8', img: 'Imagenes/imagen8.png' }
];

cardsArray.sort(() => 0.5 - Math.random());

const gameBoard = document.getElementById('gameBoard');
const scoreElement = document.getElementById('score');
const errorsElement = document.getElementById('errors');
const victoryMessage = document.getElementById('victoryMessage');
const defeatMessage = document.getElementById('defeatMessage');
const restartMessage = document.getElementById('restartMessage');
const restartButton = document.getElementById('restartButton');
let score = 0;
let errors = 10;
const maxErrors = 10;
let matchedPairs = 0;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function createBoard() {
    cardsArray.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.setAttribute('data-name', card.name);

        const frontFace = document.createElement('img');
        frontFace.src = card.img;
        frontFace.classList.add('front');

        const backFace = document.createElement('div');
        backFace.classList.add('back');
        backFace.textContent = '?';

        cardElement.appendChild(frontFace);
        cardElement.appendChild(backFace);

        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    score += 10;
    matchedPairs++;
    scoreElement.textContent = score;

    if (matchedPairs === cardsArray.length / 2) {
        victoryMessage.style.display = 'block';
        restartMessage.style.display = 'block';
    }

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        errors--;
        errorsElement.textContent = errors;
        
        if (score >= 10) {
            score -= 10;
            scoreElement.textContent = score;
        }

        if (errors <= 0) {
            defeatMessage.style.display = 'block';
            restartMessage.style.display = 'block';
            disableAllCards();
        }

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function disableAllCards() {
    const allCards = document.querySelectorAll('.card');
    allCards.forEach(card => card.removeEventListener('click', flipCard));
}

function restartGame() {
   
    restartMessage.style.display = 'none';

    
    score = 0;
    errors = 10;
    matchedPairs = 0;
    scoreElement.textContent = score;
    errorsElement.textContent = errors;
    victoryMessage.style.display = 'none';
    defeatMessage.style.display = 'none';

    
    gameBoard.innerHTML = '';
    cardsArray.sort(() => 0.5 - Math.random());
    createBoard();
}

createBoard();

