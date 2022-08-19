<template>
    <div class="home">
        <NoticeWrite
                :pagetitle="pageTitle"
                :submitLink="submitLink"
                :cancelLink="cancelLink"
                :detailLink="detailLink"
        />
    </div>
</template>

<script>
    import NoticeWrite from "@/components/admin/service/NoticeWrite";
    export default {
        components:{
            NoticeWrite
        },
        data(){
            return{
                pageTitle: "공지 수정",
                submitLink: "http://localhost:8082/triplus/api/service/notices/update",
                cancelLink: "/service/notices",
                detailLink: "/service/notices/detail",
            }
        }
    }
</script>