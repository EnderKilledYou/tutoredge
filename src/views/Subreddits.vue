<template>
  <div class="home">

    <manage-subreddits />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ManageSubreddits from '@/components/ManageSubreddits.vue'; // @ is an alias to /src

@Component({
  components: {
    ManageSubreddits: ManageSubreddits,
  },
})
export default class Subreddits extends Vue {}
</script>
