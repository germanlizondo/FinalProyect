import Vue from 'vue';
import VueRouter from 'vue-router';
import intro from './components/intro.vue';
import App from './components/App.vue';
import home from './components/home.vue';
import user from './components/user.vue';
import settings from './components/settings.vue';
import VueSession from 'vue-session';



var options = {
    persist: true
}

Vue.use(VueRouter);
Vue.use(VueSession, options)
const routes = [
    {path:'/user/:id',name: 'user', component: user},
    {path:'/home', name: 'home',component: home},
    {path:'/',name: 'intro', component: intro},
    {path:'/settings',name: 'settings', component: settings},
];

const router = new VueRouter({
    routes,
  

   
})

new Vue({
    el: '#app',
    router,
    render: h => h(App)
}).$mount('#app');