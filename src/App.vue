<template>
  <div id="app" class="container">
    <t-header></t-header>
    <router-view></router-view>
    <t-footer></t-footer>
  </div>
</template>

<script>
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

export default {
  name: 'App',
  components: {
    't-header': Header,
    't-footer': Footer,
  },
};
</script>

<style scoped>
.container {
  width: 1140px;
  padding: 0 30px;
  margin: 0 auto;
}
</style>
