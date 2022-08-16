<template>
<div class="showId">

  
  <div><h2>아이디찾기</h2>
    <div><span>고객님의 정보와 일치하는 아이디입니다</span></div>
    <div class="contents">
      
    아이디 :{{id}}  가입일: {{regDate}}
    </div>
    <Button type="button" label="로그인 하기" class="p-button-primary" @click="loginForm" />
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
  width: 900px;
  margin: 0 auto;
  margin-top: 50px;
}

.contents{
  height: 150px;
  border: 1px solid black;
  

}



</style>