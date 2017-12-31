<template>
  <el-container>
  <el-header class="menu">
    <doctor-menu></doctor-menu>
  </el-header>
  <router-view></router-view>
</el-container>
</template>

<script>
/**
 * Doctor Landing Page
 * Sets up the Dr. header, menu, and routs that handle the view
 * Scaffolding left in for ease
 */
import DoctorMenu from './menu';

export default {
  name: 'doctor',
  props: [

  ],
  components: {
    DoctorMenu,
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
