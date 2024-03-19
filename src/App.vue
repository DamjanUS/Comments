<template>
  <div id="app">
    <List v-if="true" />
    <br />
    <hr />
    <br />
    <Create v-if="true" />
  </div>
</template>

<script>
import List from "./components/List.vue";
import Create from "./components/Create.vue";

export default {
  name: "App",
  components: {
    List,
    Create,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
