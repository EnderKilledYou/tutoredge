<template>
  <div class="home">

    <manage-message-templates />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ManageMessageTemplates from '@/components/ManageMessageTemplates.vue'; // @ is an alias to /src

@Component({
  components: {
    ManageMessageTemplates
  },
})
export default class MessageTemplates extends Vue {}
</script>
