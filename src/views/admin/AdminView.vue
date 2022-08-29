<template>
  <div class="wrapper">
    <div class="inner">
      <AdminPageSidebar/>
    </div>
  </div>
</template>

<script>
import AdminPageSidebar from "@/components/admin/AdminPageSidebar"
export default {
  components:{
    AdminPageSidebar
  }
}
</script>

<style scoped>

.wrapper{
  width: 100%;
}

.inner{
  width: 1080px;
  margin: auto;
  margin-top: 20px;
  text-align: center;
  min-height: 600px;
}

</style>