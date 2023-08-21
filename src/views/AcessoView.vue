<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <h2>Acessos</h2>
                <hr>
            </div>
        </div>
        <div class="row justify-content-between">
            <table class="table table-hover col-sm-6">
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
            <img v-bind:src="'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png'" img/>
        </div>
        

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
            images: [],
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

<style>
img {
   width: 400px;
    height: 400px;
    overflow: hidden;    
}
</style>