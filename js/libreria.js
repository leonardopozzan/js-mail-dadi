
//funzione che genera una lista di numeri casuali prendendo in unput il range e
//il numero di elementi da generare 
function generateRandomArray(minRandom, maxRandom, numbOfElements){
    let array = [];
    for( let i = 0; i < numbOfElements; i++){
        array[i] = Math.floor(Math.random() * maxRandom ) + minRandom;
    }
    return array;
}

//funzione che somma gli elementi di un aray e ritorna la somma
function sumArray(array){
    let sum = 0;
    for(let i = 0; i < array.length; i++){
        sum += array[i];
    }
    return sum;
}

//funzione che crea un tag html a scelta con una classe lo ritorna e lo appende ad un elemento
function addElementClassHTML(tagElement, className, fatherElement){
    const tag = document.createElement(tagElement);
    tag.className = className;
    fatherElement.append(tag);
    return tag;
}

//funzione che ritorna il massimo di un array
function maxOfArray(array){
    let max = array[0];
    for(let i = 0; i < array.length; i++){
        if (array[i] > max){
            max = array[i];
        }
    }
    return max;
}

//funziona che ritorna la lista degli indici col valore massimo di un array
function indexOfMaxArray(array){
    let max = array[0];
    let indexOfMax = [];
    for (let i = 0; i < array.length; i++){
        if (array[i] > max){
            max = array[i];
            indexOfMax = [];
            indexOfMax.push(i);
        }else if (array[i] == max){
            indexOfMax.push(i);
        }
    }
    return indexOfMax;
}