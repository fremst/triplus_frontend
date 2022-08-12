<template>
  <div class="home">
    <QnADetail 
      :title="title"
      :article="article"
      :updateLink="updateLink"
      :deleteLink="deleteLink"
      :listLink="listLink"/>
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
      title: "이곳에 타이틀 입력",
      article: {
        number: 1,
        title: "aaaabbbbcccc",
        id: "여기에 아이디 입력",
        date: "1970.01.01",
        content: "<p>testtest</p><p>testtest2</p><p>testtest3</p>"
      },
      updateLink: "/service/qna/write",
      deleteLink: "/service/qna/delete",
      listLink: "/service/qna/",
    };
  }
}
</script>
