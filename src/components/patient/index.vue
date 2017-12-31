<template>
  <el-container>
  <el-header class="menu">
    <patient-menu></patient-menu>
  </el-header>
  <router-view></router-view>
  </el-container>
</template>

<script>
/**
 * Patient Landing Page
 *
 * Scaffolding left in for ease
 */
import PatientMenu from './menu';

export default {
  name: 'patient',
  props: [

  ],
  components: {
    PatientMenu
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
