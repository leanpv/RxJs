// distinct
// Se encarga evaluar valores emitidos y no dejarlos pasar.
// pero no aplica al tipo ( string, number ) ej. 1 y '1'

import { of, from } from 'rxjs';
import { distinct, tap, distinctUntilChanged } from 'rxjs/operators';



const numeros$ = of<number|string>(1,1,'1',1,3,3,2,2,4,4,3,5,3,1,'1');

numeros$.pipe(
    distinctUntilChanged()
)
.subscribe({
    next: val => console.log('next: ', val),
    complete: () => console.log('completado')
});

interface Personaje {
    nombre: string;
}

const personajes: Personaje[] = [
    {
        nombre: 'Megaman'
    },
    {
        nombre: 'Megaman'
    },
    {
        nombre: 'Zero'
    },
    {
        nombre: 'Dr. Willy'
    },
    {
        nombre: 'X'
    },
    {
        nombre: 'X'
    },
    {
        nombre: 'Zero'
    },
];

from(personajes).pipe(
    // de esta forma le decimos al distinct que este pendiente del valor
    // de la propiedad nombre
    distinctUntilChanged( (ant, act) => ant.nombre === act.nombre  )
).subscribe( console.log );