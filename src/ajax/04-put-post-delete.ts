import { ajax } from 'rxjs/ajax';

const url = 'https://httpbin.org/delay/1';

// ajax.put(url, {
//     id: 1,
//     nombre: 'Leandro'
// },{
//     'mi-token': 'ABC123'
// }).subscribe( console.log )

ajax({
    url,
    method: 'DELETE',
    headers: {
        'mi-token': 'ABC123'
    },
    body: {
        id: 1,
        nombre: 'Leandro'
    }
}).subscribe( console.log )