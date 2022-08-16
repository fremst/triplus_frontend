<template>
  <div class="wrap">
    <div class="header">
      <a href="/about">
        <div class="loginLink">
          로그인/회원가입
          <Sidebar v-model:visible="visibleRight" position="right">
            Content<br>
            로그인/회원가입<br>
            로그인/회원가입<br>
            로그인/회원가입<br>
            로그인/회원가입<br>
            로그인/회원가입
          </Sidebar>
          <Button icon="pi pi-bars" @click="visibleRight = true"/>
        </div>
      </a>
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
  data() {
    return {
      visibleRight: false
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
</style>