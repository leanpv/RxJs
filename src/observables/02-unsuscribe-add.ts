import { Observable, Observer, Subscriber } from 'rxjs';


const observer: Observer<any> = {
    next: value => console.log('[next]: ', value),
    error: error => console.warn('error: ', error),
    complete: () => console.info('completado [obs]')
} 


const intervalo$ = new Observable<number>( subs => {

    let i = 0;
    // crear un contador
    const interval = setInterval( () => {
        // cada segundo
        subs.next(i++);
        console.log(i);
    }, 1000);

    setTimeout( () => {
        subs.complete();
    }, 2500);
    
    // return del observable ejecuta este procedimiento cuando se llama
    // el unsuscribe
    return () => {
        clearInterval(interval);
        console.log('intervalo destruido');
    }
});

const subscription = intervalo$.subscribe( observer );
const subscription2 = intervalo$.subscribe( observer );
const subscription3 = intervalo$.subscribe( observer );

subscription.add(subscription2)
            .add(subscription3);

setTimeout(() => {
    subscription.unsubscribe()
    // subscription2.unsubscribe()
    // subscription3.unsubscribe()
    console.log('unsubscribe');
}, 6000);
