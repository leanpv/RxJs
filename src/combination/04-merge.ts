import { fromEvent, merge } from "rxjs";
import { pluck } from "rxjs/operators";

// merge conmbina 2 observables
// no se completa hasta que los 2 obs se completen
// es una funcion

const keyup$ = fromEvent(document, 'keyup');
const click$ = fromEvent(document, 'click');

merge( 
    keyup$.pipe( pluck('type') ), 
    click$.pipe( pluck('type') )
).subscribe(console.log)
