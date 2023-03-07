/* 
L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
Ogni cella ha un numero progressivo, da 1 a 100.
Ci saranno quindi 10 caselle per ognuna delle 10 righe.
Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.
*/

// - prelevare un elemento contenitore dalla pagina e memorizzarlo in una variabile

const gridElement = document.getElementById("grid");

// - prelevare una select dalla pagina e memorizzarla in una variabile
const difficultyElement = document.getElementById("difficulty");

// memorizzo il pulsante di play e ci aggiungo l'event listener
const playButtonElement = document.getElementById("play");

// memorizzo l'elemento di messaggio
const messageElement = document.getElementById("message");

// creo la variabile che memorizza il punteggio
// questa variabile globale viene condivisa tra tutto il codice
let totalPoints = 0;

let gameOver = false;

let totalCellNumber;

// CLICK DELL'UTENTE IN PLAY
playButtonElement.addEventListener("click", function() {

  startGame();

});








// __________________________________________________________________________________________________________
// FUNCTIONS
// __________________________________________________________________________________________________________
function startGame() {
  
  // svuoto la griglia, utile in caso faccia una nuova partita
  gridElement.innerHTML = "";

  // - capire quante celle realizzare in base alla scelta della select
  totalCellNumber = getCellNumber(difficultyElement.value);
  console.log(totalCellNumber);


  // - generare le bombe
  const bombs = generateBombs(16, totalCellNumber);
  console.log(bombs);

  generateGrid(gridElement, totalCellNumber, bombs);

  gameOver = false;
  totalPoints = 0;
  messageElement.innerHTML = "";


}


function getCellNumber(difficulty) {

  if(difficulty == "easy") {
    
    return 100;

  } else if (difficulty == "normal") {
    
    return 81;

  } else {

    return 49;
    
  }

}



/**
 * genera una griglia html dentro l'elemento gridContainerElement,
 * con il numero di celle indicato da totalCellNumber,
 * con la possibilità di controllare le bombe.
 * RICHIEDE la funzione cellClick()
 * @param {HTMLElement} gridContainerElement
 * @param {Number} totalCellNumber
 * @param {Array[Number]} bombs
 * @returns {any}
 */
function generateGrid(gridContainerElement, totalCellNumber, bombs) {
  // avere il numero di celle
  // avere le bombe
  // avere il contenitore della grid



  for(let i = 1; i <= totalCellNumber; i++) {
    
    // creo un elemento nuovo
    let newElement = document.createElement('div');
    
    // aggiungo la classe square
    newElement.className = "square";

    // stilizzo gli elementi e ne cambio la dimensione in base
    //  a quanti elementi debba creare
    newElement.style.width = `calc(100% / ${Math.sqrt(totalCellNumber)})`;
    newElement.style.height = `calc(100% / ${Math.sqrt(totalCellNumber)})`;


    // inserisco il numero della cella dentro la cella
    newElement.innerText = i;

    // rendo l'elemento nuovo il figlio del contenitore
    gridContainerElement.append(newElement);

    
    // aggiungo il listener del click
    newElement.addEventListener('click', function() {

      cellClick(newElement, bombs);

    });
  }

}


/**
 * Gestisce il click di una cella di campo minato
 * ...
 * RICHIEDE la variabile globale totalPoints
 * @param {HTMLElement} cellElement
 * @param {Array[Number]} bombs
 * @returns {any}
 */
function cellClick(cellElement, bombs) {


  if(!gameOver) {
    if(bombs.includes(Number(cellElement.innerText))) {
      
      // ? SE la cella contiene una BOMBA
  
      //     - ALLORA rendi la cella rossa
      cellElement.classList.add('bomb');
  
      // - blocca il gioco e comunica il punteggio
      gameOver = true;
  
      // comunico il game over all'utente
      messageElement.innerText = `Hai perso. Il tuo punteggio è di ${totalPoints}`;

      showBombs(bombs);
  
    } else {
      // :ALTRIMENTI
      
      // se la classe "empty" non è stata inserita nell'elemento
      if(!cellElement.classList.contains('empty')) {
        // - dai la classe "empty"
        cellElement.classList.add("empty");
              
        // - aumenta il punteggio di 1
        // total Points è una variabile GLOBALE
        totalPoints++;

        console.log('Punteggio: ' + totalPoints);
      }
      
      // controlliamo se l'utente ha fatto il punteggio massimo
      if(totalPoints == totalCellNumber - bombs.length) {
        messageElement.innerText = "Sei un dio greco potentissimo, hai vinto. Il tuo punteggio è "+ totalPoints;
        // - blocca il gioco e comunica il punteggio
        gameOver = true;

        // mostra le bombe
        showBombs(bombs);
      }

    }
  } 


}

/**
 * Description
 * @param {Array[Number]} bombs
 * @returns {any}
 */
function showBombs(bombs) {
  let squares = document.querySelectorAll('.square');

  console.log(squares)

  for (let i = 0; i < totalCellNumber; i++) {

    if(bombs.includes(Number(squares[i].innerText))) {

      squares[i].classList.add('bomb');

    }

  }
}

/**
 * Questa funzione genera e restituisce un array di numeri casuali tutti diversi
 * @param {Number} quantity
 * @param {Number} maxNumber
 * @returns {Array[Number]}
 */
function generateBombs(quantity, maxNumber) {

  const bombs = [];

  while(bombs.length < quantity) {

    let randomNumber = randomNumberBetween(1, maxNumber)

    if(!bombs.includes(randomNumber)) {
      bombs.push(randomNumber);
    } 
    
  }

  return bombs;

}



/**
 * Questa funzione restituisce un numero intero random
 * dal minimo indicato come parametro (min) al massimo indicato come parametro (max)
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function randomNumberBetween(min, max) {

  // genero un numero random
  let random = Math.floor(Math.random() * (max - min + 1) + min)

  // una volta che la nostra funzione viene eseguita, restituisci al suo posto questo valore
  return random;

}