const { request, response } = require('express');
const Usuario = require('../models/usuario');
const jwt = require('JsonWebToken');


const validateJWT = async (req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPUBLICKEY);
        const usuario = await Usuario.findById(uid);

        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe DB '
            })
        }

        if (!usuario.state) {
            return res.status(401).json({
                msg: 'Token no valido - usuario con estado: false'
            })
        }
        req.usuario = usuario;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        });
    }
    next();
}




module.exports = {
    validateJWT,
}