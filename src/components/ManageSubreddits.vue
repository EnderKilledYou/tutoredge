<template>
  <b-container>
    <b-form>
      <b-input v-model="newsub"></b-input>
      <b-button-group>
        <b-button @click="AddSubreddit">Add</b-button>
      </b-button-group>
    </b-form>
    <table class="table table-striped table-hover">
      <thead>
      <b-th>
        Index
      </b-th>
      <b-th>
        Subreddit
      </b-th>
      </thead>
      <b-tbody>
        <b-tr v-for="(subreddit,index) in SubredditList">
          <b-td>
            <b-button-group>
              <b-button @click="DeleteSubreddit(subreddit)" class="btn btn-danger"> Remove</b-button>
            </b-button-group>
          </b-td>
          <b-td>
            {{ subreddit }}
          </b-td>
        </b-tr>
      </b-tbody>
    </table>
  </b-container>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class ManageSubreddits extends Vue {
  newsub: string = "";

  get SubredditList() {
    return this.$store.state.SubReddits
  }

  AddSubreddit() {
    this.$store.commit('addSubReddit', this.newsub)
    this.$store.dispatch('save')
  }

  DeleteSubreddit(subreddit: string) {
    this.$store.commit('removeSubReddit', subreddit)
    this.$store.dispatch('save')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
