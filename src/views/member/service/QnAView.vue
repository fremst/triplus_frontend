<template>
  <div class="home">
    <QnABoard
      :title="title"
      :listLink="listLink"
      :detailLink="detailLink"
      :writeLink="writeLink"/>
  </div>
</template>

<script>
// @ is an alias to /src
import QnABoard from '@/components/member/service/QnABoard.vue'
import axios from 'axios'


export default {
  name: 'QnAView',
  components: {
    QnABoard
  },
  data() {
    return {
      listLink: "http://localhost:8082/triplus/api/service/qna/",
      detailLink: "/service/qna/detail",
      writeLink: "/service/qna/write",
      title: "Q&A 게시판",
      pageCur: 6,
      pageEnd: 70
    };
  },
  methods: {
    getList() {
      axios.get("http://localhost:8082/triplus/api/service/qna/", {
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        params: { }
      }).then(function(resp) {
        console.log(resp);
      }.bind(this));
    }
  }
}
</script>
