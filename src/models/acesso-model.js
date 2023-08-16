export default class Acesso {
    constructor(obj){
        
        obj = obj || {};
        
        this.pessoa_id = obj.pessoa_id;
        this.acesso_DH = obj.acesso_DH;
        this.nomeCompleto = obj.nomeCompleto;
        this.local_nome = obj.local_nome;
       

        /* this.valor = obj.valor || 0;
        this.quantidadeEstoque = obj.quantidadeEstoque || 0;
        this.dataCadastro = obj.dataCadastro; */

    }

  /*   modeloValidoCadastro() {
        return !!this.nomeCompleto
    }

    modeloValidoAtualizar() {
        return !!(this.id && this.nomeCompleto)
    } */
}