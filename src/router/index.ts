import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Play from '../views/Play.vue';
import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
    //Always use the explicit play route as default instead of the default "Home" root.
    { path: '/', redirect: { name: 'Play' } },
    {
        path: '/home',
        name: 'Home',
        component: Home,
    },
    {
        path: '/play',
        name: 'Play',
        component: Play,
    },

    // Allow loading of arbitrary files
    { path: '/play/:url*', component: Play },
    {
        path: '/settings',
        name: 'Settings',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "settings" */ '../views/Settings.vue'),
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ '../views/About.vue'),
    },
    {
        path: '/development',
        name: 'Development',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(
                /* webpackChunkName: "development" */ '../views/Development.vue'
            ),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
