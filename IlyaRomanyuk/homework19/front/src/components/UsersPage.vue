<template>
  <div class="users">
    <ul class="tasks-list">
      <User
        v-on:deleteTask="deleteTask"
        v-on:changeCompliting="changeCompliting"
        v-bind:key="i"
        v-bind:user="user"
        v-for="(user, i) in users"
      />
    </ul>
  </div>
</template>

<script>
import User from "@/components/UsersItem.vue";
export default {
  name: "Users",
  components: { User },

  props: {
    users: {
      type: Array,
      required: true
    }
  },

  methods: {
    changeCompliting(id) {
      this.$emit("changeCompliting", id);
    },

    deleteTask(id) {
      this.$emit("deleteTask", id);
    }
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
