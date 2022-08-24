<template>
  <div class="home">
    <QnAWrite :title="title" :detailURL="detailURL"
      :link="link" :cancelLink="cancelLink"/>
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
      link: "http://localhost:8082/triplus/api/service/qna",
      cancelLink: "/service/qna",
      detailURL: "/service/qna/detail",
    };
  }
}
</script>
