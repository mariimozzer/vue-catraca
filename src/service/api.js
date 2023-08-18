import axios from 'axios';

 const api = axios.create( 
    {
    baseURL: 'http://192.168.0.6:8000/api'
    //baseURL: 'http://194.163.44.230:8000/api' darley
    //baseURL: 'http://192.168.0.113:8000/api' 
}
);

export default api;