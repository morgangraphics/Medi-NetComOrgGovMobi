<template>
  <div>
    <div v-if="patients">
      <h3 >Patient List</h3>
      <div>{{ patients }}</div>
      <h3 >Patient Data</h3>
      <div>
        <ul>
          <li v-for="patient in patientData"><a href="#"  @click.prevent @click="getOtherData(patient.userID)">{{ patient.name }}</a><br> {{ patient }}</li>
        </ul>
      </div>
    </div>
    <div v-if="appointments">
      <h3>Appointments</h3>
      <div>{{ appointments }}</div>
    </div>
    <div v-if="files">
      <h3>Files</h3>
      <div>{{ files }}</div>
    </div>
  </div>
</template>

<script>
/**
 * Doctor/Patient Landing Page
 *
 * Scaffolding left in for ease
 */
import {mapGetters, mapMutations} from 'vuex';

export default {
  name: 'messages',
  props: [

  ],
  components: {

  },
  computed: mapGetters({
    user: 'getActiveUser',
  }),
  data() {
    return {
      userID: '',
      pid: '',
      appointments: '',
      files: '',
      patients: '',
      patientData: [],
    };
  },
  methods: {
    drOrPatient(){
      let usr = '';
      if(this.user.userType === 'doctor'){
        usr = this.user.userID;
      } else {
        usr = this.$route.params.id;
        this.pid = this.user.userID;
      }
      return usr;
    },
    getPatients(){
    this.$http.get(`http://localhost:3300/doctor/${this.userID}`).then((response) => {
          console.log(response);
          this.patients = response.body.patients;
      }, (response) => {
          console.log('error', response);
      }).then(() =>{
        this.patients.forEach((id) => {
          this.pid = id;
          this.getPatientData();
        })
      });
    },
    getAppointments() {
      this.$http.get(`http://localhost:3300/calendar/${this.pid}`).then((response) => {
          console.log(response);
          this.appointments = response.body;
      }, (response) => {
          console.log('error', response);
      });
    },
    getFiles() {
      this.$http.get(`http://localhost:3300/files/${this.pid}`).then((response) => {
        console.log(response);
        this.files = response.body;
      }, (response) => {
        console.log('error', response);
      });

    },
    getPatientData(){
      this.$http.get(`http://localhost:3300/patient/${this.pid}`).then((response) => {
        console.log(response);
        if(response.body !== '') {
          this.patientData.push(response.body);
        }
      }, (response) => {
        console.log('error', response);
      });
    },
    getOtherData(pid) {
      this.pid = pid;
      this.getAppointments();
      this.getFiles();
    }
  },
  created() {

  },
  mounted() {
    this.userID = this.drOrPatient();
    if(this.user.userType === 'doctor'){
      this.getPatients();
    } else {
      this.getAppointments();
      this.getFiles();
    }
  },
  watch: {

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
