<template>
  <MainHeader />
  <MainTab />
  <div class="content">
    <router-view />
  </div>
  <MainFooter />
</template>

<script>
import MainHeader from "@/components/common/MainHeader.vue";
import MainTab from "@/components/common/MainTab.vue";
import MainFooter from "@/components/common/MainFooter.vue";
export default {
  name: "App",
  components: {
    MainHeader,
    MainTab,
    MainFooter
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

* {
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
  color: #333333;
}

.content {
  min-height: 100px;
}
</style>
