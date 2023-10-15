const { getEmpresasDB, addEmpresaDB, 
    updateEmpresaDB, deleteEmpresaDB, getEmpresaPorCodigoDB } 
    = require('../usecases/empresaUseCases')

const getEmpresas = async (request, response) => {
    // capturando o usuario que foi enviado pelo next do verificaJWT
    console.log('Usuario no getCategorias' + 
    JSON.stringify(request.usuario));
    await getEmpresasDB()
          .then(data => response.status(200).json(data))
          .catch(err => response.status(400).json({
            status : 'error',
            message : 'Erro ao consultar as empresas: ' + err
          }))
}

const addEmpresa = async (request, response) => {
    await addEmpresaDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Empresa criada",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const updateEmpresa = async (request, response) => {
    await updateEmpresaDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Empresa alterada",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const deleteEmpresa = async (request, response) => {
    await deleteEmpresaDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json({
            status: "success", message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));        
}

const getEmpresaPorCodigo= async (request, response) => {
    await getEmpresaPorCodigoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));           
}

module.exports = {
   getEmpresas, addEmpresa, updateEmpresa, deleteEmpresa, getEmpresaPorCodigo
}