export default class Acesso {
    constructor(obj){
        
        obj = obj || {};
        
        this.id = obj.id;
        this.nomeCompleto = obj.nomeCompleto;
        this.sexo = obj.sexo;
        this.dtNasc = obj.dtNasc;
        this.cpf = obj.cpf;
        this.email = obj.email;
        this.celular = obj.celular;
        this.id_setor = obj.id_setor;
        this.visitante = obj.visitante;
        this.path_image = obj.path_image;       

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