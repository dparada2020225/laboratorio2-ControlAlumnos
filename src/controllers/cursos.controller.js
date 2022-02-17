const Curso = require('../models/curso.model');

function agregarCurso(req, res){
    var parametros = req.body;
    var modeloCurso = new Curso();

    if(req.user.rol == "ROL_ALUMNO"){
        return res.status(500).send({ mensaje: 'no tiene permisos agregar curso ' })
    }else{
        if(parametros.nombreCurso){
            modeloCurso.nombreCurso = parametros.nombreCurso;
            modeloCurso.idMaestro = req.user.sub;
        
            modeloCurso.save((err, CursoGuardado) =>{
                if (err) return res.status(500).send({ mensaje: 'error en la peticion ' });
                if (!CursoGuardado) return res.status(500).send({ mensaje: 'error al agregar curso ' })
                
                return res.status(200).send({ Curso: CursoGuardado.nombreCurso, maestro: req.user }) 
            })
        }else{
            return res.status(500).send({mensaje: 'Debe ingresar los parametros obligatorios'})
        }
    }
}

function EditarCurso(req, res){
    var idCurso = req.params.idCurso;
    var parametros = req.body;

    delete parametros.password;

    if(req.user.rol == "ROL_ALUMNO"){
        return res.status(500).send({ mensaje: 'no tiene los permisos para editar este curso usted es un alumno' });
    }else{
        Curso.findByIdAndUpdate(idCurso,parametros,{new: true}, (err, cursoEditado) => {
            if(err) return res.status(500).send({ mensaje: 'error en la peticion' });
            if(!cursoEditado) return res.status(500).send({ mensaje: 'Error al editar curso'})
    
            return res.status(200).send({ curso: cursoEditado});
        })
    }
}

function EliminarCurso(req, res) {
    var idCurso = req.params.idCurso;
    
    if(req.user.rol == "ROL_ALUMNO"){
        return res.status(500).send({ mensaje: 'no tiene los permisos para eliminar este curso usted es un alumno' });
    }else{ 
    Curso.findByIdAndDelete(idCurso, (err, cursoEliminado) => {
      if (err) return res.status(500).send({ mensaje: "Error en la peticion" });
      if (!cursoEliminado)
        return res.status(500).send({ mensaje: "Error al eliminar el Curso" });
        return res.status(200).send({ cursoEliminado: cursoEliminado });
    });
}
}

function ObtenerCursos (req, res) {
    var maestro = req.params.idMaestro;
    if(req.user.sub !== maestro){
        return res.status(500).send({ mensaje: 'no tiene los permisos para ver estos cursos' });
    }else{
    Curso.find({}, (err, cursosEncontrados) => {
        return res.send({ curso: cursosEncontrados })
    }).populate("idMaestro", "nombre");
}
}


module.exports={
    agregarCurso,
    EditarCurso,
    EliminarCurso,
    ObtenerCursos

}