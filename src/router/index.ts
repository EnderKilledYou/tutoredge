import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import SubReddits from '../views/Subreddits.vue'
import BlockedUsers from '../views/BlockedUsers.vue'
import ManageWords from '../views/BlockedWords.vue'
import MessageTemplatesManageWords from '../views/MessageTemplates.vue'
import ShowPosts from '../views/ShowPosts.vue'
import Options from "@/components/Options.vue";
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/manage_subreddits',
    name: 'managesubreddits',
    component: SubReddits
  },
  {
    path: '/manage_users',
    name: 'manageusers',
    component: BlockedUsers
  },{
    path: '/manage_words',
    name: 'managewords',
    component: ManageWords
  },{
    path: '/manage_message_templates',
    name: 'managemessagetemplates',
    component: MessageTemplatesManageWords
  },{
    path: '/manage_posts',
    name: 'manageposts',
    component: ShowPosts
  },{
    path: '/options',
    name: 'options',
    component: Options
  }
]

const router = new VueRouter({
  routes
})

export default router
