const info_arr = [
    {
        question: "Seleccione la forma correcta de colocar un casco",
        options: ['./images/casco_1.png', './images/casco_2.png', './images/casco_3.png'],
        correct: './images/casco_1.png',
        explanation: 'El casco debe de ir centrado y perfectamente ajustado, de manera que no se deslice y limite el campo de visión.'
    },
    {
        question: "Seleccione la señal que indica prioridad",
        options: ['./images/de_restricción.png', './images/de_prioridad.png', './images/de_prohibición.png'],
        correct: './images/de_prioridad.png',
        explanation: 'Las señales de prioridad son aquellas que indican reglas de prioridad en los cruces, intersecciones o pasos estrechos,'

    },
    {
        question: "Seleccione la señal que indica no cambiar de carril",
        options: ['./images/no_avanzar.png', './images/no_cambiar_de_carril.png', './images/no_estacionar.png', './images/no_girar_en_u.png'],
        correct: './images/no_cambiar_de_carril.png',
        explanation: "La señal que indica no cambiar de carril muestra los colores de las señales de prohibición y una flecha que cruza ambos carriles"
        
    },
    {
        question: "Seleccione la señal que indica cruce de peatones",
        options: ['./images/comienzo de doble mano.png', './images/pare.png', './images/crucedepeatones.png'],
        correct: './images/crucedepeatones.png',
        explanation: "La señal que indica el cruce de peatones muestra una persona cruzando una senda peatonal."
    },
    {
        question: "¿Cuál de las siguientes señales de tránsito tiene mayor prioridad al momento de conducir?",
        options: ['./images/prioridad_2.png', './images/prioridad_1.png', './images/prioridad_4.png', './images/prioridad_3.png'],
        correct: './images/prioridad_1.png',
        explanation: "Siempre que haya un agente de tránsito, debemos respetarlo como la señal más importante"
    }
];

const container = document.getElementById('vialmente-answers-container');
const questionContainer = document.getElementById('question-container');
const feedbackModal = document.getElementById('feedback-modal')
const modalMessage = document.getElementById('modal-message');
const rerunGameButton = document.getElementById('rerun-game-button')
const scoreContainer = document.getElementById('vialmente-score-div')
const questionsCounter = document.getElementById('question-counter')




let current;
let score;
let gameStarted = false;
let totalQuestions = info_arr.length

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
        const finalMessage = score === 100 ? 'Has obtenido un puntaje perfecto' : score >= 50 ? 'Estuviste muy bien' : 'Sigue practicando, puedes hacerlo mejor'
        container.innerHTML = `
        <div class="final-message-container">
            <p>Has completado todas las preguntas. ¡Bien hecho!</p>
            <p>Tu puntaje final: <span class="final-score">${score} puntos</span></p>
            <p class="final-message">${finalMessage}</p>
        </div>
    `;  
            questionContainer.innerHTML = '';
        scoreContainer.style.display = 'none'
        rerunGameButton.classList.remove("d-none");
        rerunGameButton.classList.add('d-block')
    }
    questionsCounter.innerText = `${current}/${totalQuestions}`

}

function handleOptionClick(event) {
    const selectedOption = event.target.getAttribute('src');
    const correctOption = info_arr[current].correct;
    const explanation = info_arr[current].explanation
    const isCorrect = selectedOption === correctOption
    if (isCorrect) {
        score = score + 100
        showModal('¡Correcto! Sumaste 100 puntos', isCorrect, correctOption, explanation);
        updateScore()

    } else {
        score = score - 20
        showModal('Incorrecto, perdiste 20 puntos.', isCorrect, correctOption, explanation);
        updateScore()

    }
    current++
}

function showModal(message, isCorrect, correctOption, explanation) {
        modalMessage.innerHTML = isCorrect ? `
        <h3>${message}</h3>
        <p>${explanation}</p>
        ` : `
        <div class="vialmente-modal-explanation">
        <h3>${message}</h3>
          <h4>La respuesta correcta era: </h4>
          <img src=${correctOption} width="60px"></img>
          <p>${explanation}</p>
        </div>
      `

    modalMessage.innerHTML += '<button id="close-modal-button" class="btn btn-secondary">Cerrar</button>';
    feedbackModal.style.display = 'block';
    document.getElementById('close-modal-button').addEventListener('click', () => {
        hideModal();
        showImages();
    });
}

function hideModal() {
    feedbackModal.style.display = 'none';
}

function updateScore() {
    scoreContainer.innerText = `Tu puntaje actual: ${score}`
}

startGame()