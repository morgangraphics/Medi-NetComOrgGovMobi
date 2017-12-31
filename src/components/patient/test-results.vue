<template>
  <el-container>
    <el-aside>
    </el-aside>
    <el-main>
      <chart v-bind:pid="pid"></chart>
      <diagnosis v-bind:pid="pid"></diagnosis>
    </el-main>
  </el-container>

</template>

<script>
/**
 * Patient Test Result View
 * Depending on the test and date
 *
 * Scaffolding left in for ease
 */
import {mapGetters, mapMutations} from 'vuex';
import Chart from '../utils/chart';
import Diagnosis from '../utils/diagnosis';

export default {
  name: 'testResults',
  props: [

  ],
  components: {
    Chart,
    Diagnosis
  },
  // computed: mapGetters({
  //  pid: 'getCurrentPatientID',
  // }),
  data() {
    return {
      patients: [],
      pid: '',
    }
  },
  methods: {
    foo() {
      this.pid = this.$route.params.id;
      this.$store.commit('setPatientID', this.$route.params.id);
    }
  },
  ...mapMutations([
    'setPatientID',
  ]),
  created: function () {

  },
  mounted: function() {
    this.foo();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
