<template>
  <div class="wrap">
    <div class="header">
        <div class="loginLink">

      <div class="status"  v-if="user!=null">
        {{user}} 님 환영합니다.
      </div>

      <div class="status" v-if="user===null">
         <a  href="/member/login">로그인  |  회원가입</a>
      </div>

          <Sidebar v-model:visible="visibleRight" position="right">
            <div class="user" v-if="user===null">
              <a  href="/member/login"><h2>로그인  |  회원가입</h2><br></a>

              <div class="mypage">

                <ol class="ol-first">
                  <li><h1>1</h1></li>
                  <li><h1>-</h1></li>
                  <li><h1>-</h1></li>
                </ol>

                <ol class="ol-second">
                  <li><h3>내 일정</h3></li>
                  <li><h3>&nbsp;내 글</h3></li>
                  <li><h3>&nbsp;내 예약</h3></li>
                </ol>
              </div>
            </div>

            <div class="user"  v-if="user!=null">
              <h1>{{user}} 님 환영합니다.</h1>

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
            </div>

        <div class="content">
            Content<br><br>
            <a href="/service/notices">공지사항</a><br><br>
            <a href="/service/qna/">Q & A</a><br><br>
            <a href="#" @click.prevent="logout">로그아웃</a>
        </div>
          </Sidebar>
          <div class="H-button">
          <Button icon="pi pi-bars" @click="visibleRight = true"/>
          </div>
        </div>
      <a href="/" class="logo">
        <img :src="require('@/assets/textLogo.png')"/>
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
      localStorage.removeItem("token");
      window.Kakao.API.request({
        url: '/v1/user/unlink',
        success: function (response) {
          console.log(response);

        },
        fail: function (error) {
          console.log(error);
        },
      });

      this.$store.commit('keepId',2);
    }
  }
}
</script>

<style scoped>
img {
  /* height: 180px;
  width: 200px; */
  display: inline-block;
  margin-top: 15px;
}

a {
  text-decoration: none;
}

.logo {
  margin: 0 auto;
  display: block;
  width: 100%;
  /* text-align: center; */
  text-align: left;
  padding-left: 15%;

}

.header {
  height: 65px;
  background: #ffffff;
}

.loginLink {
  display: flex;
  float: right;
  color: #333333;
  margin-top: 10px;
  margin-right: 10px;
}

.status{
  display: inline-block;
  margin: 15px;
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