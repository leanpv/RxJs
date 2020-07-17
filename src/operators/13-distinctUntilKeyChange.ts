// distinct
// Se encarga evaluar valores emitidos y no dejarlos pasar.
// pero no aplica al tipo ( string, number ) ej. 1 y '1'

import { of, from } from 'rxjs';
import { distinct, tap, distinctUntilChanged, distinctUntilKeyChanged, map } from 'rxjs/operators';

interface Personaje {
    nombre: string;
    prueba?: {
        nombrePrueba?: string;
    }
}

const personajes: Personaje[] = [
    {
        nombre: 'Megaman',
        prueba: {
            nombrePrueba: 'noMega'
        }
    },
    {
        nombre: 'Megaman',
        prueba: {
            nombrePrueba: 'siMega'
        }
    },
    {
        nombre: 'Zero',
        prueba: {
            nombrePrueba: 'siMega'
        }
    },
    {
        nombre: 'Dr. Willy',
        prueba: {
            nombrePrueba: 'noMega'
        }
    },
    {
        nombre: 'X',
        prueba: {
            nombrePrueba: 'noMega'
        }
    },
    {
        nombre: 'X',
        prueba: {
            nombrePrueba: 'noMega'
        }
    },
    {
        nombre: 'Zero',
        prueba: {
            nombrePrueba: 'x'
        }
    },
];

from(personajes).pipe(
    map( val => val.prueba ),
    tap( val => console.log('tap: ', val ) ),
    distinctUntilKeyChanged('nombrePrueba')
).subscribe( val => console.log('next: ', val) );