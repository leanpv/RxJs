import { fromEvent } from "rxjs";
import { map, tap } from 'rxjs/operators';

const texto = document.createElement('div');
texto.innerHTML = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tellus justo, suscipit in convallis ut, aliquet ut ipsum. In lacinia velit non gravida facilisis. Proin tristique euismod tortor eu aliquam. Sed ac felis a lorem congue efficitur eu vel felis. Pellentesque accumsan, purus id suscipit facilisis, urna ipsum maximus velit, nec pellentesque lorem enim id lacus. Suspendisse porttitor aliquam scelerisque. Integer tincidunt orci vitae ex cursus aliquam. Quisque mollis lorem sit amet ipsum volutpat dapibus. Mauris ultrices lacinia nisi, eu dapibus tortor fermentum nec.
<br></br><br></br>
Etiam dignissim egestas mauris ac pharetra. Morbi at nulla in mi sodales pulvinar ut ut libero. Quisque consectetur semper nulla non luctus. Donec nunc augue, sodales a sapien sit amet, facilisis placerat massa. Donec eget rhoncus lectus, in lobortis nisl. Curabitur interdum nisi non ligula cursus, ac rhoncus lectus imperdiet. Etiam cursus semper lectus ac auctor. Nullam efficitur augue eu purus pulvinar, nec eleifend urna dapibus. Nam lobortis vitae justo vitae feugiat. Curabitur et velit elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus ac lobortis elit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin pharetra ut nulla ac efficitur. Suspendisse sed tempus ex.
<br></br><br></br>
Nunc at nulla sit amet ligula blandit elementum. Ut eu maximus erat. Fusce lacus libero, dapibus nec tempor at, blandit et sapien. Duis metus lectus, aliquet vitae magna et, elementum iaculis lectus. Ut aliquam risus in tempus sollicitudin. Curabitur justo risus, congue eu enim ut, luctus lobortis purus. Sed purus ligula, auctor in tellus vitae, semper vestibulum ex. Fusce luctus condimentum neque, ut tincidunt felis suscipit id. Quisque porttitor purus purus, quis dignissim mauris commodo vel. Donec vitae fermentum elit, et bibendum nunc. Aliquam diam erat, aliquet nec aliquam sit amet, mattis vel elit. In ipsum turpis, bibendum sed dictum ut, sagittis sed tortor. Aliquam at ligula eget nisi pulvinar semper vel quis ligula. Fusce orci odio, tempus vel ante id, eleifend ullamcorper arcu. Praesent condimentum leo orci, in placerat lacus placerat quis. Ut malesuada magna eu lacus maximus, non feugiat ante sodales.
<br></br><br></br>
Donec eu tincidunt est. Aenean ut turpis sollicitudin, facilisis dui eu, hendrerit mauris. Maecenas a metus vehicula, consectetur eros nec, mollis metus. Vivamus volutpat augue eget justo efficitur venenatis. Integer sit amet lorem consequat, maximus felis non, molestie purus. Sed in sollicitudin velit, lacinia sodales orci. In arcu nibh, fringilla id vehicula id, finibus quis odio. Integer consectetur maximus ante id blandit. Pellentesque vitae consectetur est. Nulla facilisi. Sed quis nunc euismod, viverra massa et, auctor tortor. Phasellus eget fermentum augue.
<br></br><br></br>
Pellentesque commodo maximus urna, a pellentesque massa porttitor et. Morbi vel dui nec ex dictum iaculis sollicitudin vitae felis. Suspendisse nec elementum elit, quis tempor neque. Nullam eget purus varius, venenatis elit interdum, ornare ex. Fusce in convallis mauris. Vivamus efficitur id elit id scelerisque. Morbi ante lorem, egestas eu odio sed, rutrum faucibus leo. Sed eget iaculis enim. Aliquam erat volutpat. Sed augue ex, bibendum vitae nibh at, ultrices molestie enim. Morbi semper sit amet libero non lobortis. In sed nisi blandit, efficitur sem in, fermentum felis.
`;

const body = document.querySelector('body');
body.append( texto );

const progressBar = document.createElement('div');
progressBar.setAttribute('class', 'progress-bar');
body.append( progressBar );

// funcion calculo
const calcularPorcentajeScroll = (event) => {
    // console.log(event);
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = event.target.documentElement;

    // console.log({scrollTop, scrollHeight, clientHeight});

    return ( scrollTop / ( scrollHeight - clientHeight )) * 100;
}

// streams
const scroll$ = fromEvent( document, 'scroll');
// scroll$.subscribe( console.log );
const progress$ = scroll$.pipe(
    // map( event => calcularPorcentajeScroll(event) ),
    map( calcularPorcentajeScroll ),
    tap( console.log )
);

progress$.subscribe( porcentaje => {
    progressBar.style.width = `${ porcentaje }%`
});