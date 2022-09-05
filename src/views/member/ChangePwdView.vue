<template>
  <div class="wrapper">
    <div class="layout">
  <div class="chagePwd">
    <div class="title"><h2>비밀번호 변경</h2></div>
    <div class="ment">
      <span>비밀번호는 영문 숫자 특수문자를 혼합하여 8자이상 16자이하로 사용하세요</span>
    </div>

    <div class="tId"><span class="a">triplus 아이디 :</span> <span class="b">{{id}}</span></div>

    <div><InputText v-model="pwd1" class="pwd-txt" placeholder="새 비밀번호" type="password"/></div>
    <div><InputText v-model="pwd2" class="pwd-txt" placeholder="비밀번호 확인" type="password"/></div>

    <span class="msg">{{errMsg}}</span><br>
    <Toast/>
    <Button type="button" label="확인" id="btn1" class="p-button-primary" @click="newPwd" />
  </div>
  </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ChangePwdView.vue",
  data() {
    return {
     id:this.$route.params.id1,
      pwd1:'',
      pwd2:'',
      errMsg:''

    }
  },
  methods:{
    //
    newPwd() {

      if(this.pwd1 !== this.pwd2){
        this.errMsg='비밀번호가 일치하지 않습니다';
      }else{ // 비밀번호 확인
        let check =  /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;

        if(!check.test(this.pwd1)) {
          alert('비밀번호는 8~16자의 영문 대소문자와 숫자, 특수문자를 사용할 수 있습니다.');
          this.pwd1="";
          this.pwd2="";
          this.errMsg="";
        }else{  //비밀번호 조건 충족

          const joinparam = new URLSearchParams();
          joinparam.append('id', this.id);
          joinparam.append('pwd', this.pwd2);

          axios.post('http://localhost:8082/triplus/member/changepwd', joinparam, {
            headers: {
              'Access-Control-Allow-Origin': '*'
            }
          }).then(function (resp) {

            if(resp.data.result === 'success') {   // 새비밀번호 수정완료
              this.$toast.add({severity:'success', summary: '', detail:'비밀번호를 변경하였습니다.', life: 3000});
              let a = this;
              //1초 후에 이동
              setTimeout(function (){
                a.$router.push({name:'member-login'});
              },1000);

            }
          }.bind(this));
        }
      }
    }



}

}
</script>

<style lang="scss" scoped>
.wrapper{
  width: 1080px;
  margin: 0 auto;

  text-align: center;
}

.layout{
  width: 100%;
  margin: 30px auto;
  //margin-left: 0px;
  margin-bottom: 200px;

}
.title{
  //margin-left: 200px;
  margin-bottom: 30px;
}

.pwd-txt{
  width: 450px;
  height: 50px;
  margin-bottom: 5px;
}
#btn1{
  width: 450px;
  height: 50px;
  margin-top: 10px;
}

.ment span{
  font-weight: bold;
  color: cornflowerblue;
}

.tId{
  margin: 10px;
}
.a{
    color: #333333;
  }

.b{
  color: #222222;
  font-weight: bold;
  font-size: large;
}
.msg{
  color: red;
}
</style>
