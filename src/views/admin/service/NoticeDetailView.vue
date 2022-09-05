<template>
  <div class="home">
    <NoticeDetail
      :title="title"
      :detailLink="detailLink"
      :updateLink="updateLink"
      :deleteLink="deleteLink"
      :listLink="listLink"
    />
  </div>
</template>

<script>
import NoticeDetail from "@/components/admin/service/NoticeDetail";
export default {
  components: {
    NoticeDetail
  },
  data() {
    return {
      title: "공지사항 상세",
      article: {
        number: 1,
        title: "aaaabbbbcccc",
        writerid: "여기에 아이디 입력",
        wdate: "1970.01.01",
        contents: "<p>testtest</p><p>testtest2</p><p>testtest3</p>"
      },
      detailLink: `http://localhost:8082/triplus/api/service/notices/`,
      updateLink: "/service/notices/update",
      deleteLink: "http://localhost:8082/triplus/api/service/notices/",
      listLink: "/service/notices"
    };
  }
  // created() {
  //     console.log(this.$route.query.num);
  // }
};
</script>

<style scoped></style>
