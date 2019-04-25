const { io } = require('../server');

const { Usuarios } = require('../clases/usuarios');

const usuarios = new Usuarios();

io.on('connection', (client) => {
    client.on('entrarChat',function(usuario,callback){
        if(!usuario.nombre){
            return callback({
                error: true,
                mensaje: 'El nombre es necesario'
            })
        }
        let usuariosConectados = usuarios.agregarPersona(client.id,usuario.nombre);
        client.broadcast.emit('listaPersona',usuarios.getPersonas())
        callback(usuariosConectados);
    });
    client.on('disconnect',()=>{
        let personaBorrada = usuarios.borrarPersona(client.id);
        client.broadcast.emit('crearMensaje',{
            usuario: 'Administrador',
            mensaje: `${personaBorrada.nombre} abandono el chat`
        })
        client.broadcast.emit('listaPersona',usuarios.getPersonas())
    })
});