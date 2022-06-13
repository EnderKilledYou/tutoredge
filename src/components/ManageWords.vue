<template>
  <b-container>
    <b-form>
      <b-input v-model="newWord"></b-input>
      <b-button-group>
        <b-button @click="addBlockedWord">Add</b-button>
      </b-button-group>
    </b-form>
    <table class="table table-striped table-hover">
      <thead>
      <b-th>
        Index
      </b-th>
      <b-th>
        Word
      </b-th>
      </thead>
      <b-tbody>
        <b-tr v-for="(Word,index) in BlockedWordsList">
          <b-td>
            <b-button-group>
              <b-button @click="DeleteWord(Word)" class="btn btn-danger"> Remove</b-button>
            </b-button-group>
          </b-td>
          <b-td>
            {{ Word }}
          </b-td>
        </b-tr>
      </b-tbody>
    </table>
  </b-container>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class ManageWords extends Vue {
  newWord: string = "";

  get BlockedWordsList() {
    return this.$store.state.BlockedWords
  }

  addBlockedWord() {
    this.$store.commit('addBlocked', this.newWord)
    this.$store.dispatch('save')
  }

  DeleteWord(Word: string) {
    this.$store.commit('removeBlocked', Word)
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
