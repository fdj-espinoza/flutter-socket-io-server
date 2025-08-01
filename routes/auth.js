/*
    path: api/login

*/

const { Router, response } = require('express');
const { check } = require('express-validator');

const { crearUsuario, login, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const route = Router();

route.post('/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio y debe tener al menos 6 caracteres').isLength({ min: 6 }),
    validarCampos
], crearUsuario);

route.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio y debe tener al menos 6 caracteres').isLength({ min: 6 }),
    validarCampos
], login);

route.get('/renew', validarJWT, renewToken);

module.exports = route;