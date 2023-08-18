export default class Acesso {
    constructor(obj){   
        obj = obj || {};
        this.id = obj.id;
        this.acesso_DH = obj.acesso_DH;
        this.nomeCompleto = obj.nomeCompleto;
        this.local_nome = obj.local_nome;
    }

  /*   modeloValidoCadastro() {
        return !!this.nomeCompleto
    }

    modeloValidoAtualizar() {
        return !!(this.id && this.nomeCompleto)
    } */
}