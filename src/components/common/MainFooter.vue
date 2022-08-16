<template>
    <div class="footer">
        <img :src="require('@/assets/logo.png')" class="logo"/>
    </div>
</template>

<script>
export default {
  name: 'MainFooter'
}
</script>

<style scoped>
.logo {
  height: 100px;
  width: 120px;
}
.footer {
  height: 180px;
  background: #91D9CC;
}
a {
  text-decoration: none;
}
.loginLink {
  color: #333333;
}
</style>