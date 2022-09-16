<template>
  <div class="home">
    <NoticeList :title="title" :listLink="listLink" :detailLink="detailLink" :writeLink="writeLink" />
  </div>
</template>

<script>
import NoticeList from "@/components/admin/service/NoticeList";

export default {
  components: {
    NoticeList
  },
  data() {
    return {
      listLink: "http://localhost:8082/triplus/api/service/notices",
      detailLink: "/service/notices/detail",
      writeLink: "/service/notices/write",
      title: "공지사항",
      pageCur: 1,
      pageEnd: 70
    };
  }
};
</script>

<style scoped></style>
