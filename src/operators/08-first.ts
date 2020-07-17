import { fromEvent } from 'rxjs';
import { take, first, tap, map } from 'rxjs/operators';

const click$ = fromEvent<MouseEvent>( document, 'click');

// first toma el primera valor emitido si no tiene parametros
// si no se le puede aplicar un condicional, en este caso
// cuando el click supera 300px en el eje Y

click$.pipe(
    // tap<MouseEvent>(console.log),
    // Agregando el parentesis hacemos que pueda retornar mas de
    // un valor, y evitamos la palabra return, como este ej.
    // event => {
    //     return { clientY: event.clientY, clientX: event.clientX }
    // }
    //
    // map( event => ({
    //     clientY: event.clientY,
    //     clientX: event.clientX
    // }) ),
    // 
    // en ES6 si tenemos una propiedad que tiene el mismo nombre
    // que la variable se puede obviar la definicion
    //
    // la desestructuracion de obj nos permite extraer del mismo
    // map( ({ clientX, clientY }) => 
    // las propiedades clientX y clientY
    map( ({ clientX, clientY }) => ({ clientY, clientX }) ),
    tap( val => console.log('clientY: ', val.clientY) ),
    first( event => event.clientY >= 300 )
)
.subscribe({
    next: val => console.log('next: ', val),
    complete: () => console.log('complete')
});

event => {
    return { clientY: event.clientY, clientX: event.clientX }
}