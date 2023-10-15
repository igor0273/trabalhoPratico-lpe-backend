class Empresa {
    constructor(codigo, nome,razaoSocial,cnpj,sigla){
        this.codigo = codigo;
        this.nome = nome;
        this.razaoSocial = razaoSocial;
        this.cnpj = cnpj;
        this.sigla = sigla;
    }
}

module.exports = Empresa;