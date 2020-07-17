import { fromEvent } from "rxjs";
import { debounceTime, pluck, distinctUntilChanged, tap } from 'rxjs/operators';

// debounceTime
// Si el tiempo transcurrido desde la última emisión no es mayor
// al valor ingresado como parametro, ejemplo, debounceTime(1000)
// 

const click$ = fromEvent<MouseEvent>( document, 'click');

click$.pipe(
    // en este caso captura el evento click
    // si clickeamos por primera vez emite el evento a los 3seg
    // no importa si antes de 3seg clickeamos 10 veces,
    // va a emitir el ultimo valor
    debounceTime(3000)
).subscribe( console.log );

//
const input = document.createElement('input');
document.querySelector('body').append(input);

const input$ = fromEvent<KeyboardEvent>( input, 'keyup');

input$.pipe(
    debounceTime(1000),
    // pluck extrae del obj obj.target.value
    pluck('target', 'value'),
    tap( tap => console.log('tap: ', tap) ),
    distinctUntilChanged( (ant, act) => ant === act)
).subscribe({
    next: val => console.log('next: ', val),
    complete: () => console.log('completado')
}) 