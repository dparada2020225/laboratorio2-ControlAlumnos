const express = require('express');
const asignacionCursos = require('../controllers/asignacion.controller');
const md_Autenticacion = require('../middlewares/autenticacion');
const api = express.Router();

api.post('/AgregarAsignatura', asignacionCursos.AgregarAsignatura); // agregar asignacion
api.get('/ObtenerAsignaciones', md_Autenticacion.Auth, asignacionCursos.EncontrarAsignaciones);
api.put('/EditarAsignaciones/:idAsignaciones', md_Autenticacion.Auth, asignacionCursos.EditarAsignaciones);
api.delete('/EliminarAsignaciones/:idAsignaciones', md_Autenticacion.Auth, asignacionCursos.EliminarAsignaciones);

module.exports = api;