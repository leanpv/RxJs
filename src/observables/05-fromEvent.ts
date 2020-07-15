import { fromEvent, Observer } from 'rxjs';

// Eventos del DOM
const src1$ = fromEvent<MouseEvent>( document, 'click' );
const src2$ = fromEvent<KeyboardEvent>( document, 'keyup' );

const observer = {
    next: val => console.log('next ', val)
};


// Desestructuracion de ECMASCRIPT 6
// esto equivale a hacer:
//     ev => {
//         console.log(ev.x),
//         console.log(ev.y)
//     }
// 
src1$.subscribe( ({x, y}) => console.log(x, y) );

src2$.subscribe( event => console.log(event.key) );

// (resp) => {}
// function observer1(resp) { }