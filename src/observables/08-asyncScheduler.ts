import { asyncScheduler } from 'rxjs';

// ----- asyncScheduler no es un Observable, es una Subscription -----

const saludar = () => console.log('hola mundo');
// const saludar2 = nombre => console.log(`Hola ${ nombre }`);
const saludar3 = ({nombre, apellido}) => console.log(nombre, apellido);

asyncScheduler.schedule( saludar, 2000);
// asyncScheduler.schedule( saludar2, 2000, {nombre: 'Leandro', apellido: 'PV'} )
asyncScheduler.schedule( saludar3, 2000, {nombre: 'Leandro', apellido: 'PV'} )

// No puede recibir una Lambda function como parametro (o funcion de flecha)
// porque después se debe llamar y no se puede llamar una fn anónima.
// Debe recibir una function() normal
const subscription = asyncScheduler.schedule( function(state){
    console.log('state', state);
    this.schedule( state + 1, 1000 );
}, 3000, 0);

// setTimeout( () => {
//     subscription.unsubscribe();
//     console.log('unsuscribe');
// }, 6000)

asyncScheduler.schedule( () => subscription.unsubscribe(), 6000 )