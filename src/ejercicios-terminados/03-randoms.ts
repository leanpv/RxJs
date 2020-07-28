
  import { interval, Subject, Observer } from 'rxjs';
  import { take, map } from 'rxjs/operators';
  /**
   * Ejercicio: Realizar que los dos observables finales, 
   * emitan exactamente el mismo valor
   * 
   * Tip: Hot Observable? subjects?
   */
  
  (() =>{
  
    // == NO TOCAR este bloque ====================
    const reloj$ = interval(1000).pipe(
      take(5),
      map( val => Math.round(Math.random() * 100) )
    );
    // No tocar la creación del observable
    // ============================================
  
    const subject$ = new Subject();

    // reloj$ se subscribe y le mandamos como parametro un subject
    // luego nos subscribimos al mismo
    const intervalSubject = reloj$.subscribe( subject$ );


    const observer: Observer<any> = {
        next: value => console.log('[next]: ', value),
        error: error => console.warn('error: ', error),
        complete: () => console.info('completado [obs]')
    }

    // Estos dos observables deben de emitir exactamente los mismos valores
    // const obs1$ = reloj$.subscribe( val => console.log('obs1', val) );
    // const obs2$ = reloj$.subscribe( val => console.log('obs2', val) );
    const obs1$ = subject$.subscribe( observer );
    const obs2$ = subject$.subscribe( observer );
    
    setTimeout( () => {
        subject$.complete();
        intervalSubject.unsubscribe();
    }, 6000);
  
  
  
  
  })();
  
          