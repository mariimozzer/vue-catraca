export default class Pessoa {
    constructor(obj){
        
        obj = obj || {};
        
        this.id = obj.id;
        this.nomeCompleto = obj.nomeCompleto;
        this.sexo = obj.sexo;
        this.dtNasc = obj.dtNasc;
        this.CPF = obj.CPF;
        this.email = obj.email;
        this.celular = obj.celular;
        this.id_setor = obj.id_setor;
        this.visitante = obj.visitante;
        this.path_image = obj.path_image;       
    }

     modeloValidoCadastro() {
        return !!this.nomeCompleto
    }

    modeloValidoAtualizar() {
        return !!(this.id && this.nomeCompleto)
    }
}