<template>
    <div class="main">
        <div class="board">
            <div class="board-header">
                <h1>공지 수정</h1>
            </div>
            <div class="board-main">
                <div class="board-input">
                    <label for="aTitle"><h2>제목</h2></label>
                    <InputText id="aTitle" type="username" v-model="data.title" placeholder="제목을 입력하세요"/>
                </div>

                <div class="board-input">
                    <label for="category"><h2>공지 유형</h2></label>
                    <Dropdown id="category" v-model="data.category"
                              :options="categories" optionLabel="name" placeholder="카테고리 선택" />
                </div>
                <h2>내용</h2>
                <Editor v-model="data.contents" editorStyle="height: 320px">
                </Editor>
            </div>
            <div class="board-footer">
                <Button @click="onCancel">취소</Button>
                <Button @click="onUpdate">등록</Button>
            </div>
        </div>
    </div>

</template>

<script>
    import axios from 'axios';
    import Dropdown from 'primevue/dropdown';
    import Editor from 'primevue/editor';
    import InputText from 'primevue/inputtext';

    export default {
        name: "NoticeWrite.vue",
        components: {
            Dropdown,
            Editor,
            InputText
        },
        data() {
            return {
                data:{},
                category: "",
                categories: [
                    {name: '패키지', code: 'PACKAGE'},
                    {name: '이벤트', code: 'EVENT'},
                    {name: '기타', code: 'ETC'},
                ],
                title: "",
                contents: "",
                noticeNum:0,
                brdNum:0
            }
        },
        mounted() {
                axios.get(`http://localhost:8082/triplus/api/service/notices/${this.$route.params.brdNum}/update`, {
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    },
                }).then(function(resp) {
                    console.log(resp.data);
                    this.data = resp.data;
                }.bind(this));
        },
        methods: {
            onUpdate() {
                console.log('title:' + this.data.title , 'category:' + this.data.category.code, 'contents:' + this.data.contents);

                // 파라미터 JSON 배열로 넘기기
                const updateParam = {"title":this.data.title,"category":this.data.category.code,"contents":this.data.contents};
                axios.put(`http://localhost:8082/triplus/api/service/notices/${this.$route.params.brdNum}`, updateParam, {
                    headers:{
                        'Access-Control-Allow-Origin' : '*',
                        // JSON 방식으로 변환된 파라미터를 읽을 수 있도록 Header에 'Content-Type': 'application/json' 추가.
                        'Content-Type': 'application/json'
                    }
                }).then(function (resp) {
                    if (resp.data.result == "true") {
                        alert("공지사항 수정 성공");
                        this.$router.push({name:"notices"});
                    } else {
                        alert("공지사항 수정 실패");
                        this.$router.push({name:"notices"});
                    }
                }.bind(this));
            },
            onCancel() {
                this.$router.push({name:"notices"});
            }
        }
    }


</script>

<style scoped>
    * {
        padding: 20px;
        font-family: 'Helvetica';
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
        align-items: flex-start;
        padding: 20px;
    }
    .board-main * {
        width: 100%;
        text-align: left;
    }
    .board-input {
        min-height: 90px;
    }
    .board-footer {
        display: flex;
        flex-direction: row;
        justify-content: end;
        width: 100%;
        align-items: center;
        padding: 20px;
    }
    .board-footer * {
        margin: 0px 4px;
    }
</style>