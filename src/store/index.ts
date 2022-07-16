import Vue from 'vue'
import Vuex from 'vuex'
import defaultOptions from './options'
import {RedditJob} from "@/store/redditJob";
import {RedditPost} from "@/store/redditPost";

Vue.use(Vuex)

interface SeenLog {
  [name: string]: string
}

export class MessageTemplate {
  public Title: string = "";
  public Text: string = "";

  constructor(newtitle: string, newtext: string) {
    this.Title = newtitle;
    this.Text = newtext;

  }


}

export class ScanOptions {
  ShouldSoundAlert: boolean = false;
  ShouldNotify: boolean = false;
  AlertNoise: string = ''
  PostsToShow: number = 50


}

async function downloadsubredditdata(subreddit: string) {
  if (subreddit.indexOf('/m/') >= 0) {
    // @ts-ignore
    return await (await fetch(`https://old.reddit.com${subreddit}.json?limit=100`, defaultOptions)).json()
  }

  // @ts-ignore
  const result = await fetch(`https://old.reddit.com/r/${subreddit}/new/.json?limit=100`, defaultOptions);
  return await result.json();
}

function sortandcleanjobs(state: any) {

  for (let i = state.JobList.length - 1; i >= 0; i--) {
    let unix_time = +(state.JobList[i].Created);
    let unix_time_new = +(new Date());
    if (unix_time_new - unix_time > 1000 * 60 * 60 * 24 * 1000) {
      state.JobList.splice(i, 1);
    }
  }
}

export default new Vuex.Store({
  state: {
    Options: new ScanOptions(),
    SearchActive: false,
    MessageTemplates: [] as MessageTemplate[],
    JobList: [] as RedditJob[],
    BlockedUsers: [] as string[],
    BlockedWords: [] as string[],
    SubReddits: [] as string[],
    HasNotification: false,
  },
  getters: {
    Options: state => {
      return state.Options;
    }
  },
  mutations: {
    getSubreddit: async (state, subreddit) => {
      // @ts-ignore
      let json;

      try {
        json = await downloadsubredditdata(subreddit);
      } catch (e) {

        return;
      }

      const posts = json.data.children.map((a: any) => a.data) as RedditPost[];
      let PushedItems = false;
      for (let post of posts) {

        let data_lower = post.selftext.toLowerCase();
        let data_title_lower = post.title.toLowerCase();
        const isBlockedWord = state.BlockedWords.findIndex(a => data_lower.indexOf(a) >= 0 || data_title_lower.indexOf(a) >= 0) >= 0;
        const isBlockedUser = state.BlockedUsers.findIndex(a => a === post.author) >= 0;
        const isSeen = state.JobList.find(a => a.Id === post.id)
        if (isBlockedWord || isBlockedUser || isSeen) continue;
        PushedItems = true;

        state.JobList.push(new RedditJob(post));

      }
      if (PushedItems ) {
        state.HasNotification = PushedItems;
      }

      sortandcleanjobs(state);

    },
    addPosts: (state, jobList) => {


      for (const post of jobList) {
        state.JobList.push(post);
      }
      sortandcleanjobs(state);
    },

    addTemplate(state, template: MessageTemplate) {
      state.MessageTemplates.push(template)
    },
    updateTemplate(state, {index, message}) {
      state.MessageTemplates[index] = message;
    },
    removeTemplate(state, index: number) {
      state.MessageTemplates.splice(index, 1)
    },
    addBlockedUser: (state, blockedUser) => {

      let user = blockedUser;
      if (!state.BlockedUsers.find(a => a === user)) {
        state.BlockedUsers.push(user)
      }
      for (let i = state.JobList.length - 1; i >= 0; i--) {
        if (state.JobList[i].Author === blockedUser) {
          state.JobList.splice(i, 1);
        }
      }
    },
    addBlocked: (state, blockedWord) => {
      let case1 = blockedWord.toLowerCase();
      if (!state.BlockedWords.find(a => a === case1)) {
        state.BlockedWords.push(case1)
      }
    },

    removeBlockedUser: (state, blockedUser) => {
      let user = blockedUser.toLowerCase();
      const index = state.BlockedUsers.findIndex(a => a === user)
      if (index >= 0) {
        state.BlockedUsers.splice(index, 1);
      }
    },
    removeBlocked: (state, blockedWord) => {
      let word = blockedWord.toLowerCase();
      const index = state.BlockedWords.findIndex(a => a === word)
      if (index >= 0) {
        state.BlockedWords.splice(index, 1);
      }
    },
    addSubReddit: (state, subreddit) => {

      if (!state.SubReddits.find(a => a === subreddit)) {
        state.SubReddits.push(subreddit)
      }
    },
    removeSubReddit: (state, subreddit) => {
      const index = state.SubReddits.findIndex(a => a === subreddit)
      if (index >= 0) {
        state.SubReddits.splice(index, 1);
      }
    }

  },
  actions: {
    save: injectee => {

      localStorage.setItem("state", JSON.stringify(injectee.state))
    },
    retr: injectee => {

      let old_state = localStorage.getItem("state");
      if (!old_state) {
        return;
      }
      try {

        const state_new = JSON.parse(old_state);
        state_new.MessageTemplates.forEach((b: MessageTemplate) => injectee.commit('addTemplate', b));
        state_new.BlockedUsers.forEach((b: string) => injectee.commit('addBlockedUser', b));
        state_new.BlockedWords.forEach((b: string) => injectee.commit('addBlocked', b));
        injectee.commit('addPosts', state_new.JobList);
        state_new.SubReddits.forEach((b: string) => injectee.commit('addSubReddit', b));
        injectee.state.Options = state_new.Options;
      } catch (e) {
        console.error(e);
      }
    }

  },
  modules: {}
})

function playSound(sound: string) {

  const audio = new Audio(sound);
  audio.play();

}
