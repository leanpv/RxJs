import { fromEvent, Observable } from 'rxjs';
import { debounceTime, map, pluck, mergeAll, mergeMap, switchMap, tap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { GithubUser } from '../interfaces/github-user';
import { GithubUsersResp } from '../interfaces/github-users';

// helpers
const mostrarUsuarios = ( usuarios: GithubUser[] ) => {
    console.log( usuarios );
    orderList.innerHTML = '';

    // ciclo for of the ecmascript6
    for(const usuario of usuarios){
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.src = usuario.avatar_url;

        const anchor = document.createElement('a');
        anchor.href = usuario.html_url;
        anchor.text = 'Ver página';
        anchor.target = '_blank';

        li.append( img );
        li.append( usuario.login + ' ' );
        li.append( anchor );

        orderList.append(li);
    }
}

// referencias
const body = document.querySelector('body');
const textInput = document.createElement('input');
const orderList = document.createElement('ol');
body.append( textInput, orderList );

// streams
const input$ = fromEvent<KeyboardEvent>( textInput, 'keyup');

input$.pipe(
    debounceTime<KeyboardEvent>(500),
    pluck<KeyboardEvent, string>('target', 'value'),
    mergeMap<string, Observable<any>>( texto => ajax.getJSON(
        `https://api.github.com/search/users?q=${texto}`)
    ),
    // mergeAll se subscribe al obs que devuelve la peticion ajax
    // y emite dichos valores
    // mergeAll<GithubUsersResp>(),
    pluck<GithubUsersResp, GithubUser[]>('items')
)
// .subscribe( mostrarUsuarios );

const url = 'https://httpbin.org/delay/1?arg='; // + variable

input$.pipe(
    pluck('target', 'value'),
    tap(x => console.log('previo switchMap', x)),
    // switchMap solo toma el ultimo valor emitido, a diferencia
    // del mergeMap, y cancela la subscripcion anterior
    // de forma que siempre sea 1
    switchMap( texto => ajax.getJSON(url + texto) )
).subscribe(console.log)