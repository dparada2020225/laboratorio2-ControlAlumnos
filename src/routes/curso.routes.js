const express = require('express')
const cursoControlador = require('../controllers/cursos.controller')

const md_auntenticacion = require('../middlewares/autenticacion')
const api = express.Router();



api.post('/AgregarCurso',md_auntenticacion.Auth,cursoControlador.agregarCurso ) // agregar curso -maestro
api.put('/EditarCurso/:idCurso',md_auntenticacion.Auth,cursoControlador.EditarCurso )  // editar curso 
api.delete('/EliminarCurso/:idCurso',md_auntenticacion.Auth,cursoControlador.EliminarCurso)  // elliminar curso 
api.get('/cursos/:idMaestro',md_auntenticacion.Auth, cursoControlador.ObtenerCursos);  // obtener cursos 


module.exports = api;