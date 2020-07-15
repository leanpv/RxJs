import { Observable, Observer, Subscriber, Subject } from 'rxjs';


const observer: Observer<any> = {
    next: value => console.log('[next]: ', value),
    error: error => console.warn('error: ', error),
    complete: () => console.info('completado [obs]')
}

const intervalo$ = new Observable<number>( subs => {
    const intervalID = setInterval(
        () => subs.next( Math.random()*1000 ), 1000
    );

    return () => {
        clearInterval(intervalID);
        console.log('intervalo destruido');
    };
});


// Subject
// 1 - Casteo Multiple
// 2 - También es un Observer
// 3 - Puede manejar Next, Error y Complete
const subject$ = new Subject();

const intervalSubject = intervalo$.subscribe( subject$ );

const subs1 = subject$.subscribe( observer );
const subs2 = subject$.subscribe( observer );

// const subs1 = intervalo$.subscribe( rnd => console.log('subs-1 :', rnd) );
// const subs2 = intervalo$.subscribe( rnd => console.log('subs-2 :', rnd) );

setTimeout( () => {
    subject$.next(10);
    subject$.complete();
    intervalSubject.unsubscribe();
}, 3500);