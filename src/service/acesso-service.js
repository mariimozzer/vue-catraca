import api from './api';

function obterTodos(){
    return new Promise((resolve, reject) => {
        return api.get('/acesso')
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
} 

function buscarPathImagem(idFoto) {
  if (idFoto) {
    const apiPath = `http://192.168.0.6:8000/api/upload/nf/${idFoto}`;
    return new Promise((resolve, reject) => {
      api.get(apiPath)
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    });
  } 
}

export default {
    obterTodos,
    buscarPathImagem,
}