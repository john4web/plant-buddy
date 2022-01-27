import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import AuthService from '@/services/AuthService';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Authenticate from '@/views/Authenticate.vue';
import MyGarden from '@/views/MyGarden.vue';
import NewBuddy from '@/views/NewBuddy.vue';
import BuddyDetail from '@/views/BuddyDetail.vue';
import NotFound from '@/views/NotFound.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: { authRequired: true },
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: { authRequired: false },
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: { authRequired: false },
    },
    {
        path: '/authenticate',
        name: 'Authenticate',
        component: Authenticate,
        meta: { authRequired: false },
    },
    {
        path: '/my-garden',
        name: 'MyGarden',
        meta: { authRequired: true },
        component: MyGarden,
    },
    {
        path: '/new-buddy',
        name: 'NewBuddy',
        meta: { authRequired: true },
        component: NewBuddy,
    },
    {
        path: '/buddy-detail/:id',
        name: 'BuddyDetail',
        meta: { authRequired: true },
        component: BuddyDetail,
    },
    {
        path: '/:catchAll(.*)',
        name: 'NotFound',
        meta: { authRequired: false },
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach(async (to, from, next) => {
    if (to.meta.authRequired && !(await AuthService.isAuthorized())) {
        next('/authenticate');
    } else if (
        (to.name === 'Login' ||
            to.name === 'Register' ||
            to.name === 'Authenticate') &&
        (await AuthService.isAuthorized())
    ) {
        next('/');
    } else {
        next();
    }
});

export default router;
