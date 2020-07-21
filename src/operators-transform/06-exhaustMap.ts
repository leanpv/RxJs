import { interval, fromEvent } from 'rxjs';
import { take, switchMap, concatMap, exhaustMap } from "rxjs/operators";

const interval$ = interval(500).pipe(take(3));
const click$ = fromEvent(document, 'click');

click$.pipe(
    // mientras que el exhaust map tenga una subscripcion activa
    // ignora las emisiones del source hasta que la subs interna
    // se complete
    exhaustMap( () => interval$ )
).subscribe(console.log)

