import { of, interval, forkJoin } from 'rxjs';
import { take, delay } from 'rxjs/operators';

const numeros$ = of(1,2,3,4);
const interval$ = interval(1000).pipe(
    take(3)
);
const letras$ = of('a','b','c').pipe( delay(3500) );

// const obs$ = forkJoin({numeros$, interval$, letras$});

const obs$ = forkJoin({
    num: numeros$,
    int: interval$,
    let: letras$
});

obs$.subscribe( resp => {
    // console.log('numeros: ', resp[0]);
    // console.log('intervalo: ', resp[1]);
    // console.log('letras: ', resp[2]);
    console.log(resp)
})