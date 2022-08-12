<template>
    <div class="header">
        <a href="/about">
            <div class="loginLink">
            로그인/회원가입
            <Sidebar v-model:visible="visibleRight">
	        Content
            </Sidebar>
            <Button icon="pi pi-arrow-left" @click="visibleRight = true" />
            </div>
        </a>
        <a href="/">
            <img :src="require('@/assets/logo.png')" class="logo"/>
        </a>
    </div>
</template>

<script>
import Sidebar from 'primevue/sidebar';
export default {
  name: 'MainHeader',
  components :{
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
.logo {
  height: 180px;
  width: 200px;
}
.header {
  height: 210px;
  background: #91D9CC;
}
a {
    text-decoration: none;
}
.loginLink {
  text-align: right;
  color: #333333;
}
</style>