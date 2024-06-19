document.addEventListener('DOMContentLoaded', () => {
    const choices = document.querySelectorAll('.choice');
    const userChoiceDisplay = document.getElementById('user-choice');
    const computerChoiceDisplay = document.getElementById('computer-choice');
    const resultDisplay = document.getElementById('result');
    const choicesArray = ['Cruce de Peatones', 'Señal de Stop', 'Señal de Ceda el Paso'];

    choices.forEach(choice => choice.addEventListener('click', (e) => {
        const userChoice = e.target.textContent; 
        userChoiceDisplay.textContent = `Tu elección: ${userChoice}`;
        const computerChoice = choicesArray[Math.floor(Math.random() * choicesArray.length)]; 
        computerChoiceDisplay.textContent = `Elección de la computadora: ${computerChoice}`;
        const result = determineWinner(userChoice, computerChoice);
        resultDisplay.textContent = `Resultado: ${result}`;
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
});
