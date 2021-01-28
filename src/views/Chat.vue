<template>
  <div class="chat">
    <div class="chat-list">
      <div v-for="(item,index) in chatList" :key="index">
        <div class="question">
          <span>{{item.question}}</span>
        </div>
        <div class="answer">
          <span>{{item.answer}}</span>
        </div>
      </div>
    </div>
    <div class="chat-from">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="chatText" placeholder="请输入信息...."></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="sendMessage">发送</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import md5 from "blueimp-md5";
export default {
  data() {
    return {
      chatText: "",
      chatList: [],
    };
  },
  created() {
    // this.getTimeStamp();
    // this.getNonceStr();
    // this.getSign({
    //   app_id: 2155983479,
    //   time_stamp: this.getTimeStamp(),
    //   nonce_str: this.getNonceStr(),
    //   session: "10000",
    //   question: "你叫啥",
    // });
    this.sendMessage();
  },
  methods: {
    getTimeStamp() {
      let timer = new Date();
      timer = Date.parse(timer);
      timer = timer.toString().substr(0, 10);
      timer = Number.parseInt(timer);
      return timer;
    },
    getNonceStr() {
      let str = Math.random();
      str = str.toString(16);
      str = str.substr(2);
      return str;
    },
    //接口鉴权
    getSign(obj) {
      //1、将<key, value>请求参数对按key进行字典升序排序，得到有序的参数对列表N
      let arr = Object.keys(obj);
      arr = arr.sort();
      console.log(arr);

      //2、将列表N中的参数对按URL键值对的格式拼接成字符串，得到字符串T（如：key1=value1&key2=value2），URL键值拼接过程value部分需要URL编码，URL编码算法用大写字母，例如%E8，而不是小写%e8
      let str = "";
      arr.forEach((key) => {
        str += key + "=" + encodeURI(obj[key]) + "&";
      });
      // str = encodeURI(str);
      console.log(str);

      //3、将应用密钥以app_key为键名，组成URL键值拼接到字符串T末尾，得到字符串S（如：key1=value1&key2=value2&app_key=密钥)
      str += "app_key=8CPq9nvKc2ZDSwjL";

      //4、对字符串S进行MD5运算，将得到的MD5值所有字符转换成大写，得到接口请求签名(加密)
      str = md5(str).toUpperCase();
      return str;
    },
    sendMessage() {
      let baseUrl = "https://bird.ioliu.cn/v2?url=";
      let requestUrl = "https://api.ai.qq.com/fcgi-bin/nlp/nlp_textchat";
      let params = {
        app_id: 2155983479,
        time_stamp: this.getTimeStamp(),
        nonce_str: this.getNonceStr(),
        session: "10000",
        question: this.chatText,
      };
      params.sign = this.getSign(params);
      console.log(params);
      this.axios
        .get(baseUrl + requestUrl, { params })
        .then((res) => {
          console.log(res);
          this.chatList.push({
            question: this.chatText,
            answer: res.data.data.answer,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.demo-form-inline {
  height: 0.9rem;
  line-height: 0.9rem;
}
.chat-list{
  font-size: .5rem;
  .question{
    text-align: right;
    span{
      background: rgb(250, 172, 172);
    }
  }
  .answer{
    text-align: left;
    span{
      background: rgb(109, 175, 252);
    }
  }
}
.chat-from {
  position: fixed;
  bottom: 1rem;
  background: rgb(187, 186, 186);
  width: 100%;
  text-align: center;
}
</style>