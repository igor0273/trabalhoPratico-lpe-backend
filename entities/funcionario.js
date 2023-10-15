class Funcionario {
    constructor(codigo, nome, cpf, rg, empresa) {
        this.codigo = codigo;
        this.nome = nome;
        this.cfp = cpf;
        this.rg = rg;
        this.categoria = empresa;
    }
}

module.exports = Funcionario;