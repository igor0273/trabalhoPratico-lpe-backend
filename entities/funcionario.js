class Funcionario {
    constructor(codigo, nome, cpf, rg, empresa,nomeempresa) {
        this.codigo = codigo;
        this.nome = nome;
        this.cfp = cpf;
        this.rg = rg;
        this.empresa = empresa;
        this.nomeempresa = nomeempresa;
    }
}

module.exports = Funcionario;