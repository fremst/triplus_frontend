<template>
    <div>
        <div class="container">
            <div id="searchGroup">
                <Dropdown v-model="field" :options="category" optionLabel="name" optionValue="name" placeholder="검색옵션" id="field" />
                <InputText type="text" v-model="keyword" placeholder="Search" id="search" />
                <Button id="searchBtn" label="검색" />
            </div>
            <table class="table table-hover">
                <thead>
                <tr>
                    <th style="width:15%">글번호</th>
                    <th style="width:65%">제목</th>
                    <th style="width:10%">작성일</th>
                    <th style="width:10%">조회수</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="notice in list" :key="notice.num">
                    <td>{{notice.num}}</td>
                    <td @click="pageDetail">{{notice.title}}</td>
                    <td>{{notice.regdate}}</td>
                    <td>{{notice.hit}}</td>
                </tr>
                </tbody>
            </table>
            <div id="paging">
                <Paginator :rows="10" :totalRecords="totalRecords" ></Paginator>
            </div>
        </div>
        <div id="btnGroup">
            <Button color="#67AB9F" id="writeBtn" @click="pageWrite" label="글쓰기" />
            <Button color="#67AB9F" id="listBtn"  @click="pageList" label="전체 글 보기" />
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "NoticeListView.vue",
        data(){
            return{
                list: [
                    {num: 0,title: "",regdate: "",hit:0 },
                ],
                field: null,
                category: [
                    {name: '제목'},
                    {name: '내용'},
                    {name: '제목+내용'},
                ]
            }
        },
        mounted() {
            this.getList();
        },
        methods:{
            getList(){
              axios.get('http://localhost:8082/api/service/notice/list',{
                  headers:{
                      'Access-Control-Allow-Origin' : '*'
                  }
              }).then(function(resp){
                  this.list=resp.data;
              }.bind(this));
            },

            pageWrite() {
                this.$router.push({ path: 'write' });
            },
            pageList() {
                this.$router.push({ path: 'list' });
            },
            pageDetail(){
                this.$router.push({ path: 'detail' });
            }

        }
    }
</script>

<style scoped>
    #btnGroup{
        padding-left: 850px;
    }
    #writeBtn{
        margin-right: 10px;
    }
    #search{
        margin-bottom: 10px;
        margin-left: 10px;
        width: 300px;
    }
    #searchBtn{
        margin-bottom: 10px;
        margin-left: 10px;
    }
    #field{
        width: 150px;
        text-align: left;
    }
    #searchGroup{
        padding-left: 540px;
    }
</style>