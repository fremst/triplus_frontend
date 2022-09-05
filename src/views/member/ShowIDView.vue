<template>
<div class="showId">
<div class="inner">
  <div class="title"><h2>아이디찾기</h2></div>

  <div class="ment"><span>고객님의 정보와 일치하는 아이디입니다</span></div>

  <div class="contents">
    <div class="s1"><span>아이디 :</span><span>{{id}}</span></div>
    <div class="s2"><span>가입일 :</span><span>{{regDate}}</span></div>
   </div>

    <div class="btn">
      <Button type="button" id="btn1" label="로그인 하기" class="p-button-primary" @click="loginForm" />
    </div>
  </div>

</div>
</template>

<script>
import axios from 'axios'

export default {
  name: "ShowIDView",
  
  data() {
    return {
      id:"",
      regDate:"",
      name1:this.$route.params.name1

    }
  },
  mounted(){
    
      const joinparam = new URLSearchParams();
      joinparam.append('name',this.name1);

      //identifyController에 작성함
      axios.post('http://localhost:8082/triplus/member/showId',joinparam,{
        headers:{
          'Access-Control-Allow-Origin': '*'
        }
      }).then(function(resp){
        if(resp.data.result=='success'){
            this.id=resp.data.dto.id;
            this.regDate = resp.data.dto.regDate;
        }
      }.bind(this));
    
  },

  methods:{
    loginForm(){
      this.$router.push({ path: '/member/login' })
    }
  }

}
</script>

<style lang="scss" scoped>

.showId{
  width: 1080px;
  margin: 0 auto;
  margin-top: 50px;
  margin-bottom: 200px;
}

.title{
  text-align: center;
  margin-bottom: 15px;
}
.ment span{
  font-weight: bold;
  color: cornflowerblue;
  font-size: 22px;
  text-align: center;
  display: inline-block;
  width: 100%;
}

.contents{
  width: 500px;
  height: 200px;
  border: 0.5px solid #333333;;
  margin: 30px auto;
  position: relative;
  border-radius: 7px;
  background-color: #ffffff;

}

.s1, .s2{
  position: relative;
  left: 25px;
  top: 30px;
}

.s1 span, .s2 span{
  font-weight: bold;
}

.btn{
  width: 500px;
  margin: 0 auto;
}

#btn1{
  width: 500px;
  height: 50px;
}

</style>