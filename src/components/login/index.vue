<template>
  <el-main>
    <login></login>
    <mfa></mfa>
  </el-main>
</template>

<script>
/**
 * Login Landing Page
 * Sets up Login Process
 * Could pass properties down to the Login/MFA components but use Vue/store to manage state
 * This alleviates the coupling of components to one another
 * Could potentially add other login mechanisms here
 * Scaffolding left in for ease
 */
import {mapGetters, mapMutators} from 'vuex';
import Login from './login';
import Mfa from './mfa';


export default {
  name: 'loginProcess',
  props: [
    'username',
    'password',
  ],
  components: {
    Login,
    Mfa
  },
  data() {
    return {

    };
  },
  methods: {
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
