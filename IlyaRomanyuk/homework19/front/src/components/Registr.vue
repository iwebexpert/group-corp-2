<template>
  <div class="form-registr">
    <h2>Регистрация</h2>
    <form action class="form">
      <div class="input">
        <label for="email">Em@il:</label>
        <input v-model="email" class="form-input" type="text" placeholder="email" name="email" />
      </div>

      <div class="input">
        <label for="name">Name:</label>
        <input v-model="name" class="form-input" type="text" placeholder="name" name="name" />
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

      <input v-on:click.prevent="register" type="submit" value="Регистрация" />
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Swal from "sweetalert2";
export default {
  name: "Registr",
  components: {},

  data() {
    return {
      email: "",
      name: "",
      password: ""
    };
  },

  methods: {
    ...mapActions(["registerUser"]),

    async register() {
      if (!this.email.trim() || !this.password.trim()) {
        Swal.fire("Error ?", "Enter email and password", "question");
        return;
      }

      let newInfo = {
        email: this.email,
        name: this.name,
        password: this.password
      };

      let result = await this.registerUser(newInfo);

      if (result.ok) {
        this.password = "";
        this.email = "";
        this.name = "";
        Swal.fire("Вы зарегистрированы");
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
