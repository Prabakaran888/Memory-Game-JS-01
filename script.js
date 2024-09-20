const cards = [
    'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D',
    'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'
];

let cardElements = [];
let flippedCards = [];
let matchedPairs = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createBoard() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = '';
    shuffle(cards).forEach((card) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.cardValue = card;
        cardElement.addEventListener('click', flipCard);
        gameContainer.appendChild(cardElement);
        cardElements.push(cardElement);
    });
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        this.textContent = this.dataset.cardValue;
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            setTimeout(checkForMatch, 1000);
        }
    }
}

function checkForMatch() {
    const [firstCard, secondCard] = flippedCards;
    if (firstCard.dataset.cardValue === secondCard.dataset.cardValue) {
        matchedPairs++;
        if (matchedPairs === cards.length / 2) {
            alert('You found all pairs!');
        }
    } else {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.textContent = '';
        secondCard.textContent = '';
    }
    flippedCards = [];
}

document.getElementById('restart').addEventListener('click', () => {
    cardElements = [];
    flippedCards = [];
    matchedPairs = 0;
    createBoard();
});

createBoard();
