<template>
  <div>

  </div>
</template>

<script>
/**
 * Logout Landing Page
 * This resets the application
 * Scaffolding left in for ease
 */
import {mapGetters, mapMutations} from 'vuex';


export default {
  name: 'logoutProcess',
  props: [

  ],
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
  ...mapMutations([
    'logout'
  ]),
  mounted() {
    this.$store.commit('logout');
    this.$router.push('/');
  },
  watch: {

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
