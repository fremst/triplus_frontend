<template>
<MainHeader />
<MainTab/>
  <div class="content">
  <router-view />
  </div>
<MainFooter />
</template>

<script>
import MainHeader from '@/components/common/MainHeader.vue'
import MainTab from '@/components/common/MainTab.vue'
import MainFooter from '@/components/common/MainFooter.vue'
export default ({
  name: 'App',
  components: {
    MainHeader,
    MainTab,
    MainFooter
  }
})
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.content {
  min-height: 750px;
}
nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
