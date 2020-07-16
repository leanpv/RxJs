import { from } from "rxjs";
import { reduce, scan, map } from 'rxjs/operators';

// scan ( (acc, curr) ) => acc + curr, 0)
//
// es lo mismo que el reduce con la diferencia que emite el
// valora acumulado cada vez que se emite un valor iterado

const numeros = [1,2,3,4,5];

const acumulador = (acc, curr) => acc + curr;

// Reduce
from(numeros).pipe(
    reduce( acumulador, 0)
)
.subscribe(console.log);

// Scan
from(numeros).pipe(
    scan( acumulador, 0)
)
.subscribe(console.log);

// Redux - manejar el estado global de mi app en un unico objeto

interface Usuario {
    id?: string,
    autenticado?: boolean,
    token?: string,
    edad?: number
}
const user: Usuario[] = [
    { id: 'fer', autenticado: false, token: null },
    { id: 'fer', autenticado: true, token: 'abc' },
    { id: 'fer', autenticado: true, token: '123' }
];

const state$ = from(user).pipe(
    scan<Usuario>( (acc, curr) => {
        return { ...acc, ...curr}
    }, { edad: 33 })
)

const id$ = state$.pipe(
    map( state => state.id )
);
state$.subscribe( console.log )
id$.subscribe( console.log );