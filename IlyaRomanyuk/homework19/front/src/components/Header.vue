<template>
  <header class="header">
    <p class="title">Todo List</p>
  </header>
</template>

<script>
export default {
  name: "Header",
  components: {}
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
</style>
