

const { response , request} = require('express')


const usuariosGet = (req, res) => {
    const { q, name = "No name", page = "1", limit, apikey} = req.query;
    res.json({
        msg: 'Get API -- controlador',
        name,
        page,
        limit,
    })
}
const usuariosPut = (req, res) => {
    const { id } = req.params;
    res.json({
        msg: 'Put API -- controlador',
        id
    })
};

const usuariosPost = (req, res) => {
    const { nombre, edad } = req.body;
    res.json({
        msg: 'Post API -- controlador',
        nombre,
        edad
    })
}

const usuariosPatch = (req, res) => {
    res.json({
        msg: 'Post API -- controlador'
    })
}

const usuariosDelete = (req, res) => {
    res.json({
        msg: 'Delete API -- controlador'
    })
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete,
}