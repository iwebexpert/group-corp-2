<template>
  <div class="form-registr">
    <h2>Авторизация</h2>
    <form action class="form">
      <div class="input">
        <label for="email">Em@il:</label>
        <input v-model="email" class="form-input" type="text" placeholder="email" name="email" />
      </div>

      <div class="input">
        <label for="password">Пароль:</label>
        <input
          v-model="password"
          class="form-input"
          type="password"
          placeholder="********"
          name="password"
        />
      </div>

      <input v-on:click.prevent="auth" type="submit" value="Начть" />
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Swal from "sweetalert2";
export default {
  name: "Auth",
  components: {},
  data() {
    return {
      email: "",
      password: ""
    };
  },

  methods: {
    ...mapActions(["authUser"]),
    async auth() {
      if (!this.email.trim() || !this.password.trim()) {
        Swal.fire("Error ?", "Enter email and password", "question");
        return;
      }

      let newInfo = { email: this.email, password: this.password };
      let response = await this.authUser(newInfo);

      if (!response.message) {
        this.password = "";
        this.email = "";
        this.$router.push("/");
      } else {
        Swal.fire("Error ?", `${response.message}`, "question");
      }
    }
  }
};
</script>

<style scoped>
.form-registr {
  width: 650px;
  padding: 10px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 0 auto;
}

.input {
  margin-bottom: 30px;
  width: 100%;
}

.form {
  width: 100%;
}

.form-input {
  border: none;
  border-bottom: 1px solid #333;
  width: 100%;
  padding: 10px 5px;
  font-size: 18px;
  color: #333;
  font-family: sans-serif;
  outline: none;
}

label {
  font-size: 20px;
  font-weight: 700;
  color: #333;
}
</style>
