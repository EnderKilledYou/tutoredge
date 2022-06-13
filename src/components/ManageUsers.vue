<template>
  <b-container>
    <b-form>
      <b-input v-model="newuser"></b-input>
      <b-button-group>
        <b-button @click="addBlockedUser">Add</b-button>
      </b-button-group>
    </b-form>
    <table class="table table-striped table-hover">
      <thead>
      <b-th>
        Index
      </b-th>
      <b-th>
        User
      </b-th>
      </thead>
      <b-tbody>
        <b-tr v-for="(user,index) in BlockedUsersList">
          <b-td>
            <b-button-group>
              <b-button @click="DeleteUser(user)" class="btn btn-danger"> Remove</b-button>
            </b-button-group>
          </b-td>
          <b-td>
            {{ user }}
          </b-td>
        </b-tr>
      </b-tbody>
    </table>
  </b-container>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class ManageUsers extends Vue {
  newuser: string = "";

  get BlockedUsersList() {
    return this.$store.state.BlockedUsers
  }

  addBlockedUser() {
    this.$store.commit('addBlockedUser', this.newuser)
    this.$store.dispatch('save')
  }

  DeleteUser(user: string) {
    this.$store.commit('removeBlockedUser', user)
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
