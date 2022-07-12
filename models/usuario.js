const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
    name: {
        type: String,
        required: [true, "El nombre es obligatorio"],
    },
    email: {
        type: String,
        required: [true, "El correo es oblgiatorio"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "La contraseña es oblgiatoria"]
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
    },
    state: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    },

})

UsuarioSchema.methods.toJSON = function () {
    const { __v, password, ...usuario } = this.toObject();
    return usuario
}

module.exports = model('Usuario', UsuarioSchema);