<template>
    <div class="home">
        <div class="app-container">
            <FaqList
                :title="title"
                :faqList="faqList"
            />
        </div>
    </div>
</template>

<script>
import FaqList from '@/components/member/service/FaqList';
import axios from 'axios';

export default {
   components:{
        FaqList,
   },

   data(){
        return{
            title: "자주하는 질문",
            faqList: {},
        }
   },

   created(){

    axios.get(`http://localhost:8082/triplus/api/service/faqs`,{

        headers:{
            'Access-Control-Allow-Origin' : '*'
        },

    }).then(function(resp){

        console.log(resp);
        this.faqList = resp.data;
        console.log("faqList:",this.faqList);

    }.bind(this)).catch(err => {
        console.log(err)
    })


   }
   
}

</script>
