const Asignacion = require('../models/asignacion.model');
const Asignaciones = require('../models/asigancion.model');
const cursosModel = require('../models/cursos.model');
const Usuarios = require('../models/usuario.model');

function AgregarAsignatura(req, res) {
    var parametros = req.body;
    var asignacion = new Asignacion();

    if (req.user.rol == 'ROL_ALUMNO') {
        if (parametros.idCurso != null  && parametros.idAlumno != null) {
            asignacion.idCurso = parametros.idCurso;
            asignacion.idAlumno = parametros.idAlumno;
            asignacion.asiganaciones ++;

            if (parametros.asiganaciones < 3){
                asignacion.save((err, asignaturaGuardada) => {
                    if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
                    if (!asignaturaGuardada) return res.status(500).send({ mensaje: 'Error al agregar asignacion' });
                    return res.status(200).send({ asignatura: asignaturaGuardada });
                })
            }else{
                return res.status(500).send({ mensaje: 'llego al maximo de cursos para asignarse'});
            }
        }else{
            return res.status(500).send({ mensaje: 'ingrese los datos obligatorioss'});
        }

    } else {
        return res.status(500).send({ mensaje: 'no es alumno' })
    }

}

function Asignar(req, res){
    var idUs = req.user.sub;
    var parametros = req.body.clasesAsignados;
    
}

function EncontrarAsignaciones(req, res) {
    if (req.user.rol == 'MAESTRO') {
        Cursos.find({}, (err, cursosEncontrados) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
            if (!cursosEncontrados) return res.status(500).send({ mensaje: 'Error al obtener las cursos' });
            return res.status(200).send({ cursos: cursosEncontrados });
        }).populate('idMaestro', 'nombres');
    }

}

function EditarAsignaciones(req, res) {
    var idCur = req.params.idCursos;
    var parametros = req.body;

    if (req.user.rol == 'MAESTRO') {
        Cursos.findByIdAndUpdate(idCur, parametros, { new: true }, (err, cursosEditados) => {
            if (err) return res.status(500).send({ mensaje: 'Error en  la peticion' });
            if (!cursosEditados) return res.status(403).send({ mensaje: 'Error al editar el cursos' });
            return res.status(200).send({ cursos: cursosEditados });
        })
    } else {
        return res.status(500).send({ mensaje: 'No tiene los permisos' });
    }

}

function EliminarAsignaciones(req, res) {
    var idCur = req.params.idCursos;

    Cursos.findByIdAndDelete(idCur, (err, cursoEliminado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!cursoEliminado) return res.status(500).send({ mensaje: 'Error al eliminar el curso' });
        return res.status(200).send({ curso: cursoEliminado });
    })
}

module.exports = {
    AgregarAsignatura,
    Asignar,
    EncontrarAsignaciones,
    EditarAsignaciones,
    EliminarAsignaciones
}