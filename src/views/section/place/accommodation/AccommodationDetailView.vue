<template>
  <div class="wrap">
    <div class="inner">
      <h1>숙소 상세정보</h1>
      <table border="1px solid #333333">
        <tr>
          <td>숙소번호</td>
          <td>{{data.brdNum}}</td>
        </tr>
        <tr>
          <td>주소</td>
          <td>{{data.addr}}</td>
        </tr>
        <tr>
          <td>경도</td>
          <td>{{data.mapx}}</td>
        </tr>
        <tr>
          <td>위도</td>
          <td>{{data.mapy}}</td>
        </tr>
        <tr>
          <td>전화번호</td>
          <td>{{data.tel}}</td>
        </tr>
         <tr>
          <td>url</td>
          <td><a :href=data.url>{{data.url}}</a></td>
        </tr>
      </table>
    </div>
  </div>
 <Button label="수정하기" class="p-button-primary" @click="$router.push('/admin/place/'+brdNum)" />
 <Button label="삭제하기" class="p-button-danger" @click="Deletedetail(brdNum)" />
 <Button label="목록으로" class="p-button-secondary" @click="goList" />
</template>

<script>
import axios from "axios";
import router from '@/router';
export default {
  data() {
    return {
      products: null,
      data: {},
      submitted: false
    };
  },
  mounted(){
    this.getDetail();
  },
  methods: {
    getDetail() {
      axios
        .get(`http://localhost:8082/triplus/api/section/places/accommodation/${this.$route.params.brdNum}`, this.data, {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        })
         .then(res => {
          this.data = res.data;
          console.log(res.data);
          console.log(res.data.brdNum);
          console.log(this.data.addr);
          console.log(this.data.tel);
          console.log(this.data.url);
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    Deletedetail(brdNum){
      alert("장소 데이터를 삭제하시겠습니까?");
      axios.delete("http://localhost:8082/triplus/section/places/"+brdNum, this.data, {
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
      })
      .then(res => {
        this.data = res.data;
        console.log(this.data);
      })
      .catch(err => {
        console.log(err.response);
      });
    },
    //목록으로 가기
    goList(){
      router.go(-1);
    }
  }
};
</script>
<style scoped>
.wrap {
  width: 100%;
}
.inner {
  width: 1080px;
  margin: 0 auto;
}
</style>
