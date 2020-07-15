import { of, from} from 'rxjs';

// of = toma argumentos y genera una secuencia de valores
// from = crea un obs en base a un array, promise, iterable, observable

const observer = {
    next: val => console.log('next', val),
    complete: () => console.log('complete')
}

// const source$ = of([1,2,3,4,5]);
// const source$ = from([1,2,3,4,5]);
// const source$ = from('Leandro');

// from transforma casi cualquier cosa en un observable
// fetch es una funcion de js que permite hacer una peticcion http
// esto devuelva un response del tipo de peticion
const source$ = from( fetch('https://api.github.com/users/klerith') );

// source$.subscribe( observer )
// 
// typescript reconoce el typado porque el from lo hace automaticamente
// en este caso le asigna <promise<response>>
// readeable stream, lo que devuelve el resp.doby de una peticion fetch,
// devuelve otra promesa
// 
// se declara que es una funcion async, porque devuelve una promesa

// source$.subscribe( async resp => {
//     console.log( resp );
//     const dataResp = await resp.json();
//     console.log(dataResp);
// });

// from puede trabajar con funciones iterables o generadoras
const miGenerador = function*() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
}

const miIterable = miGenerador();

// for( let id of miIterable){
//     console.log(id);
// }

// al manejarlo de esta forma (como un obs), tenemos la ventaja de
// poder utilizar los operadores
from( miIterable ).subscribe( observer );