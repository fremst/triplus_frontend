<template>
  <div class="wrapper">
    <div><h1>회원가입</h1></div>
    <div class="contents">
      <div class="id">
        <div><label>아이디</label></div>
        <div><InputText type="text" v-model="id"  class="id-txt" placeholder="아이디를 입력하세요"/><Button label="중복확인" class="p-button-outlined" @click="idCheck" /></div>
      </div>

      <div class="pwd">
        <div><label>비밀번호</label></div>
        <div><InputText v-model="pwd" class="pwd-txt" placeholder="영어+숫자+특수문자(8~16자)" type="password"/></div>
      </div>

      <div class="name">
        <div><label>이름</label></div>
        <div><InputText type="text" v-model="name"  class="name-txt"/></div>

      </div>

      <div class="gender">
        <RadioButton name="gen" value="male" v-model="radio"  />남성
        <RadioButton name="gen" value="female" v-model="radio" />여성<br>
      </div>

      <div class="phone">
        <div><label>전화번호</label></div>
        <div><InputText type="text" v-model="phone" class="phone-txt" /></div>
      </div>

      <div class="addr">
        <div><label>주소</label></div>
        <div><InputText type="text" v-model="postcode" placeholder="우편번호" class="post-txt" /> <Button label="우편번호 찾기" class="p-button-outlined" @click="execDaumPostcode"/></div>
        <div><InputText type="text" v-model="address"  placeholder="주소" class="addr-txt" /></div>
        <div><InputText type="text" v-model="detailAddress"  placeholder="상세주소" class="detail-txt"/></div>
      </div>

      <div class="email">
        <div><label>이메일 주소</label></div>
        <div><InputText type="text" v-model="email"  class="email-txt"/><Button label="인증하기" class="p-button-outlined" @click="idCheck" /></div>
        <InputText type="text" v-model="cert" placeholder="인증번호를 입력하세요" class="cert-txt" />
      </div>

      <div class="bDate">
        <div >생년월일</div>
        <div class="year">
          <Dropdown v-model="yyyy" :options="year" optionLabel="name" placeholder="년도" />
        </div>

        <div class="month">
          <Dropdown v-model="mm" :options="month" optionLabel="name" placeholder="월" />
        </div>

        <div class="day">
          <Dropdown v-model="dd" :options="day" optionLabel="name" placeholder="일" />
        </div>
      </div>

      <div class="join">
        <Button label="회원가입" @click="test"/>
      </div>

    </div>
  </div>
</template>

<script>

export default {
  data(){
    return{
      id:"",
      pwd:"",
      name:"",
      phone:"",
      radio:'',
      postcode: "",
      address: "",
      extraAddress: "",
      detailAddress:"",
      email:'',
      cert:'',

      yyyy: null,
      year: [],
      mm:null,
      month:[],
      dd:null,
      day:[]
    }
  },
  created() {
    const nowYear = new Date().getFullYear();
    for (let i = 0; i < 50; i++) {
      let date = nowYear - i;
      this.year.push({ name: date });
    }

    for (let i = 1; i <= 12 ; i++) {
      this.month.push({ name: i });
    }

    for (let i = 1; i <= 31 ; i++) {
      this.day.push({ name: i });
    }

  },

  methods: {
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

    test(){
      alert('test');
    }

  }
}



</script>

<style lang="scss" scoped>
.contents{
  width: 1080px;
  border: 1px solid #CCC;
  //#ccc
  border-radius: 20px;
  margin: 0 auto;
}
.id{
  margin-top: 50px;
}
.join{

  margin: 50px auto;
}

.id-txt, .pwd-txt, .name-txt, .phone-txt, .addr-txt, .detail-txt, .email-txt, .bDate-txt{
  width: 400px;
  height: 40px;
}
.post-txt{
  height: 40px;
  width: 200px;
}

.cert-txt{
 width: 250px;
  height: 40px;
}

.id button, .email button {
  width: 150px;
  height: 40px;
  margin-left: 15px;
}
.addr button{
  height: 40px;
  width: 180px;
}

.year, .month, .day{
  display: inline-block;
}

</style>