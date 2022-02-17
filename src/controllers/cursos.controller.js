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


function obtenerEncuestas(req, res){
    Encuesta.find({}, (err, encuestasEncontradas)=>{
        if (err) return res.status(500).send({ mensaje: 'error en la peticion ' });
        if (!encuestasEncontradas) return res.status(500).send({ mensaje: 'error al obtener encuestas ' })

        return res.status(200).send({ encuestas: encuestasEncontradas }) 
    }).populate('idCreadorEncuesta','nombre email')
}

module.exports={
    agregarCurso,
    obtenerEncuestas

}