<template>
    <div class="container">

       <div class="row">
        <div class="col-sm-12">
            <h2>Setores</h2>
            <hr>
        </div>      
       </div>

       <div class="row sub-contnainer">
        <div class="col-sm-3">
           <ButtonComponent value="Adicionar"></ButtonComponent>
        </div>
       </div>

       <div class="row">
        <div class="col-sm-12">
               <table class="table table-hover">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Setor</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in setores" :key="item.id">
                        <td>{{ item.id }}</td>
                        <td>{{ item.nome }}</td>
                        <td>Editar/Excluir</td>
                    </tr>
                </tbody>
               </table> 
        </div>
       </div>

    </div>
</template>

<script>

import ButtonComponent from '@/components/button/ButtonComponent.vue';
import setorService from '@/service/setor-service';
import Setor from '@/models/setor-model';
import conversorDeData from '@/utils/conversor-data'


export default {
   
    name: 'SetorView',
    components: {
        ButtonComponent
    },
    data(){
        return {
            setores: [],
        }
    },

    filters: {

    },

    methods:{

        obterTodosSetores() {
            setorService.obterTodos()
            .then(response => { 
                console.log(response);
                this.setores = response.data.data.map(s => new Setor(s));
                console.log(this.setores);
            })
            .catch(error => {
                console.log(error);
            });
        }


    },
  
    mounted(){

        this.obterTodosSetores();

    },
 
}
</script>

<style>


</style>