const btn = document.querySelector('#play');

const play = function play(){
    const numbPlayers = parseInt(document.querySelector('#numbPlayers').value);
    const numbDice = parseInt(document.querySelector('#numbDice').value);
    const numbFaces = parseInt(document.querySelector('#numbFaces').value);
    rolleDice(numbPlayers, numbDice, numbFaces);
    // debug
    // rolleDice(3, 3, 6)
}

btn.addEventListener('click' , play);

function rolleDice(numbPlayers, numbDice, numbFaces){
    //prendo e pulisco il contenitore generale
    const wrapper = document.querySelector('.wrapper');
    wrapper.innerHTML = '';

    //creo il contenitore dove scrivo i vincitori
    const divWinners = addElementClassHTML('div', 'winners', wrapper);

    //controllo sugli input
    if (isNaN(numbPlayers) || isNaN(numbDice) || isNaN(numbFaces) ||
        numbPlayers <= 0   || numbDice <= 0   || numbFaces <= 0){
        divWinners.innerHTML = 'Inserisci solo numeri interi superiori a zero';
        return;
    }
    //set del numero minimo di dadi
    const minNumb = 1;
    //creo i contenitori di partenza
    let players = [];
    const divContainer = addElementClassHTML('div', '', wrapper);
    const divPlayers = addElementClassHTML('div', 'players', divContainer);

    //Creazione della lista dei giocatori con la lista dei punteggi
    
    for (let i = 0; i < numbPlayers; i++){
        players[i] = generateRandomArray(minNumb, numbFaces, numbDice);
    }

    //Creazione della lista del puneggio totali di ogni giocatore
    let scores = [];
    for (let i = 0; i < players.length; i++){
        scores[i] = sumArray(players[i]);
    }

    //Creazione degli elementi in html
    for (let i = 0; i < players.length; i++){

        //creo un div con la classe player e lo inserisco nel div players
        const divPlayer = addElementClassHTML('div', 'player', divPlayers)

        //creo un div con la classe name-player e lo inserisco nel div player
        const divNamePlayer = addElementClassHTML('div', 'name-player', divPlayer);
        divNamePlayer.innerHTML = 'Player ' + (i+1);

        //insersisco lo score di ogni giocatore creando un div con la classe score
        const divScorePlayer = addElementClassHTML('div', 'score-player', divPlayer);
        divScorePlayer.innerHTML = 'Score: ' + scores[i];

        //inserisco il risultato dei singoli dadi
        for (let j = 0; j < players[i].length; j++){
            const divDicePlayer = addElementClassHTML('div', 'dice-player', divPlayer);
            divDicePlayer.innerHTML = players[i][j];
        }
    }

    //Calcolo l'highscore tenendo conto dei giocatori con lo stesso punteggio
    const highScore = maxOfArray(scores);
    const indexOfPlayer = indexOfMaxArray(scores);

    //Stampo i vincitori sull'html col relativo highscore
    divWinners.innerHTML = 'High Score: ' + highScore + '&nbsp;'+ '&nbsp;'+ '&nbsp;'+ '&nbsp;'+ '&nbsp;';
    if (indexOfPlayer.length == 0){
        divWinners.innerHTML += (' Player: No Player entered');
    }else if (indexOfPlayer.length == 1){
        divWinners.innerHTML += (' Player ' + (indexOfPlayer[0]+1) + ' Won');
    }else{
        let message = 'Players:'
        for(let i = 0; i < indexOfPlayer.length; i++){
            if (i == (indexOfPlayer.length-1)){
                message += (' ' + (indexOfPlayer[i] + 1) + ' ');
            }else{
                message += (' ' + (indexOfPlayer[i] + 1) + ' '+ '&' + ' ');
            }
        }
        message += 'Won'
        divWinners.innerHTML += message;
    }
}



