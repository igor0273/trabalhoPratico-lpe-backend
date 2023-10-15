const { Router } = require('express');

const { getEmpresas, addEmpresa, updateEmpresa, deleteEmpresa, getEmpresaPorCodigo } = require('../controllers/EmpresaController');
const { verificaJWT } = require('../controllers/segurancaController');
const rotasEmpresas = new Router();

rotasEmpresas.route('/empresa')
    .get(verificaJWT, getEmpresas)
    .post(verificaJWT, addEmpresa)
    .put(verificaJWT, updateEmpresa)

rotasEmpresas.route('/empresa/:codigo')
    .get(verificaJWT, getEmpresaPorCodigo)
    .delete(verificaJWT, deleteEmpresa)

module.exports = { rotasEmpresas };