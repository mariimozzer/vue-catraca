<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <h2>Colaboradores</h2>
                <hr>
            </div>
        </div>
        <div class="row sub-contnainer">
            <div class="col-sm-3">
                <ButtonComponent :callback="adicionarPessoa" value="Adicionar colaborador"></ButtonComponent>
            </div>       
        </div>
        <div class="row">
            <div class="col-sm-12">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>CPF</th>
                            <th>Sexo</th>
                            <th>Data de nascimento</th>
                            <th>Celular</th>
                            <th>E-mail</th>
                            <th>Setor</th>
                            <th>Foto</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in pessoas" :key="item.id" v-show="item.visitante == 0" > 
                            <!-- v-show para trazer somente as pessoas marcadas como colaboradores (visitante = 0) -->
                            <td>{{ item.nomeCompleto }}</td>
                            <td>{{ item.CPF }}</td>
                            <td>{{ item.sexo }}</td>
                            <td>{{ item.dtNasc }}</td>
                            <td>{{ item.celular }}</td>
                            <td>{{ item.email }}</td>
                            <td>{{ item.id_setor }}</td>
                            <td><button>Ver foto</button></td>
                            <td>
                                <i @click="editarPessoa(item)" class="fa fa-edit icones-tabela"></i>
                                <i @click="excluirPessoa(item)" class="fa fa-trash icones-tabela"></i>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import ButtonComponent from '@/components/button/ButtonComponent.vue';
import pessoaService from '@/service/pessoa-service';
import Pessoa from '../models/pessoa-model'
//import conversorDeData from '@/utils/conversor-data'

export default {

    name: 'ColaboradorView',
    components: {
       ButtonComponent
    },
    data() {
        return {
            pessoas: [],
        }
    },

    methods: {
        ordenarPessoas(a, b) {
            return (a.id < b.id) ? -1 : (a.id > b.id) ? 1 : 0;
        },
        obterTodasPessoas() {
            pessoaService
                .obterTodos()
                .then(response => {
                    this.pessoas = response.data.data.map(p => new Pessoa(p));
                    this.pessoas = this.pessoas.sort(this.ordenarPessoas).reverse();
                    console.log(this.pessoas);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        adicionarPessoa() {
            this.$router.push({ name: "NovoColaborador" })
        },
        editarPessoa(pessoa) {
            this.$router.push({ name: "EditarColaborador", params: { id: pessoa.id } })
        },
    },

    mounted() {
        this.obterTodasPessoas();
    },
}
</script>

<style>
.icones-tabela {
    margin: 5px;
    color: var(--cor-primaria);
    cursor: pointer;
}
</style>