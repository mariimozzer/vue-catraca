<template>
  <div id="app">
   <!--  <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/setor">Setor</router-link>
    </nav> -->
   <menu-component v-if="this.$router.currentRoute.name != 'Login'"></menu-component>
    <router-view/>
  </div>
</template>

<script>
import MenuComponent from '@/components/menu/MenuComponent.vue'
export default {
 components: {
  MenuComponent
 }
}
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

:root{
  --cor-primaria: #012677;
  --cor-secundaria: #005bc5;
}

 body {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
    }
</style>
