const { Router } = require('express');

const { rotasEmpresas } = require('./rotasEmpresa');

const { rotasFuncionarios} = require('./rotasFuncionario');

const { login } = require('../controllers/segurancaController');

const rotas = new Router();

// rota para o login
rotas.route('/login').post(login);

rotas.use(rotasEmpresas);
rotas.use(rotasFuncionarios);

module.exports = rotas;