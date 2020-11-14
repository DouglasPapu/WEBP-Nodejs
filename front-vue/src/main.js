import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import store from './store'
import vuetify from './plugins/vuetify'
import Home from './views/Home.vue'
import AddUser from './views/AddUser'
import Users from './views/Users'

Vue.config.productionTip = false

const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/add-user',
      name: 'Add User',
      component: AddUser
    },
    {
      path: '/users',
      name: 'Users',
      component: Users
    }
  ];

const router = new VueRouter({ routes });

Vue.use(VueRouter);

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')