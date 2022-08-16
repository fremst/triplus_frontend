<template>
  <div class="find">
    <div class="find-form">
      <div><h5>본인확인 이메일 주소와 입력한 이메일 주소가 같아야, 인증번호를 받을 수 있습니다</h5></div>
      <div class="find-name"><label>이름</label><input v-model="name" type="text"></div>
      <div class="find-email"><label>이메일 주소</label><input v-model="email" type="text">
        <input type="button" value="인증번호 받기" @click.prevent="sendMail"></div>
      <div class="find-cert"><label></label><input v-model="cert" placeholder="인증번호 6자리 숫자 입력" type="text"><span class="errMsg">{{errMsg}}</span></div>

      <Button type="submit" label="다음" class="p-button-primary" @click.prevent="changePwd" />
      {{rnd}}

    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "ShowPwdView.vue",
    data() {
      return {
        name: "이강준",
        email: "dlrkdwnszz@gmail.com",
        id:this.$route.params.id1,
        cert:"", //인증번호 입력
        rnd: "", // 서버에서 보낸 인증번호
        errMsg:""

      }
    },
    methods: {
      sendMail() {
        //입력한 이름과 이메일의 정보가 user테이블과 일치했을때 메일을 보내준다 / 아니면 errMsg

        const joinparam = new URLSearchParams();
        joinparam.append('name', this.name);
        joinparam.append('email', this.email);

        axios.post('http://localhost:8082/triplus/member/identify', joinparam, {
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        }).then(function (resp) {

          if (resp.data.result == 'success') {   //이름,이메일 user테이블과 일치하면 메일(인증번호 보내기)
            alert('인증번호가 발송되었습니다.');
            this.errMsg = "";
            const joinparam = new URLSearchParams();
            joinparam.append('email', this.email);

            axios.post('http://localhost:8082/triplus/api/sendmail', joinparam, {
              headers: {
                'Access-Control-Allow-Origin': '*'
              }
            }).then(function (resp) {
              this.rnd = resp.data.rnd;
            }.bind(this));

          } else { //일치하지 않은경우 이메일 전송X
            this.errMsg = '입력한 정보가 올바르지 않습니다.'
          }
        }.bind(this));

      },
      changePwd(){

        if(parseInt(this.rnd)==parseInt(this.cert)){
          this.$router.push({name:'changePwd',params:{'id1':this.id}})

        }else{
          this.errMsg = "인증번호가 일치하지 않습니다";
        }
      }

    }
  }
</script>

<style lang="scss" scoped>

.find{
 width: 900px;
 margin: 0 auto;
margin-top: 50px;
 }

.find-form{
  margin-top: 20px;
}

.find-layout{
  margin: 0 auto;
}

.find-name , .find-email, .find-cert {
  display: flex;
}

.find-name, .find-email, .find-id{
  margin-bottom: 5px;
}

.find-id{
  margin: 0 auto;
}

.find-id input[type='text']{
  width: 350px;
  height: 37px;
  padding: 3px;
}

input[type='text']{
  width: 250px;
  height: 30px;
  border-radius: 5px;
}

input[type='button']{
  margin-left: 5px;
  font-weight: bold;
  border-radius: 5px;
}

label{
  display: inline-block;
  width: 120px;
  text-align: left;
  font-weight: bold;
}

.errMsg{
  color: red;
}

button{
  margin-top: 20px;;
}

</style>