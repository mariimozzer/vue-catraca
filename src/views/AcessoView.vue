<template>
    <div class="container mt-3">
        <div class="row justify-content-around">
            <div class="col-5">
                <div class="row">
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="Pesquisa" aria-label="Pesquisa"
                            aria-describedby="basic-addon1" v-model="filtro" />
                    </div>
                </div>
                <div class="row justify-content-between">
                    <table class="table table-hover col-sm-8">
                        <thead>
                            <tr>
                                <th>Pessoa</th>
                                <th>Data e Hora</th>
                                <th>Local</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item of acessosFiltrados" :key="item.id">
                                <td>{{ item.nomeCompleto }}</td>
                                <td>{{ item.acesso_DH }}</td>
                                <td>{{ item.local_nome }}</td>
                            </tr>
                        </tbody>
                    </table>
                    
                </div>
            </div>
            <div class="col-5">
                <div class="row">
                    <button type="button" class="btn btn-outline-primary botao-acesso">
                        <span class="material-symbols-outlined">qr_code</span>
                    </button>
                </div>
                <div class="row">
                    <div class="col-sm-4">
                        <img v-if="mostraFoto" :src="fotoPessoa" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<!-- 
    {
"local_id":26,
"pessoa_id":2
}
 -->

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

                filtro: '',

            };
        },

        computed: {
            acessosFiltrados() {
                return this.acessos.filter(acesso => {
                    const buscaAcesso = this.filtro.toLowerCase();
                    return (
                        (acesso.nomeCompleto && acesso.nomeCompleto.toLowerCase().includes(buscaAcesso)) ||
                        (acesso.acesso_DH && acesso.acesso_DH.toLowerCase().includes(buscaAcesso)) ||
                        (acesso.local_nome && acesso.local_nome.toLowerCase().includes(buscaAcesso))
                    );
                });
            },
        },

        mounted() {
            this.obterTodosAcessos(); //traz os acessos do banco

            this.ws = new WebSocket('ws://192.168.0.6:8081');

            this.ws.addEventListener('open', () => {
                console.log("WebSocket conectado!");
            });
            //listener de conexão websocket

            this.ws.addEventListener('message', this.handleMessage)
            //listener para quando chega mensagem do websocket, evento message que executa a função handleMessage

        },

        methods: {

            obterTodosAcessos() {
                acessoService.obterTodos().then((response) => {
                    this.acessos = response.data.data.map((a) => new Acesso(a));
                }).catch(error => {
                    console.log(error);
                });
            },

            async handleMessage(event) {
                this.message = event.data;
                console.log("Websocket enviou: ", this.message);
                this.obterTodosAcessos();
                try {
                    const messageData = JSON.parse(this.message);
                    if (messageData && messageData.pessoa_id) {
                        const idPessoa = messageData.pessoa_id;
                        const pessoaInfo = await pessoaService.obterInformacoesPessoa(idPessoa);
                        if (pessoaInfo.data.path_image) {
                            this.fotoPessoa = pessoaInfo.data.path_image;
                            this.mostraFoto = true;
                        } else {
                            console.error('A pessoa não possui uma imagem associada.');
                        }
                    } else {
                        console.error('WebSocket não retornou o id da pessoa');
                    }
                } catch (error) {
                    console.error('Erro!', error);
                }
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

.botao-acesso {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
    width: 100px;
}

</style>