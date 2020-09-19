<template>
  <div id="app">
    <Header />
    <Users
      v-on:deleteTask="deleteTask"
      v-on:changeCompliting="changeCompliting"
      v-bind:users="GET_USERS"
    />
    <Form v-on:createNewTask="createNewTask" />
    <Footer />
  </div>
</template>

<script>
import Users from "@/components/UsersPage.vue";
import { mapActions, mapGetters } from "vuex";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Form from "@/components/Form.vue";
export default {
  name: "App",
  components: { Users, Header, Form, Footer },

  methods: {
    ...mapActions(["getTasks", "patchTask", "removeTask", "createTask"]),

    changeCompliting(id) {
      this.patchTask(id);
    },

    deleteTask(id) {
      this.removeTask(id);
    },

    createNewTask(task) {
      this.createTask(task);
    }
  },

  computed: {
    ...mapGetters(["GET_USERS"])
  },

  mounted() {
    this.getTasks();
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
