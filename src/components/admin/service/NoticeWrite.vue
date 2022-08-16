<template>
        <div class="container">
            <h1 id="pageTitle">공지사항 등록</h1>
            <Dropdown v-model="category" :options="option" optionLabel="name" optionValue="name" placeholder="카테고리" id="category" />
            <form action="${cp }/board/Notice/insert" method="post">
                <div class="form-group">
                    <input type="text" class="form-control" id="title" placeholder="제목 입력" name="title"><br>
                </div>
                <br>
                <Editor v-model="contents" editorStyle="height: 800px"/>
                <br> <br>
            </form>
            <div id="btnGroup">
                <Button color="#67AB9F" id="insertBtn" @click="pageWrite" label="등록" />
                <Button color="#67AB9F" id="cancleBtn" @click="pageList" label="취소" />
            </div>
        </div>


</template>

<script>
    export default {
        name: "NoticeWriteView.vue",
        data(){
            return{
                category: null,
                option:[
                    {name:'패키지'},
                    {name:'이벤트'},
                    {name:'기타'}
                ]

            }
        },
        methods:{
            pageWrite(){

            },
            pageList(){
                this.$router.push({ path: 'list' });
            }
        }

    }
</script>

<style scoped>
    label{
        text-align: left;
    }
    #insertBtn{
        margin-right: 10px;
    }
    #btnGroup{
        padding-left: 900px;
    }
    #title{
        height: 50px;
    }
    #pageTitle{
        margin-bottom: 30px;
        text-align: left;
    }
    #category{
        margin-bottom: 10px;
        right: 476px;
        width: 125px;
    }

</style>