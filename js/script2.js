const btn2 = document.querySelector('#throw');

const play = function fun2(){
    let max = 6;
    let min = 1;
    const player = Math.floor(Math.random() * (max - min) ) + min;
    const pc = Math.floor(Math.random() * (max - min) ) + min;
    let span = document.querySelector('#result-game');
    span.innerHTML = 'Dado player: ' + player + ' Dado pc: ' + pc;
    if(player == pc){
        span.innerHTML += ' Pareggio!';
    }else if(player > pc){
        span.innerHTML += ' Hai Vinto!';
    }
    else{
        span.innerHTML += ' Hai Perso!';
    }
}
btn2.addEventListener('click', play);
