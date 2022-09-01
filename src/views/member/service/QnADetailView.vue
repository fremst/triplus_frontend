<template>
  <div class="home">
    <QnADetail
      :title="title"
      :link="link"
      :URL="URL"/>
  </div>
</template>

<script>
// @ is an alias to /src
import QnADetail from '@/components/member/service/QnADetail.vue'

export default {
  name: 'QnADetailView',
  components: {
    QnADetail
  },
  data() {
    return {
      title: "Q&A 게시판",
      article: {
        number: 1,
        title: "aaaabbbbcccc",
        id: "여기에 아이디 입력",
        date: "1970.01.01",
        content: "<p>testtest</p><p>testtest2</p><p>testtest3</p>"
      },
      link: `${process.env.VUE_APP_API_URL || ""}/service/qna`,
      URL: "/service/qna",
    };
  },
  created() {
    console.log(this.$route.query.num);
  }
}
</script>
