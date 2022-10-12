const btn = document.querySelector('#play');

const play = function play(){
    const numbPlayers = document.querySelector('#numbPlayers');
    const numbDice = document.querySelector('#numbDice');
    const numbFaces = document.querySelector('#numbFaces');
    rolleDice(numbPlayers.value, numbDice.value, numbFaces.value);
}

btn.addEventListener('click' , play);

function rolleDice(numbPlayers, numbDice, numbFaces){
    const minNumb = 1;
    let players = [];
    const divContainer = document.querySelector('#players-container')
    divContainer.innerHTML = '';
    const divPlayers = document.createElement('div')
    divPlayers.className = 'players';
    divContainer.append(divPlayers);

    //Creazione della lista dei giocatori con la lista dei punteggi
    for (let i = 0; i < numbPlayers; i++){
        players[i] = [];
        for (let j = 0; j < numbDice; j++){
            players[i][j] = Math.floor(Math.random() * (numbFaces - minNumb) ) + minNumb;
        }
    }

    //Creazione della lista del puneggio totali di ogni giocatore
    let scores = [];
    for (let i = 0; i < players.length; i++){
        scores[i] = 0;
        for (let j = 0; j < players[i].length; j++){
            scores[i] += players[i][j];
        }
    }

    //Creazione degli elementi in html
    for (let i = 0; i < players.length; i++){

        //creo un div con la classe player e lo inserisco nel div players
        const divPlayer = document.createElement('div');
        divPlayer.className = 'player';
        divPlayers.append(divPlayer);

        //creo un div con la classe name-player e lo inserisco nel div player
        const divNamePlayer = document.createElement('div');
        divNamePlayer.className = 'name-player';
        divNamePlayer.innerHTML = 'Player ' + (i+1);
        divPlayer.append(divNamePlayer);

        //insersisco lo score di ogni giocatore creando un div con la classe score
        const divScorePlayer = document.createElement('div')
        divScorePlayer.className = 'score-player';
        divScorePlayer.innerHTML = 'Score: ' + scores[i];
        divPlayer.append(divScorePlayer);


        //inserisco il risultato dei singoli dadi
        for (let j = 0; j < players[i].length; j++){
            const divDicePlayer = document.createElement('div')
            divDicePlayer.className = 'dice-player';
            divDicePlayer.innerHTML = players[i][j];
            divPlayer.append(divDicePlayer);
        }
    }


    //Calcolo l'highscore tenendo conto dei giocatori con lo stesso punteggio
    let highScore = 0;
    let indexOfPlayer = [];
    for (let i = 0; i < scores.length; i++){
        if (scores[i] > highScore){
            highScore = scores[i];
            indexOfPlayer = [];
            indexOfPlayer.push(i);
        }else if (scores[i] == highScore){
            indexOfPlayer.push(i);
        }
    }


    //Stampo i vincitori sull'html col relativo highscore
    const divWinners = document.querySelector('#winners')
    divWinners.innerHTML = '';
    divWinners.innerHTML = 'High Score: ' + highScore + '&nbsp;'+ '&nbsp;'+ '&nbsp;'+ '&nbsp;'+ '&nbsp;';
    if (indexOfPlayer.length == 0){
        divWinners.innerHTML += (' Player: No Player entered');
    }else if (indexOfPlayer.length == 1){
        divWinners.innerHTML += (' Player ' + (indexOfPlayer[0]+1) + ' Wons');
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



