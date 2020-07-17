import { fromEvent } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';

const click$ = fromEvent<MouseEvent>(document, 'click');

click$.pipe(
    map( ({ x, y }) => ({ x, y }) ),
    // trae los valores de y hasta que sea mayor a 150 px
    takeWhile(  ({ y }) => y <= 150 )
)
.subscribe({
    next: val => console.log('next: ', val),
    complete: () => console.log('completado')
})