import SetorView from '../views/SetorView.vue';
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
        meta: { requiredAuth: false }
    },
];

export default routes;