<template>
  <div>
    <span>&copy; 2017 {{ copyright }}</span>
    <pre v-if="environment !== 'production'">Environment: {{ environment }} Build: {{ build }} | <a href="#" @click.prevent @click='reset'>RESET</a></pre>

  </div>
</template>

<script>
/**
 * Footer
 *
 * Scaffolding left in for ease
 */

export default {
  name: 'footr',
  props: [
  ],
  components: {

  },
  data() {
    return {
      copyright: process.env.COPY,
      environment: process.env.NODE_ENV,
      build: '0.0.1',
    };
  },
  methods: {
    reset() {
      this.$http.get('http://localhost:3300/reset').then((response) => {
        console.log(response);
        this.$store.commit('logout');
        this.$router.push('/');
      }, (response) => {
        console.log('error', response);
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
