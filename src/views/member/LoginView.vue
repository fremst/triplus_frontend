<template>
  <div class="login">
    <div class="inner">
      <div class="layout">
    <div class="login-title"><h2>로그인</h2></div>

    <form>
      <div class="login-form">
        <InputText type="text" v-model="id"  class="login-id" placeholder="아이디를 입력하세요"/><br>
        <InputText type="password" v-model="pwd"  class="login-pwd" placeholder="비밀번호"/><br>
        <div class="login-chkbox"><Checkbox v-model="keep" :binary="true" /><span>로그인 유지하기</span></div>

      </div>

      <div class="errMsg">{{errMsg}}</div><br>
      <div><Button type="submit" label="로그인" class="p-button-primary" @click.prevent="login" /></div>


    </form>

    <div class="login_insert">아직 회원이 아닙니까?  <a href="#" @click.prevent="goJoin">회원 가입하기</a></div>
    <div class="login_findpwd">아이디 또는 비밀번호를 잊었습니까? <a href="#" @click.prevent="goFind">아이디 비밀번호 찾기</a></div>

    <div class="login_sns">
      <span>sns 로그인 자리</span>
    </div>
    </div>
    </div>

    <!-- Ex) {{$store.state.loginUser.id}} -->

  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: "LoginView",
  data(){
    return{
      id:"",
      pwd:"",
      auth:"",
      name:"",
      tel:"",
      gender:"",
      addr:"",
      email:"",
      bdate:"",
      regdate:"",
      active:"",
      keep:false,

      errMsg:"",
    }
  },
  methods:{
    goJoin(){
    this.$router.push({'path':'/memberjoin/tos'});
    },
    goFind(){
      this.$router.push({'path':'/member/find'});
    },

    login(){
      const joinparam = new URLSearchParams();
      joinparam.append('id',this.id);
      joinparam.append('pwd',this.pwd);

      axios.post('http://localhost:8082/triplus/api/member/login',joinparam,{
        headers:{
          'Access-Control-Allow-Origin': '*'
        }
      }).then(function(resp){
        if(resp.data.result==='success'){
          this.auth = resp.data.dto.auth;
          this.name = resp.data.dto.name;
          this.tel = resp.data.dto.tel;
          this.gender = resp.data.dto.gender;
          this.addr = resp.data.dto.addr;
          this.email = resp.data.dto.email;
          this.bdate = resp.data.dto.bdate;
          this.regdate = resp.data.dto.regdate;
          this.active = resp.data.dto.active;

          this.$store.dispatch('loginInfo',{id:this.id,pwd:this.pwd,auth:this.auth,name:this.name,
            tel:this.tel,gender:this.gender,addr:this.addr,email:this.email,
            bdate:this.bdate,regdate:this.regdate,active:this.active});
          localStorage.setItem('id',this.id); //아이디 localstorage
          this.$store.commit('keepId',1);

          this.$router.push({name:'main'})

        }else{
          this.errMsg = '아이디 또는 비밀번호를 잘못 입력했습니다';
        }
      }.bind(this));
    }
  }

}
</script>

<style scoped>

.login-title{

}
.inner{
  width:1080px;
  margin:40px auto;
}
.layout{
  text-align: center;

}
.login-title{
  margin-bottom: 40px;
}


.login_sns{
  height: 400px;
}
.login_sns span{
  color: red;
}

.login-chkbox{
  text-align: left;
  padding-left: 370px;
}


.login-id, .login-pwd{
  width: 350px;
  height: 40px;

}
.login-id{
  margin-bottom: 5px;
}

.login-chkbox{
  margin-top: 5px;
  margin-bottom: 5px;
}
.login-chkbox span{

  margin-left: 5px;
}

.errMsg{
  color: red;
}

.p-button-primary{
  width: 350px;
  height: 40px;

  margin-bottom: 20px;
}
.login_insert{
  margin-bottom: 7px;
}


a{
  font-weight: bold;
  color: black;
  text-decoration: none;
}

</style>