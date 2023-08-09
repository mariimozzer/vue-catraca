export default class Setor {
    constructor(obj){
        
        obj = obj || {};
        
        this.id = obj.id;
        this.nome = obj.nome;

        /* this.valor = obj.valor || 0;
        this.quantidadeEstoque = obj.quantidadeEstoque || 0;
        this.dataCadastro = obj.dataCadastro; */

    }

    modeloValidoCadastro() {
        return !!this.nome
    }

    modeloValidoAtualizar() {
        return !!(this.id && this.nome)
    }
}