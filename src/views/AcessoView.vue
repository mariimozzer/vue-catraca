<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <h2>Acessos</h2>
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
            <img v-if="mostraFoto" :src="fotoPessoa" @change="buscaUltimaFoto()" img/>
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

            messages: [],
            message: '',

            buscaFoto: false,

            mostraFoto: false,

            fotoUrl: 'http://192.168.0.6:8000/storage/',

            fotoPessoa: '', // fotoUrl + fotoLocal

            fotoLocal: '',

            mostrarFoto: false,


        };
    },

   /*  mounted() {
        this.obterTodosAcessos();

        this.ws = new WebSocket('ws://192.168.0.6:8081');
        this.ws.addEventListener('open', () => {
            console.log("WebSocket conectado!");
        });
        this.ws.addEventListener('message', this.handleMessage)
    }, */

    mounted() {
        this.obterTodosAcessos();
        
        this.ws = new WebSocket('ws://192.168.0.6:8081');
        //cria objeto websocket

        this.ws.addEventListener('open', () => {
            console.log("WebSocket conectado!");
        });
        //listener de conexão websocket

        this.ws.addEventListener('message', this.handleMessage)
        //listener para quando chega mensagem do websocket, evento message que executa a função handleMessage
    },

    methods: {

        handleMessage(event) {
            this.message = event.data;

            console.log('ID DA PESSOA: ', this.message);
            
            /* if (this.message.startsWith('passou')) {  
                this.mostraFoto = true;
            } */

            try {
                const idMessage = JSON.parse(this.message);
                console.log('idMessagem ', idMessage);

                if (idMessage.id) {

                    const idPessoa = idMessage.id;

                    acessoService.buscarPathImagem(idPessoa)
                        .then(response => {

                            this.fotoLocal = response.nf_path; //caminho da imagem

                            this.fotoPessoa = this.fotoUrl + this.fotoLocal; //url completa da imagem

                            this.mostrarFoto = true;
                        })
                        .catch(error => {
                            console.log(error);
                        });

                } else {
                    console.error('WebSocket não retornou id');
                }
            } catch (error) {
                //passar para alerta na tela
                console.error('Erro!', error);
            }
        },

        obterTodosAcessos() {
            acessoService.obterTodos().then((response) => {
                    this.acessos = response.data.data.map((a) => new Acesso(a));
                    //console.log(this.acessos);
                }).catch(error => {
                    console.log(error);
                });
            },

        buscaUltimaFoto() {

        },





        /* carrega() {
            let ws = new WebSocket('ws://192.168.0.6:8081');
            ws.addEventListener('message', function (message) {
                this.saida = message.data;
                console.log(message);
            })
        }, */
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