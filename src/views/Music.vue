<template>
  <div id="app">
    <aplayer :audio="audio" :lrcType="0" />
    <ul>
      <li
        v-for="(item, index) in playList"
        :key="item.id"
        @click="getSong(item.id)"
      >
        <span>{{ index + 1 }}</span>
        <span class="title">{{ item.name }}</span>
        <span>{{ item.ar[0].name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from "vue";
import APlayer from "@moefe/vue-aplayer";

Vue.use(APlayer, {
  defaultCover: "https://github.com/u3u.png",
  productionTip: true,
});
export default {
  created() {
    this.getData();
  },
  data() {
    return {
      audio: {
        name: "",
        artist: "",
        url: "",
        cover: "", // prettier-ignore
      },
      playList: [],
    };
  },
  methods: {
    getData() {
      let musicUrl = "https://bird.ioliu.cn/netease/playlist?id=5462180032";
      this.axios
        .get(musicUrl)
        .then((res) => {
          console.log(res);
          this.playList = res.data.playlist.tracks;
          this.getSong(this.playList[0].id);
        })
        .catch((err) => console.log(err));
    },
    getSong(id) {
      let songUrl = "https://bird.ioliu.cn/netease/song?id=" + id;
      this.axios
        .get(songUrl)
        .then((res) => {
          console.log(res);
          this.audio = {
            url: res.data.data.mp3.url,
            name:res.data.data.name,
            artist:res.data.data.ar[0].name,
            cover:res.data.data.al.picUrl,
          };
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss" scoped>
#app{
    padding-top: 1rem;
    width: 100%;
}
li {
  display: flex;
  span {
    flex: 1;
  }
  .title {
    flex: 2;
  }
}
</style>