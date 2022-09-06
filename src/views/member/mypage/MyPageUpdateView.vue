<template>
<div class="wrapper">

    <div class="side">
      <MyPageSidebar/>
    </div>

  <div class="inner">
    <div class="content">
      <div class="title"><h3>개인 정보 수정</h3></div>

      <div class="name"><span>이름</span><InputText type="text" v-model="name"  class="name-txt"/><span>{{nameErr}}</span></div>

      <div class="phone"><span>전화번호</span><InputText type="text" v-model="phone"  class="phone-txt"/><span>{{phoneErr}}</span></div>

      <div class="bdate"><span>생년월일</span><InputText type="date" v-model="bdate" readonly="readonly" class="bdate-txt" /></div>
      <div class="regdate"><span>가입일</span><InputText type="date" v-model="regdate" readonly="readonly" class="regdate-txt" /></div>

      <div class="addr">

        <div class="a">
          <span>우편번호</span>
          <InputText type="text" v-model="postcode"  class="post-txt"   /> <Button label="우편번호 찾기" class="p-button-outlined"  id= "btn1" @click="execDaumPostcode"/>

        </div>

        <div class="b"><span>주소</span><InputText type="text" v-model="address" class="addr-txt" /><span>{{addrErr}}</span></div>
        <div class="c"><span>상세주소</span><InputText type="text" v-model="detailAddress"  class="detail-txt"/><span>{{detailErr}}</span></div>


      </div>

      <div class="email"><span>이메일 주소</span><InputText type="text" v-model="email"  class="email-txt"/></div>
      {{emailErr}}

      <div><Button type="button" label="정보 수정" class="p-button-primary" id="btn2" @click="update" /></div>

      <div class="pwd">
        <div class="title"><h3>비밀번호 수정</h3></div>

        <div class="d"><span>새 비밀번호</span><InputText v-model="pwd1" class="pwd1-txt" type="password"/></div>
        <div class="e"><span>새 비밀번호 확인</span><InputText v-model="pwd2" class="pwd2-txt" type="password"/></div>
        {{pwdErr}}
        <div><Button type="button" label="비밀번호 수정" class="p-button-primary" id="btn3" @click.prevent="newPwd" /></div>

      </div>



    </div>
  </div>
</div>
</template>

<script>
import MyPageSidebar from "@/components/member/mypage/MyPageSidebar";
import axios from "axios";

export default {
  name: "MyPageView",
  components: {MyPageSidebar},
  data(){
    return{
      id:localStorage.getItem("id"),
      name:'',
      phone:'',
      bdate:null,
      regdate:null,
      email:'',
      postcode:'',  //우편번호
      address:'', // 주소
      detailAddress:'', //상세주소
      addr:'', // 합친주소
      pwd1:'', //새비밀
      pwd2:'', //확인
      arr:[], // 주소 구분 배열

      //에러 , pass


      nameErr:'',
      phoneErr:'',
      addrErr:'',
      detailErr:'',
      emailErr:'',
      pwdErr:'',
      namePass:false,
      phonePass:false,
      //bdatePass:false, 생일변경x
      addressPass:false,
      detailPass:false,
      emailPass:false,
      pwdPass:false
    }

  },
  mounted() {

    //const joinparam = new URLSearchParams();
    //joinparam.append('id',this.id);

    axios.get(`http://localhost:8082/triplus/member/mypage/find/${this.id}`,{
      headers:{
        'Access-Control-Allow-Origin': '*'
      }
    }).then(function(resp){
      if(resp.data.result==='success'){
        this.name = resp.data.dto.name;
        this.bdate = resp.data.dto.bDate;
        this.regdate = resp.data.dto.regDate;
        this.addr = resp.data.dto.addr;
        this.email = resp.data.dto.email;
        this.phone = resp.data.dto.tel;
        this.arr = this.addr.split(', ');
        this.postcode =this.arr[0].substring(1,6); //()없이
        this.address = this.arr[1];
        this.detailAddress = this.arr[2];

      }
    }.bind(this));

  },

  computed:{
    totalAddr(){
      return '('+this.postcode+'), ' + this.address + ', ' + this.detailAddress;
    },


  },

  methods:{
    //카카오 주소 api
    execDaumPostcode() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          if (this.extraAddress !== "") {
            this.extraAddress = "";
          }
          if (data.userSelectedType === "R") {
            // userSelectedType === "R"  R->도로명주소
            this.address = data.roadAddress;
          } else {
            // 사용자가 지번 주소를 선택했을 경우(J)
            this.address = data.jibunAddress;
          }

          // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
          if (data.userSelectedType === "R") {
            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
              this.extraAddress += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if (data.buildingName !== "" && data.apartment === "Y") {
              this.extraAddress +=
                  this.extraAddress !== ""
                      ? `, ${data.buildingName}`
                      : data.buildingName;
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if (this.extraAddress !== "") {
              this.extraAddress = `(${this.extraAddress})`;
            }
          } else {
            this.extraAddress = "";
          }
          // 우편번호를 입력한다.
          this.postcode = data.zonecode;
        },
      }).open();
    },

    //회원정보수정
    update(){
      //이름
      if(this.name!==null && this.name!==''){

        let check = /^[가-힣]{1,10}$/;
        if (!check.test(this.name)) {
          this.nameErr='이름은 한글로 입력하세요';
          this.namePass=false;
        }else{
          this.nameErr='';
          this.namePass=true;
        }

      }else{
        this.nameErr='이름을 입력하세요';
        this.namePass=false;
      }

      //전화번호
      if(this.phone!==null && this.phone !==''){
        let check = /^[0-9]{2,3}[0-9]{3,4}[0-9]{4}/;
        if (!check.test(this.phone)) {
          this.phoneErr='전화번호는 하이픈(-) 없이 숫자(10자 또는 11자)로 입력하세요 ';
        }else{
          this.phoneErr='';
          this.phonePass=true;
        }
      }else{
        this.phoneErr='전화번호를 입력하세요';
        this.phonePass=false;
      }

      //주소
      if(this.address !==null && this.address !==''){
       this.addressPass = true;
        this.addrErr = '';
      }else{
        this.addressPass = false;
        this.addrErr = '주소를 입력하세요';

      }

      //상세주소
      if(this.detailAddress !==null && this.detailAddress !==''){
        this.detailErr='';
        this.detailPass = true;
      }else{
        this.detailErr = '상세주소를 입력하세요';
        this.detailPass = false;
      }


      //이메일
      if(this.email!==null && this.email !==''){
        this.emailErr = '';
        this.emailPass = true;
      }else{
        this.emailErr = '이메일 주소를 입력하세요';
        this.emailPass = false;
      }

      //회원정보 수정
      if(this.namePass===true && this.phonePass===true && this.addressPass===true && this.detailPass===true &&
          this.emailPass===true){
        const joinparam = new URLSearchParams();
        joinparam.append('id', this.id);
        // joinparam.append('pwd', this.pwd2);
        // joinparam.append('auth',this.auth); // user로 처리
        joinparam.append('name', this.name);
        joinparam.append('tel', this.phone);
        // joinparam.append('gender', this.radio);
        //주소(합처서)
        joinparam.append('addr', this.totalAddr);
        joinparam.append('email', this.email);
        //joinparam.append('bDate', this.bdate);
        //regdate 안보내면 자동 null / sysdate처리
       //joinparam.append('active', this.active);

        axios.post('http://localhost:8082/triplus/member/mypage/update',joinparam,{
          headers:{
            'Access-Control-Allow-Origin': '*'
          }
        }).then(function(resp){
          if(resp.data.result==='success'){
            alert('회원정보수정 완료');
          }
        }.bind(this));


      }else{
        alert('pass오류있음');
      }


    },
    newPwd() {

      if(this.pwd1 !== this.pwd2){
        this.pwdErr='비밀번호가 일치하지 않습니다';
      }else{ // 비밀번호 확인
        let check =  /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;

        if(!check.test(this.pwd1)) {
          alert('비밀번호는 8~16자의 영문 대소문자와 숫자, 특수문자를 사용할 수 있습니다.');
          this.pwd1="";
          this.pwd2="";
          this.pwdErr="";
        }else{  //비밀번호 조건 충족

          const joinparam = new URLSearchParams();
          joinparam.append('id', this.id);
          joinparam.append('pwd', this.pwd2);
          //비밀번호 찾기 -> 새비밀번호 controller 만들어놓은거 있어서 사용
          axios.post('http://localhost:8082/triplus/member/changepwd', joinparam, {
            headers: {
              'Access-Control-Allow-Origin': '*'
            }
          }).then(function (resp) {

            if(resp.data.result === 'success') {   // 새비밀번호 수정완료
              alert('비밀번호를 변경하였습니다.');
              this.$router.push({name:'main'});
            }
          }.bind(this));
        }
      }
    }

  },

}
</script>

<style scoped>
.wrapper{
  display: flex;
  margin: 40px auto;
  margin-bottom: 100px;
}
.inner{
  width: 830px;
  display: inline-block;

}

.side{
  width: 250px;
  display: inline-block;

  margin-left: 300px;
}
.content{
  width:780px;
  border: 1px;
  display: inline-block;
  float: right;
}

.title{

  margin-bottom: 15px;
}

.name, .phone, .bdate, .regdate, .a, .b, .c, .email, .d, .e{
  margin-bottom: 10px;
}


.name span, .bdate span, .addr span, .email span, .pwd span, .phone span, .regdate span{
  display: inline-block;
  width: 170px;
}

/* 이름, 주소 입력창*/
.name-txt, .post-txt{
  width: 200px;
  height: 40px;
}

.bdate-txt, .addr-txt, .detail-txt, .email-txt, .pwd1-txt, .pwd2-txt, .pwd3-txt, .phone-txt, .regdate-txt{
  height: 40px;
  width: 400px;
}

#btn1{
  width: 190px;
  height: 40px;
  margin-left: 5px;

}

#btn2, #btn3{
  width: 570px;
  height: 40px;
  margin-bottom: 15px;
}


</style>