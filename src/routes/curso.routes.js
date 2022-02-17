const express = require('express')
const cursoControlador = require('../controllers/cursos.controller')

const md_auntenticacion = require('../middlewares/autenticacion')
const api = express.Router();



api.post('/AgregarCurso',md_auntenticacion.Auth,cursoControlador.agregarCurso ) // agregar curso -maestro

module.exports = api;