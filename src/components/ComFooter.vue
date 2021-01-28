<template>
  <footer :style="{ backgroundColor: curMenu.bgColor }">
    <div
      v-for="menu in menuList"
      :key="menu.path"
      @click="switchMenu(menu)"
    >
      <router-link :to="menu.path">{{ menu.name }}</router-link>
    </div>
  </footer>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["curMenu"]),
  },
  created () {
    this.menuList.forEach((value)=>{
      if(value.path == this.$route.path){
        this.setCurMenu(value);
      }
    })
  },
  data() {
    return {
      menuList: [
        { path: "/", name: "剧集", bgColor: "#FFE153" },
        { path: "/music", name: "音乐", bgColor: "#bee2e7" },
        { path: "/book", name: "书籍", bgColor: "#9F88FF" },
        { path: "/chat", name: "聊天", bgColor: "#FFA488" },
      ],
    };
  },
  methods: {
    ...mapMutations(["setCurMenu"]),
    switchMenu(menu) {
      this.setCurMenu(menu);
    },
  },
};
</script>

<style lang="scss" scoped>
footer {
  width: 100%;
  position: fixed;
  bottom: -0.02rem;
  display: flex;
  justify-content: space-around;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  background: cornflowerblue;
}
</style>