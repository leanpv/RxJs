import { interval } from 'rxjs';
import { take, reduce, tap } from 'rxjs/operators';

const numbers = [1,2,3,4,5];

const totalReducer = (acumulador: number, actualVal: number) => {
    return acumulador + actualVal;
}

const total = numbers.reduce( totalReducer, 0 );

// console.log('total arr: ', total);

interval(1000).pipe(
    // take va a completar el obs dependiendo de la cant espeficada
    take(4),
    tap(console.log),
    reduce( totalReducer )
)
.subscribe({
    next: val => console.log('next: ', val),
    complete: () => console.log('complete')
})