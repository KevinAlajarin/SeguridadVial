document.addEventListener('DOMContentLoaded', () => {
    const palabras = ['cinturon', 'semaforo', 'ciclovia','peaton', 'conductor', 'licencia', 'velocidad','precaucion','rotonda','calle','avenida','ruta','autopista','prioridad'];
    let palabra = '';
    let palabraAdivinada = [];
    let multas = 0;
    const maxMultas = 6;

    const palabraElemento = document.getElementById('word');
    const letrasElemento = document.getElementById('letters');
    const estadoElemento = document.getElementById('status');
    const playAgainButton = document.getElementById('play-again');

    function iniciarJuego() {
        palabra = palabras[Math.floor(Math.random() * palabras.length)];
        palabraAdivinada = Array(palabra.length).fill('_');
        multas = 0;
        actualizarPalabra();
        actualizarEstado('');
        crearBotonesLetras();
        playAgainButton.style.display = 'none';
    }

    function actualizarPalabra() {
        palabraElemento.textContent = palabraAdivinada.join(' ');
    }

    function crearBotonesLetras() {
        letrasElemento.innerHTML = '';
        for (let i = 97; i <= 122; i++) {
            const letra = String.fromCharCode(i);
            const boton = document.createElement('button');
            boton.textContent = letra;
            boton.className = 'letter';
            boton.addEventListener('click', () => adivinarLetra(letra, boton));
            letrasElemento.appendChild(boton);
        }
    }

    function adivinarLetra(letra, boton) {
        boton.classList.add('disabled');
        boton.disabled = true;
        
        if (palabra.includes(letra)) {
            for (let i = 0; i < palabra.length; i++) {
                if (palabra[i] === letra) {
                    palabraAdivinada[i] = letra;
                }
            }
            actualizarPalabra();

            if (!palabraAdivinada.includes('_')) {
                actualizarEstado('¡Ganaste! Conoces los elementos de seguridad vial.');
                finJuego();
            }
        } else {
            multas++;
            if (multas === maxMultas) {
                actualizarEstado(`Perdiste tu licencia de conducir. La palabra era: ${palabra}`);
                finJuego();
            } else {
                actualizarEstado(`Acumulaste ${multas} multa(s). Te quedan ${maxMultas - multas} intento(s).`);
            }
        }
    }

    function actualizarEstado(mensaje) {
        estadoElemento.textContent = mensaje;
    }

    function finJuego() {
        const botonesLetras = document.querySelectorAll('.letter');
        botonesLetras.forEach(boton => {
            boton.classList.add('disabled');
            boton.disabled = true;
        });
        playAgainButton.style.display = 'block';
        playAgainButton.addEventListener('click', () => {
            iniciarJuego();
        });
    }

    iniciarJuego();
});
