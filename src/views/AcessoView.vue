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

            <div>
                <img v-if="mostraFoto" :src="fotoPessoa" />
            </div>
                       
        </div>
    </div>
</template>

<script>
import acessoService from '@/service/acesso-service';
import Acesso from '@/models/acesso-model';
import pessoaService from '@/service/pessoa-service';


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
        //this.obterTodosAcessos();
        
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

        async handleMessage(event) {
            this.message = event.data;
            console.log("Websocket enviou: ", this.message);
            this.obterTodosAcessos();

            try {
                const messageData = JSON.parse(this.message);

                if (messageData && messageData.pessoa_id) {
                    const idPessoa = messageData.pessoa_id;
                    console.log("ID da pessoa: ", idPessoa);

                    const pessoaInfo = await pessoaService.obterInformacoesPessoa(idPessoa);
                    console.log("Info da pessoa", pessoaInfo);

                    if (pessoaInfo.data.path_image) {
                        console.log("imagem da pessoa ", pessoaInfo.data.path_image)
                        this.fotoPessoa = pessoaInfo.data.path_image;
                        this.mostraFoto = true;
                    } else {
                        console.error('A pessoa não possui uma imagem associada.');
                    }
                } else {
                    console.error('WebSocket não retornou o ID da pessoa');
                }
            } catch (error) {
                console.error('Erro!', error);
            }
        },


        obterTodosAcessos() {
            acessoService.obterTodos().then((response) => {
                    this.acessos = response.data.data.map((a) => new Acesso(a));
                    console.log(this.acessos);
                }).catch(error => {
                    console.log(error);
                });
            },
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