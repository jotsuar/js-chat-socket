var socket = io();

var params = new URLSearchParams(window.location.search);

if(!params.has('nombre')){
    window.location = 'index.html';
    throw new Error('El nombre es necesario');
}

let usuario = {
    nombre: params.get('nombre')
}

socket.on('connect', function() {
    socket.emit('entrarChat',usuario,function(resp){
        console.log('Usuarios conectados',resp);
    })
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});

socket.on('crearMensaje',function(resp){
    console.log(resp)
})

socket.on('listaPersona',function(resp){
    console.log('Usuarios',resp)
})

// Enviar información
socket.emit('enviarMensaje', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
});

// Escuchar información
socket.on('enviarMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});