<template>
    <div class="main">
        <div class="board">
            <div class="board-header">
                <h1>매거진 목록</h1>
            </div>
            <div class="board-main">
                <div class="table-header" id="searchGroup">
                    <span class="p-input-icon-left" >
                            <i class="pi pi-search" id="icon" />
                            <InputText v-model="filters['global'].value" placeholder="검색어를 입력하세요" id="keyword"  />
                    </span>
                </div>
                <DataTable class="board-table" :paginator="true"
                           paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                           :value="list"
                           responsiveLayout="scroll" :rows="5"
                           :filters="filters">
                    <Column field="tImg" header="" style="width: 200px;" >
                        <template #body="slotProps">
                            <img :src="require('@/assets/magazine/제주.png')" :alt="slotProps.data.tImg" class="tImg"  />
                        </template>
                    </Column>
                    <Column field="title" header="제목" >
                        <template #body="slotProps">
                            <a href="#" @click.prevent="onDetail(slotProps.data.brdNum)" v-text="slotProps.data.title"></a>
                        </template>
                    </Column>
                    <Column field="wdate" header="작성일" style="width: 100px;"></Column>
                    <Column field="hit" header="조회수" style="width: 100px;"></Column>
                </DataTable>
            </div>
            <div class="board-footer">
                <Button @click="onWrite">매거진 등록</Button>
                <Button @click="onList">전체 글 보기</Button>
            </div>
        </div>
    </div>
</template>

<script>
    // import axios from 'axios';
    import DataTable from 'primevue/datatable';
    import Column from 'primevue/column';
    import { FilterMatchMode } from 'primevue/api';

    export default {
        name: "MagazineList.vue",
        components:{
            DataTable,
            Column
        },
        data(){
            return{
                // list:[],
                pageIndex : 1,
                list: [
                {"brdNum": 11,"title": "미리 준비할수록 저렴해요. 제주 여름휴가","writerId": "admin","contents": "제주여행 매거진","tImg": "","wdate": "2022/08/22","hit": 0,"published": 1},
                {"brdNum": 10,"title": "서울여행","writerId": "admin","contents": "서울여행 매거진","tImg": "","wdate": "2022/08/22","hit": 0,"published": 1},
                {"brdNum": 8,"title": "강릉여행","writerId": "admin","contents": "강릉여행 매거진","tImg": "","wdate": "2022/08/22","hit": 0,"published": 1},
                {"brdNum": 7,"title": "부산여행","writerId": "admin","contents": "부산여행 매거진","tImg": "","wdate": "2022/08/22","hit": 0,"published": 1},
                {"brdNum": 11,"title": "제주여행","writerId": "admin","contents": "제주여행 매거진","tImg": "","wdate": "2022/08/22","hit": 0,"published": 1},
                {"brdNum": 10,"title": "서울여행","writerId": "admin","contents": "서울여행 매거진","tImg": "","wdate": "2022/08/22","hit": 0,"published": 1},
                {"brdNum": 8,"title": "강릉여행","writerId": "admin","contents": "강릉여행 매거진","tImg": "","wdate": "2022/08/22","hit": 0,"published": 1},
                {"brdNum": 7,"title": "부산여행","writerId": "admin","contents": "부산여행 매거진","tImg": "","wdate": "2022/08/22","hit": 0,"published": 1},
                ],
                filters:{}
            }
        },
        created(){
            // this.list=this.getList();
            this.initFilters();
        },
        methods:{
            onWrite(){
                this.$router.push({name:'magazine-write'})
            },
            onPageChange(n){
                this.curPage = n;
            },
            getList(){
                // this.list= axios.get('http://localhost:8082/triplus/api/',{
                //     headers: {
                //         'Access-Control-Allow-Origin': '*'
                //     },
                //     params:{}
                // }).then(function(resp){
                //     this.list=resp.data;
                // }.bind(this));
            },
            initFilters() {
                this.filters = {
                    'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
                }
            },
            onDetail(brdNum){
                console.log(brdNum);
                this.$router.push({name:"magazine-detail",params:{brdNum:brdNum}})
            },
            // onList(){
            //     this.$router.push({name:'magazines'})
            // }

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
    .board-search * {
        margin: 0;
    }
    .board-search input[type="submit"] {
        width: 100px;
    }
    .board-table {
        width: 100%;
        margin: 0px 0px 20px 0px;
        text-align: center;
        border-top: 1px solid gray;
        border-collapse: collapse;
    }
    .board-page .currentPage {
        color: #67AB9F;
    }
    .board-page * {
        margin: 0px 4px;
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
    #searchGroup{
        margin-bottom: 10px;
    }
    #keyword{
        height: 50px;
        width: 300px;
        margin-left: 735px;
    }
    #icon{
        margin-left: 735px;
    }
    .tImg{
        width: 150px;
        height: 200px;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    }
</style>