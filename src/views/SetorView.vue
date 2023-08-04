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
               <table class="table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Setor</th>
                        <th></th>
                    </tr>
                </thead>
               </table> 
        </div>
       </div>

    </div>
</template>

<script>

import ButtonComponent from '@/components/button/ButtonComponent.vue';
import setorService from '@/service/setor-service';
import Setor from '@/models/setor-model';

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

    methods:{

        obterTodos() {
            setorService.obterTodos()
            .then(response => { 
                this.setores = response.data.map(s => new Setor(s));
                console.log(this.setores);
            })
            .catch(error => {
                console.log(error);
            });
        }
    },
  
    mounted(){
        this.obterTodos();
    },
 
}
</script>

<style>


</style>