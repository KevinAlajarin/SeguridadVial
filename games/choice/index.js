const info_arr = [
    {
        question: "Seleccione la forma correcta de colocar un casco",
        options: ['./images/casco_1.png', './images/casco_2.png', './images/casco_3.png'],
        correct: './images/casco_1.png'
    },
    {
        question: "Seleccione la señal que indica prioridad",
        options: ['./images/de_restricción.png', './images/de_prioridad.png', './images/de_prohibición.png'],
        correct: './images/de_prioridad.png'
    },
    {
        question: "Seleccione la señal que indica no cambiar de carril",
        options: ['./images/no_avanzar.png', './images/no_cambiar_de_carril.png', './images/no_estacionar.png', './images/no_girar_en_u.png'],
        correct: './images/no_cambiar_de_carril.png'
    },
    {
        question: "Seleccione la señal que indica cruce de peatones",
        options: ['./images/comienzo de doble mano.png', './images/pare.png', './images/cruce de peatones.png'],
        correct: './images/cruce de peatones.png'
    },
    {
        question: "¿Cuál de las siguientes señales de tránsito tiene mayor prioridad al momento de conducir?",
        options: ['./images/prioridad_2.png', './images/prioridad_1.png', './images/prioridad_4.png', './images/prioridad_3.png'],
        correct: './images/prioridad_1.png'
    }
];

const container = document.getElementById('vialmente-answers-container');
const questionContainer = document.getElementById('question-container');
const feedbackModal = document.getElementById('feedback-modal')
const modalMessage = document.getElementById('modal-message');
const rerunGameButton = document.getElementById('rerun-game-button')
const scoreContainer = document.getElementById('vialmente-score-div')



let current;
let score;
let gameStarted = false;

function startGame() {
    current = 0; 
    score = 0;
    gameStarted = true;
    rerunGameButton.classList.add('d-none')
    updateScore()
    shuffleArray(info_arr)
    showImages();
}

function shuffleArray(array) {
    array.sort(() => Math.random() - 0.5)
}

function showImages() {
    if (current < info_arr.length) {
        const imageTags = info_arr[current].options.map(e => `<div class="vialmente-card"><img src="${e}" class="vialmente-option"></div>`);
        container.innerHTML = imageTags.join('');
        questionContainer.innerHTML = `<h2>${info_arr[current].question}</h2>`;

        document.querySelectorAll('.vialmente-option').forEach(img => {
            img.addEventListener('click', handleOptionClick);
        });
    } else {
        container.innerHTML = `<p>Has completado todas las preguntas. ¡Bien hecho! Tu puntaje final: ${score} puntos</p>`;
        questionContainer.innerHTML = '';
        scoreContainer.style.display = 'none'
        rerunGameButton.classList.remove("d-none");
        rerunGameButton.classList.add('d-block')
    }
}

function handleOptionClick(event) {
    const selectedOption = event.target.getAttribute('src');
    const correctOption = info_arr[current].correct;
    if (selectedOption === correctOption) {
        score = score + 100
        showModal('¡Correcto! Sumaste 100 puntos');
        updateScore()

    } else {
        score = score - 20
        showModal('Incorrecto, perdiste 20 puntos.');
        updateScore()

    }
    current++
    setTimeout(() => {
        hideModal();
        showImages();
    }, 1000);
}

function showModal(message) {
    modalMessage.innerText = message;
    feedbackModal.style.display = 'block';
}

function hideModal() {
    feedbackModal.style.display = 'none';
}

function updateScore() {
    scoreContainer.innerText = `Tu puntaje actual: ${score}`

}

startGame()