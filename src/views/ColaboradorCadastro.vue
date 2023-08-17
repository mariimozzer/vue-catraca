<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <h1 class="titulo">{{ modoCadastro ? "Adicionar" : "Editar" }} Colaborador</h1>
                <hr>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-6">
                <label for="nomeCompleto">Colaborador</label>
                <input type="text" id="nomeCompleto" v-model="pessoa.nomeCompleto" class="form-control">
            </div>
        </div>
        <div class="row">
            <div class="col-sm-9 mt-4">
                <button @click="cancelarAcao" class="btn btn-default float-right">Cancelar</button>
                <button @click="salvarSetor" class="btn btn-primary float-right mr-2">Salvar</button>
            </div>
        </div>
        <!-- modal -->
        <div class="modal is-valid" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Modal title</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>Modal body text goes here.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary">Save changes</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Pessoa from '@/models/pessoa-model';
import pessoaService from '@/service/pessoa-service';

export default {

    name: "PessoaCadastro",
    data() {
        return {
            pessoa: new Pessoa(),
            modoCadastro: true,

        }
    },

    mounted() {

        let id = this.$route.params.id;
        if (!id) return;  //verifica se a tela trouxe algo, caso não tenha pessoa, a tela será carregada em modo de cadastro

        this.modoCadastro = false;
        this.obterPessoaId(id);

    },

    methods: {

        obterPessoaId(id) {
            pessoaService.obterPorId(id)
                .then(response => {
                    console.log(response);
                    this.pessoa = new Pessoa(response.data);
                    console.log(this.pessoa);
                })
                .catch(error => {
                    console.log(error)
                })
        },

        cancelarAcao() {
            this.pessoa = new Pessoa();
            this.$router.push({ name: "Colaborador" })
        },

        atualizarPessoa() {
            pessoaService.atualizar(this.pessoa)
                .then(() => {
                    alert("Pessoa atualizada com sucesso!");
                    this.$router.push({ name: "Colaborador" })
                })
                .catch(error => {
                    console.log(error);
                });
        },

        cadastrarPessoa() {

            /* if(this.setor.modeloValidoCadastro()) {
                 alert("Insira o nome do setor para cadastrar!");
                 return;
             } */

            pessoaService.cadastrar(this.pessoa)
                .then(() => {
                    alert("Pessoa cadastrado com sucesso!");
                    this.pessoa = new Pessoa();
                    this.$router.push({ name: "Colaborador" })
                })
                .catch(error => {
                    console.log(error);
                });


        },

        salvarPessoa() {
            (this.modoCadastro) ? this.cadastrarPessoa() : this.atualizarPessoa();
        }
    }
}

</script>

<style>
.titulo {
    font-size: 25px;
    font-weight: 500;
    margin-top: 10px
}
</style>