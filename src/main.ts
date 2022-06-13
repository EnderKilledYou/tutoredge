import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Notifications from 'vue-notification'
// @ts-ignore
import velocity      from 'velocity-animate'

Vue.use(Notifications, { velocity })

Vue.config.productionTip = false
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
store.dispatch('retr')

async function Search() {
  const subreddits = store.state.SubReddits;
  Vue.notify({
    group: 'foo',
    title: 'Updating subreddits',
    text: 'Update starting'
  })
  debugger;
  for (const subreddit of subreddits) {
    Vue.notify({
      group: 'foo',
      title: 'Updating subreddit ' + subreddit,
      text: ''
    })
    await store.commit('getSubreddit', subreddit);
    Vue.notify({
      group: 'foo',
      title: 'Finished subreddit ' + subreddit,
      text: ''
    })
  }
  await store.dispatch('save')
  Vue.notify({
    group: 'foo',
    title: 'Done subreddits',
    text: 'Update Done'
  })

}

setInterval(Search, 60000);
setTimeout(Search,7000);
