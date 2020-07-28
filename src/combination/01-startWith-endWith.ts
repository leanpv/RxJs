import { of } from "rxjs";
import { startWith, take, endWith } from "rxjs/operators";

const numbers$ = of(1,2,3,4).pipe(
    take(3),
    startWith('a','b','c'),
    endWith('x','y','z')
);
numbers$.subscribe(console.log)