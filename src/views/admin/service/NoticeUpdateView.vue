<template>
    <div class="home">
        <NoticeUpdate
                :submitLink="submitLink"
                :cancelLink="cancelLink"
                :detailLink="detailLink"
        />
    </div>
</template>

<script>
    import NoticeUpdate from "@/components/admin/service/NoticeUpdate";
    export default {
        components:{
            NoticeUpdate
        },
        data(){
            return{
                submitLink: "http://localhost:8082/triplus/api/service/notices/update",
                cancelLink: "/service/notices",
                detailLink: "/service/notices/detail",
            }
        }
    }
</script>