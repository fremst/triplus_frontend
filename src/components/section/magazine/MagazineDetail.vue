<template>
    <div class="main">
        <div class="board">
            <div class="board-header">
                <h1>{{pageTitle}}</h1>
            </div>
            <div class="board-main">
                <table class="article-header">
                    <tr>
                        <th width="150px">[ {{article.category}} ]</th>
                        <th style="text-align: start; padding-left: 20px;">{{article.title}}</th>
                        <th width="200px">{{article.wdate}}</th>
                    </tr>
                </table>
                <br>
<!--                <Button @click="onRecommend" id="recommendBtn">추천하기</Button><br>-->
                <div class="article-main">
                    <pre v-html="article.contents"></pre>
                </div>
                <div class="article-footer">
                </div>
            </div>
            <div class="board-footer">
                <Button v-if="this.tempAuth=='admin'" @click="$router.push(`/admin/magazines/${this.$route.params.brdNum}/update`)" >수정</Button>
                <Button v-if="this.tempAuth=='admin'" class="p-button-danger" @click="onDelete">삭제</Button>
                <Button @click="onList">목록으로</Button>
            </div>
            <div class="comm-list">
                <table class="comm-main">
                    <tr v-for="comm in comments" :key="comm.brdCmtNum">
                        <td style="width:100px; text-align:left;">{{comm.id}} </td>
                        <td style="width:800px; text-align:left">{{comm.contents}}</td>
                        <Button v-if="comm.id==this.tempId" @click="deleteComm(comm.brdCmtNum)" id="deleteCommBtn" class="p-button-danger">X</Button>
                    </tr>
                </table>

            </div>
            <div class="board-reply">
            <Textarea v-model="commContents" :autoResize="true" rows="3" cols="120" />
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
                    title:"",
                    writerId:"",
                    wdate:"",
                    contents:"",
                    category:""
                },
                comments:[
                    {
                        brdCmtNum:0,
                        brdNum:0,
                        id:"",
                        contents:""
                    }
                ],
                commContents:"",
                tempId:localStorage.getItem("id"),
                tempAuth:this.$store.state.loginUser.auth
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
                axios.delete(`http://localhost:8082/triplus/api/admin/magazines/${this.$route.params.brdNum}`,{
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
            },
            insertComm(){
                const id = localStorage.getItem("id")
                const writeParam = new URLSearchParams();
                writeParam.append('id',id);
                writeParam.append('contents',this.commContents);
                if(id == null){
                    this.$router.push({name:"member-login"})
                    alert("회원만 등록 가능합니다.")
                }
                axios.post(`http://localhost:8082/triplus/api/section/magazines/comments/${this.$route.params.brdNum}`,writeParam,{
                    headers:{
                        'Access-Control-Allow-Origin' : '*'
                    }
                }).then(function(resp) {
                    if(resp.data.result =="success"){
                        alert("댓글 등록 성공");
                        this.commContents="";
                        this.getCommList();
                    }else{
                        alert("댓글 등록 실패");
                        this.commContents="";
                        this.getCommList();
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
        justify-content: flex-end;
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
    .comm-list{
        width: 100%;
    }
    .comm-main{
        width : 100%;
        margin-left: 25px;
        padding-right: 850px;
        margin-bottom: 5px;
    }

</style>