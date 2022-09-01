<template>
  <div class="home">
    <QnABoard
      :title="title"
      :listLink="listLink"
      :URL="URL"/>
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
      listLink: `${process.env.VUE_APP_API_URL || ""}/service/qna`,
      URL: "/service/qna",
      title: "Q&A 게시판",
      pageCur: 6,
      pageEnd: 70
    };
  },
  methods: {
    getList() {
      axios.get(`${process.env.VUE_APP_API_URL || ""}/service/qna/`, {
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
