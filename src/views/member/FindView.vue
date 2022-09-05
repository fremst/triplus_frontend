<template>

<div class="find">
  <div class="find-title"><h2>아이디/비밀번호 찾기</h2></div><br>

<div class="layout">
<TabView v-model:activeIndex="activeIndex" >
	<TabPanel header="아이디 찾기" class="panel">
    <div class="ment">
      <span>회원가입 시 등록한 이메일 주소를 입력해주세요.</span>
    </div>
    <div class="find-form">
      
      <div class="find-name">
        <label>이름</label><InputText type="text" v-model="name"  class="text1"/>
      </div>

      <div class="find-email"><label>이메일 주소</label>
        <InputText type="text" v-model="email"  class="text2"/>
        <Button type="button" label="인증번호 받기" class="p-button-outlined" id="btn1" @click.prevent="sendMail" />
      </div>

      <div class="find-cert"><label>인증번호 </label>
        <InputText type="text" v-model="cert"  class="text1"/>
      </div>

        <Toast/>

      <Button type="button" label="확인" class="p-button-primary" id="btn2" @click.prevent="showId" />
     {{rnd}}

      
    </div>
	</TabPanel>

	<TabPanel header="비밀번호 찾기">
    <div class="ment">
      <span>ID를 입력해주세요</span>
    </div>
		 <div class="find-form2">
       <div style="margin-bottom: 15px">
       <label>ID</label><InputText type="text" v-model="id"  class="text1"/>
       </div>


      <Button type="submit" label="다음" class="p-button-primary" id="btn2" @click.prevent="showPwd" />

      
    </div>
	</TabPanel>
	
</TabView>
  </div>
</div>

</template>

<script>
import axios from 'axios';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';



export default {
  name: 'FindView',
  components:{
    TabView,
    TabPanel
  },
  data() {
    return {
      name: "",
      email: "",
      id:"",
      cert:"", //인증번호 입력
      rnd: "", // 서버에서 보낸 인증번호
      errMsg:"",

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
          'Access-Control-Allow-Origin': '*',
          'token':this.$store.state.token  // 로그인이 필요한 경우 header에 token을 담는다
        }
      }).then(function (resp) {

          if(resp.data.result==='success'){   //이름,이메일 user테이블과 일치하면 메일(인증번호 보내기)
            this.$toast.add({severity:'success', summary: '', detail:'인증번호를 발송했습니다.', life: 3000});
            this.errMsg="";
            const joinparam = new URLSearchParams();
           joinparam.append('email', this.email);
            
        axios.post('http://localhost:8082/triplus/api/sendmail', joinparam, {
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        }).then(function (resp) {
          this.rnd = resp.data.rnd;
        }.bind(this));

        }else{ //일치하지 않은경우 이메일 전송X 
         this.$toast.add({severity:'error', summary: '', detail:'입력한 정보가 올바르지 않습니다', life: 3000});
        }
      }.bind(this));
     
    },

  showId(){

    if(parseInt(this.rnd)===parseInt(this.cert)){
      this.$router.push({name:'showId',params:{'name1':this.name}})

    }else{

      this.$toast.add({severity:'error', summary: '', detail:'인증번호가 일치하지 않습니다', life: 3000});
    }
  },

    //아이디 존재 여부 -> 있으면 인증페이지(showPwd) -> chagePwd(새비밀번호)
    showPwd(){
      const joinparam = new URLSearchParams();
      joinparam.append('id', this.id);

      axios.post('http://localhost:8082/triplus/member/identifyid', joinparam, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }).then(function (resp) {
        if(resp.data.result==='success'){
          this.$router.push({name:'showPwd',params:{'id1':this.id}})
        }else{
          this.$toast.add({severity:'error', summary: '', detail:'아이디가 존재하지 않습니다.', life: 3000});
        }

      }.bind(this));



    }

  }


}
</script>

<style lang="scss" scoped>
.find{
  width: 1080px;
  margin: 0 auto;
  margin-top: 50px;
  margin-bottom: 80px;

}
.find-title{
  text-align: center;
}

.ment span{
  font-weight: bold;
  color: cornflowerblue;
}

.find-form{
  margin-top: 20px;
}
.find-form2{
  margin-top: 20px;
  margin-bottom: 100px;
}


.layout{
  margin-left: 230px;
  margin-bottom: 150px;
}



.p-tabview-nav-container{
margin: 0 auto;

}


.tabview-custom {
    i, span {
        vertical-align: middle;

    }

    span {
        margin: 0 .5rem;
    }
}

.p-tabview p {
    line-height: 1.5;
    margin: 0;

}

.p-tabview-nav {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin: 0;
  padding: 0;
  list-style-type: none;
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  text-align: center;
}




.find-name , .find-email, .find-cert {
  display: flex;
  margin-bottom: 13px;
}

.text1{
  width: 450px;
  height: 50px;
}
.text2{
  width: 300px;
  height: 50px;
}

#btn1{
 width: 140px;
  height: 50px;
  padding: 0px;
  margin-left: 10px;
}
#btn2{
  width: 570px;
  height: 50px;

 }

.find-name, .find-email, .find-id{
  margin-bottom: 5px;
}
.find-id{
  margin: 0 auto;
}


label{
  display: inline-block;
  width: 120px;
  text-align: left;
  font-weight: bold;
  padding-top: 10px;
}

.errMsg{
  color: red;
}



</style>