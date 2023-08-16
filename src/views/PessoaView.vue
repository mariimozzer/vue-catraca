<template>
    <div class="container">

        <div class="row">

            <div class="col-sm-12">

                <h2>Cadastro de Pessoas</h2>

                <hr>

            </div>

        </div>

        <div class="row sub-contnainer">

            <div class="col-sm-3">

                <!-- <ButtonComponent :callback="adicionarPessoa" value="Adicionar"></ButtonComponent> -->

            </div>

        </div>

        <div class="row">

            <div class="col-sm-12">

                <table class="table table-hover">

                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nome</th>
                            <th>Gênero</th>
                            <th>Datade Nascimento</th>
                            <th>CPF</th>
                            <th>E-mail</th>
                            <th>Telefone</th>
                            <th>Setor</th>
                            <th>Visitante</th>
                            <th>Foto</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in pessoas" :key="item.id">
                            <td>{{ item.id }}</td>
                            <td>{{ item.nomeCompleto }}</td>
                            <td>{{ item.sexo }}</td>
                            <td>{{ item.dtNasc }}</td>
                            <td>{{ item.cpf }}</td>
                            <td>{{ item.email }}</td>
                            <td>{{ item.celular }}</td>
                            <td>{{ item.id_setor }}</td>
                            <td>{{ item.visitante }}</td>
                            <td>{{ item.path_image }}</td>
                            <!-- <td>
                                <i @click="editarSetor(item)" class="fa fa-edit icones-tabela"></i>
                                <i @click="excluirSetor(item)" class="fa fa-trash icones-tabela"></i>
                            </td> -->
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
//import ButtonComponent from '@/components/button/ButtonComponent.vue';
import pessoaService from '@/service/pessoa-service';
import Pessoa from '../models/pessoa-model'
//import conversorDeData from '@/utils/conversor-data'


export default {

    name: 'PessoaView',
    components: {
       // ButtonComponent
    },
    data() {
        return {
            pessoas: [],
        }
    },

    filters: {

    },

    methods: {

        ordenarPessoas(a, b) {
            return (a.id < b.id) ? -1 : (a.id > b.id) ? 1 : 0;
        },

        obterTodasPessoas() {
            pessoaService
                .obterTodos()
                .then(response => {

                    let pessoas = response.data.data.map(p => new Pessoa(p));

                    this.pessoas = pessoas.sort(this.ordenarPessoas).reverse();

                    console.log(pessoas);
                })
                .catch(error => {
                    console.log(error);
                });
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