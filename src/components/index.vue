<template>
  <el-container>
    <el-header>
      <headr></headr>
    </el-header>
    <router-view></router-view>
    <el-footer>
      <footr></footr>
    </el-footer>
  </el-container>
</template>

<script>
/**
 * App Lunch Page
 *
 * Scaffolding left in for ease
 */
import Headr from './header';
import Footr from './footer';

export default {
  name: 'medinetcomorggovmobi',
  components: {
    Headr,
    Footr,
  },
  data() {
    return {

    }
  },
  methods: {

  },
};
</script>

<style scoped>

</style>
