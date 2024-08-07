const unorderQuestions = [
  {
    question:
      "¿Que color de luz de semaforo permite el avance de los vehiculos?",
    image: "./assets/quiz1.png",
    choices: ["Rojo", "Amarillo", "Verde"],
    correct: 2,
  },
  {
    question: "¿A qué se denomina incidente de tránsito o incidente vial?",
    image: "./assets/quiz2.png",
    choices: [
      "Hecho impredecible e inevitable en ocasión de circulación en la vía pública.",
      "Hecho que puede ser evitado, en el cual se produce daño a persona o cosa, en ocasión de circulación en la vía pública.",
      "Hecho, evitable o no, que involucra daños a terceros.",
    ],
    correct: 1,
  },
  {
    question:
      "“Cada usuario de la vía pública es responsable de una parte del tránsito.” ¿Es correcta ésta premisa?",
    image: "./assets/quiz3.png",
    choices: [
      "No, porque los que tienen responsabilidad son aquellos que conducen cualquier tipo de vehículo.",
      "Sí, porque se está obligado a no causar peligro ni entorpecer la circulación.",
      "No, la responsabilidad la asumen aquellos que obtienen una licencia de conducir.",
    ],
    correct: 1,
  },
];

const questions = unorderQuestions.sort(() => Math.random() - 0.5);

let currentQuestion = 0;
let correctAnswers = 0;

function startGame() {
  // obtener el contenedor de la pregunta quiz-container y remplazarlo con html
  const quizContainer = document.querySelector(".quiz-container");
  quizContainer.innerHTML = `
    <h1>Preguntados</h1>
    <div class="question">
        <p id="question-text"></p>
         <div class="text-center">
            <img src="" id="question-img">
        </div>
        <div class="choices">
            <button class="choice" onclick="checkAnswer(0)"></button>
            <button class="choice" onclick="checkAnswer(1)"></button>
            <button class="choice" onclick="checkAnswer(2)"></button>
        </div>
        <p id="feedback"></p>
    </div>
  `;
  showQuestion();
}
// ./assets/quiz1.png
function showQuestion() {
  const questionText = document.getElementById("question-text");
  const img = document.getElementById("question-img");

  questionText.textContent = questions[currentQuestion].question;
  img.src = questions[currentQuestion].image;

  const choices = document.querySelectorAll(".choice");
  choices.forEach((choice, index) => {
    choice.textContent = questions[currentQuestion].choices[index];
  });

  const feedback = document.getElementById("feedback");
  feedback.textContent = "";
}

function checkAnswer(selected) {
  const feedback = document.getElementById("feedback");
  if (selected === questions[currentQuestion].correct) {
    feedback.innerHTML =
      '<label class="text-success text-center">Correcto!</label>';
    correctAnswers++;
  } else {
    feedback.innerHTML =
      '<label class="text-danger text-center">Incorrecto!</label>';
  }

  setTimeout(() => {
    currentQuestion++;
    const buttons = document.querySelectorAll(".choice");
    buttons.forEach((button) => {
      button.disabled = true;
    });

    if (currentQuestion < questions.length) {
      const buttons = document.querySelectorAll(".choice");
      buttons.forEach((button) => {
        button.disabled = false;
      });
      showQuestion();
    } else {
      const quizContainer = document.querySelector(".quiz-container");
      quizContainer.innerHTML = `<p class='text-center'>
        Usted ha acertado ${correctAnswers} de ${questions.length} respuestas.
        </br></br>
        <button onClick="window.location.reload();">Volver a jugar</button>
        </p>`;
    }
  }, 1000);
}

showQuestion();
