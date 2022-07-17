<template>
  <div class="home">
<options />
    <manage-posts />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ManagePosts from '@/components/ManagePosts.vue';
import Options from "@/components/Options.vue"; // @ is an alias to /src

@Component({
  components: {
    Options,
    ManagePosts,
  },
})
export default class ShowPosts extends Vue {}
</script>
