<template>
  <div class="chagePwd">
    <div><h5>비밀번호를 변경해 주세요</h5></div>
    <div><h5>triplus 아이디 : {{id}}</h5></div>
    <!--  비밀번호: 영어+숫자+특수문자 (8~20자) -->
    <input type="password" v-model="pwd1" placeholder="새 비밀번호" ><br>
    <input type="password" v-model="pwd2" placeholder="새 비밀번호 확인"><br>
    <span>{{errMsg}}</span>
    <ul>
      <li>영문, 숫자, 특수문자를 함께 사용하면(8자 이상 16자 이하)보다 안전합니다.</li>
    </ul>

    <Button type="button" label="확인" class="p-button-primary" @click="newPwd" />
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

      if(this.pwd1 != this.pwd2){
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

            if(resp.data.result == 'success') {   // 새비밀번호 수정완료
              alert('비밀번호를 변경하였습니다.');
              this.$router.push({name:'login'});
            }
          }.bind(this));
        }
      }
    }

}

}
</script>