import SetorView from '../views/SetorView.vue';
import SetorCadastro from '../views/SetoresCadastro.vue'
import LoginView from '../views/LoginView.vue';

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: LoginView,
        title: 'Login',
        meta: { requiredAuth: false }
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
];

export default routes;