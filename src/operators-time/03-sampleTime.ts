import { fromEvent } from "rxjs";
import { pluck, map, sampleTime } from "rxjs/operators";


const click$ = fromEvent<MouseEvent>(document, 'click')

click$.pipe(
    // Agregando el parentesis hacemos que pueda retornar mas de
    // un valor, y evitamos la palabra return
    sampleTime(2000),
    map( ({x, y}) => ({x, y})),
).subscribe( console.log )