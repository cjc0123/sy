<template>
  <div>
    <Header></Header>
    <router-view />
    <Footer class="footer"></Footer>
  </div>
</template>

<script>
import Header from "../components/Header";
import Footer from "../components/Footer";

export default {
  components:{
    Header,
    Footer
  },
};
</script>

<style scoped>
</style>