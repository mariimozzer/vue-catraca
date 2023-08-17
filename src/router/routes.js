import SetorView from '../views/SetorView.vue';
import SetorCadastro from '../views/SetoresCadastro.vue'
import LoginView from '../views/LoginView.vue';
import AcessoView from '../views/AcessoView.vue';
import WebsocketComponent from '../components/websocket/WebsocketComponent.vue'
import ColaboradorView from '../views/ColaboradorView.vue'
import VisitanteView from '../views/VisitanteView.vue'

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
        path: '/colaborador',
        name: 'Colaborador',
        component: ColaboradorView,
        title: 'Colaborador',
        meta: { requiredAuth: true }
    },
    {
        path: '/visitante',
        name: 'Visitante',
        component: VisitanteView,
        title: 'Visitante',
        meta: { requiredAuth: true }
    },
];

export default routes;