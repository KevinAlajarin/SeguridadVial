document.addEventListener('DOMContentLoaded', () => {
    const trafficLightCars = document.getElementById('traffic-light-cars');
    const trafficLightPedestrians = document.getElementById('traffic-light-pedestrians');
    const crossButton = document.getElementById('cross-button');
    const message = document.getElementById('message');
    const countdown = document.getElementById('countdown');
    const crossCount = document.getElementById('cross-count');
    const gameTimer = document.getElementById('game-timer');
    const endGameModal = document.getElementById('end-game-modal');
    const endGameMessage = document.getElementById('end-game-message');
    const restartButton = document.getElementById('restart-button');

    let isGreenForCars = false;
    let timeLeft = 3;
    let successfulCrosses = 0;
    let yellowLightDuration = 1;
    let isYellowLight = false;
    let gameTime = 60;
    const requiredCrosses = 10;

    // Cambiar el color del semáforo para autos y peatones
    function toggleTrafficLights() {
        if (isYellowLight) {
            isGreenForCars = !isGreenForCars;
            trafficLightCars.classList.toggle('green', isGreenForCars);
            trafficLightCars.classList.toggle('red', !isGreenForCars);
            trafficLightPedestrians.classList.toggle('green', !isGreenForCars);
            trafficLightPedestrians.classList.toggle('red', isGreenForCars);
            isYellowLight = false;
            timeLeft = 3;
        } else {
            isYellowLight = true;
            timeLeft = yellowLightDuration;
        }
        updateLights();
    }

    // Actualizar el estado de las luces
    function updateLights() {
        const carLights = trafficLightCars.querySelectorAll('.light');
        const pedestrianLights = trafficLightPedestrians.querySelectorAll('.light');

        carLights[0].classList.toggle('active', !isGreenForCars && !isYellowLight);
        carLights[1].classList.toggle('active', isYellowLight);
        carLights[2].classList.toggle('active', isGreenForCars && !isYellowLight);

        pedestrianLights[0].classList.toggle('active', isGreenForCars && !isYellowLight);
        pedestrianLights[1].classList.toggle('active', isYellowLight);
        pedestrianLights[2].classList.toggle('active', !isGreenForCars && !isYellowLight);
    }

    // Actualizar el contador de tiempo
    function updateCountdown() {
        countdown.textContent = `Tiempo para cambiar: ${timeLeft}`;
        if (timeLeft === 0) {
            toggleTrafficLights();
        }
        timeLeft--;
    }

    // Temporizador del juego
    function updateGameTimer() {
        gameTimer.textContent = `Tiempo restante: ${gameTime}`;
        if (gameTime === 0) {
            endGame();
        }
        gameTime--;
    }

    // Finalizar el juego
    function endGame() {
        clearInterval(countdownInterval);
        clearInterval(gameTimerInterval);
        crossButton.disabled = true;
        if (successfulCrosses >= requiredCrosses) {
            endGameMessage.textContent = `¡Felicidades! Has ganado el juego con ${successfulCrosses} cruces exitosos.`;
            endGameMessage.style.color = 'green';
        } else {
            endGameMessage.textContent = `Tiempo agotado. Tuviste ${successfulCrosses} cruces exitosos. Intenta de nuevo.`;
            endGameMessage.style.color = 'red';
        }
        endGameModal.classList.remove('hidden');
    }

    // Cambiar el semáforo cada segundo
    const countdownInterval = setInterval(updateCountdown, 1000);

    // Actualizar el temporizador del juego cada segundo
    const gameTimerInterval = setInterval(updateGameTimer, 1000);

    // Manejar el clic del botón
    crossButton.addEventListener('click', () => {
        if (!isGreenForCars && !isYellowLight) {
            message.textContent = '¡Puedes cruzar!';
            message.style.color = 'green';
            successfulCrosses++;
            crossCount.textContent = `Cruces exitosos: ${successfulCrosses}`;
        } else {
            message.textContent = 'Espera, el semáforo está en rojo para peatones.';
            message.style.color = 'red';
        }
    });

    // Manejar el clic del botón de reinicio
    restartButton.addEventListener('click', () => {
        location.reload();
    });

    // Inicializar las luces
    updateLights();
});
