const Role = require('../models/role.js');
const Usuario = require('../models/usuario.js');


const esRoleValido =  async(rol = '') => {
    const existRol = await Role.findOne({ rol });
    if (!existRol) {
        throw new Error(`EL rol ${rol} no esta registrado en la DB`)
    }
}

const emailExiste = async (email = '') => {
    const existEmail = await Usuario.findOne({ email });
    if (existEmail) {
        throw new Error(`El correo: ${email} ya esta registrado`);
    }
}

const usuarioExiste = async (id = '') => {
    const existUsuario = await Usuario.findOne({ _id: id });
    if (!existUsuario) {
        throw new Error(`El id: ${id} no esta registrado`);
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    usuarioExiste,
}