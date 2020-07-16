import { interval, timer } from 'rxjs';

const observer = {
    next: val => console.log('next: ', val),
    complete: () => console.log('complete')
}


const hoyEn5 = new Date();

hoyEn5.setSeconds(hoyEn5.getSeconds() + 5);

const interval$ = interval(1000);
// es como crear un interval que inicia luego de 5 segundos
const timer$ = timer( hoyEn5 );

console.log('inicio');
// interval$.subscribe( observer );
timer$.subscribe( observer );
console.log('fin');