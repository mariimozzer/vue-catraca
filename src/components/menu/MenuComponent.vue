<template>
    <ul>
        <li>
            <router-link to="/">Início</router-link>
        </li>

        <li>
           <router-link to="/acesso">Acessos</router-link>
        </li>

        <li>
            <router-link to="/visitante">Visitantes</router-link>
        </li>

        <li>
            <router-link to="/colaborador">Colaboradores</router-link>
        </li>

        <li>
           <router-link to="/setor">Setores</router-link>
        </li>

        <li>
           <router-link to="/login">Sair</router-link>
        </li>
    </ul>
</template>

<style scoped>
ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: var(--cor-primaria);
    }
    li {
        float: left;
    }
    li:first-child{
        margin-left:  40px;
    }
    li a{
        display: block;
        color: #fff;
        padding: 15px 17px;
        text-decoration: none;
        text-align: center;
    }
    li a:hover{
        background-color: var(--cor-secundaria);
    }
</style>