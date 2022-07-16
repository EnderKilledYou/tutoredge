<template>
  <div id="app">
    <nav>
      <router-link to="/options">Options</router-link>
      |
      <router-link to="/manage_subreddits">Monitored Subreddits</router-link>
      |
      <router-link to="/manage_message_templates">Message Templates</router-link>
      |
      <router-link to="/manage_users">Blocked Users</router-link>
      |
      <router-link to="/manage_words">Blocked Words</router-link>
      |
      <router-link to="/manage_posts">Show Posts</router-link>
    </nav>
    <router-view/>
    <notifications group="foo"/>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import ManageUsers from '@/components/ManageUsers.vue'; // @ is an alias to /src

@Component({
  components: {},
})
export default class App extends Vue {
  get Notifications() {
    return this.$store.state.HasNotification
  }

  @Watch('Notifications') update(a: any, b: any) {
    debugger;
    if(!this.$store.state.HasNotification) return;
    this.$store.state.HasNotification = false;
    if (this.$store.state.Options.ShouldNotify) {
      //@ts-ignore
      this.$notification.show('New Posts', {
        body: 'There are new posts for you to check out'
      }, {})
    }
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
