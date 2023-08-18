<template>
    <div class="container">
        <div class="row">
                <div class="col-sm-12">
                    <h2>Acessos</h2>
                    <hr>
                </div>
            </div>
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
                    <td>{{ item.nomeCompleto }}</td>
                    <td>{{ item.acesso_DH }}</td> 
                    <td>{{ item.local_nome }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import acessoService from '@/service/acesso-service';
import Acesso from '@/models/acesso-model';

export default {
    name: 'AcessoView',

    data() {
        return {
            acessos: [],
            payload: [],
        };
    },

    methods: {
        obterTodosAcessos() {
            acessoService.obterTodos().then((response) => {
                    this.acessos = response.data.data.map((a) => new Acesso(a));
                    console.log(this.acessos);
                }).catch(error => {
                    console.log(error);
                });
            }
    },

    mounted() {
        this.obterTodosAcessos();
    },
};
</script>