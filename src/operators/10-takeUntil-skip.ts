import { interval, fromEvent } from 'rxjs';
import { takeUntil, skip, tap } from 'rxjs/operators';

// takeUntil
//
// Es un operador que recibe como argumento otro observable
// Emite los valores hasta que el obs como parametro
// emita su primer valor

// creamos button y le asignamos valor
const boton = document.createElement('button');
boton.innerHTML = 'Detener Timer';
// lo insertamos en el body
document.querySelector('body').append( boton );

const counter$ = interval(1000);
// se le asigna al nuevo obs fromEvent, el boton como parametro
// const clickBtn$ = fromEvent( boton, 'click');
const clickBtn$ = fromEvent( boton, 'click').pipe(
    tap( () => console.log('Antes del skip')),
    // el operador skip lo que hace es saltarse la cantidad
    // de emisiones emitidas como parametro, 1 en este caso
    skip(1),
    tap( () => console.log('Después del skip'))
);


counter$.pipe(
    // el contador va a emitir valores cada 1s hasta que takeUntil
    // reciba del obs clickBtn su primer valor
    takeUntil( clickBtn$ )
).subscribe({
    next: val => console.log('next: ', val),
    complete: () => console.log('completado')
})