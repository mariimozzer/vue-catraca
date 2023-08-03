<template>
    <div>
        <div>
            <label for="">{{ label }}</label> <br>
            <input :type="type" :placeholder="placeholder">
        </div>
    </div>
</template>

<script>
export default {
    name: "InputComponent",
    props:{
        label: { type: String, require: true},
        placeholder: {type: String, default: ''},
        type: {type: String, default: 'text'}

    },
    data(){
        return {

        }
    }
    
}
</script>

<style>


input {
    width: 100%;
    padding: 5px 20px;
    margin: 8px 0px;
    display: inline-block;
    outline: none;
    border-radius: 5px;
    box-sizing: border-box;
    border-color: #919191;
    }
</style>