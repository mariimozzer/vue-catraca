<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">

                <h1 class="titulo">{{ modoCadastro ? "Adicionar" : "Editar" }} Setores</h1>
                <hr>

            </div>
        </div>

        <div class="row">

            <div class="col-sm-3">
                <div class="form-group">
                    <label for="id">Código</label>
                    <input type="text" id="id" v-model="setor.id" class="form-control" >                   
                </div>
            </div>
            <div class="col-sm-9">
                <label for="nome">Setor</label>
                <input type="text" id="nome" v-model="setor.nome" class="form-control">
            </div>

        </div>

        <div class="row">
            <div class="col-sm-12">
                <hr>
            </div>
            <div class="col-sm-12 mt-4">
                <button @click="cancelarAcao" class="btn btn-default float-right">Cancelar</button>
                <button @click="salvarSetor" class="btn btn-primary float-right mr-2">Salvar</button>
            </div>
        </div>


    </div>
</template>

<script>
import Setor from '@/models/setor-model.js';
import setorService from '../service/setor-service';

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
       if(!id) return;  //verifica se a tela trouxe algum produto, caso não tenha setor, a tela será carregada em modo de cadastro

       this.modoCadastro = false; 
       this.obterSetorId(id);
       
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

        salvarSetor() {

        },

        

    }

}

</script>

<style>
.titulo {
    font-size: 25px;
    font-weight: 500;
    margin-top: 10px
}
</style>