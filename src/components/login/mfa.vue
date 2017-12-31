<template>
  <el-main class="form mfa" v-if="$store.state.isLoggedIn && !$store.state.isAuhenticated">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="6">
        <p>Your account is secured using multi-factor authentication (MFA). To finish signing in, turn on or view your MFA device and type the authentication code below.</p>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="center"  v-if="error">
      <el-col :span="6"><div class="grid-content">{{ error }}</div></el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="6">
        <div class="grid-content">
        <el-form ref="mfa" :model="mfa" :rules="rules" label-width="120px" class="form">
          <el-form-item label="MFA Code" prop="mfacode">
            <el-input v-model="mfa.mfacode"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('mfa')">Submit</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>
  <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="6">
        <div class="grid-content troubleshoot">
          <a href='#' @click.prevent>Troubleshoot MFA</a> | <a href='#' @click.prevent>Cancel</a>
        </div>
      </el-col>
  </el-row>
</el-main>
</template>

<script>
/**
 * MFA Form
 * Any HIPPA compliant Application should have MFA authentication enabled by default
 * This is just one Option, is could just as easily be Audio/Picture Captcha Security Pin or
 * any number of other options
 *
 * Scaffolding left in for ease
 */
import {mapGetters, mapMutators} from 'vuex';

export default {
  name: 'mfa',
  props: [

  ],
  components: {

  },
  computed: mapGetters({
    user: 'getActiveUser',
  }),
  data() {
    return {
      error: '',
      attempts: 0,
      mfa: {
        mfacode: 1234,
      },
      rules: {
         mfacode: [
           { required: true, message: 'Please enter the MFA Code', trigger: 'blur' },
         ],
      },
    };
  },

  methods: {
    onSubmit(formName) {
      const that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            that.$router.push({path: `/${that.user.userType}/${that.user.userID}`, });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
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
