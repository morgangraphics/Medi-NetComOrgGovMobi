<template>
  <div class="charts">
    <div id="creatinine" class="chart" v-show="creatine.length > 0"></div>
    <div id="tests" class="chart" v-show="diagnosis.length > 0"></div>
  </div>
</template>

<script>
/**
 * Patient Charting
 *
 * Scaffolding left in for ease
 */
import {mapGetters, mapMutations} from 'vuex';
import Plotly from 'plotly.js/dist/plotly';

export default {
  name: 'Charts',
  props: ['pid'],
  // computed: mapGetters({
  //  pid: 'getCurrentPatientID',
  // }),
  data() {
    return {
      creatine: [],
      diagnosis: [],
    }
  },
  methods: {
    diag: function () {
      const cnts = {};

      // Iterate though diagnois and grab the stuff we're going to chart
      this.diagnosis.forEach((value) => {
        const id = value.icd_code_id;
        if (!cnts[id]) {
          cnts[id] = {};
          cnts[id].count = 1;
          cnts[id].date = [];
        }
        cnts[id].count += 1;
        cnts[id].date.push(value.date);
        cnts[id].icd_code_id = id;
      });

      // Get an array of the values:
      const values = Object.values(cnts);

      // Then sort by using the values, reverse the array and take the top 10 by frequency
      const topten = values.sort((a, b) => (a.count - b.count)).reverse().slice(0, 9);

      // TODO: This shouldn't be in the Methods area
      const tests = document.getElementById('tests');

      const chart = {
        x: [],
        y: [],
        mode: 'markers',
        name: '',
        text: [],
        marker: {
          color: '',
          size: 12,
          line: {
            color: 'white',
            width: 0.5,
          },
        },
        type: 'scatter',
      };
      const data = [];
      // Build data for scatter plot
      // This works, but is not completely accurate. It attempts to show the
      // tests over time. It will show the test number and the test grouped by
      // anyother test taken on that day i.e. A001 took his 4th M41_114 test
      // in Sept 2014 along with his 2nd S53 -143 and first MS0_922 test
      topten.forEach((value, i) => {
        const sctr = Object.assign({}, chart);
        sctr.x = value.date;
        sctr.y = value.count;
        sctr.name = value.icd_code_id;
        sctr.text = value.icd_code_id;
        sctr.marker.color = i + 5;
        data.push(sctr);
      });

      const layout = {
        title: 'Diagnosis Frequency',
        xaxis: {
          title: 'Date',
          showgrid: false,
          zeroline: false,
        },
        yaxis: {
          title: 'Count',
          showline: false,
        },
      };

      Plotly.newPlot(tests, data, layout);
    },
    // Handles the data munging for Plotting the creatinine chart
    // accoding to the TODO MVC no DOM manipulation is allowed in the Methods area
    // this could/should be put up into the Data area
    renal: function () {
      const creatinine = document.getElementById('creatinine');
      const chart = {
        x: [],
        y: [],
        mode: 'lines',
        name: 'Creatinine',
        type: 'scatter',
      };
      // Append data to the creatinine chart object
      this.creatine.forEach((value) => {
        chart.x.push(value.date);
        chart.y.push(value.value);
      });
      const data = [chart];
      const layout = {
        title: `Creatinine Levels for patient ${this.pid}`,
      };
      Plotly.newPlot(creatinine, data, layout);
    },
    // This is tricky because it requires `this` to be present.
    // As this module/component also needs to be independent this HTTP
    // request needs to be here, I'd probabaly abstract the request into a seperate
    // import so we could have a single place for it and pass needed params to it
    fetch_labs: function () {
      this.$http.get(`http://localhost:3000/labs?patient_id=${this.pid}&_sort=date&_order=asc`).then((response) => {
        this.creatine = response.body;
        this.renal()
      }, (response) => {
        // error callback
        console.log('error', response);
      });
    },
    fetch_diagnosis: function () {
      this.$http.get(`http://localhost:3000/diagnosis?patient_id=${this.pid}`).then((response) => {
        this.diagnosis = response.body;
        this.diag()
      }, (response) => {
        console.log('error', response);
      });
    },
  },
  created: function () {

  },
  // Watcher that is looking for an updated pid to be selected from the side menu
  watch: {
    pid: function () {
      this.fetch_labs();
      this.fetch_diagnosis();
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
