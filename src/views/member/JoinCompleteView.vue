<template>
<div class="wrapper">
  <div class="inner">

    <div class="step">
      <ol class="step_list">
        <li><span>약관동의</span></li>
        <li ><span>회원정보입력</span></li>
        <li class="on"><span>가입완료</span></li>
      </ol>
    </div>


    <div class="title" >
      <i class="pi pi-check-circle" style="font-size: 7rem;color:#009688; "></i>
      <h1>Triplus 회원가입이 완료 되었습니다</h1>
    </div>

    <div class="btn">
      <Button type="button" label="홈으로" id="a" class="p-button-primary" @click.prevent="goHome" />
      <Button type="button" label="로그인페이지로 이동" class="p-button-outlined" @click.prevent="goLogin" />
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "JoinCompleteView.vue",
  methods:{
    goHome(){
      this.$router.push({'path':'/'});
    },

    goLogin(){
      this.$router.push({'path':'/member/login'});
    }
  }
}
</script>

<style scoped>
.inner{
  width: 1080px;
  height : 600px;
  margin: 50px auto;
}

.step_list {
  display: inline-block;
  width: 100%;

}

.step_list li {
  float: left;
  width: 33%;
  list-style: none;
  font-weight: 500;
}


.step_list li.on span {
  background: #009688;
  color: #fff;
  font-weight: 600;

}

.step_list li span {
  position: relative;
  display: block;
  height: 40px;
  padding: 0 20px 0 0;
  line-height: 38px;
  text-align: center;
  background: #d5d4d4;
  color: #555;

}

.pi pi-check-circle{
  font-size: 5rem;
}

.title{
  text-align: center;
  height: 500px;

}

.title{
  position: relative;
  top:12%;
}

.title h1{
  position: relative;
  top: 14%;
}

.btn{
  width: 100%;
  text-align: center;

}
.btn button{
  width:333px;
  height :50px;
}

.btn #a{
  margin-right: 20px;
}

</style>