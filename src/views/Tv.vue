<template>
  <div>
    <ul class="tv-list">
      <li
        v-for="item in tvList"
        :key="item.id"
        class="tv-item"
        @click="getDetail(item.id)"
      >
        <div class="img">
          <img
            :src="'https://images.weserv.nl/?url=' + item.cover.url"
            alt=""
          />
        </div>
        <div class="content">
          <h3>{{ item.title }}</h3>
          <p>{{ item.info }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tvList: [],
      start: 0,
      isFinish: true,
    };
  },
  created() {
    this.getDate();
  },
  mounted() {
    this.listenScroll();
  },
  methods: {
    /*跨域问题 但当你网页所在地址 于 接口所在地址（协议、域名、端口号）任意一个不相同 都会引发跨域问题  解决方案： jsonp， 后端配置 CORS ，第三方服务器代理
     */
    //获取电视剧列表数据 (接口)
    getDate() {
      if (this.isFinish) {
        this.isFinish = false;
        let baseUrl = "https://bird.ioliu.cn/v2?url=";
        let tvUrl = `https://m.douban.com/rexxar/api/v2/subject_collection/tv_domestic/items?os=ios&for_mobile=1&start=${this.start}&count=10`;
        this.axios
          .get(baseUrl + tvUrl)
          .then((res) => {
            console.log(res);
            this.tvList = this.tvList.concat(res.data.subject_collection_items);
            this.isFinish = true;
          })
          .catch((err) => console.log(err));
      }
    },
    //处理数据懒加载
    listenScroll() {
      //获取html元素
      let htmlDom = document.documentElement;
      let deviceHeight = htmlDom.clientHeight; //窗口高度
      let fullHeighe = 0;
      let scrollTop = 0;
      window.onscroll = () => {
        fullHeighe = htmlDom.offsetHeight; // 页面高度
        scrollTop = htmlDom.scrollTop; //滚动条跟页面（页面会超出可视的窗口）距离
        if (fullHeighe - 20 < scrollTop + deviceHeight) {
          if (this.isFinish) {
            this.start += 10;
          }
          if (this.start < 50) {
            this.getDate();
          }
          console.log("滚动到底啦！！");
        }
      };
    },
    //跳转电视剧详情
    getDetail(id) {
      this.$router.push("/tvdetails/" + id);
    },
  },
};
</script>

<style lang="scss" scoped>
.tv-list {
  .tv-item {
    display: flex;
    padding: 0.2rem 0;
    border-bottom: 1px solid #cccccc;
    .img {
      flex: 3;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .content {
      flex: 5;
      padding: 0.8rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      h3 {
        font-weight: bolder;
        margin-bottom: 20px;
      }
    }
  }
}
</style>