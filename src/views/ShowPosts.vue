<template>
  <div class="home">

    <manage-posts />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ManagePosts from '@/components/ManagePosts.vue'; // @ is an alias to /src

@Component({
  components: {
    ManagePosts,
  },
})
export default class ShowPosts extends Vue {}
</script>
