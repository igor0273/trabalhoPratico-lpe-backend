const { pool } = require('../config');
const Empresa = require('../entities/empresa');


const getEmpresasDB = async () => {
    try {
        const { rows } = await pool.query(`SELECT * FROM empresa ORDER BY nome`);
        return rows.map((empresa) => new Empresa(empresa.codigo, empresa.nome,empresa.razaosocial,empresa.cnpj,empresa.sigla));
    } catch (err){
        throw "Erro: " + err;
    }
}

const addEmpresaDB = async (body) => {
    try {   
        const { cnpj, nome, razaosocial, sigla } =body;
        const results = await pool.query('insert into empresa (cnpj, nome, razaosocial,sigla) values ($1,$2,$3,$4) returning codigo, cnpj, nome, razaosocial,sigla;',
        [cnpj, nome, razaosocial, sigla]);
        const empresa = results.rows[0];
        return new Empresa(empresa.codigo, empresa.nome); 
    } catch (err) {
        throw "Erro ao inserir a empresa: " + err;
    }    
}


const updateEmpresaDB = async (body) => {
    try {   
        const {codigo, nome, razaoSocial, cnpj ,sigla} = body;
        const results = await pool.query(`UPDATE empresa SET  nome=$1, razaosocial=$2, cnpj=$3, sigla=$4
        WHERE codigo=$5 returning codigo, nome, razaosocial, cnpj,sigla`, 
        [nome, razaoSocial, cnpj,sigla ,codigo]);        
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const empresa = results.rows[0];
        return new Empresa(empresa.codigo, empresa.nome); 
    } catch (err) {
        throw "Erro ao alterar a empresa: " + err;
    }      
}

const deleteEmpresaDB = async (codigo) => {
    try {           
        const results = await pool.query(`DELETE FROM empresa where codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return "Empresa removida com sucesso";
        }       
    } catch (err) {
        throw "Erro ao remover a empresa: " + err;
    }     
}

const getEmpresaPorCodigoDB = async (codigo) => {
    try {           
        const results = await pool.query(`SELECT * FROM empresa where codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw "Nenhum registro encontrado com o código: " + codigo;
        } else {
            const empresa  = results.rows[0];
            return new Empresa(empresa.codigo, empresa.nome,empresa.razaosocial,empresa.cnpj,empresa.sigla); 
        }       
    } catch (err) {
        throw "Erro ao recuperar a empresa: " + err;
    }     
}

module.exports = {
    getEmpresasDB, addEmpresaDB, updateEmpresaDB, deleteEmpresaDB, getEmpresaPorCodigoDB
}