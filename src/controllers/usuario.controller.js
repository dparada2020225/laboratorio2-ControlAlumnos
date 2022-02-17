const Usuario = require('../models/usuario.model');
const bcrypt = require('bcrypt-nodejs');
const { status } = require('express/lib/response');
const jwt = require('../services/jwt')



function maestroDefault(req, res) {
    var modeloUsuario = new Usuario;

    Usuario.find({ email: "maestroDefault@gmail.com",nombre: "MAESTRO" }, (err, usuarioEncontrado) => {
        if (usuarioEncontrado.length > 0) {
            return res.status(500).send({ mensaje: "este usuario ya se encuentra utilizado" })
        } else {
            modeloUsuario.nombre = "MAESTRO";
            modeloUsuario.email = "maestroDefault@gmail.com";
            modeloUsuario.password = "123456";
            modeloUsuario.rol = "ROL_MAESTRO";
            bcrypt.hash(modeloUsuario.password, null, null, (err, passwordEncryptada) => {
                modeloUsuario.password = passwordEncryptada
                modeloUsuario.save((err, usuarioGuardado) => {
                    if (err) return res.status(500).send({ mensaje: 'error en la peticion ' });
                    if (!usuarioGuardado) return res.status(500).send({ mensaje: 'error al guardar usuario por defecto ' })
                    return res.status(200).send({ Usuario: usuarioGuardado })

                })
            })
        }
    })
}

function RegistrarAlumno(req, res) {
    var parametros = req.body;
    var modeloUsuario = new Usuario;

    if (parametros.nombre && parametros.email && parametros.password) {
        Usuario.find({ email: parametros.email }, (err, usuarioEncontrado) => {

            if (usuarioEncontrado.length > 0) {
                return res.status(500).send({ mensaje: "este usuario ya se encuentra utilizado" })
            } else {
                modeloUsuario.nombre = parametros.nombre;
                modeloUsuario.email = parametros.email;
                modeloUsuario.password = parametros.password;
                modeloUsuario.rol = "ROL_ALUMNO";

                bcrypt.hash(parametros.password, null, null, (err, passwordEncryptada) => {
                    modeloUsuario.password = passwordEncryptada

                    modeloUsuario.save((err, usuarioGuardado) => {
                        if (err) return res.status(500).send({ mensaje: 'error en la peticion ' });
                        if (!usuarioGuardado) return res.status(500).send({ mensaje: 'error al guardar usuario ' })
                        return res.status(200).send({ usuario: usuarioGuardado })

                    })
                })


            }

        })
    } else {
        return res.status(404).send({ mensaje: 'debe ingresar los parametros obligatorios' })
    }

}
function RegistrarMaestro(req, res) {
    var parametros = req.body;
    var modeloUsuario = new Usuario;

    if (parametros.nombre && parametros.email && parametros.password) {
        Usuario.find({ email: parametros.email }, (err, usuarioEncontrado) => {

            if (usuarioEncontrado.length > 0) {
                return res.status(500).send({ mensaje: "este usuario ya se encuentra utilizado" })
            } else {
                modeloUsuario.nombre = parametros.nombre;
                modeloUsuario.email = parametros.email;
                modeloUsuario.password = parametros.password;
                modeloUsuario.rol = "ROL_MAESTRO";

                bcrypt.hash(parametros.password, null, null, (err, passwordEncryptada) => {
                    modeloUsuario.password = passwordEncryptada

                    modeloUsuario.save((err, usuarioGuardado) => {
                        if (err) return res.status(500).send({ mensaje: 'error en la peticion ' });
                        if (!usuarioGuardado) return res.status(500).send({ mensaje: 'error al guardar usuario ' })
                        return res.status(200).send({ producto: usuarioGuardado })

                    })
                })


            }

        })
    } else {
        return res.status(404).send({ mensaje: 'debe ingresar los parametros obligatorios' })
    }

}



function Login(req, res) {
    var parametros = req.body;

    Usuario.findOne({ email: parametros.email}, (err, usuarioencontrado) => {
        if (err) return res.status(500).send({ mensaje: 'error en la peticion ' });
        if (usuarioencontrado) {
            bcrypt.compare(parametros.password, usuarioencontrado.password, (err, Verificaciondepasswor) => {
                if (Verificaciondepasswor) {
                    return res.status(200).send({ token: jwt.crearToken(usuarioencontrado) })
                } else {
                    return res.status(500).send({ mensaje: 'la contraseña no coincide' })
                }
            })

        } else {
            return res.status(500).send({ mensaje: 'El usuario nose ha podido identificar' })
        }
    })
}


function EditarPerfil(req, res) {

    var idUser = req.params.idUsuario;
    var parametros = req.body
    //borra la propiedad de password en el body

    delete parametros.password;

    if (req.user.sub !== idUser) {
        return res.status(500).send({ mensaje: 'no tiene los permisos para editar este usuario' });
    }

    Usuario.findByIdAndUpdate(req.user.sub,parametros, { new: true }, (err, usuarioEditado) => {
        if (err) return res.status(500).send({ mensaje: 'error en la peticion' });
        if (!usuarioEditado) return res.status(500).send({ mensaje: 'Error al editar usuario' })

        return res.status(200).send({ PerfilEditado: usuarioEditado });
    })

}

function EliminarPerfil(req, res) {
    var idUser = req.params.idUsuario;
    
    if(req.user.sub !== idUser) {
        return res.status(500).send({ mensaje: 'no tiene los permisos para eliminar este perfil' });
    }else{ 
    Usuario.findByIdAndDelete(idUser, (err, PerfilEliminado) => {
      if (err) return res.status(500).send({ mensaje: "Error en la peticion" });
      if (!PerfilEliminado)
        return res.status(500).send({ mensaje: "Error al eliminar el Curso" });
        return res.status(200).send({ PerfilEliminado: PerfilEliminado });
    });
}
}








module.exports = {
    maestroDefault,
    RegistrarMaestro,
    RegistrarAlumno,
    Login,
    EditarPerfil,
    EliminarPerfil
}
