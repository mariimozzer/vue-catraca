<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <h2>Setores</h2>
                <hr>
            </div>
        </div>
        <div class="row sub-contnainer">
            <div class="col-sm-3">
                 <ButtonComponent :callback="adicionarSetor" value="Adicionar Setor"></ButtonComponent>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Setor</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in setores" :key="item.id">
                            <td>{{ item.id }}</td>
                            <td>{{ item.nome }}</td>
                            <td>
                                <i @click="editarSetor(item)" class="fa fa-edit icones-tabela"></i>
                                <i @click="excluirSetor(item)" class="fa fa-trash icones-tabela"></i>
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
import setorService from '@/service/setor-service';
import Setor from '@/models/setor-model';

export default {
    name: 'SetorView',
    components: {
        ButtonComponent,
    },
    data() {
        return {
            setores: [],
        }
    },
    methods: {

        ordenarSetores(a, b) {
            return (a.id < b.id) ? -1 : (a.id > b.id) ? 1 : 0;
        },
        obterTodosSetores() {
            setorService
                .obterTodos()
                .then(response => {
                    this.setores = response.data.data.map(s => new Setor(s));
                    this.setores = this.setores.sort(this.ordenarSetores).reverse();
                    console.log(this.setores);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        adicionarSetor() {
            this.$router.push({ name: "NovoSetor" })
        },
        editarSetor(setor) {
            this.$router.push({ name: "EditarSetor", params: { id: setor.id } })
        },
        excluirSetor(id) {
            console.log("id para deletar", id);
            setorService
                .deletar(id)
                .then(response => {
                    console.log(response);
                    
                    this.setores = this.setores.filter(item => item.id !== id);
                })
                .catch(error => {
                    console.log("Error deleting setor:", error);
                });

        }


    },
    mounted() {
        this.obterTodosSetores();
    }
}
</script>


<style>
.icones-tabela {
    margin: 5px;
    color: var(--cor-primaria);
    cursor: pointer;
}
</style>