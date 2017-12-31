<template>
  <el-main class="form login" v-if='!$store.state.isLoggedIn'>
    <el-row type="flex" class="row-bg" justify="center"  v-if="error">
      <el-col :span="6"><div class="grid-content">{{ error }}</div></el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="6">
        <div class="grid-content">
        <el-form ref="login" :model="login" :rules="rules" label-width="120px" class="form">
          <el-form-item label="Login Type">
            <el-switch v-model="login.type"
              active-text="Patient"
              active-value="patient"
              inactive-text="Doctor"
              inactive-value="doctor" @change='toggleLogin()'></el-switch>
          </el-form-item>
          <el-form-item label="User Name" prop="username">
            <el-input v-model="login.username"></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input type="password" v-model="login.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('login')">Login</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>
  <el-row type="flex" class="row-bg" justify="center">
    <el-col :span="6">
      <div class="grid-content forgot">
        <a href='#' @click.prevent>Forgot Username</a> | <a href='#' @click.prevent>Forgot Password</a>
      </div>
  </el-col>
  </el-row>
</el-main>
</template>

<script>
/**
 * Login Form
 * Switch Button added convenience
 * This info pulled directly from Vuex/store, takes advantage of 2 way data binding
 *
 * Scaffolding left in for ease
 */
import {mapGetters, mapMutations} from 'vuex';

export default {
  name: 'login',
  props: [
    'username',
    'password',
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
      login: {
        type: '',
        username: '',
        password: '',
      },
      rules: {
         username: [
           { required: true, message: 'Please enter your Username', trigger: 'blur' },
           { min: 3, max: 10, message: 'Length should be 3 to 5', trigger: 'blur' }
         ],
         password: [
           { required: true, message: 'Please enter your Password', trigger: 'blur' },
           { min: 3, max: 10, message: 'Length should be 3 to 5', trigger: 'blur' }
         ],
      },
    };
  },
  methods: {
    /**
     * Log Number of Login attempts
     * Preface to stronger security practices HIPPA complaint Data has serious security protection practices
     * and repercussions for not implementing them
     * Once threshold has been met, banning user, raise alarm etc.
     * @return {[type]} [description]
     */
    incAttempts() {
      this.attempts = this.attempts++;
    },
    /**
     * For Submission handling
     * Once form has been validated we could Authenticate and Authorize the users
     * @param  {string} formName FormName used for Validation
     */
    onSubmit(formName) {
      const that = this;
      const credentials = {
        username: this.login.username,
        password: this.login.password
      };
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // Normally we'd go out to some Authentication service like auth0
          // But in the interest of brevity I have 2 users located in store
          // which would emmulate a database call
          console.log('Authenticating User...');

          setTimeout(() => {
            console.log('Authenticated');
            that.$store.commit('setActiveUser', that.login.type);
            that.$store.commit('authorizeAuthenticate', credentials.username);

            const path = (that.user.mfa)? '/login/mfa' : `/${that.user.userType}/${that.user.userID}`;

            that.$router.push({ path: path });
          }, 3000);

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    /**
     * Reset the for Form
     * @param  {string} formName FormName
     */
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    /**
     * Convenience method for handling Form data population
     */
    toggleLogin() {
      const type = this.login.type;
      const data =  this.$store.state.userType[type];
      this.login.username = data.userName;
      this.login.password = data.password;
    }

  },
  created() {

  },
  /**
   * Mapmutations via Object Spread Operator https://github.com/tc39/proposal-object-rest-spread
   * imports our MapMutations for use within this component
   * @type {String}
   */
  ...mapMutations([
    'setActiveUser',
    'authorizeAuthenticate',
  ]),
  mounted() {
    this.login.type = 'doctor';
    this.toggleLogin();
  },
  watch: {

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
