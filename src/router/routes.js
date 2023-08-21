import SetorView from '../views/SetorView.vue';
import SetorCadastro from '../views/SetoresCadastro.vue'
import LoginView from '../views/LoginView.vue';
import AcessoView from '../views/AcessoView.vue';
import WebsocketComponent from '../components/websocket/WebsocketComponent.vue';
import ColaboradorView from '../views/ColaboradorView.vue';
import VisitanteView from '../views/VisitanteView.vue';
import HomeView from '../views/HomeView.vue';
import ColaboradorCadastro from '../views/ColaboradorCadastro.vue';
import VisitanteCadastro from '../views/VisitanteCadastro.vue';


const routes = [
    {
        path: '/',
        name: 'Início',
        component: HomeView,
        title: 'Home',
        meta: { requiredAuth: false }
    },
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
        path: '/colaborador/novo',
        name: 'NovoColaborador',
        component: ColaboradorCadastro,
        title: 'Adicionar Colaborador',
        meta: { requiredAuth: true }
    },
    {
        path: '/colaborador/editar',
        name: 'EditarColaborador',
        component: ColaboradorCadastro,
        title: 'Editar Colaborador',
        meta: { requiredAuth: true }
    },
    {
        path: '/visitante',
        name: 'Visitante',
        component: VisitanteView,
        title: 'Visitante',
        meta: { requiredAuth: true }
    },
    {
        path: '/visitante/novo',
        name: 'NovoVisitante',
        component: VisitanteCadastro,
        title: 'Adicionar Visitante',
        meta: { requiredAuth: true }
    },
    {
        path: '/visitante/editar',
        name: 'EditarVisitante',
        component: VisitanteCadastro,
        title: 'Editar Visitante',
        meta: { requiredAuth: true }
    },
];

export default routes;