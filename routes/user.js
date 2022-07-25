const { Router } = require('express');
const { check } = require('express-validator');


const { 
    validarCampos,
    validateJWT,
    AdminRole,
    HasRole
} = require('../middlewares')

const { esRoleValido, emailExiste, usuarioExiste } = require('../helpers/db-validator');

const {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch } = require('../controllers/user');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(usuarioExiste),
    validarCampos
], usuariosPut);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe ser de al menos 6 letras').isLength({ min: 6 }),
    check('email', 'El correo ingresado no es valido').isEmail(),
    check('email').custom(emailExiste),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPost);

router.delete('/:id', [
    validateJWT,
    AdminRole,
    HasRole('ADMIN_ROLE', 'USER_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(usuarioExiste),
    validarCampos
], usuariosDelete);

module.exports = router;