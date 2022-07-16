<template>
  <b-container>

    <table class="table table-striped table-hover">
      <thead>
      <b-th>
        Index
      </b-th>
      <b-th>
        Title
        <b-input v-model="Filter.TitleFilter"></b-input>
      </b-th>
      <b-th>
        <b-form-group label="Content Filter">
          <b-input v-model="Filter.ContentFilter"></b-input>
        </b-form-group>
      </b-th>
      <b-th>
        Author
        <b-input v-model="Filter.AuthorFilter"></b-input>
      </b-th>
      <b-th>
        Posted at
      </b-th>
      </thead>
      <b-tbody>
        <b-tr v-for="(post,index) in JobList">
          <b-td>
            <div>

              <b-form-select v-model="selected" :options=" MessageList" size="sm" class="mt-3"></b-form-select>
              <a target="_blank" class="btn btn-secondary" :href="GetPostHref(post)">Apply</a>
            </div>
          </b-td>
          <b-td>
            {{ post.Title }}
          </b-td>
          <b-td>
            <b-button v-b-toggle="post.Id">Toggle Job Text</b-button>
            <b-sidebar :id="`${post.Id}`" :title="`Job by ${post.Author}` " shadow>
              <h3>{{ post.Title }}</h3>
              <div class="px-3 py-2">
                {{ post.Text }}
              </div>
            </b-sidebar>

          </b-td>
          <b-td>

            <b-button-group>
              <a class="btn" :href="`https://old.reddit.com/user/${post.Author}/`" target="_blank">{{ post.Author }}</a>
              <b-button @click="BlockUser(post.Author)" class="btn btn-danger btn-sm">Block</b-button>
            </b-button-group>
          </b-td>
          <b-td>
            {{ post.Created.toString() }}
          </b-td>
        </b-tr>
      </b-tbody>
    </table>
  </b-container>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
import {RedditJob} from "@/store/redditJob";
import MessageTemplates from "@/views/MessageTemplates.vue";
import {MessageTemplate} from "@/store";


@Component
export default class ManagePosts extends Vue {
  newWord: string = "";
  selected: number = 0;
  Filter = {
    TitleFilter: '',
    AuthorFilter: '',
    ContentFilter: ''
  }

  GetPostHref(post: RedditJob) {
    const messageTemplate = this.$store.state.MessageTemplates[this.selected]

    const title = encodeURIComponent(messageTemplate.Title);
    const message = encodeURIComponent(messageTemplate.Text);

    return `https://old.reddit.com/message/compose/?message=${message}&subject=${title}&to=${post.Author}`;
  }

  BlockUser(user: string) {
    this.$store.commit('addBlockedUser', user);
    this.$store.dispatch('save')
    Vue.notify({
      group: 'foo',
      title: 'User blocked',
      text: 'User was added to block list. Refresh page to see update.',
      type: 'danger'
    })
  }

  get JobList(): RedditJob[] {

    return this.$store.state.JobList.filter((a: RedditJob) => {
      let authorFilterpass = true;
      let contentFilterpass = true;
      let titleFilterpass = true;
      if (this.Filter.AuthorFilter.trim().length > 0) {
        authorFilterpass = a.Author.toLowerCase().indexOf(this.Filter.AuthorFilter.trim().toLowerCase()) >= 0;
      }
      if (this.Filter.ContentFilter.trim().length > 0) {
        contentFilterpass = a.Text.toLowerCase().indexOf(this.Filter.ContentFilter.trim().toLowerCase()) >= 0;
      }
      if (this.Filter.TitleFilter.trim().length > 0) {
        titleFilterpass = a.Title.toLowerCase().indexOf(this.Filter.TitleFilter.trim().toLowerCase()) >= 0;
      }
      return authorFilterpass && contentFilterpass && titleFilterpass;
    }).sort((a: RedditJob, b: RedditJob) => {
      {
        const aTime = a.Created;
        const bTime = b.Created;
        if (aTime === bTime) return 0;
        if (aTime < bTime)
          return 1;
        return -1;
      }
    }).slice(0,+this.$store.state.Options.PostsToShow)
  }


  get MessageList(): any[] {
    const items = [];
    for (let i = 0; i < this.$store.state.MessageTemplates.length; i++) {
      let Title = this.$store.state.MessageTemplates[i].Title;
      items.push({text: Title, value: i});
    }
    return items;
  }

  DeleteWord(Word: string) {
    this.$store.commit('removeBlocked', Word)
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
