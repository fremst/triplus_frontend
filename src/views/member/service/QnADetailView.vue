<template>
  <div class="home">
    <QnADetail :title="title" :link="link" :URL="URL" />
  </div>
</template>

<script>
// @ is an alias to /src
import QnADetail from "@/components/member/service/QnADetail.vue";

export default {
  name: "QnADetailView",
  components: {
    QnADetail
  },
  data() {
    return {
      title: "Q&A 게시판",
      link: `${process.env.VUE_APP_API_URL || ""}/service/qna`,
      URL: "/service/qna"
    };
  },
  created() {}
};
</script>
