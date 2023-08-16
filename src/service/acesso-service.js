import api from './api';

function obterTodos(){
    return new Promise((resolve, reject) => {
        return api.get('/acesso')
        .then(response => resolve(response, console.log(response)))
        .catch(error => reject(error, console.log(error)));
    });
} 


/* function obterPorId(id){
    return new Promise( (resolve, reject) => {
        return api.get(`/acesso/${id}`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
} */

export default {
    obterTodos,
    //obterPorId
}