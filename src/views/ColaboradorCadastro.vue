<template>
    <div class="container">

        <!-- ADICIONAR / EDITAR -->

        <div class="row mb-4">
            <div class="col-sm-12">
                <h1 class="titulo">{{ modoCadastro ? "Adicionar" : "Editar" }} Colaborador</h1>
                <hr>
            </div>
        </div>

        <!-- NOME COMPLETO E CPF -->

        <div class="row">
            <div class="col-sm-6">
                <label for="nomeCompleto">Nome</label>
                <input type="text" id="nomeCompleto" v-model="pessoa.nomeCompleto" class="form-control">
            </div>
            <div class="col-sm-2">
                <label for="cpf">CPF</label>
                <input type="text" id="CPF" v-model="pessoa.CPF" v-mask="'###.###.###-##'" class="form-control">
            </div>
            <div class="col-sm-4 d-flex">
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="sexo" id="feminino" value="feminino"
                        v-bind:checked="pessoa.sexo == 'f'" v-model="pessoa.sexo">
                    <label class="form-check-label" for="sexo">Feminino</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="sexo" id="masculino" value="masculino"
                        v-bind:checked="pessoa.sexo == 'm'" v-model="pessoa.sexo">
                    <label class="form-check-label" for="sexo">Masculino</label>
                </div>
            </div>
        </div>

        <!-- DT NASC / EMAIL / CELULAR -->

        <div class="row mt-3">
            <div class="col-sm-2">
                <label for="dtNasc">Data de nascimento</label>
                <input type="text" id="dtNasc" v-model="pessoa.dtNasc" v-mask="'##/##/####'" class="form-control">
            </div>
            <div class="col-sm-4">
                <label for="email">E-mail</label>
                <input type="text" id="email" v-model="pessoa.email" class="form-control">
            </div>
            <div class="col-sm-3">
                <label for="celular">Celular</label>
                <input type="text" id="celular" v-model="pessoa.celular" v-mask="'(##) #####-####'"
                    class="form-control">
            </div>
        </div>

        <!-- SETOR -->

        <div class="row mt-3">
            <div class="col-sm-3">
                <label for="id_setor">Setor</label>
                <select v-model="pessoa.id_setor" class="form-control">
                    <option v-for="setor in listaDeSetores" :key="setor.id" :value="setor">
                        {{ setor.nome }}
                    </option>
                </select>
            </div>
        </div>

        <!-- SALVAR / CANCELAR -->

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
import axios from 'axios';

export default {

    name: "ColaboradorCadastro",
    data() {
        return {
            pessoa: new Pessoa({ id_setor: null}),
            modoCadastro: true,
            listaDeSetores: []
        }
    },

    mounted() {
        let id = this.$route.params.id;
        //verifica se a tela trouxe algo, caso não tenha pessoa, a tela será carregada em modo de cadastro
        if (id) {
            this.modoCadastro = false;
            this.obterPessoaId(id);
        }

        this.carregarSetores();
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
            /* if(this.pessoa.modeloValidoCadastro()) {
                 alert("Insira o nome do colaborador para cadastrar!");
                 return;
             } */
            pessoaService.cadastrar(this.pessoa)
                .then(() => {
                    console.log(this.pessoa);
                    this.pessoa = new Pessoa();
                    this.$router.push({ name: "Colaborador" })
                })
                .catch(error => {
                    console.log(error);
                });
        },

        salvarPessoa() {
            (this.modoCadastro) ? this.cadastrarPessoa() : this.atualizarPessoa();
        },

        carregarSetores() {
            axios.get('http://192.168.0.6:8001/api/setor')
                .then(response => {
                    this.listaDeSetores = response.data.data;
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                    alert("Erro ao carregar a lista de setores. Verifique a conexão e tente novamente.");
                });
        },        
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