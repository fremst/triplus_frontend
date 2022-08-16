<template>
  <div class="home">
    <QnAWrite :title="title" :submitLink="submitLink" :cancelLink="cancelLink" :detailLink="detailLink"/>
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
      title: "이곳에 타이틀 입력",
      submitLink: "http://localhost:8082/triplus/api/service/qna/write",
      cancelLink: "/service/qna",
      detailLink: "/service/qna/detail",
    };
  }
}
</script>
