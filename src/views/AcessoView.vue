<template>
    <div class="container">

        <div class="row">
            <div class="col-sm-12">
                <h2>Acessos</h2>
                <hr>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-12">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>Pessoa</th>
                            <th>Data e Hora</th>
                            <th>Local</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in acessos" :key="item.id">
                            <td>{{ item.acesso_DH }}</td>
                            <td>{{ item.nomeCompleto }}</td>
                            <td>{{ item.local_nome }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
    </div>
</template>

<script>
import acessoService from '@/service/acesso-service';
import Acesso from '@/models/acesso-model';

export default {
    
    name: 'AcessoView',

    components: {
        //ButtonComponent
    },

    data() {
        return {
            acessos: [],
        }
    },

    filters: {

    },

    methods: {
 
        /* ordenarAcessos(a, b) {
            return (a.id < b.id) ? -1 : (a.id > b.id) ? 1 : 0;
        }, */

        obterTodosAcessos() {
                acessoService.obterTodos()
                .then((response) => {
                    this.acessos = response.data.data.map((a) => new Acesso(a));
                   // this.acessos = acessos.sort(this.ordenarAcessos).reverse();
                    /* console.log(acessos); */
                })
                .catch(error => {
                    console.log(error);
                });
            },  

        mounted() {

            this.obterTodosAcessos();

        },
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