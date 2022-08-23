<template>
  <div class="home">
    <QnAWrite :title="title" :detailURL="detailURL"
      :submitLink="submitLink" :cancelLink="cancelLink" :detailLink="detailLink" :updateLink="updateLink"/>
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
      submitLink: "http://localhost:8082/triplus/api/service/qna/write",
      updateLink: "http://localhost:8082/triplus/api/service/qna/update",
      cancelLink: "/service/qna",
      detailLink: "http://localhost:8082/triplus/api/service/qna/detail",
      detailURL: "/service/qna/detail",
    };
  }
}
</script>
