<template>
  <el-row>
    <el-col :span="24">
      <h1>vue-jsPlumb</h1>
      <el-row>
        <el-col :span="12">
          <router-link :to="{ name: 'Index'}">Index</router-link>
        </el-col>
        <el-col :span="12">
          <router-link :to="{ name: 'Other'}">Other</router-link>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style>
</style>
