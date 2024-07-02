document.addEventListener('DOMContentLoaded', () => {
    const choices = document.querySelectorAll('.choice');
    const userChoiceDisplay = document.getElementById('user-choice');
    const computerChoiceDisplay = document.getElementById('computer-choice');
    const resultDisplay = document.getElementById('result');
    const winnerImage = document.getElementById('winner-image');
    const choicesArray = ['Cruce de Peatones', 'Señal de Stop', 'Señal de Ceda el Paso'];

    choices.forEach(choice => choice.addEventListener('click', (e) => {
        const userChoice = e.target.textContent;
        userChoiceDisplay.textContent = `Tu elección: ${userChoice}`;
        const computerChoice = choicesArray[Math.floor(Math.random() * choicesArray.length)];
        computerChoiceDisplay.innerHTML = `Elección de la <span class="computer">computadora</span>: ${computerChoice}`;
        const result = determineWinner(userChoice, computerChoice);
        resultDisplay.textContent = `Resultado: ${result}`;
        updateResultStyle(result);
        updateWinnerImage(userChoice, result);
    }));

    function determineWinner(userChoice, computerChoice) {
        if (userChoice === computerChoice) {
            return 'Es un empate';
        } else if (
            (userChoice === 'Cruce de Peatones' && computerChoice === 'Señal de Stop') ||
            (userChoice === 'Señal de Stop' && computerChoice === 'Señal de Ceda el Paso') ||
            (userChoice === 'Señal de Ceda el Paso' && computerChoice === 'Cruce de Peatones')
        ) {
            return '¡Ganaste!';
        } else {
            return 'Perdiste';
        }
    }

    function updateResultStyle(result) {
        resultDisplay.classList.remove('light-green', 'light-red', 'light-blue');
        switch (result) {
            case '¡Ganaste!':
                resultDisplay.classList.add('light-green');
                break;
            case 'Perdiste':
                resultDisplay.classList.add('light-red');
                break;
            case 'Es un empate':
                resultDisplay.classList.add('light-blue');
                break;
            default:
                break;
        }
    }

    function updateWinnerImage(userChoice, result) {
        const imageMapping = {
            'Cruce de Peatones': {
                '¡Ganaste!': 'Imagenes/cruce_de_peatones.jpg',
                'Perdiste': 'Imagenes/señal_de_ceda_el_paso.webp',
                'Es un empate': 'Imagenes/cruce_de_peatones.jpg'
            },
            'Señal de Stop': {
                '¡Ganaste!': 'Imagenes/señal_de_stop.jpg',
                'Perdiste': 'Imagenes/cruce_de_peatones.jpg',
                'Es un empate': 'Imagenes/señal_de_stop.jpg'
            },
            'Señal de Ceda el Paso': {
                '¡Ganaste!': 'Imagenes/señal_de_ceda_el_paso.webp',
                'Perdiste': 'Imagenes/señal_de_stop.jpg',
                'Es un empate': 'Imagenes/señal_de_ceda_el_paso.webp'
            }
        };

        winnerImage.src = imageMapping[userChoice][result]; 

        if (!imageMapping[userChoice][result]) {
            winnerImage.src = ''; 
        }

        switch (result) {
            case '¡Ganaste!':
                winnerImage.alt = userChoice;
                break;
            case 'Perdiste':
                winnerImage.alt = userChoice === 'Cruce de Peatones' ? 'Señal de Ceda el Paso' : 'Señal de Stop';
                break;
            case 'Es un empate':
                winnerImage.alt = userChoice;
                break;
            default:
                winnerImage.alt = '';
                break;
        }
    }
});
