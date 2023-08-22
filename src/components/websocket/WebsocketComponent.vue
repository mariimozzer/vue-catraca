<template>
    <div class="container ">
        <div class="main">
            <div class="row">
                <div class="col-md-10">
                    <div class="form-group">
                        
                        <label for="nome">Nome </label>
                       
                        <!--  <output type="text" id="nome" class="form-control"  >{{ saida }}</output> -->
                       
                        <input type="text" id="nome" class="form-control" v-model="saida" @keyup.enter="sendMessage">{{ saida }}
                        
                        <!--  <output type="text" id="nome" class="form-control" :class="message"> </output> -->
                        
                        <!-- <input v-model="message" @keyup.enter="sendMessage"> -->
                        
                        <!-- <ul>
                            <li v-for="msg in messages" :key="msg">{{ msg }}</li>
                        </ul>  -->

                        <!-- LISTA DE MENSAGENS RECEBIDAS PELO WS -->
                        <ul>
                            <li v-for="saida in messages" :key="saida">{{ saida }}</li>
                        </ul>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {

    name: 'WebsocketComponent',

    components: {},

    filters: {},

    data() {
        return {
            foto: "foto",
            path: "",

            saida: ref(""),
            saidas: [],

            messages: [],
            message: '',

            socket: null,
        }
    },

    methods: {

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
        this.carrega();
        this.socket = new WebSocket('ws://192.168.0.6:8081');
         this.socket.onmessage = (event) => {
           this.messages.push(event.data);
           console.log(this.messages);
         }; 
    }
}

</script>

<style>
.box-local {
    margin-left: 60px;
    margin-right: 60px;
}

.icone-tabela {
    margin: 8px;
    cursor: pointer;
    color: var(--cor-primaria);
}

icons {
    text-align: right;
}

.main {
    width: auto;
    margin-top: 1%;
    margin-right: 0px;
    padding-right: 0px;
    overflow: inherit;
}
</style>


