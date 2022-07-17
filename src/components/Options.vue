<template>
  <b-container v-if="Show">



    <b-form-group label="Posts To Show">
      <b-input type="number" v-model="Options.PostsToShow"></b-input>

    </b-form-group>
    <b-form-group  label="Should Browser Notify">
      <b-checkbox v-model="Options.ShouldNotify"></b-checkbox>
    </b-form-group>
  </b-container>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
import store, {ScanOptions} from "@/store";


@Component
export default class Options extends Vue {
  get Options(){
    return this.$store.state.Options;
  }
  get Show(){
    return this.$store.state.ShowOptions;
  }
  // Options: ScanOptions = new ScanOptions();
  //
   @Watch('Options', { deep: true})
   OptionsUpdated(a: any) {


     this.$store.dispatch('save')
   }
  //
  // created() {
  //   debugger;
  //   this.Options = this.$store.state.Options
  // }

}
</script>

