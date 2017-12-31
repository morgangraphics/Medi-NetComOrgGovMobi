<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="1"><router-link :to="`/doctor/${userID}`">Home</router-link></el-menu-item>
    <el-menu-item index="2"><router-link :to="`/doctor/${userID}/calendar`">Calendar</router-link></el-menu-item>
    <el-submenu index="3">
      <template slot="title" index="3-0"><router-link :to="`/doctor/${userID}/patients`">Patients</router-link></template>
      <el-menu-item index="3-1">item one</el-menu-item>
      <el-menu-item index="3-2">item two</el-menu-item>
      <el-menu-item index="3-3">item three</el-menu-item>
    </el-submenu>
    <el-menu-item index="4"></el-menu-item>
  </el-menu>
</template>

<script>
/**
 * Doctor Menu
 * Triggers route handling
 * Scaffolding left in for ease
 */

export default {
  name: 'doctorMenu',
  props: [

  ],
  components: {

  },
  data() {
    return {
      userID: this.$route.params.id,
      activeIndex: '1',
    };
  },
  methods: {
    handleSelect(key) {
        this.activeIndex = key;
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
