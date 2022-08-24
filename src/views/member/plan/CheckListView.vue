<template>
  <div class="wrapper">
    <div class="inner">
      <div class="title"><h1>~~여행</h1></div>
      <div class="date"><h6>시작날짜~~끝날짜</h6></div><br>
      <!-- navi 중복 / component.? -->
        <div class="navi">
          <Button type="button" label="체크리스트" class="p-button-primary" @click="c" />
          <Button type="button" label="가계부" class="p-button-primary" @click="d" />
          <Button type="button" label="지출내역" class="p-button-primary" @click="e" />
          <Button type="button" label="정산하기" class="p-button-primary" @click="f" />
        </div>

        <br><hr><br>
      <div class="title"><h2>체크리스트</h2></div>
        <div class="list">
         <div class="li" v-for="(row,index) in rows " :key="index">
           <Checkbox v-model="row.checked"  :binary="true" />{{row.name}}
         </div>

         <div class="add">

         <div class="input" style="display:inline-block;"  >
         <InputText type="text" v-model="txt" class="txt"/>

         </div>
           <span @click="addItem"><i class="pi pi-plus-circle" ></i>추가</span><span class="msg">{{msg}}</span>
         </div>

        </div>
        <br><br><hr><br>
        <div class="save"><Button type="button" label="저장" class="p-button-primary" @click="f" /></div>


    </div>
  </div>
</template>

<script>

export default {
  name: "CheckListView",

  data(){
    return{
      rows:[
        {name:'주민등록증',checked:false },
        {name:'운전면허증',checked:false },
        {name:'칫솔/치약',checked:false },
        {name:'상비약',checked:false },
        {name:'현금/카드',checked:false },
        {name:'보조배터리',checked:false },
        {name:'선크림',checked:false },
        {name:'화장품',checked:false },
        {name:'옷',checked:false },
        {name:'속옷',checked:false },
        {name:'양말',checked:false },
        {name:'등등',checked:false },
        {name:'item13',checked:false },
        {name:'item14',checked:false },
        {name:'item15',checked:false },
        {name:'item16',checked:false },
      ],
       txt:'',
       chk:'',
       msg:''
    }
  },
  methods:{
    addItem(){
      if(this.txt!==null && this.txt!==''){
        this.rows.push({name:this.txt,checked: false});
        this.txt='';
        this.msg='';
      }else{
        this.msg='항목을 입력해주세요';
      }

    }
  }
}
</script>

<style scoped>
.inner{
  width:1080px;
  margin: 0 auto;
  height: 1500px;
}

.title{
  margin-bottom: 30px;

}
.list{
  width: 1080px;
  display: flex;
  flex-wrap: wrap;

}
.li{
  width: 500px;
  height: 30px;
  font-size: 25px;
  margin-bottom: 5px;

}

.add{
  width: 500px;
}

.add span{
  cursor: pointer;
}
.add .txt{
  width: 150px;
  height: 30px;

}

.msg{
  color: red;
  margin-left: 20px;
}


.add #ok, .add #cancel{
  width: 50px;
  height: 30px;
  font-size: 7px;
  text-align: center;
  padding: 0px;

}


.save{
  margin-top: 100px;
  text-align: right;
}

</style>