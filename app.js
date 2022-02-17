const express = require('express');
const app = express();
const cors = require('cors');



// imprtacion rutas

const UsuarioRutes = require('./src/routes/usuario.routes')
const CursosRutes = require('./src/routes/curso.routes')
const AsignacionesRutes = require('./src/routes/curso.routes')


// middelWARE
app.use(express.urlencoded({estended: false}))
app.use(express.json())


// cabeceras
app.use(cors())

// carga de rutas
app.use('/api' ,UsuarioRutes , CursosRutes, AsignacionesRutes)



module.exports = app;