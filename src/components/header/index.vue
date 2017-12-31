<template>
    <div>
      <a href="/" class="logo"><h1>Medi-NetComOrgGovMobi</h1></a>
      <span v-if="!this.$store.state.isLoggedIn" class="signup">
        <router-link to="/login">Sign In</router-link> | <a href="#" @click.prevent>Sign Up</a>
      </span>
      <span v-if="this.$store.state.isLoggedIn" class="welcome">
        Welcome {{ user.userName }}
        <router-link :to='`/user/${user.userID}`' @click.prevent><i class="el-icon-setting"></i></router-link> | <router-link to="/logout">Sign Out</router-link>
      </span>
    </div>
</template>

<script>
/**
 * Header
 *
 * Scaffolding left in for ease
 */
import {mapGetters} from 'vuex';

export default {
  name: 'headr',
  props: [

  ],
  /**
   * Native Vue mountpoint
   * used with Vuex to get store data
   * @type {[type]}
   */
  computed: mapGetters({
    user: 'getActiveUser',
  }),
  components: {

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
