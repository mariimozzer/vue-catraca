<template>
    <div class="container mt-3">

        <div class="row">

            <div class="col-sm-12">

                <h2>Visitantes</h2>

                <input type="text" class="form-control" placeholder="Pesquisa" aria-label="Pesquisa"
                                aria-describedby="basic-addon1" v-model="filtro" />

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
                            <th>Nome</th>
                            <th>CPF</th>
                            <th>Sexo</th>
                            <th>Data de nascimento</th>
                            <th>Celular</th>
                            <th>E-mail</th>
                            <th>Foto</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item of pessoasFiltradas" :key="item.id" v-show="(item.visitante == 1)">
                            <!-- v-show para trazer somente as pessoas marcadas como visitantes (visitante = 1) -->
                            <td>{{ item.nomeCompleto }}</td>
                            <td>{{ item.CPF }}</td>
                            <td>{{ item.sexo }}</td>
                            <td>{{ item.dtNasc }}</td>
                            <td>{{ item.celular }}</td>
                            <td>{{ item.email }}</td>
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
import pessoaService from '@/service/pessoa-service';
import Pessoa from '../models/pessoa-model'
//import conversorDeData from '@/utils/conversor-data'


export default {

    name: 'VisitanteView',
    components: {
       
    },
    data() {
        return {
            pessoas: [],

            filtro: '',
        }
    },

    computed: {
        pessoasFiltradas() {
            return this.acessos.filter(pessoa => {
                const buscaPessoa = this.filtro.toLowerCase();
                return (
                    (pessoa.nomeCompleto && pessoa.nomeCompleto.toLowerCase().includes(buscaPessoa)) ||
                    (pessoa.CPF && pessoa.CPF.toLowerCase().includes(buscaPessoa)) ||
                    (pessoa.sexo && pessoa.sexo.toLowerCase().includes(buscaPessoa))

                    /* continuar daqui */
                );
            });
        },
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
        adicionarPessoa() {
            this.$router.push({ name: "NovoVisitante" })
        },
        editarPessoa(pessoa) {
            this.$router.push({ name: "EditarVisitante", params: { id: pessoa.id } })
        },

        excluirPessoa(id) {
            
                this.resultado.splice(this.resultado.indexOf(id), 1)
         
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