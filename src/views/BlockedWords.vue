<template>
  <div class="home">

    <manage-words />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ManageWords from '@/components/ManageWords.vue'; // @ is an alias to /src

@Component({
  components: {
    ManageWords
  },
})
export default class BlockedWords extends Vue {}
</script>
