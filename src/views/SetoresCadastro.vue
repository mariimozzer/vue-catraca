<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <h1 class="titulo">{{ modoCadastro ? "Adicionar" : "Editar" }} Setor</h1>
                <hr>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-6">
                <label for="nome">Setor</label>
                <input type="text" id="nome" v-model="setor.nome" class="form-control">
            </div>
        </div>
        <div class="row">
            <div class="col-sm-9 mt-4">
                <button @click="cancelarAcao" class="btn btn-default float-right">Cancelar</button>
                <button @click="salvarSetor" class="btn btn-primary float-right mr-2">Salvar</button>
            </div>
        </div>
    </div>
</template>

<script>
import Setor from '@/models/setor-model.js';
import setorService from '../service/setor-service';
import axios from 'axios';

export default {
    
    name: "SetorCadastro",
    data() {
        return {
            setor: new Setor(),
            modoCadastro: true,  
        }
    },

    mounted() {

      let id = this.$route.params.id;
        //verifica se a tela trouxe algo, caso não tenha pessoa, a tela será carregada em modo de cadastro
        if (id) {
            this.modoCadastro = false;
            this.obterPessoaId(id);
        }

        this.carregarSetores();
},

    methods: {

        obterSetorId(id) {
            setorService.obterPorId(id)
            .then(response => {
                    console.log(response);
                    this.setor = new Setor(response.data);
                    console.log(this.setor);
                })
            .catch(error => {
                console.log(error)
            })    
        },

        cancelarAcao() {
            this.setor = new Setor();
            this.$router.push({ name: "Setor" })
        },

        atualizarSetor() {
             setorService.atualizar(this.setor)
                .then(() => {
                    this.$swal({
                        icon: 'success',
                        title: 'Setor atualizado com sucesso!',
                        confirmButtonColor: '#005bc5',
                    }); //sweet alert 
                    this.$router.push({name: "Setor"})
                })
                .catch(error => {
                    console.log(error);
                });
        },

        cadastrarSetor() {
            
           /* if(this.setor.modeloValidoCadastro()) {
                alert("Insira o nome do setor para cadastrar!");
                return;
            } */

            setorService.cadastrar(this.setor)
            .then(()  => {
                this.$swal({
                    icon: 'success',
                    title: 'Setor cadastrado com sucesso!',
                    confirmButtonColor: '#005bc5',
                }); //sweet alert 

                this.setor = new Setor();
                this.$router.push({ name: "Setor" })
            })
            .catch( error => {
                console.log(error);
            });

            
        },
        
        salvarSetor() {
            (this.modoCadastro) ? this.cadastrarSetor() : this.atualizarSetor();
        },

        carregarSetores() {
            axios.get('http://192.168.0.6:8001/api/setor')
                .then(response => {
                    this.listaDeSetores = response.data.data;
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                    alert("Erro ao carregar a lista de setores. Verifique a conexão e tente novamente.");
                });
        },
        
    },
}

</script>

<style>
.titulo {
    font-size: 25px;
    font-weight: 500;
    margin-top: 10px
}
</style>