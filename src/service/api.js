import axios from 'axios';

const api = axios.create( 
    {
    baseURL: 'http://194.163.44.230:8000/api/setor'
}
);

export default api;