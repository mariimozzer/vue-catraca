<template>
    <div class="container">

        <div class="row">
            <div class="col-sm-12">
                <h1 class="titulo">{{ modoCadastro ? "Adicionar" : "Editar" }} Visitante</h1>
                <hr>
            </div>
        </div>

        <div class="row mt-3">
            <div class="col-sm-8">
                <label for="nomeCompleto">Nome</label>
                <input type="text" id="nomeCompleto" v-model="pessoa.nomeCompleto" class="form-control">
            </div>
            <div class="col-sm-4">
                <label for="cpf">CPF</label>
                <input type="text" id="CPF" v-model="pessoa.CPF" class="form-control" v-mask="cpfMask">
            </div>
        </div>

        <div class="row mt-3">
            <div class=" col-sm-3">
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="name" id="feminino" value="feminino"
                        v-bind:checked="pessoa.sexo == 'f'">
                    <label class="form-check-label" for="sexo">Feminino</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="sexo" id="masculino" value="masculino"
                        v-bind:checked="pessoa.sexo == 'm'">
                    <label class="form-check-label" for="sexo">Masculino</label>
                </div>
            </div>
        </div>

        <div class="row mt-3">
            <div class="col-sm-2">
                <label for="dtNasc">Data de nascimento</label>
                <input type="text" id="dtNasc" v-model="pessoa.dtNasc" class="form-control">
            </div>
            <div class="col-sm-4">
                <label for="email">E-mail</label>
                <input type="text" id="email" v-model="pessoa.email" class="form-control">
            </div>
            <div class="col-sm-3">
                <label for="celular">Celular</label>
                <input type="text" id="celular" v-model="pessoa.celular" class="form-control" v-mask="celularMask">
            </div>
        </div>

        <div class="row">
            <div class="col-sm-12 mt-4">
                <button @click="cancelarAcao" class="btn btn-default float-right">Cancelar</button>
                <button @click="salvarPessoa" class="btn btn-primary float-right mr-2">Salvar</button>
            </div>
        </div>

    </div>
</template>

<script>
import Pessoa from '@/models/pessoa-model';
import pessoaService from '@/service/pessoa-service';

export default {

    name: "VisitanteCadastro",
    data() {
        return {
           // pessoa: new Pessoa(),
            pessoa: new Pessoa({ id_setor: null }),
            modoCadastro: true,

            cpfMask: "###.###.###-##",
            dataMask: "##/##/####",
            celularMask: "(##)#####-####"
            
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
            this.$router.push({ name: "Visitante" })
        },

        atualizarPessoa() {
            pessoaService.atualizar(this.pessoa)
                .then(() => {
                    alert("Pessoa atualizada com sucesso!");
                    this.$router.push({ name: "Visitante" })
                })
                .catch(error => {
                    console.log(error);
                });
        },

        cadastrarPessoa() {
            /* if (this.pessoa.modeloValidoCadastro()) {
                alert("Insira o nome do visitante para cadastrar!");
                return;
            } */
            pessoaService.cadastrar(this.pessoa)
                .then(() => {
                    alert("Visitante cadastrado com sucesso!");
                    this.pessoa = new Pessoa();
                    this.$router.push({ name: "Visitante" })
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