const { response, request } = require('express');
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario.js');

const usuariosGet = async (req, res) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { state: true };

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
    })
}

const usuariosPost = async (req, res) => {
    const { name, email, password, rol } = req.body;
    const usuario = new Usuario({ name, email, password, rol });

    //encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //grabar base da datos
    await usuario.save();
    res.json({
        msg: 'Post API -- controlador',
        usuario
    })
}

const usuariosPut = async (req, res) => {
    const { id } = req.params;
    const { _id, password, google, email, ...resto } = req.body;

    const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

    //Validar contra base de datos
    if (password) {
    const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }
    res.json(usuario);
};

const usuariosPatch = (req, res) => {
    res.json({
        msg: 'Post API -- controlador'
    })
}

const usuariosDelete = async(req, res) => {
    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, {state: false}, {new: true});
    res.json({
        usuario
    })
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete,
}