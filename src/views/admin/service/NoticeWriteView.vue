<template>
  <div class="home">
    <NoticeWrite :title="title" :submitLink="submitLink" :cancelLink="cancelLink" :detailLink="detailLink" />
  </div>
</template>

<script>
import NoticeWrite from "@/components/admin/service/NoticeWrite";
export default {
  components: {
    NoticeWrite
  },
  data() {
    return {
      title: "공지 등록",
      submitLink: "http://localhost:8082/triplus/api/service/notices/write",
      cancelLink: "/service/notices",
      detailLink: "/service/notices/detail"
    };
  }
};
</script>
