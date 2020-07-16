import { from, range, fromEvent } from 'rxjs';
import { filter, map, pluck } from 'rxjs/operators';

const obs$ = range(20,30);

obs$.pipe(
    filter( (resp, i) => {
        console.log('index: ', i);
        return resp % 2 === 1;
    })
)// .subscribe( console.log );

interface Personaje {
    tipo: string,
    nombre: string
}

const personajes: Personaje[] = [
    {
        tipo: 'heroe',
        nombre: 'Batman',
    },
    {
        tipo: 'heroe',
        nombre: 'Robin',
    },
    {
        tipo: 'villano',
        nombre: 'Joker',
    }
];

const perso$ = from(personajes).pipe(
    filter( resp => resp.tipo === 'heroe' )
);

// perso$.subscribe(console.log);

const keyup$ = fromEvent<KeyboardEvent>( document, 'keyup').pipe(
    // recibe un keyboardEvent y sale un String
    map( resp => resp.code ),
    filter( key => key === 'Enter' )
)

keyup$.subscribe(console.log)