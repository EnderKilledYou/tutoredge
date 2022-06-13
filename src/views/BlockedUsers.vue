<template>
  <div class="home">

    <manage-users />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ManageUsers from '@/components/ManageUsers.vue'; // @ is an alias to /src

@Component({
  components: {
    ManageUsers
  },
})
export default class BlockedUsers extends Vue {}
</script>
