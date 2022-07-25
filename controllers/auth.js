const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario.js');
const { generateJWT } = require('../helpers/generate-jwt.js');



const login = async (req, res,) => {

    try {
        const { email, password } = req.body;
        const usuario = await Usuario.findOne({ email });
        
        //Verificar si email existe
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Password invalido --correo'
            });
        }
        //Si el usuario esta activo 
        if (!usuario.state) {
            return res.status(400).json({
                msg: 'Usuario / Password invalido --state: falso'
            });
        }
        //Verificar contraseña 
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password invalido --password'
            })
        }
        //Generar JWT
        const token = await generateJWT(usuario.id)

        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con administrador'
        })
    }
}

module.exports = {
    login
};