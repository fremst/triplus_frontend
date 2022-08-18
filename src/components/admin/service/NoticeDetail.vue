<template>
  <div class="main">
    <div class="board">
      <div class="board-header">
        <h1>{{title}}</h1>
      </div>
      <div class="board-main">
        <table class="article-header">
          <tr>
            <th style="text-align: start; padding-left: 20px;">{{article.title}}</th>
            <th width="200px">{{article.writerId}}</th>
            <th width="200px">{{article.wdate}}</th>
          </tr>
        </table>
        <div class="article-main">
          <div v-html="article.contents"></div>
        </div>
        <div class="article-footer"></div>
      </div>
      <div class="board-footer">
        <Button @click="onUpdate">수정</Button>
        <Button class="p-button-danger" @click="onDelete">삭제</Button>
        <Button @click="onList">목록으로</Button>
      </div>
    </div>
  </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "NoticeDetail.vue",
        props:{
            title: String,
            detailLink: String,
            updateLink: String,
            deleteLink: String,
            listLink: String,
        },
        data(){
            return{
                article:{
                    title:"",
                    writerId:"",
                    wdate:"",
                    contents:""
                }
            }
        },
      created(){
        console.log("111");
        this.getArticle();
      },
        methods:{
            onUpdate(){
                this.$router.push(this.updateLink);
            },
            onList(){
                this.$router.push(this.listLink);
            },
            onDelete(){
                const writeParam = new URLSearchParams();
                writeParam.append("brdNum",this.$route.query.num);
                axios.post(this.deleteLink, writeParam,{
                    headers: {
                      'Access-Control-Allow-Origin': '*'
                    }
                }).then(function(resp){
                    if(resp.data.result == true){
                        alert("공지 삭제 완료!");
                        this.$router.push(this.listLink);
                    }else{
                        alert('삭제 실패');
                    }
                }.bind(this));
            },
            getArticle(){
              this.article = axios.get(this.detailLink, {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
                params: {
                    num: this.$route.query.num
                }
              }).then(function(resp) {
                 console.log(resp);
                 this.article = resp.data;
                }.bind(this));                
            }

        }
    }
</script>

<style scoped>
* {
    padding: 20px;
    margin: 0px;
    padding: 0px;
  }
  a {
    color: #333;
    font-weight: bold;
    text-decoration: none;
  }
  .main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
  }
  .board {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 1080px;
    border: 1px solid lightgray;
  }
  .board-header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100px;
    align-items: flex-start;
    padding: 20px;
  }
  .board-header h1 {
    font-size: 50px;
    font-weight: bold;
    color: #222;
  }
  .board-main {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    padding: 20px;
  }
  .article-header {
    width: 100%;
    margin: 0;
    text-align: center;
    border-top: 1px solid gray;
    border-collapse: collapse;
  }
  .article-header tr {
    height: 55px;
  }
  .article-header th {
    border-bottom: 1px solid gray;
    font-size: 22px; /* 30px */
    color: #222;
  }
  .article-main {
    display: flex;
    width: 100%;
    margin: 20px 0;
    padding: 0 20px;
  }
  .article-footer {
    width: 100%;
    margin: 0 0 20px 0;
    border-top: 1px solid gray;
  }
  .board-footer {
    display: flex;
    flex-direction: row;
    justify-content: end;
    width: 100%;
    align-items: center;
    padding: 20px;
    margin: 0px 20px;
  }
  .board-footer * {
    margin: 0px 4px;
  }
    #updateBtn{
        margin-right: 10px;
    }
    #deleteBtn{
        margin-right: 10px;
    }
    #btnGroup{
        padding-left: 800px;
    }
</style>