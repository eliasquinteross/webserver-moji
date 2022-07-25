const { request, response } = require('express');
const Role = require('../models/role');



const AdminRole = async (req, res, next) => {

    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token'
        })
    }
    const { rol, name } = req.usuario;

    if (rol != "ADMIN_ROLE") {
        return res.status(401).json({
            msg: `${name} no es Admin, no puede realizar la accion`
        })
    }

    next();
}

const HasRole = (...roles) => {

    return (req, res, next) => {
        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token'
            })
        }

        if (!roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msg: `Rol invalido -- ROLES PERMITIDOS: ${roles}`
            })
        }

        next();
    }
}

module.exports = {
    AdminRole,
    HasRole
}