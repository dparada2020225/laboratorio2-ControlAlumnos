const express = require('express')
const usuarioControlador = require('../controllers/usuario.controller')

const md_auntenticacion = require('../middlewares/autenticacion')
const api = express.Router();


api.get('/', usuarioControlador.maestroDefault) //usuario maestro default
api.post('/registrarMaestro', usuarioControlador.RegistrarMaestro) // registrar un nuevo maestro
api.post('/registrarAlumno', usuarioControlador.RegistrarAlumno) // registrar un nuevo alumno
api.post('/login', usuarioControlador.Login) // login
api.put('/editarPerfil/:idUsuario',md_auntenticacion.Auth,usuarioControlador.EditarPerfil ) // editar perfil
api.delete('/eliminarPerfil/:idUsuario',md_auntenticacion.Auth,usuarioControlador.EliminarPerfil ) // editar perfil

module.exports = api;