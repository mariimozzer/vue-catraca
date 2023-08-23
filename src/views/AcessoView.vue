<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <h2>Acessos</h2>
            </div>
            <input type="text" id="nome" class="form-control" v-model="saida" @keyup.enter="sendMessage">{{ saida }}
            <ul>
                <li v-for="saida in messages" :key="saida">{{ saida }}</li>
            </ul>
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
import { ref } from 'vue';

export default {

    name: 'AcessoView',

    data() {
        return {
            acessos: [],
            payload: [],
            images: [],

            saida: ref(""),
            saidas: [],

            messages: [],
            message: '',

            socket: null,
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
            },

        carrega() {
            let ws = new WebSocket('ws://192.168.0.6:8081');
            ws.addEventListener('message', function (message) {
                this.saida = message.data;
                console.log(message);
            })
        },

         sendMessage() {
            if (this.saida.trim() !== '') {
                this.socket.send(this.saida);
                this.saida = '';
            }
        },
    },

    mounted() {
        this.obterTodosAcessos();

        this.carrega();

        this.socket = new WebSocket('ws://192.168.0.6:8081');

        this.socket.onmessage = (event) => {
            this.messages.push(event.data);
            console.log(this.messages);
        };
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