import { fromEvent, asyncScheduler } from 'rxjs';
import { debounceTime, map, pluck, distinctUntilChanged, distinctUntilKeyChanged, tap, throttleTime } from 'rxjs/operators';

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
    // debounceTime(3000)

    // throttleTime funciona al revez que debounce
    // emite el valor y solo deja fluir el stream 3000 miliseg
    // despues, en este caso
    throttleTime(3000)
)
// .subscribe( console.log ); 

//
const input = document.createElement('input');
document.querySelector('body').append(input);

const input$ = fromEvent<KeyboardEvent>( input, 'keyup');

input$.pipe(
    // pluck extrae del obj obj.target.value
    // debounceTime(1000), 
    throttleTime(1000, asyncScheduler, {
        leading: true,
        trailing: true
    }),
    pluck('target', 'value'),
    tap( tap => console.log('tap: ', tap) ),
    distinctUntilChanged( (ant, act) => ant === act )
    // distinctUntilKeyChanged('')
).subscribe({
    next: val => console.log('next: ', val),
    complete: () => console.log('completado')
}) 