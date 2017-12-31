<template>
  <div class="diagnosis" v-show="diagnosis.length > 0">
  <el-table
    :data="filtered"
    border
    :default-sort = "{prop: 'date', order: 'descending'}"
    style="width: 100%">
    <el-table-column
      prop="date"
      label="Date"
      sortable
      width="200">
    </el-table-column>
    <el-table-column
      prop="icd_code_id"
      label="ICD Code"
      sortable
      width="150">
    </el-table-column>
    <el-table-column
      prop="desc"
      sortable
      label="Description">
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';

export default {
  name: 'Diagnosis',
  props: ['pid'],
  // computed: mapGetters({
  //  pid: 'getCurrentPatientID',
  // }),
  data() {
    return {
      icd_codes: [],
      diagnosis: [],
      filtered: [],
    }
  },
  methods: {
    // Format date if needed not currently used
    date_format: function (row) {
      const d = new Date(row.date);
      return d.toString();
    },
    // This is the code to description function. It's using an ES6 find method
    // to look up the description and build a new object, this should be a reusable
    // component as it would be useful in multiple areas
    code_to_desc: function () {
      this.diagnosis.forEach((value) => {
        const desc = this.icd_codes.find(x => x.id === value.icd_code_id);
        this.filtered.push({
          date: value.date,
          icd_code_id: value.icd_code_id,
          desc: desc.description,
        });
      });
    },
    // Yay - String Interpolation!
    // See comments in chart.vue
    fetch_diagnosis: function () {
      this.$http.get(`http://localhost:3000/diagnosis?patient_id=${this.pid}`).then((response) => {
        this.diagnosis = response.body;
        this.code_to_desc();
      }, (response) => {
        // error callback
        console.log('error', response);
      });
    },
    // See comments in chart.vue
    fetch_icd_codes: function () {
      this.$http.get('http://localhost:3000/icd_codes').then((response) => {
        this.icd_codes = response.body;
      }, (response) => {
        // error callback
        console.log('error', response);
      });
    },
  },
  // Fetch the ICD codes Once when component is loaded. This is lazy load sort of
  // way to go about it.
  created: function () {
    this.fetch_icd_codes();
  },
  // Grab the diagnosis data when PID is updated
  watch: {
    pid: function () {
      this.fetch_diagnosis();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
