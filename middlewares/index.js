const  validarCampos = require('../middlewares/validar-campos');
const  validateJWT  = require('../middlewares/validate-jwt');
const  AdminRole = require('../middlewares/validate-role'); 
const HasRole  = require('../middlewares/validate-role');

module.exports = {
    ...validarCampos,
    ...validateJWT,
    ...AdminRole,
    ...HasRole
}