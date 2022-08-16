<template>
<div>
<h1>{{$route.params.userid}} 회원님 반가워요!!!!!!!!!!</h1>
<h1>회원목록</h1>
        <table class="table">
            <thead>
                <tr>
                   <td>addr1<td> 
                    <td>addr</td>
                    <td>areacode</td>
                    <td>booktour</td>
                    <td>cat1</td>
                    <td>cat2</td>
                    <td>cat3</td>
                    <td>contentid</td>
                    <td>contenttypeid</td>
                    <td>createdtime</td>
                    <td>firstimage</td>
                    <td>firstimage2</td>
                    <td>mapx</td>
                    <td>mapy</td>
                    <td>mlevel</td>
                    <td>modifiedtime</td>
                    <td>readcount</td>
                    <td>sigungucode</td>
                    <td>tel</td>
                    <td>title</td>
                    <td>zipcode</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="i in list" :key="i.id">
                     <td>{{i.addr1}}<td> 
                    <td>{{i.addr}}</td>
                    <td>{{i.areacode}}</td>
                    <td>{{i.booktour}}</td>
                    <td>{{i.cat1}}</td>
                    <td>{{i.cat2}}</td>
                    <td>{{i.cat3}}</td>
                    <td>{{i.contentid}}</td>
                    <td>{{i.contenttypeid}}</td>
                    <td>{{i.createdtime}}</td>
                    <td>{{i.firstimage}}</td>
                    <td>{{i.firstimage2}}</td>
                    <td>{{i.mapx}}</td>
                    <td>{{i.mapy}}</td>
                    <td>{{i.mlevel}}</td>
                    <td>{{i.modifiedtime}}</td>
                    <td>{{i.readcount}}</td>
                    <td>{{i.sigungucode}}</td>
                    <td>{{i.tel}}</td>
                    <td>{{i.title}}</td>
                    <td>{{i.zipcode}}</td>
                    <td><button class="btn btn-primary" @click="delMem(i.id)">삭제</button></td>
                </tr>
            </tbody>
    </table>
</div>
</template>
<script>
import axios from 'axios';

export default {
    data(){
        return {
            list:[{id:'',pwd:'',email:''}]
        }
    },
    mounted() {
        this.getList();
    },
    methods: {
        getList(){
            axios.get('http://apis.data.go.kr/B551011/KorService/areaBasedList?numOfRows=12&pageNo=1&MobileOS=ETC&MobileApp=AppTest&ServiceKey=q78jx2pDdopDli5F6rUCzaNdpTo1BPB5p%2FhBDuJQVUkaf89mwtC5fauNUQs2BFE50udejJt%2FGaKOkZ3Y9F28OA%3D%3D&listYN=Y&arrange=A&contentTypeId=32&areaCode&sigunguCode&cat1=B02&cat2&cat3&_type=json',{
                headers:{
                    'Access-Control-Allow-Origin' : '*'
                },
            }).then(function(resp){
                alert("결과: "+resp.data.result);
                this.getList();
            }.bind(this))
            }
        }
    }
</script>
