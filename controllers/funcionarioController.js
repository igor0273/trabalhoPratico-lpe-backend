const { getFuncionariosDB, addFuncionarioDB, updateFuncionarioDB, deleteFucnionarioDB, getFuncionarioPorCodigoDB } = require('../usecases/funcionarioUseCases')

const getFucnionarios = async (request, response) => {
    await getFuncionariosDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar os produtos: ' + err
        }));
}

const addFuncionario = async (request, response) => {
    await addFuncionarioDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Produto criado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const updateFuncionario = async (request, response) => {
    await updateFuncionarioDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Produto alterado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const deleteFuncionario = async (request, response) => {
    await deleteFucnionarioDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json({
            status: "success", message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));        
}

const getFuncionarioPorCodigo= async (request, response) => {
    await getFuncionarioPorCodigoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));           
}

module.exports = {
   getFucnionarios, addFuncionario, updateFuncionario, deleteFuncionario, getFuncionarioPorCodigo
}

