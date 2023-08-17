<template>
    <div class="container">

        <div class="row">

            <div class="col-sm-12">

                <h2>Visitantes</h2>

                <hr>

            </div>

        </div>

        <div class="row sub-contnainer">

            <div class="col-sm-3">

                <ButtonComponent :callback="adicionarPessoa" value="Adicionar visitante"></ButtonComponent>

            </div>

        </div>

        <div class="row">

            <div class="col-sm-12">

                <table class="table table-hover">

                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nome</th>
                            <th>CPF</th>
                            <th>Foto</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in pessoas" :key="item.id" v-show="item.visitante == 1">
                            <!-- v-show para trazer somente as pessoas marcadas como colaboradores (visitante = 0) -->
                            <td>{{ item.id }}</td>
                            <td>{{ item.nomeCompleto }}</td>
                            <td>{{ item.cpf }}</td>
                            <td>{{ item.path_image }}</td>
                            <td>
                                <i @click="editarColaborador(item)" class="fa fa-edit icones-tabela"></i>
                                <i @click="excluirColaborador(item)" class="fa fa-trash icones-tabela"></i>
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

    name: 'VisitanteView',
    components: {
        ButtonComponent
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