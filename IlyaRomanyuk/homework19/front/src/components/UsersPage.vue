<template>
  <div class="users">
    <ul v-if="GET_AUTH" class="tasks-list">
      <User
        v-on:deleteTask="deleteTask"
        v-on:changeCompliting="changeCompliting"
        v-bind:key="i"
        v-bind:user="user"
        v-for="(user, i) in GET_USERS"
      />
    </ul>
    <Form v-if="GET_AUTH" v-on:createNewTask="createNewTask" />
    <p v-else>Для просмотра списка задач зарегистрируйтесь, затем авторизуйтесь</p>
  </div>
</template>

<script>
import User from "@/components/UsersItem.vue";
import Form from "@/components/Form.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Users",
  components: { User, Form },

  data() {
    return {
      isFetching: false
    };
  },

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
    ...mapGetters(["GET_USERS", "GET_AUTH"])
  },

  mounted() {
    this.getTasks();
  }
};
</script>

<style scoped>
.users {
  margin: 0 auto;
  max-width: 650px;
  width: 100%;
}

.tasks-list {
  padding: 0;
  list-style: none;
  width: 100%;
}
</style>
