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

export default {
   
    name: 'SetorView',
    components: {
        ButtonComponent
    },
    data(){
        return {
            mensagem: 'tela de setor'
        }
    }
}
</script>

<style>


</style>