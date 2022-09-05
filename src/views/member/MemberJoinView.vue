<template>
  <div class="wrapper">
    <div class="title"><h1>회원가입</h1></div>
    <Toast />
    <div class="step">
      <ol class="step_list">
        <li><span>약관동의</span></li>
        <li class="on"><span>회원정보입력</span></li>
        <li><span>가입완료</span></li>
      </ol>
    </div>

    <div class="inner">
      <div class="layout">
        <div class="id">
          <div><label>아이디</label></div>
          <div>
            <InputText
              type="text"
              v-model="id"
              @change="reCheck"
              class="id-txt"
              placeholder="아이디(영어+숫자 6~12자)"
            /><Button label="중복확인" class="p-button-outlined" @click="idCheck" />
          </div>
          <div>
            <span>{{ idErr }}</span>
          </div>
        </div>

        <div class="pwd">
          <div><label>비밀번호</label></div>
          <div>
            <InputText v-model="pwd1" class="pwd-txt" placeholder="영어+숫자+특수문자(8~16자)" type="password" />
          </div>
          <div>
            <label>비밀번호 확인</label><span>{{ pwdErr }}</span>
          </div>
          <div>
            <InputText v-model="pwd2" class="pwd2-txt" placeholder="비밀번호를 다시 한번 입력하세요" type="password" />
          </div>
        </div>

        <div class="name">
          <div><label>이름</label></div>
          <div><InputText type="text" v-model="name" class="name-txt" /></div>
          <div>
            <span>{{ nameErr }}</span>
          </div>
        </div>

        <div class="gender">
          <RadioButton name="gen" value="M" v-model="radio" class="men" />남성
          <span
            ><RadioButton name="gen" value="F" v-model="radio" class="women" />여성<span class="radioErr">{{
              genErr
            }}</span></span
          >
        </div>

        <div class="phone">
          <div><label>전화번호</label></div>
          <div><InputText type="text" v-model="phone" class="phone-txt" /></div>
          <span>{{ phoneErr }}</span>
        </div>

        <div class="addr">
          <div><label>주소</label></div>
          <div>
            <InputText type="text" v-model="postcode" placeholder="우편번호" class="post-txt" />
            <Button label="우편번호 찾기" class="p-button-outlined" @click="execDaumPostcode" />
          </div>
          <div>
            <InputText type="text" v-model="address" placeholder="주소" class="addr-txt" /><span>{{ addrErr }}</span>
          </div>
          <div>
            <InputText
              type="text"
              v-model="detailAddress"
              placeholder="상세주소를 입력해주세요"
              class="detail-txt"
            /><span>{{ detailErr }}</span>
          </div>
        </div>

        <div class="email">
          <div><label>이메일 주소</label></div>
          <div>
            <InputText type="text" v-model="email" placeholder="이메일주소를 입력하세요" class="email-txt" /><Button
              label="인증번호 받기"
              class="p-button-outlined"
              @click="sendMail"
            />
          </div>
          <span>{{ emailErr }}</span>
          <div>
            <InputText type="text" v-model="cert" placeholder="인증번호를 입력하세요" class="cert-txt" /><Button
              label="인증번호 확인"
              class="p-button-outlined"
              @click="checkRnd"
            />
          </div>
          <span>{{ check }}</span>
        </div>

        <div class="bdate">
          <div><label>생년월일</label></div>
          <div><InputText type="date" v-model="bdate" class="bdate-txt" /></div>
          <span>{{ bdateErr }}</span>
        </div>

        <div class="join">
          <Button label="회원가입" @click="Join" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      id: "",
      pwd1: "",
      pwd2: "",
      auth: "user",
      name: "",
      phone: "",
      radio: "",
      postcode: "", //우편번호
      address: "", //주소
      extraAddress: "",
      detailAddress: "", //상세주소
      email: "",
      bdate: null, //Date형식
      active: "Y",
      cert: "", //인증번호 입력
      rnd: "", //보낸 인증번호
      check: "", // 인증번호 확인 메시지

      // 에러Msg / pass
      idErr: "",
      pwdErr: "",
      nameErr: "",
      genErr: "",
      phoneErr: "",
      addrErr: "",
      detailErr: "",
      emailErr: "",
      bdateErr: "",
      idPass: false,
      pwdPass: false,
      namePass: false,
      genPass: false,
      phonePass: false,
      addressPass: false,
      detailPass: false,
      emailPass: false,
      bdatePass: false
    };
  },
  computed: {
    addr() {
      return "(" + this.postcode + "), " + this.address + ", " + this.detailAddress;
    }
  },

  methods: {
    //카카오 주소 api
    execDaumPostcode() {
      new window.daum.Postcode({
        oncomplete: data => {
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
              this.extraAddress += this.extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
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
        }
      }).open();
    },

    //메일인증
    sendMail() {
      if (this.email != null && this.email != "") {
        let check = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

        if (!check.test(this.email)) {
          this.emailErr = "이메일 형식이 올바르지 않습니다";
        } else {
          // 이메일 주소 형식O -> axios

          const joinparam = new URLSearchParams();
          joinparam.append("email", this.email);

          axios
            .post("http://localhost:8082/triplus/api/sendmail", joinparam, {
              headers: {
                "Access-Control-Allow-Origin": "*"
              }
            })
            .then(
              function (resp) {
                this.emailErr = "인증번호가 발송되었습니다";
                this.rnd = resp.data.rnd;
              }.bind(this)
            );
        }
      } else {
        this.emailErr = "이메일 주소를 입력하세요";
      }
    },
    //인증번호 확인
    checkRnd() {
      if (parseInt(this.cert) === parseInt(this.rnd)) {
        this.emailPass = true;
        this.check = "인증되었습니다";
      } else {
        this.check = "인증번호가 일치하지 않습니다";
      }
    },

    //아이디 중복확인
    idCheck() {
      let check = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,12}$/;

      if (!check.test(this.id)) {
        this.idErr = "아이디는 영어와 숫자를 조합해서 6~12를 입력하세요 ";
      } else {
        //중복검사

        const joinparam = new URLSearchParams();
        joinparam.append("id", this.id);

        axios
          .post("http://localhost:8082/triplus/member/identifyid", joinparam, {
            headers: {
              "Access-Control-Allow-Origin": "*"
            }
          })
          .then(
            function (resp) {
              if (resp.data.result === "success") {
                this.idErr = "이미 사용중인 아이디입니다";
              } else {
                this.idErr = "사용가능한 아이디입니다";
                this.idPass = true;
              }
            }.bind(this)
          );
      }
    },

    // id값이 변하면 다시 중복확인
    reCheck() {
      this.idPass = false;
      this.idErr = "아이디 중복확인을 해주세요";
    },

    ///////////////////////회원가입 버튼////////////////////////////////////////
    Join() {
      //조건 1) 아이디
      //문제1) 아이디 중복확인을 하고 다른아이디로 변경했을때 중복확인없이 pass처리됨
      if (this.id === null || this.id === "") {
        this.idErr = "아이디를 입력하세요";
      } else {
        if (this.idPass === false) {
          // 중복확인X
          this.idErr = "아이디 중복확인을 해주세요";
        }
      }

      //조건 2) 비밀번호
      if (this.pwd1 != null && this.pwd1 != "" && this.pwd2 != null && this.pwd2 != "") {
        if (this.pwd1 != this.pwd2) {
          this.pwdErr = "비밀번호가 일치하지 않습니다";
        } else {
          // 비밀번호 일치
          let check = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
          if (!check.test(this.pwd1)) {
            alert("비밀번호는 8~16자의 영문 대소문자와 숫자, 특수문자를 사용할 수 있습니다.");
            this.pwdErr = "";
          } else {
            this.pwdErr = "";
            this.pwdPass = true;
          }
        }
      } else {
        this.pwdErr = "비밀번호를 입력하세요";
      }

      //조건 3) 이름
      if (this.name != null && this.name != "") {
        let check = /^[가-힣]{1,10}$/;
        if (!check.test(this.name)) {
          this.nameErr = "이름은 한글로 입력하세요";
        } else {
          this.nameErr = "";
          this.namePass = true;
        }
      } else {
        this.nameErr = "이름을 입력하세요";
      }

      //조건 4) 성별
      if (this.radio != "") {
        this.genErr = "";
        this.genPass = true;
      } else {
        this.genErr = "성별을 선택하세요";
      }

      //조건 5) 전화번호
      if (this.phone != null && this.phone != "") {
        let check = /^[0-9]{2,3}[0-9]{3,4}[0-9]{4}/;
        if (!check.test(this.phone)) {
          this.phoneErr = "전화번호는 하이픈(-) 없이 숫자(10자 또는 11자)로 입력하세요 ";
        } else {
          this.phoneErr = "";
          this.phonePass = true;
        }
      } else {
        this.phoneErr = "전화번호를 입력하세요";
      }

      //조건 6) 주소
      if (this.address === null || this.address === "") {
        this.addrErr = "주소를 입력하세요";
      } else {
        this.addrErr = "";
        this.addressPass = true;
      }

      if (this.detailAddress === null || this.detailAddress === "") {
        this.detailErr = "상세주소를 입력하세요";
      } else {
        this.detailErr = "";
        this.detailPass = true;
      }

      //조건 6) 이메일 / 인증
      if (this.emailPass != true) {
        //alert 나오면 창새로고침 되면서 다 사라짐 > errmsg or toast
        //alert('이메일 인증이 되지 않았습니다');
        this.$toast.add({ severity: "error", summary: "인증 오류", detail: "이메일 인증을 해주세요", life: 3000 });
      }

      //조건 7) 생년월일
      if (this.bdate === null || this.bdate === "") {
        this.bdateErr = "생년월일을 입력하세요";
      } else {
        this.bdateErr = "";
        this.bdatePass = true;
      }

      //전부 입력 / 인증 -> 완료
      if (
        this.idPass === true &&
        this.pwdPass === true &&
        this.namePass === true &&
        this.genPass === true &&
        this.phonePass === true &&
        this.addressPass === true &&
        this.detailPass === true &&
        this.emailPass === true &&
        this.bdatePass === true
      ) {
        const joinparam = new URLSearchParams();
        joinparam.append("id", this.id);
        joinparam.append("pwd", this.pwd2);
        joinparam.append("auth", this.auth); // user로 처리
        joinparam.append("name", this.name);
        joinparam.append("tel", this.phone);
        joinparam.append("gender", this.radio);
        //주소(합처서)
        joinparam.append("addr", this.addr);
        joinparam.append("email", this.email);
        joinparam.append("bDate", this.bdate);
        //regdate 안보내면 자동 null / sysdate처리
        joinparam.append("active", this.active);

        axios
          .post("http://localhost:8082/triplus/api/memberjoin", joinparam, {
            headers: {
              "Access-Control-Allow-Origin": "*"
            }
          })
          .then(
            function (resp) {
              if (resp.data.result === "success") {
                this.$router.push({ name: "join-complete" });
              } else {
                alert("실패");
              }
            }.bind(this)
          );
      } //if
    } //join
  } //method
}; //export
</script>

<style lang="scss" scoped>
.inner {
  width: 1080px;
  border: 1px solid #ccc;
  //#ccc
  border-radius: 10px;
  margin: 0 auto;
  background-color: #eee;
  margin-bottom: 60px;
}
.title {
  text-align: center;
  margin: 50px;
}

.layout {
  margin-left: 270px;
}

.step {
  width: 1080px;
  margin: 0 auto;
  text-align: center;
  margin-bottom: 40px;
}

.step_list {
  display: inline-block;
  width: 100%;
}

.step_list li {
  float: left;
  width: 33%;
  list-style: none;
  font-weight: 500;
}

.step_list li.on span {
  background: #009688;
  color: #fff;
  font-weight: 600;
}

.step_list li span {
  position: relative;
  display: block;
  height: 40px;
  padding: 3px 20px 0 0;
  line-height: 38px;
  text-align: center;
  background: #d5d4d4;
  color: #555;
}

.id {
  margin-top: 50px;
}
.id span,
.pwd span,
.name span,
.radioErr,
.phone span,
.addr span,
.email span,
.bdate span {
  color: red;
}

.id,
.pwd,
.name,
.gender,
.phone,
.addr,
.email,
.bdate {
  margin-bottom: 15px;
}
.pwd-txt {
  margin-bottom: 10px;
}

.addr-txt,
.detail-txt,
.cert-txt {
  margin-top: 10px;
}

.men,
.women {
  margin-right: 7px;
}
.gender span {
  margin-left: 20px;
}

label {
  font-weight: 600;
}

.id-txt,
.pwd-txt,
.pwd2-txt,
.name-txt,
.phone-txt,
.addr-txt,
.detail-txt,
.email-txt,
.bDate-txt,
.cert-txt,
.bdate-txt {
  width: 430px;
  height: 40px;
}
.post-txt {
  height: 40px;
  width: 245px;
}

.join {
  margin-left: 100px;
  margin-bottom: 70px;
  margin-top: 50px;
}

.join button {
  width: 250px;
  height: 40px;
  margin-left: 20px;
}

/*
.cert-txt{
 width: 250px;
  height: 40px;
}
*/

//캘린더

.id button,
.email button {
  width: 180px;
  height: 40px;
  margin-left: 15px;
}
.addr button {
  height: 40px;
  width: 180px;
}
</style>
