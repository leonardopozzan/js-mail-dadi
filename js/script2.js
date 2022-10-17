const btn = document.querySelector('#play');

const play = function play(){
    const numbPlayers = parseInt(document.querySelector('#numbPlayers').value);
    const numbDice = parseInt(document.querySelector('#numbDice').value);
    const numbFaces = parseInt(document.querySelector('#numbFaces').value);
    rolleDice(numbPlayers, numbDice, numbFaces);
    // debug
    // const players = rolleDice(12, 12, 12);

}

btn.addEventListener('click' , play);

function rolleDice(numbPlayers, numbDice, numbFaces){
    //prendo e pulisco il contenitore generale
    const wrapper = document.querySelector('.the-game');
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
    const spaces = '<br>';
    if (indexOfPlayer.length == 1){
        divWinners.innerHTML = ' Player ' + (indexOfPlayer[0]+1) + ' Won' + spaces;
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
        divWinners.innerHTML = message + spaces;
    }
    divWinners.innerHTML += 'High Score: ' + highScore;

    statsDice(scores, players)
}

function statsDice(scores, players){
    //prendo e pulisco il div delle statistiche
    const stats = document.querySelector('.inner-stats');
    stats.innerHTML = '';

    //calcolo i numeri usciti più frequentemente
    //creo una lista di tutti i numeri usciti
    let allNumbers = [];
    for (let i = 0; i < players.length; i++){
        for (let j = 0; j < players[i].length; j++){
            allNumbers.push(players[i][j]);
        }
    }

    //IL CALCOLO SEGUENTE è STATO IL PUNTO PIù DIFFICILE!!

    //creo la lista dei numeri più frequenti e la printo nell'html
    let numbersMaxCount = [];
    let maxCount = 0;
    for (let i = 0; i < allNumbers.length; i++){
        let currentCount = 0;
        for (let j = 0; j < allNumbers.length; j++){
            //scorro solo indici superiori a "i" in modo da esser sicuro di
            //non aggiungere più volte lo stesso elemento alla lista dei
            //numeri frequenti
            if( j >= i){
                if (allNumbers[i] == allNumbers[j]){
                    currentCount++;
                    //qui salvo eventuali numeri che hanno la stessa frequanza
                    if(currentCount == maxCount){
                        numbersMaxCount.push(allNumbers[i]);
                    }
                }
                //se trovo un nuovo massimo aggiorno il contatore massimo e
                //resetto la lista degli elementi più frequenti
                if (currentCount > maxCount){
                    maxCount = currentCount;
                    numbersMaxCount = [];
                    numbersMaxCount.push(allNumbers[i]);
                }
            }
            
        }
    }
    const divFrequentNumber = addElementClassHTML('div', '', stats);
    divFrequentNumber.innerHTML = `Most frequent numbers: ${numbersMaxCount.toString()}`
    const divFrequency = addElementClassHTML('div', '', stats);
    divFrequency.innerHTML = `Frequency: ${maxCount}`


    //calcolo la media dei punteggi totali e la printo in HTML
    const sumPlayers = sumArray(scores)
    const totalAverage = (sumPlayers / scores.length).toFixed(2);
    const divTotalAverage = addElementClassHTML('div', '', stats);
    divTotalAverage.innerHTML = `Average total scores: ${totalAverage}`

    //calcolo la media dei punteggi di ogni player e la printo in HTML
    let sumPlayer = [];
    for(let i = 0; i < scores.length; i++){
        sumPlayer.push((scores[i] / players[i].length).toFixed(2));
    }
    for(let i = 0; i < sumPlayer.length; i++){
        const divPlayerAverage = addElementClassHTML('div', '', stats);
        divPlayerAverage.innerHTML = `Average player${i+1} score: ${sumPlayer[i]}`
    }

}

