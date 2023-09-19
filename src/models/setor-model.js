export default class Setor {
    constructor(obj){
        
        obj = obj || {};
        
        this.id = obj.id;
        this.nome = obj.nome;

    }

    modeloValidoCadastro() {
        return !!this.nome
    }

    modeloValidoAtualizar() {
        return !!(this.id && this.nome)
    }
}