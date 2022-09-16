<template>
  <div class="wrap">
    <div class="sidebar">
      <AdminPageSidebar />
    </div>
    <div class="inner">
      <div class="title">
        <h2 style="color: #009688">Q&A</h2>
      </div>
      <hr />
      <QnACounsel :listLink="listLink" :URL="URL" />
    </div>
  </div>
</template>

<script>
import AdminPageSidebar from "@/components/admin/AdminPageSidebar";
import QnACounsel from "@/components/admin/service/QnACounsel.vue";

export default {
  name: "AdminQnACounselView",
  components: {
    AdminPageSidebar,
    QnACounsel
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
tr {
  align-content: center;
  justify-content: center;
}

.wrap {
  width: 100%;
  min-height: 750px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.inner {
  width: 1080px;
}

.sidebar {
  margin-left: -220px;
  margin-right: 20px;
}

.title {
  margin-bottom: 10px;
}

hr {
  border: 0;
  height: 1px;
  margin-bottom: 15px;
  background: #aaa;
}
</style>
