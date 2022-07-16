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
import velocity from 'velocity-animate'
// @ts-ignore
import VueNativeNotification from 'vue-native-notification'

Vue.use(Notifications, {velocity})

Vue.config.productionTip = false
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)


Vue.use(VueNativeNotification, {
  // Automatic permission request before
  // showing notification (default: true)
  requestOnNotify: true
})
const v = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
//@ts-ignore
Vue.notification.requestPermission()
  .then(console.log) // Prints "granted", "denied" or "default"
store.dispatch('retr')

async function Search() {
  const subreddits = store.state.SubReddits;
  Vue.notify({
    group: 'foo',
    title: 'Updating subreddits',
    text: 'Update starting'
  })
  const updated_subreddits = [];
  for (const subreddit of subreddits) {
    Vue.notify({
      group: 'foo',
      title: 'Updating subreddit ' + subreddit,
      text: ''
    })

    const beforeLength = store.state.JobList.length;
    await store.commit('getSubreddit', subreddit);

    if (store.state.JobList.length > beforeLength) {
      updated_subreddits.push(subreddit);
    }

    Vue.notify({
      group: 'foo',
      title: 'Finished subreddit ' + subreddit,
      text: ''
    })
  }
  if(updated_subreddits.length >0){
    store.state.HasNotification = true;
  }
  await store.dispatch('save')
  Vue.notify({
    group: 'foo',
    title: 'Done subreddits',
    text: 'Update Done'
  })

}

setInterval(Search, 60000);
setTimeout(Search, 7000);

