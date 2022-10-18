import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Tabs, Tab } from 'vue3-tabs-component';

createApp(App)
    .component('tabs', Tabs)
    .component('tab', Tab)
    .use(router)
    .mount('#app')
// using vue app components