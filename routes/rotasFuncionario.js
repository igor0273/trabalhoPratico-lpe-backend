const { Router } = require('express');

const {  getFucnionarios, addFuncionario, updateFuncionario, deleteFuncionario, getFuncionarioPorCodigo } = require('../controllers/funcionarioController');
const { verificaJWT } = require('../controllers/segurancaController');

const rotasFuncionarios = new Router();

rotasFuncionarios.route('/funcionario')
   .get(verificaJWT , getFucnionarios)
   .post(verificaJWT , addFuncionario)
   .put(verificaJWT , updateFuncionario)

   rotasFuncionarios.route('/funcionario/:codigo')
   .get(verificaJWT , getFuncionarioPorCodigo)
   .delete(verificaJWT , deleteFuncionario)

module.exports = { rotasFuncionarios };