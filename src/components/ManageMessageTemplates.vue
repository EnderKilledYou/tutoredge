<template>
  <b-container>
    <b-form>
      <b-form-group label="Subject">
        <b-input v-model="newtitle"></b-input>
      </b-form-group>
      <b-form-group label="Body">
        <b-textarea v-model="newtext"></b-textarea>
      </b-form-group>
      <b-button-group>
        <b-button @click="AddTemplate">Add</b-button>
      </b-button-group>
    </b-form>
    <a href="https://www.reddit.com/wiki/markdown" target="_blank">Template help</a>
    <table class="table table-striped table-hover">
      <thead>
      <b-th>
        Index
      </b-th>
      <b-th>
        Message Subject
      </b-th>
      <b-th>
        Message Body
      </b-th>
      </thead>
      <b-tbody>
        <b-tr v-for="(message,index) in TemplateList" :key="index">
          <b-td>
            <b-button-group>
              <b-button @click="DeleteTemplate(index)" class="btn btn-danger"> Remove</b-button>
            </b-button-group>
          </b-td>
          <b-td>
            <b-input v-model="message.Title"></b-input>

          </b-td>
          <b-td>
            <b-textarea v-model="message.Text"></b-textarea>
            <b-button-group>
              <b-button @click="UpdateTemplate(message,index)" class="btn btn-danger"> Update</b-button>
            </b-button-group>
          </b-td>
        </b-tr>
      </b-tbody>
    </table>
  </b-container>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {MessageTemplate} from "@/store";

@Component
export default class ManageMessageTemplates extends Vue {
  newtitle: string = "";
  newtext: string = "";

  get TemplateList(): MessageTemplate[] {
    return this.$store.state.MessageTemplates
  }

  AddTemplate() {
    this.$store.commit('addTemplate', new MessageTemplate(this.newtitle, this.newtext))
    this.$store.dispatch('save')
  }

  UpdateTemplate(message: MessageTemplate, index: number) {
    this.$store.commit('updateTemplate', {message, index})
    this.$store.dispatch('save')
  }

  DeleteTemplate(index: number) {
    this.$store.commit('removeTemplate', index)
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
