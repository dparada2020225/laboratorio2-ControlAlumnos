const Asignacion = require('../models/asignacion.model');

function AgregarAsignatura(req, res) {
    
    var parametros = req.body;
    var asignacion = new Asignacion();

    if (req.user.rol == 'ROL_ALUMNO') {
        if (parametros.idCurso) {
            var asiganaciones;
            asignacion.idCurso = parametros.idCurso;
            asignacion.idAlumno = req.user.sub;
            // if(asiganaciones++ && asiganaciones.length >3) {
            //     asignacion.save((err, asignaturaGuardada) => {
            //         if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
            //         if (!asignaturaGuardada) return res.status(500).send({ mensaje: 'Error al agregar asignacion' });
            //         return res.status(200).send({ asignatura: asignaturaGuardada });
                    
            //     })
            // }else{
            //     return res.status(500).send({ mensaje: 'llego al limite de asignaciones' });
            // }
            asignacion.save((err, asignaturaGuardada) => {
                        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
                        if (!asignaturaGuardada) return res.status(500).send({ mensaje: 'Error al agregar asignacion' });
                        return res.status(200).send({ asignatura: asignaturaGuardada });
                        
                    })
            
            

        } else {
            return res.status(500).send({ mensaje: 'ingrese los datos obligatorioss' });
        }

    } else {
        return res.status(500).send({ mensaje: 'no es alumno' })
    }
    

}

function ObtenerAsignaturas(req, res) {
    if (req.user.rol == "ROL_ALUMNO") {
        Asignacion.find({}, (err, cursosEncontrados) => {
            if(err) return res.status(500).send({mensaje: 'Error en la Peticion'});
            if(!cursosEncontrados) return res.status(500).send({mensaje: 'Error al obtener las Asignaciones'});

            return res.status(200).send({asignacion: cursosEncontrados});
        })

        
    }

}

function EditarAsignaturas(req, res) {
    var idAS = req.params.idAsignatura;
    var parametros = req.body;

    if (req.user.rol != 'ROL_MAESTRO') {
        Asignacion.findByIdAndUpdate(idAS, parametros, { new: true }, (err, cursosEditados) => {
            if (err) return res.status(500).send({ mensaje: 'Error en  la peticion' });
            if (!cursosEditados) return res.status(403).send({ mensaje: 'Error al editar la asignatura' });
            return res.status(200).send({ casignaturaEditada: cursosEditados });
        })
    } else {
        return res.status(500).send({ mensaje: 'No tiene los permisos' });
    }

}

function EliminarAsignaturas(req, res) {
    

    if (req.user.rol == 'ROL_MAESTRO') {
        var idAS = req.params.idAsignatura;

    Asignacion.findByIdAndDelete(idAS, (err, cursoEliminado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!cursoEliminado) return res.status(500).send({ mensaje: 'Error al eliminar la asignatura' });
        return res.status(200).send({ asignaturaEliminada: cursoEliminado });
    })
    } else {
        return res.status(500).send({ mensaje: 'No tiene los permisos' });
    }
}

module.exports = {
    AgregarAsignatura,
    ObtenerAsignaturas,
    EditarAsignaturas,
    EliminarAsignaturas
}