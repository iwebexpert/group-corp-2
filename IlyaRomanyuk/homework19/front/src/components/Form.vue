<template>
  <form action class="form">
    <input v-model="inputData" type="text" placeholder="введите сообщение" class="task-input" />
    <button v-on:click.prevent="createNewTask" type="submit" class="btn btn-update">Добавить</button>
  </form>
</template>

<script>
export default {
  name: "Header",
  components: {},

  data() {
    return {
      inputData: ""
    };
  },

  methods: {
    createNewTask() {
      if (this.inputData.trim()) {
        this.$emit("createNewTask", this.inputData);
      }
      this.inputData = "";
    }
  }
};
</script>

<style scoped>
.task-input {
  border: none;
  border-bottom: 1px solid #333;
  outline: none;

  padding: 10px;
  font-size: 24px;
  color: #333;
  font-family: sans-serif;
}

.form {
  max-width: 650px;
  width: 100%;

  display: flex;
  flex-direction: column;

  margin: 70px auto 0;
}

button {
  margin: 20px 0 0 0;
}
</style>
