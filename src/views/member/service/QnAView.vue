<template>
  <div class="home">
    <QnABoard :title="title" :listLink="listLink" :detailLink="detailLink"/>
  </div>
  <Button @click="getList">aaa</Button>
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
      listLink: "http://localhost:8082/triplus/api/service/qna/list",
      detailLink: "/service/qna/detail",
      title: "이곳에 타이틀 입력",
      pageCur: 6,
      pageEnd: 70
    };
  },
  methods: {
    getList() {
      axios.get("http://localhost:8082/triplus/api/service/qna/list", {
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
