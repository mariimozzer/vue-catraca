import api from './api';

function obterTodos(){
    return new Promise((resolve, reject) => {
        return api.get('/recepcao')
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
} 


function obterPorId(id){
    return new Promise( (resolve, reject) => {
        return api.get(`/recepcao/${id}`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}



export default {
    obterTodos,
    obterPorId
}