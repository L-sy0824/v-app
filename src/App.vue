<template>
  <div id="app">
    <ComHeader></ComHeader>
    <router-view />
    <ComFooter></ComFooter>
  </div>
</template>

<script>
import ComHeader from "./components/ComHeader";
import ComFooter from "./components/ComFooter";

export default {
  components: {
    ComHeader,
    ComFooter,
  },
};
</script>

<style lang="scss">
#container{
  margin-bottom: 1rem;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color:#000000;
}

a {
  font-weight: bold;
  color: #ffffff;

  &.router-link-exact-active {
    color: #f76f00;
  }
}
</style>
