<template>
   <button @click="callback">{{ value }}</button>
</template>

<script>
export default{
name: 'ButtonComponent',
props: {
    value: { type: String, require: true},
    callback: { type: Function, default: () => {}}
}
}
</script>

<style scoped>
button{
    width: 100%;
    color: #fff;
    background-color: var(--cor-primaria);
    padding: 10px 20px;
    margin: 10px 0;
    border-radius: 5px;
    border: none;
    cursor: pointer
    }

    button:hover {
        background-color: var(--cor-secundaria);
    }
</style>