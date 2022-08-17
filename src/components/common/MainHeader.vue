<template>
  <div class="wrap">
    <div class="header">
        <div class="loginLink">

      <div class="status"  v-if="user!=null">
        {{user}} 님 환영합니다.
      </div>

      <div class="status" v-if="user===null">
         <a  href="/member/login">로그인/회원가입</a>
      </div>


          <Sidebar v-model:visible="visibleRight" position="right">
            <div class="user" v-if="user===null">
              <a  href="/member/login"><h1>로그인/회원가입</h1></a>
            </div>


            <div class="user"  v-if="user!=null">
              <h1>{{user}} 님 환영합니다.</h1>
            </div>

            <div class="mypage">

              <ol class="ol-first">
                <li><h1>{{a}}</h1></li>
                <li><h1>{{b}}</h1></li>
                <li><h1>{{c}}</h1></li>
              </ol>

              <ol class="ol-second">
                <li><h3>내 일정</h3></li>
                <li><h3>&nbsp;내 글</h3></li>
                <li><h3>&nbsp;내 예약</h3></li>
              </ol>
            </div>

        <div class="content">
            Content<br><br>
            <a href="/service/notice/list">공지사항</a><br><br>
            <a href="/service/qna/">Q & A</a><br><br>
            <a href="#" @click.prevent="logout">로그아웃</a>
        </div>



          </Sidebar>
          <Button icon="pi pi-bars" @click="visibleRight = true"/>
        </div>
      <a href="/" class="logo">
        <img :src="require('@/assets/logo.png')"/>
      </a>
    </div>
  </div>
</template>

<script>
import Sidebar from 'primevue/sidebar';


export default {
  name: 'MainHeader',
  components: {
    Sidebar
  },
  mounted() {

  }
,
  computed:{
    user(){
      return this.$store.state.userId;
    }

  },
  data() {
    return {
      visibleRight: false,
      a:0,
      b:0,
      c:0
    }

  },
  methods:{
    logout(){
      localStorage.removeItem("id");
      this.$store.commit('keepId',2);
    }
  }
}
</script>

<style scoped>
img {
  height: 180px;
  width: 200px;
  display: inline-block;
}

a {
  text-decoration: none;
}

.logo {
  margin: 0 auto;
  display: block;
  width: 100%;
  text-align: center;

}

.header {
  height: 220px;
  background: #91D9CC;
}

.loginLink {
  text-align: right;
  color: #333333;
}

.status{
  display: inline-block;
  margin-right: 20px;
}

.user{
  margin-bottom: 10px;
  text-align: center;
}

.mypage{
  width: 100%;
  margin-bottom: 50px;

}
.mypage ol li{
  width: 33%;
  display: inline-block;
}

.ol-first, .ol-second{
  text-align: center;
}

.content{
  border-top: 0.5px solid  #CCC;;
  padding-top: 10px;
}



</style>