<template>
  <div class="wrapper">
    <div class="side">
      <MyPageSidebar />
    </div>

    <div class="inner">
      <Toast />
      <div class="a"><h2>비밀번호 확인</h2></div>
      <div class="b"><span>회원님의 정보를 안전하게 보호하기 위해 비밀번호를 다시 한 번 확인바랍니다.</span></div>
      <div class="c">
        <span>비밀번호 확인</span><InputText v-model="pwd" class="pwd-txt" type="password" />
        <Button type="button" label="확인" id="btn1" class="p-button-primary" @click.prevent="chkPwd" />
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
      joinparam.append("pwd", this.pwd);

      axios
        .post("http://localhost:8082/triplus/member/identifypwd", joinparam, {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        })
        .then(
          function (resp) {
            if (resp.data.result === "success") {
              this.$router.push({ name: "mypage-update" });
            } else {
              this.$toast.add({ severity: "error", summary: "", detail: "비밀번호가 일치하지 않습니다", life: 3000 });
            }
          }.bind(this)
        );
    }
  }
};
</script>

<style scoped>
.wrapper {
  display: flex;
  margin: 40px auto;
  margin-bottom: 100px;
}

.inner {
  width: 830px;
  display: inline-block;
  margin-left: 10px;
}

.side {
  width: 250px;
  display: inline-block;

  margin-left: 300px;
}
.a,
.b,
.c {
  margin-left: 100px;
  margin-bottom: 12px;
}
.b span {
  color: red;
}
.pwd-txt {
  width: 300px;
  height: 40px;
  margin: 0 5px;
}

#btn1 {
  width: 100px;
  height: 40px;
}
</style>
