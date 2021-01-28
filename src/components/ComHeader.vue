<template>
  <header :style="{ backgroundColor: curMenu.bgColor }">
    <span @click="goHome">&lt; 首页</span>
    {{ curMenu.name }}
  </header>
</template>

<script>
import { mapState } from "vuex";
import { mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["curMenu"]),
  },
  methods: {
    ...mapMutations(["setCurMenu"]),
    goHome() {
      this.$router.push("/");
      this.setCurMenu({
        name: "剧集",
        bgColor: "#FFE153",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  position: fixed;
  top:0;
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  background: cornflowerblue;
  span {
    position: absolute;
    left: 0;
  }
}
</style>