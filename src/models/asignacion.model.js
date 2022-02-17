const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AsignacionSchema = new Schema({
    idCurso: { type: Schema.Types.ObjectId, ref: 'Cursos' },
    idAlumno: { type: Schema.Types.ObjectId, ref: 'Usuarios' },
    asiganaciones: Number
})

module.exports = mongoose.model('Asignacion', AsignacionSchema);