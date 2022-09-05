<template>
    <div class="main">
        <div class="board">
            <div class="board-header">
                <h1 v-if="!this.$route.params.brdNum">매거진 등록</h1>
                <h1 v-else>매거진 수정</h1>
            </div>
            <div class="board-main">
                <div class="board-input">
                    <label for="aTitle"><h2>제목</h2></label>
                    <InputText id="aTitle" type="username" v-model="title" placeholder="제목을 입력하세요"/>
                </div>

                <div class="board-input">
                    <label for="category"><h2>매거진 유형</h2></label>
                    <Dropdown id="category" v-model="category"
                              :options="categories" optionLabel="name" placeholder="카테고리 선택" />
                </div>
                <h2>내용</h2>
                <Editor v-model="contents" editorStyle="height: 320px">
                </Editor>
                <div class="file-box">
                    <input type="file" id="tImgFile" accept="image/*" @change="changeTImg">
                    <label for="tImgFile" class="p-button p-component p-button-label" style="width:90px; margin-top:5px;">썸네일 선택</label>
                </div>
                <table v-if="tImgFile">
                    <tr>
                        <td>
                            <img class="file-preview" :src="tImgPreview" style="width:300px;">
                        </td>
                        <td>
                            {{ tImgFile.name }}
                        </td>
                        <td>
                            {{ tImgFile.size/1000 }} KB
                        </td>
                    </tr>
                </table>

            </div>
            <div class="board-footer">
                <Button @click="onCancel">취소</Button>
                <Button v-if="!$route.params.brdNum" @click="write">등록</Button>
                <Button v-else @click="update">수정</Button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import Dropdown from 'primevue/dropdown';
    import Editor from 'primevue/editor';
    import InputText from 'primevue/inputtext';
    import { defaultOptions } from "@/constant/axios.js";
    import { multipartOptions } from "@/constant/axios.js";

    export default {
        name: "MagazineWrite.vue",
        components: {
            Dropdown,
            Editor,
            InputText,
        },
        data() {
            return {
                category: "",
                categories: [
                    {name: '맛집투어', code: '맛집투어'},
                    {name: '엑티비티', code: '엑티비티'},
                    {name: '사진명소', code: '사진명소'},
                    {name: '힐링', code: '힐링'},
                ],
                title: "",
                contents: "",
                tImgFile: null,
                tImgPreview: null,
            }
        },
        created() {
            if (this.$route.params.brdNum) {
                this.getData();
            }
        },
        methods: {
            onCancel() {
                this.$router.push({name:"magazines"});
            },
            changeTImg(e) {
                let uploadFile = e.target.files[0];

                this.setTImgFileAndPreview(uploadFile);
            },
            bindForm() {
                const formData = new FormData();

                formData.append('writerId',"admin")
                formData.append('title', this.title);
                formData.append('category', this.category.code);
                formData.append('contents', this.contents);
                formData.append('tImgFile', this.tImgFile);

                return formData;

            },
            async write() {

                const formData = this.bindForm();

                const postUrl = `${process.env.VUE_APP_API_URL || ""}/admin/magazines/`;

                const resp = await axios.post(postUrl, formData, multipartOptions).catch(err => {
                    alert("서버 연결 실패", err);
                });

                if (resp.data.result === "success") {
                    alert("매거진 등록 성공");
                    this.$router.push({name: "magazines"});
                } else {
                    alert("매거진 등록 실패");
                }

            },

            async update() {

                const formData = this.bindForm();

                const putUrl = `${process.env.VUE_APP_API_URL || ""}/admin/magazines/${this.$route.params.brdNum}`;

                const resp = await axios.post(putUrl, formData, multipartOptions).catch(err => {
                    alert("서버 연결 실패", err);
                });

                if (resp.data.result === "success") {
                    alert("매거진 수정 성공");
                    this.$router.push({name: "magazines"});
                } else {
                    alert("매거진 수정 실패");
                }

            },

            async getData() {

                const getUrl = `${process.env.VUE_APP_API_URL || ""}/section/magazines/${this.$route.params.brdNum}`;

                const resp = await axios.get(getUrl, defaultOptions).catch(err => {
                    alert("서버 연결 실패", err);
                });

                this.title = resp.data.title;
                this.contents = resp.data.contents;
                this.category = resp.data.category;

                const tImgFile = this.base64ImgtoFile(resp.data.tImgFile, "썸네일 이미지");
                this.setTImgFileAndPreview(tImgFile)

            },

            // base64ImgtoFile(base64Img, fileName) {
            //
            //     let bstr = atob(base64Img),
            //         n = bstr.length,
            //         u8arr = new Uint8Array(n);
            //
            //     while (n--) {
            //         u8arr[n] = bstr.charCodeAt(n);
            //     }
            //
            //     return new File([u8arr], fileName, {type: "image/jpeg"});
            //
            // },

            setTImgFileAndPreview(file) {

                let reader = new FileReader();

                reader.onload = (e) => {

                    let img = e.target.result;

                    this.tImgFile = file;
                    this.tImgPreview = img;

                }

                reader.readAsDataURL(file);

            },
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
        justify-content: flex-end;
        width: 100%;
        align-items: center;
        padding: 20px;
    }
    .board-footer * {
        margin: 0px 4px;
    }
    .file-box input[type="file"] {
        display: none;
    }
</style>