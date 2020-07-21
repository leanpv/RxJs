import { fromEvent, of } from "rxjs";
import { tap, map, mergeMap, pluck, catchError, switchMap } from 'rxjs/operators';
import { ajax } from "rxjs/ajax";

// helper
const peticionHttpLogin = ( userPass ) => 
    ajax.post('https://reqres.in/api/login?delay=1', userPass).pipe(
        pluck('response','token'),
        catchError(err => of('xxx'))
    );

// form
const form = document.createElement('form');
const inputEmail = document.createElement('input');
const inputPass = document.createElement('input');
const submitBtn = document.createElement('button');

// cfg
inputEmail.type = 'email';
inputEmail.placeholder = 'email';
inputEmail.value = 'eve.holt@reqres.in';

inputPass.type = 'password';
inputPass.placeholder = 'password';
inputPass.value = 'cityslicka';

submitBtn.innerHTML = 'Ingresar'
//
form.append(inputEmail,inputPass,submitBtn);
// insertar en HTML
document.querySelector('body').append(form);

// streams
const submitForm$ = fromEvent(form, 'submit').pipe(
    tap( ev => ev.preventDefault() ),
    map( ev => ({
        email: ev.target[0].value,
        password: ev.target[1].value
    })),
    // mergeMap( userPass => peticionHttpLogin(userPass) )
    // hacerlo asi es redundante porque si no especificamos
    // parametros la primera emision del mergeMap se va a 
    // asignar como parametro a la fn peticionHttp..
    switchMap( peticionHttpLogin )
);

submitForm$.subscribe( token => console.log(token) );