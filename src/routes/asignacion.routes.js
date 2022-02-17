const express = require('express');
const asignacionControlador = require('../controllers/asignacion.controller');
const md_Autenticacion = require('../middlewares/autenticacion');
const api = express.Router();

api.post('/AgregarAsignatura', md_Autenticacion.Auth, asignacionControlador.AgregarAsignatura); // agregar asignacion
api.get('/ObtenerAsignaturas', md_Autenticacion.Auth, asignacionControlador.ObtenerAsignaturas);  // obtener asignacion
api.put('/EditarAsignaturas/:idAsignatura', md_Autenticacion.Auth, asignacionControlador.EditarAsignaturas); // editar asignacion
api.delete('/EliminarAsignaturas/:idAsignatura', md_Autenticacion.Auth, asignacionControlador.EliminarAsignaturas); // aliminar asignacion

module.exports = api;   