const { pool } = require('../config');
const Funcionario = require('../entities/funcionario');


const getFuncionariosDB = async () => {
    try {    
        const { rows } = await pool.query(`select p.codigo as codigo, p.nome as nome, p.cpf as cpf, p.rg as rg, 
        p.empresa as empresa,c.nome as nomeempresa
        from funcionario p
        join empresa c on p.empresa = c.codigo
        order by p.codigo`);
        return rows.map((funcionario) => new Funcionario(funcionario.codigo, funcionario.nome, funcionario.cpf, funcionario.rg, 
            funcionario.empresa,funcionario.nomeempresa));        
    } catch (err) {
        throw "Erro : " + err;
    }
}

const addFuncionarioDB = async (body) => {
    try {   
        console.log(body)
        const { cpf, nome, rg,empresa } = body; 

        const results = await pool.query('insert into funcionario (cpf, nome,rg,empresa) values ($1,$2,$3,$4) returning codigo, cpf,nome,rg,empresa',
        [cpf, nome, rg,empresa]);
        const funcionario = results.rows[0];
        return new Funcionario(funcionario.codigo, funcionario.nome, funcionario.cpf, funcionario.rg, 
            funcionario.empresa);
    } catch (err) {
        throw "Erro ao inserir o funcionario: " + err;
    }    
}

const updateFuncionarioDB = async (body) => {
    try {   
        const { codigo, nome, cpf, rg } = body;
        const results = await  pool.query('UPDATE funcionario SET nome=$1, cpf=$2, rg=$3 where codigo = $4 returning codigo,nome,cpf,rg',
        [nome, cpf, rg, codigo]);        
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const funcionario = results.rows[0];
        return new Funcionario(funcionario.codigo, funcionario.nome, funcionario.cpf, funcionario.rg);
    } catch (err) {
        throw "Erro ao alterar o funcionario: " + err;
    }      
}

const deleteFucnionarioDB = async (codigo) => {
    try {           
        const results = await pool.query(`DELETE FROM funcionario where codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return "Funcionario removido com sucesso";
        }       
    } catch (err) {
        throw "Erro ao remover o funcionario: " + err;
    }     
}

const getFuncionarioPorCodigoDB = async (codigo) => {
    try {           
        const results = await  pool.query('SELECT * FROM funcionario WHERE codigo=$1',
        [codigo]);
        if (results.rowCount == 0){
            throw "Nenhum registro encontrado com o código: " + codigo;
        } else {
            const funcionario = results.rows[0];
            return new Funcionario(funcionario.codigo, funcionario.nome, funcionario.cpf, funcionario.rg, 
                funcionario.empresa);
        }       
    } catch (err) {
        throw "Erro ao recuperar o funcionario: " + err;
    }     
}

module.exports = {
    getFuncionariosDB, addFuncionarioDB, updateFuncionarioDB, deleteFucnionarioDB, getFuncionarioPorCodigoDB
}
