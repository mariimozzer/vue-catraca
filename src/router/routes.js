import SetorView from '../views/SetorView.vue';
import SetorCadastro from '../views/SetoresCadastro.vue'
import LoginView from '../views/LoginView.vue';
import AcessoView from '../views/AcessoView.vue';
import WebsocketComponent from '../components/websocket/WebsocketComponent.vue'
import PessoaView from '../views/PessoaView.vue';

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: LoginView,
        title: 'Login',
        meta: { requiredAuth: false }
    },
    {
        path: '/acesso',
        name: 'Acesso',
        component: AcessoView,
        title: 'Acesso',
        meta: { requiredAuth: true }
    },
    {
        path: '/setor',
        name: 'Setor',
        component: SetorView,
        title: 'Setor',
        meta: { requiredAuth: true }
    },
    {
        path: '/setor/novo',
        name: 'NovoSetor',
        component: SetorCadastro,
        title: 'Adicionar Setor',
        meta: { requiredAuth: true }
    },
    {
        path: '/setor/editar',
        name: 'EditarSetor',
        component: SetorCadastro,
        title: 'Editar Setor',
        meta: { requiredAuth: true }
    },
    {
        path: '/home',
        name: 'Websocket',
        component: WebsocketComponent,
        title: 'Websocket',
        meta: { requiredAuth: true }
    },
    {
        path: '/pessoa',
        name: 'Pessoa',
        component: PessoaView,
        title: 'Pessoa',
        meta: { requiredAuth: true }
    },
];

export default routes;