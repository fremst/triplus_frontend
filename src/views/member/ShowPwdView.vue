<template>
  <div class="find">
    <div class="find-form">
      <div class="layout">
        <div><h2>이메일 인증</h2></div>
        <div class="ment">
          <span>회원가입 시 등록한 이메일 주소를 입력해주세요.</span>
        </div>

        <div class="find-name"><label>이름</label><InputText type="text" v-model="name" class="text1" /></div>

        <div class="find-email">
          <label>이메일 주소</label>
          <InputText type="text" v-model="email" class="text2" />
          <Button type="button" label="인증번호 받기" class="p-button-outlined" id="btn1" @click.prevent="sendMail" />
        </div>

        <div class="find-cert">
          <label>인증번호 </label>
          <InputText type="text" v-model="cert" class="text1" />
        </div>

        <Toast />

        <Button type="button" label="확인" class="p-button-primary" id="btn2" @click.prevent="changePwd" />
        {{ rnd }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ShowPwdView.vue",
  data() {
    return {
      name: "이강준",
      email: "dlrkdwnszz@gmail.com",
      id: this.$route.params.id1,
      cert: "", //인증번호 입력
      rnd: "", // 서버에서 보낸 인증번호
      errMsg: ""
    };
  },
  methods: {
    sendMail() {
      //입력한 이름과 이메일의 정보가 user테이블과 일치했을때 메일을 보내준다 / 아니면 errMsg

      const joinparam = new URLSearchParams();
      joinparam.append("name", this.name);
      joinparam.append("email", this.email);

      axios
        .post("http://localhost:8082/triplus/member/identify", joinparam, {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        })
        .then(
          function (resp) {
            if (resp.data.result === "success") {
              //이름,이메일 user테이블과 일치하면 메일(인증번호 보내기)

              this.$toast.add({ severity: "success", summary: "", detail: "인증번호를 발송했습니다.", life: 3000 });

              const joinparam = new URLSearchParams();
              joinparam.append("email", this.email);

              axios
                .post("http://localhost:8082/triplus/api/sendmail", joinparam, {
                  headers: {
                    "Access-Control-Allow-Origin": "*"
                  }
                })
                .then(
                  function (resp) {
                    this.rnd = resp.data.rnd;
                  }.bind(this)
                );
            } else {
              //일치하지 않은경우 이메일 전송X
              this.$toast.add({
                severity: "error",
                summary: "",
                detail: "입력한 정보가 올바르지 않습니다",
                life: 3000
              });
            }
          }.bind(this)
        );
    },
    changePwd() {
      if (parseInt(this.rnd) === parseInt(this.cert)) {
        this.$router.push({ name: "changePwd", params: { id1: this.id } });
      } else {
        this.$toast.add({ severity: "error", summary: "", detail: "인증번호가 일치하지 않습니다.", life: 3000 });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.find {
  width: 1080px;
  margin: 0 auto;
  margin-top: 50px;
  margin-bottom: 200px;
}

.find-form {
  margin-top: 20px;
}

.layout {
  margin-left: 230px;
  margin-top: 15px;
}
.ment {
  margin: 15px 0;
}

.ment span {
  font-weight: bold;
  color: cornflowerblue;
}

.find-layout {
  margin: 0 auto;
}

.find-name,
.find-email,
.find-cert {
  display: flex;
}

.find-name,
.find-email,
.find-id {
  margin-bottom: 15px;
}

.text1 {
  width: 450px;
  height: 50px;
}
.text2 {
  width: 300px;
  height: 50px;
}

#btn1 {
  width: 140px;
  height: 50px;
  padding: 0px;
  margin-left: 10px;
}
#btn2 {
  width: 570px;
  height: 50px;
  margin-top: 20px;
}

.find-id {
  margin: 0 auto;
}

label {
  display: inline-block;
  width: 120px;
  text-align: left;
  font-weight: bold;
  padding-top: 10px;
}

.errMsg {
  color: red;
}
</style>
