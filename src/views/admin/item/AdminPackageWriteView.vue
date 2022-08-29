<template>
  <div class="wrap">
    <AdminPageSidebar/>
    <div class="inner">
      <div>
        <AdminPackageWrite/>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AdminPageSidebar from "@/components/admin/AdminPageSidebar";
import AdminPackageWrite from "@/components/admin/item/PackageWrite.vue";

export default {

  components: { 

    AdminPageSidebar, 
    AdminPackageWrite

  },

  mounted() {

    this.getList();

  },
  methods: {

    getList() {

      axios
          .get("http://localhost:8082/triplus/api/section/packages/", this.data, {

            headers: {

              "Access-Control-Allow-Origin": "*"

            },

          })
          .then(res => {

            this.products = res.data;

          })
          .catch(err => {

            console.log(err.response);

          });
    },

  }

};
</script>

<style lang="scss" scoped>

tr {
  align-content: center;
  justify-content: center;
}

.wrap {
  width: 100%;
}

.inner {
  width: 1080px;
  margin: 0 auto;
}

</style>
