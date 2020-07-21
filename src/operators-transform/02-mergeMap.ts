import { of, interval, fromEvent } from 'rxjs';
import { mergeMap, take, map, takeUntil } from "rxjs/operators";

const letras$ = of('a','b', 'c');
letras$.pipe(
    mergeMap( (letra) => interval(1000).pipe(
        // valga la redundancia i hace referencia al
        // indice del interval
        // en consola a0, b0, c0
        map( i => letra + i ),
        take(3)
    ))
)
// .subscribe({
//     next: next => console.log('next ', next),
//     complete: () => console.log('completado')
// });

const mouseDown$ = fromEvent(document, 'mousedown');
const mouseUp$ = fromEvent(document, 'mouseup');
const interval$ = interval();

// subscribe al click, mousedown
// subscripcion mediante mergeMap
mouseDown$.pipe(
    // mergeMap es otro operador de aplanamiento
    // recibe un obs como parametro y emite la salida
    // al subscribirse internamente, osea no emite un obs,
    // si no su subscripcion
    mergeMap( () => interval$.pipe(
        // interval$ va a seguir emitiendo valores hasta que 
        // el operador takeUntil reciba el primer valor de
        // el obs mouseUp$
        takeUntil( mouseUp$ )
    ))
).subscribe({
    next: next => console.log('next', next),
    complete: () => console.log('completado')
});