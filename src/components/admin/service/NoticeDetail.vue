<template>
    <div class="container">
        <table class="table">
            <thead>
            <tr>
                <th colspan="3" style="width: 80%" id="title"><span>[{{category}}] </span>{{title}}</th>
                <th colspan="3" style="width: 10%">{{regdate}}</th>
                <th colspan="3" style="width: 10%">{{hit}}</th>


            </tr>
            </thead>
            <tbody>
            <tr>
                <td colspan="10" style="height: 600px; text-align: left;">
                    <pre>{{contents}}</pre>
                </td>
            </tr>
            </tbody>
        </table>
        <div id="btnGroup">
            <Button color="#67AB9F" id="updateBtn" @click="pageUpdate" label="수정" />
            <Button color="#67AB9F" id="deleteBtn" @click="delNotice" label="삭제" />
            <Button color="#67AB9F" id="listBtn" @click="pageList" label="목록으로" />
        </div>
    </div>
</template>

<script>
   // import axios from 'axios'
    export default {
        name: "NoticeDetail.vue",
        data(){
            return{
                category:"기타",
                brdnum:0,
                title:"입력된 제목이 나타남",
                regdate:"2022/08/15",
                hit: 10,
                contents:"안녕하세요, 네이버웍스입니다.\n" +
                    "\n" +
                    " \n" +
                    "\n" +
                    "네이버웍스 드라이브 서비스의 서버 작업이 8/4일 예정되어 있습니다.\n" +
                    "고객께서는 서버 작업 중에 드라이브 서비스 접속 시 순단 현상을 경험할 수 있으니,\n" +
                    "자세한 내용 아래 확인 부탁드립니다."

            }
        },
        methods:{
            pageUpdate(){
                this.$router.push({ path: 'update' });
            },
            pageList(){
                this.$router.push({ path: 'list' });
            },
            delNotice(){
                alert("삭제 미구현");
            }

        }
    }
</script>

<style scoped>
    #title{
        text-align: left;
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