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
                            <th>Código</th>
                            <th>Pessoa</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in acessos" :key="item.id">
                            <td>{{ item.id }}</td>
                            <td>{{ item.nome }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import ButtonComponent from '@/components/button/ButtonComponent.vue';
import recepcaoService from '@/service/recepcao-service';
import Recepcao from '../models/recepcao-model
//import conversorDeData from '@/utils/conversor-data'


export default {

    name: 'RececpcaoView',
    components: {
        ButtonComponent
    },
    data() {
        return {
            acessos: [],
        }
    },

    filters: {

    },

    methods: {

        ordenarAcessos(a, b) {
            return (a.id < b.id) ? -1 : (a.id > b.id) ? 1 : 0;
        },

        obterTodosAcessos() {
            recepcaoService
                .obterTodos()
                .then(response => {

                    let acessos = response.data.data.map(a => new Acesso(a));

                    this.acessos = acessos.sort(this.ordenarAcessos).reverse();
                })
                .catch(error => {
                    console.log(error);
                });

    },

    mounted() {
        this.obterTodosAcessos();
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



/* 

<template>
    <div class="container ">
        <div class="main">

            <div class="row">
                <div class="col-md-10">
                    <div class="form-group">
                        <label for="nome">Nome </label>

                        <!-- <output type="text" id="nome" class="form-control"  >{{ saida }}</output> -->
                        <input type="text" id="nome" class="form-control" v-model="saida"
                            @keyup.enter="sendMessage">{{ saida }}
                        <!--  <output type="text" id="nome" class="form-control" :class="message"> </output> -->

                        <!--  <input v-model="message" @keyup.enter="sendMessage"> -->

                        <!--  <ul>
              <li v-for="msg in messages" :key="msg">{{ msg }}</li>
          </ul> -->

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

  name: 'LocalNovo',

  components: {  },

  filters: {  },

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
       
      let ws = new WebSocket('ws://192.163.44.230:8080'); 
      
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
    this.socket = new WebSocket('ws://192.168.0.107:8081');
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





*/