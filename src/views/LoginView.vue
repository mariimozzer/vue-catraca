<template>
    <div class="box-login">

        <div class="logo">
        <h2>Login</h2>
        </div>

        <input-component label="E-mail" placeholder="exemplo@email.com"></input-component>
        <input-component label="Senha" type="password"></input-component>
        
        <button-component value="Entrar" :callback="login"></button-component>
        <div class="logo">
        </div>
            
    </div>
</template>

<script>

import InputComponent from "@/components/input/InputComponent.vue";
import ButtonComponent from '@/components/button/ButtonComponent.vue';


export default{
  components: { InputComponent, ButtonComponent },
    name: 'LoginView',
    component: {
        InputComponent,
        ButtonComponent
    },
    data() {
        return {
        }
    },
    methods: {
       login(){
            this.$router.push({path:'/'})
        }
    }
}

</script>

<style scoped>
.box-login {
margin: auto;
border: 1px solid #ddd;
width: 250px;
height: 300px;
margin-top: 100px;
padding: 20px;
}

.logo {
    text-align: center;
    color: var(--cor-primaria);
    font-size: 30px;
}




</style>