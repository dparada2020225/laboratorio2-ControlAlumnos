const jwt_simple = require('jwt-simple');
const moment = require('moment');
const claveSecreta = "calve_secreta_Practica_supervisada"

exports.Auth = function (req, res, next) {
    if (!req.headers.authorization) {
        return res.status(500).send({ mensaje: 'La peticion no tiene la cabezera de authorization' });
    }

    var token = req.headers.authorization.replace(/['"]+/g, '');

    try {
        var payload = jwt_simple.decode(token, claveSecreta)
        if (payload.exp <= moment().unix()) {
            return res.status(500).send({ mensaje: 'El token a expirado' });
        }
    } catch (error) {
        return res.status(500).send({ mensaje: 'El token no es valido' });
    }

    req.user = payload;
    next();
}