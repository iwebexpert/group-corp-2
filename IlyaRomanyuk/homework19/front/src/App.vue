<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import { mapActions } from "vuex";
export default {
  name: "App",
  components: { Header, Footer },

  methods: {
    ...mapActions(["session"])
  },

  mounted() {
    if (localStorage.getItem("data")) {
      let data = JSON.parse(localStorage.getItem("data"));
      this.session(data);
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  margin: 0;
  padding: 0;
}
</style>
