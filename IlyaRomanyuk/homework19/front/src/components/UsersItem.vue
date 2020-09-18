<template>
  <li class="user">
    <p v-bind:class="{done: user.completed}">{{user.title}}</p>

    <div class="buttons">
      <button v-on:click="changeCompliting" class="btn btn-update">Выполнено</button>
      <button v-on:click="deleteTask" class="btn btn-clear">Удалить</button>
    </div>
  </li>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "UsersItem",
  components: {},

  props: {
    user: {
      type: Object,
      required: true
    }
  },

  methods: {
    changeCompliting() {
      this.$emit("changeCompliting", this.user._id);
    },

    deleteTask() {
      this.$emit("deleteTask", this.user._id);
    }
  }
};
</script>

<style>
.user {
  padding: 5px;
  border: 1px solid #333;
  margin-bottom: 10px;
  width: 100%;
  box-sizing: border-box;

  display: flex;
  justify-content: space-between;
}

.btn {
  border: none;
  background-color: none;

  padding: 7px 16px;
  border-radius: 5px;
  color: #fff;
  border: 1px solid #333;

  margin-left: 20px;

  cursor: pointer;
}

.btn-clear {
  background-color: rgb(211, 8, 8);
}

.btn-update {
  background-color: rgb(7, 87, 7);
}

.done {
  text-decoration: line-through;
}
</style>
