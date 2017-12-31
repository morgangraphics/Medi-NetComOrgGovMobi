<template>
<el-main class="form login" v-if=''>
  <h3>Schedule an Appointment</h3>
  <el-row type="flex" class="row-bg" justify="center">
    <el-col :span="8"><div class="grid-content">
    <p>Schedule an appointment by selecting from the calendar below.</p>
    <p>Then Upload any supporting documentation to help speed diagonsis.</p>
  </div></el-col>
  </el-row>
  <el-row type="flex" class="row-bg" justify="center"  v-if="error">
    <el-col :span="8"><div class="grid-content">{{ error }}</div></el-col>
  </el-row>
  <el-row type="flex" class="row-bg" justify="center" v-if="!schedule.submitted">
    <el-col :span="10">
      <div class="grid-content">
      <el-form ref="schedule" :model="schedule" :rules="rules" label-width="200px" class="form">
        <el-form-item label="Appointment Date & Time" prop="appointment">
          <el-date-picker
            v-model="schedule.appointment"
            type="datetime"
            placeholder="Select appointment date and time"
            :picker-options="convenienceOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('schedule')">Schedule</el-button>
        </el-form-item>
      </el-form>
    </div>
   </el-col>
  </el-row>
  <el-row type="flex" class="row-bg" justify="center" v-if="schedule.submitted">
    <el-col :span="10">
    <div class="grid-content">
      <el-form ref="upload" :model="upload" :rules="rules" label-width="200px" class="form">
      <el-form-item label="Upload Files" prop="patientFiles">
        <el-upload
          class="upload-demo"
          :action="`http://localhost:3300/files/${userID}`"
          :on-change="handleChange"
          :file-list="schedule.patientFiles">
          <el-button size="small" type="primary">Click to upload</el-button>
          <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="complete">Complete</el-button>
      </el-form-item>
      </el-form>
    </div>
   </el-col>
  </el-row>




</el-main>
</template>

<script>
/**
 * Patient Appointment Scheduling
 * WARNING: No validity checking is done here, it just sends a timestamp and files to the
 * back end for processing
 *
 * Scaffolding left in for ease
 */

export default {
  name: 'patientCalendar',
  props: [

  ],
  components: {

  },
  data() {
    return {
      userID: this.$route.params.id,
      error: '',
      schedule: {
        appointment: '',
        submitted: false,
      },
      upload: {
        patientFiles: [],
      },
      rules: {
        appointment: [
          { required: true, message: 'Please select an appointment time', trigger: 'blur' }
        ],
      },
      /**
       * Because Dr's offices are usually 3 months out for appointments
       * @type {Object}
       */
      convenienceOptions: {
        shortcuts: [{
          text: 'Today',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: 'Tomorrow',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: 'Next Week',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        },{
          text: '3 Months',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7 * 12);
            picker.$emit('pick', date);
          }
        }]
      }
    };
  },
  methods: {
    complete(formName) {
      this.resetForm('upload');
      this.schedule.submitted = false;
      this.$nextTick(function(){
        this.resetForm('schedule');
      });
      //this.$router.push({ path: `/patient/${this.userID}/calendar` });
    },
    handleChange() {

    },
    /**
     * Schedule an ppointment by picking from the calendar.
     * This could use some checking to ensure user picks a valid timeslot
     * @param  {string} formName FormName for validation
     * @return {[type]}          [description]
     */
    onSubmit(formName) {
      const that = this;

      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('Submitting');
          const body = { appointment: that.schedule.appointment, userID: that.userID };

          that.$http.post('http://localhost:3300/calendar', body).then((response) => {
            console.log(response);
            that.schedule.submitted = true;
          }, (response) => {
            console.log('error', response);
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  created() {

  },
  mounted() {

  },
  watch: {

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
