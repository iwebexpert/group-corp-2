<template>
  <header class="header">
    <router-link class="link" to="/">Todo List</router-link>
    <div v-if="!GET_AUTH" class="btns">
      <router-link class="btn btn-update" to="/registr">Регистрация</router-link>
      <router-link class="btn btn-update" to="/auth">Войти</router-link>
    </div>
    <div v-else class="name">
      <p>{{GET_DATA.name}}</p>
      <button v-on:click="logOut" class="btn btn-update">Выйти</button>
    </div>
  </header>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Header",
  components: {},
  methods: {
    ...mapActions(["endSession"]),

    logOut() {
      localStorage.clear();
      this.endSession();
    }
  },
  computed: {
    ...mapGetters(["GET_AUTH", "GET_DATA"])
  }
};
</script>

<style scoped>
.header {
  padding: 15px 0;
  background-color: rgb(59, 137, 255);
  color: #fff;

  font-size: 24px;
  font-family: sans-serif;

  display: flex;
  justify-content: space-around;
  align-items: center;
}

.btns {
  display: flex;
}

.link {
  text-decoration: none;
  color: #fff;
}

.link:hover {
  text-decoration: underline;
}

.name {
  display: flex;
  align-items: center;
}
</style>
