<template>
  <div
    id="book"
    v-loading.fullscreen="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.5)"
  >
    <div class="carousel">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in carList" :key="item">
          <img :src="item" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="tab">
      <el-tabs v-model="activeName" @tab-click="handleClick" :stretch="true">
        <el-tab-pane label="虚构类" name="fiction">
          <div class="book-list">
            <el-row v-for="item in bookList" :key="item.id">
              <el-col :span="8">
                <div>
                  <img :src="'https://images.weserv.nl/?url=' + item.cover.url" alt="" />
                </div>
              </el-col>
              <el-col :span="16">
                <div class="content">
                  <h3>{{ item.title }}</h3>
                  <p>{{ item.info }}</p>
                  <div class="rate">
                    <el-rate
                      :value="getRate(item.rating.value)"
                      disabled
                      show-score
                      text-color="#ff9900"
                      score-template="{value}"
                    >
                    </el-rate>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <el-tab-pane label="非虚构类" name="nonfiction">
          <div class="book-list">
            <el-row v-for="item in bookList" :key="item.id">
              <el-col :span="8">
                <div>
                  <img :src="'https://images.weserv.nl/?url=' + item.cover.url" alt="" />
                </div>
              </el-col>
              <el-col :span="16">
                <div class="content">
                  <h3>{{ item.title }}</h3>
                  <p>{{ item.info }}</p>
                  <div class="rate">
                    <el-rate
                      :value="getRate(item.rating.value)"
                      disabled
                      show-score
                      text-color="#ff9900"
                      score-template="{value}"
                    >
                    </el-rate>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      carList: [],
      activeName: "fiction",
      bookList: [],
      loading: false,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.loading = true;
      let baseUrl = "https://bird.ioliu.cn/v2?url=";
      let bookUrl = `https://m.douban.com/rexxar/api/v2/subject_collection/book_${this.activeName}/items?os=ios&start=0&count=8`;
      this.axios
        .get(baseUrl + bookUrl)
        .then((res) => {
          console.log(res);
          this.carList = res.data.subject_collection_items.map((item) => {
            return item.cover.url;
          });
          this.bookList = res.data.subject_collection_items;
          console.log(this.carList);
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleClick() {
      this.getData();
      // console.log(tab, event);
    },
    getRate(num) {
      let val = num / 2;
      // val = Math.round(val);
      // return val;
      val = val * 10;
      val = Math.trunc(val);
      val = val / 10;
      return val;
    },
  },
};
</script>

<style lang="scss" scoped>
.carousel {
  padding-top: 1rem;
  img {
    width: 100%;
  }
}
.tab {
  padding: 0.2rem;
  .book-list {
    img {
      width: 100%;
    }
    .content {
      padding: 0.2rem;
      h3 {
        font-weight: bolder;
        margin-bottom: 0.4rem;
      }
    }
  }
}
</style>