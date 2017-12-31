<template>
  <el-container>
    <el-aside>
      <div class="patient">
        <el-table
          :data="patients"
          border
          :default-sort = "{prop: 'id', order: 'ascending'}"
          row-key = 'id'
          style = "width: 100%"
          v-on:row-click = "filterPatient">
          <el-table-column
            prop="id"
            label="ID"
            sortable
            width="100"
            id="id">
          </el-table-column>
          <el-table-column
            prop="age"
            label="Age"
            sortable>
          </el-table-column>
          <el-table-column
            prop="sex"
            sortable
            label="Sex">
          </el-table-column>
        </el-table>
      </div>
    </el-aside>
    <el-main>
      <chart v-bind:pid="pid"></chart>
      <diagnosis v-bind:pid="pid"></diagnosis>
    </el-main>
  </el-container>

</template>

<script>
/**
 * Doctor Patient view
 * This was part of another code Challenge that matched well with this functionality
 * It has reusable components Charts/Diagnosis
 * Scaffolding left in for ease
 */

import {mapGetters, mapMutations} from 'vuex';
import Chart from '../utils/chart';
import Diagnosis from '../utils/diagnosis';

export default {
  name: 'Patient',
  props: [

  ],
  components: {
    Chart,
    Diagnosis
  },
  data() {
    return {
      patients: [],
      pid: '',
    }
  },
  methods: {
    /**
     * Triggered from table click
     * Sets patientID for other components can render the appropriate data
     * @param  {object} e Event
     */
    filterPatient: function (e) {
      this.pid = e.id;
      this.$store.commit('setPatientID', this.pid);
      this.$emit('filterPatientRecords', this.pid);
    },

    /**
     * This is a datastore not handled by LocalStorage hence the different port
     * It grabs the current list of ALL patients in that datastore and not a filtered
     * list as in other parts of the demo
     * @return {[type]} [description]
     */
    fetch_patients: function () {
      this.$http.get('http://localhost:3000/patients?_sort=id&_order=desc').then((response) => {
        // get body data
        this.patients = response.body;
        // console.log(this.patients);
      }, (response) => {
        // error callback
        console.log('error', response);
      });
    },
  },
  ...mapMutations([
    'setPatientID',
  ]),
  /**
   * Native Vue mountpoint
   * Fetch the patients data Once when component is loaded i.e DOM is ready.
   * This is lazy load sort of way to go about it.
   * @return {[type]} [description]
   */
  created: function () {
    this.fetch_patients();
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
