<template>
    <div class="main">
        <div class="board">
            <div class="board-header">
                <h1>{{pageTitle}}</h1>
            </div>
            <div class="board-main">
                <table class="article-header">
                    <tr>
                        <th style="text-align: start; padding-left: 20px;">{{article.title}}</th>
                        <th width="200px">{{article.writerId}}</th>
                        <th width="200px">{{article.wdate}}</th>
                    </tr>
                </table>
                <br>
                <Button @click="onRecommend" id="recommendBtn">추천하기</Button><br>
                <div class="article-main">
                    <div v-html="article.contents"></div>
                </div>
                <div class="article-footer">
                </div>
            </div>
            <div class="board-footer">
                <Button @click="$router.push(`/section/magazines/${this.$route.params.brdNum}/update`)" >수정</Button>
                <Button class="p-button-danger" @click="onDelete">삭제</Button>
                <Button @click="onList">목록으로</Button>
            </div>
            <div class="comm-list">
                <table class="comm-main">
                    <tr v-for="comm in comments" :key="comm.id">
<!--                        <th width="100px" style="text-align:left">{{comm.brdCmtNum}}</th>-->
                        <th width="100px" style="text-align:left">{{comm.id}}</th>
                        <td style="width:70%; text-align:left">{{comm.contents}}</td>
                        <Button @click="deleteComm(comm.brdCmtNum)" id="deleteCommBtn" class="p-button-danger">X</Button>
                    </tr>
                </table>

            </div>
            <div class="board-reply">
            <Textarea v-model="value" :autoResize="true" rows="3" cols="125" />
            <Button @click="insertComm" id="replyBtn" class="p-button-lg">등록</Button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import Textarea from 'primevue/textarea';

    export default {
        name: "MagazineDetail.vue",
        components:{
            Textarea
        },
        data(){
            return{
                article:{
                    pageTitle: "",
                    brdNum:0,
                    title:"미리 준비할수록 저렴해요 제주 여름휴가",
                    writerId:"admin",
                    wdate:"2022/08/23",
                    contents:"제주 매거진에 대한 내용과 이미지들"
                },
                comments:[
                    {
                        brdCmtNum:0,
                        brdNum:0,
                        id:"",
                        contents:""
                    }
                ]
            }
        },
        created(){
            this.getArticle();
            this.getCommList();
        },
        methods:{
            onList(){
                this.$router.push({name:'magazines'});
            },
            onDelete(){
                axios.delete(`http://localhost:8082/triplus/api/section/magazines/${this.$route.params.brdNum}`,{
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    }
                }).then(function(resp){
                    if(resp.data=='success'){
                        alert("매거진 삭제 완료!");
                        this.$router.push({name:'magazines'})
                    }else{
                        alert('삭제 실패');
                    }
                }.bind(this));
            },
            getArticle(){
                axios.get(`http://localhost:8082/triplus/api/section/magazines/${this.$route.params.brdNum}`, {
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    },
                }).then(function(resp) {
                    console.log(resp);
                    this.article = resp.data;
                }.bind(this));
            },
            getCommList(){
                axios.get(`http://localhost:8082/triplus/api/section/magazines/comments/${this.$route.params.brdNum}`,{
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    },
                }).then(function(resp) {
                    this.comments = resp.data;
                }.bind(this));
            },
            deleteComm(brdCmtNum){
                console.log(brdCmtNum);
                axios.delete(`http://localhost:8082/triplus/api/section/magazines/comments/${brdCmtNum}`,{
                    headers:{
                        'Access-Control-Allow-Origin': '*',
                    }
                }).then(function(resp){
                    if(resp.data=='success'){
                        alert("삭제 완료!");
                        this.getCommList();
                    }else{
                        alert('삭제 실패');
                    }
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
    #recommendBtn{
        margin-left: 910px;
    }
    .board-reply Textarea{
        margin-top: 30px;
        margin-left: 18px;
    }
    .board-reply Button{
        margin-left: 15px;
        margin-bottom: 10px;
    }
    .board-reply{
        width: 100%;
        margin: 0 0 20px 0;
    }
    .comm-main{
        margin-left: 20px;
        padding-right: 800px;
        margin-bottom: 5px;
    }

</style>