<template>
  <div class="home">

    <options />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ManageUsers from '@/components/ManageUsers.vue'; // @ is an alias to /src

@Component({
  components: {

  },
})
export default class BlockedUsers extends Vue {}
</script>
