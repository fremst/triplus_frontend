<template>
  <div class="wrapper">
    <div class="inner">
      <div class="side">
        <MyPageSidebar />
      </div>
      <div class="content">
        <div><h4>비밀번호 확인</h4></div>
        <div><p>회원님의 정보를 안전하게 보호하기 위해 비밀번호를 다시 한 번 확인바랍니다.</p></div>
        <div>
          <span>비밀번호 확인</span><InputText v-model="pwd" class="pwd-txt" type="password" />
          <Button type="button" label="확인" class="p-button-primary" @click.prevent="chkPwd" />
          {{ pwd }} {{ realPwd }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyPageSidebar from "@/components/member/mypage/MyPageSidebar";
import axios from "axios";
export default {
  name: "MyPageView",
  components: { MyPageSidebar },
  data() {
    return {
      id: localStorage.getItem("id"),
      pwd: "", //입력한 pwd
      realPwd: "" //진짜 pwd
    };
  },

  methods: {
    chkPwd() {
      const joinparam = new URLSearchParams();
      joinparam.append("id", this.id);

      axios
        .post("http://localhost:8082/triplus/member/identifypwd", joinparam, {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        })
        .then(
          function (resp) {
            if (resp.data.result === "success") {
              this.realPwd = resp.data.pwd;
              if (this.pwd === this.realPwd) {
                this.$router.push({ name: "mypage-update" });
              } else {
                alert("비밀번호가 일치하지 않습니다");
              }
            }
          }.bind(this)
        );
    }
  }
};
</script>

<style scoped>
.inner {
  width: 1080px;
  margin: 0 auto;
}
.side {
  width: 300px;
  border: 1px;
  display: inline-block;
}
.content {
  width: 780px;
  border: 1px;
  display: inline-block;
  float: right;
}
</style>
