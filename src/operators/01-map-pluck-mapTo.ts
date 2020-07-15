import { range, fromEvent } from 'rxjs';
import { map, pluck, mapTo } from 'rxjs/operators';

// range(1,5).pipe(
//     // con este tipado <number,number> definimos la entrada
//     // y la salida del map
//     map<number,string>( val => (val*10).toString() )
// ) 
// .subscribe( console.log );

const keyUp$ = fromEvent<KeyboardEvent>( document, 'keyup' );

// keyUp$.subscribe( resp => console.log(resp.code) );
const keyupCode$ = keyUp$.pipe(
    map( event => event.code )
)

const keyupPluck$ = keyUp$.pipe(
    // pluck en este caso extrae del objecto la propiedad
    // .target.baseURI - esta es la sintaxis para usar la
    // notacion de punto
    pluck('target', 'baseURI')
);

const keyupMapTo$ = keyUp$.pipe(
    mapTo('Tecla presionada')
);

// keyUp$.subscribe( console.log );
keyupCode$.subscribe( code => console.log('map: ', code) );
// keyupPluck$.subscribe( code => console.log('pluck: ', code) );
keyupMapTo$.subscribe( code => console.log('mapTo: ', code) )

// pluck es un operador que nos permite extraer un valor
// del flujo de datos