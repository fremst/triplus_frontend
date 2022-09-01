<template>
  <div class="home">
    <QnAWrite :title="title" :URL="URL"
      :link="link"/>
  </div>
</template>

<script>
// @ is an alias to /src
import QnAWrite from '@/components/member/service/QnAWrite.vue'

export default {
  name: 'QnAWriteView',
  components: {
    QnAWrite
  },
  data() {
    return {
      title: "Q&A 게시글 작성",
      link: `${process.env.VUE_APP_API_URL || ""}/service/qna`,
      URL: "/service/qna",
    };
  }
}
</script>
