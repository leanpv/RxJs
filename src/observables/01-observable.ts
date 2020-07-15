import { Observable, Observer } from 'rxjs';


const observer: Observer<any> = {
    next: value => console.log('siguiente [next]: ', value),
    error: error => console.warn('error [obs]: ', error),
    complete: () => console.info('completado [obs]')
}

// const obs$ = Observable.create();
// se define como parametro un observer o suscriber seguido de una fn de flecha
const obs$ = new Observable<string>( subscriber => {
    // emite el valor que se indica a las subscripciones
    // Susbscripciones es gente que va a estar pendiente de las emisiones de mi
    // observable
    subscriber.next('Hola');
    subscriber.next('Mundo');

    // forzar un error de JS para activar el parametro error del obs
    // const a = undefined;
    // a.nombre = 'maria';

    subscriber.next('Hola');
    subscriber.next('Mundo');
    // ninguna emisión luego del .complete() va a ser notificada a los subscribers
    subscriber.complete();

    subscriber.next('Hola');
    subscriber.next('Mundo');

});

// subscripcion a obs$
// obs$.subscribe( resp => console.log(resp));
// obs$.subscribe( console.log );

// obs$.subscribe(
//     valor => console.log(valor),
//     error => console.warn(error),
//     () => console.info('completado')
// )

obs$.subscribe(observer);
