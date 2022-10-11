// Mail
// Chiedi all’utente la sua email,
// controlla che sia nella lista di chi può accedere,
// stampa un messaggio appropriato sull’esito del controllo.
// Gioco dei dadi
// Generare un numero random da 1 a 6, sia per il giocatore sia per il computer.
// Stabilire il vincitore, in base a chi fa il punteggio più alto.

const mailValide = ['user1@gmail.com', 'user2@gmail.com', 'user3@gmail.com', 'user4@gmail.com', 'user5@gmail.com'];
const btn = document.querySelector('#send-mail');

const valid = function fun1() {
    let check = false;
    let span = document.querySelector('#result');
    let userMail = document.querySelector('#e-mail');

    for ( let i = 0; i < mailValide.length; i++){
        if(userMail.value == mailValide[i]){
            check = true;
        }
    }

    userMail.value = '';
    if(check){
        span.innerHTML = 'La tua e-mail è valida'
    }
    else{
        span.innerHTML = 'La tua e-mail non è valida'
    }
}
btn.addEventListener('click', valid);

