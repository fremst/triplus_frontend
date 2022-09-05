<template>
  <div class="wrapper">
    <div class="inner">
      <div>
        <h1>상품 정보</h1>
        <br />
        <table>
          <tr>
            <td class="td-title">상품 번호</td>
            <td>{{ packageDetails.brdNum }}</td>
          </tr>
          <tr>
            <td>상&ensp;품&ensp;명</td>
            <td>{{ packageDetails.title }}</td>
          </tr>
          <tr>
            <td>여행 기간</td>
            <td>{{ packageDetails.period }}</td>
          </tr>
          <tr>
            <td>출&ensp;발&ensp;일</td>
            <td>{{ $getFormattedDate(new Date(packageDetails.sdate)) }}</td>
          </tr>
          <tr>
            <td>도&ensp;착&ensp;일</td>
            <td>{{ $getFormattedDate(new Date(packageDetails.edate)) }}</td>
          </tr>
          <tr>
            <td>여&ensp;행&ensp;자</td>
            <td>
              성인 {{ $route.query.adultCnt }}명
              <span v-if="$route.query.childCnt > 0">/ 아동 {{ $route.query.childCnt }}명</span>
            </td>
          </tr>
        </table>
        <br />
        <h1>예약자 정보</h1>
        <br />
        <table>
          <tr>
            <td class="td-title">이&emsp;&emsp;&nbsp;름</td>
            <td>
              {{ bookerInfo.name }}
              <InputText type="text" class="p-inputtext-sm" name="bookerName" v-model="bookerInfo.name" hidden />
            </td>
            <td>생년월일</td>
            <td>
              <InputText type="date" class="p-inputtext-sm" name="bookerBDate" v-model="bookerInfo.bDate" />
            </td>
          </tr>
          <tr>
            <td>이&ensp;메&ensp;일</td>
            <td colspan="3">
              <InputText
                type="text"
                class="p-inputtext-sm"
                :class="{ 'p-invalid': submitted && !validateEmail }"
                v-model="bookerInfo.emailId"
              />
              &nbsp;@&nbsp;
              <Dropdown
                v-model="selectedEmail"
                class="p-inputtext-sm"
                :class="{ 'p-invalid': submitted && !validateEmail }"
                :options="domains"
                editable
                optionLabel="name"
                placeholder="직접입력"
              />
              <small v-if="submitted && !validateEmail" class="p-error">&nbsp;이메일을 정확히 입력해 주세요.</small>
            </td>
          </tr>
          <tr>
            <td>전화 번호</td>
            <td colspan="4">
              <InputText
                type="text"
                class="p-inputtext-sm"
                :class="{ 'p-invalid': submitted && !bookerInfo.tel }"
                name="bookerTel"
                v-model="bookerInfo.tel"
              />
              <small v-if="submitted && !bookerInfo.tel" class="p-error">&nbsp;전화 번호를 입력해 주세요.</small>
            </td>
          </tr>
        </table>
        <br />
        <h1 v-if="list.length > 0">동행자 정보</h1>
        <br />
        <table v-for="(pkgCom, i) in list" :key="i">
          <tr>
            <td class="td-title">구&emsp;&emsp;&nbsp;분</td>
            <td>
              {{ pkgCom.class }}
            </td>
          </tr>
          <tr>
            <td>이&emsp;&emsp;&nbsp;름</td>
            <td>
              <InputText
                type="text"
                class="p-inputtext-sm"
                :class="{ 'p-invalid': submitted && !pkgCom.name }"
                v-model="pkgCom.name"
              />
              <small v-if="submitted && !pkgCom.name" class="p-error">&nbsp;이름을 입력해 주세요.</small>
            </td>
          </tr>
          <tr>
            <td>전화 번호</td>
            <td>
              <InputText
                type="text"
                class="p-inputtext-sm"
                :class="{ 'p-invalid': submitted && !pkgCom.tel }"
                v-model="pkgCom.tel"
              />
              <small v-if="submitted && !pkgCom.tel" class="p-error">&nbsp;전화 번호를 입력해 주세요.</small>
            </td>
          </tr>
          <tr>
            <td>성&emsp;&emsp;&nbsp;별</td>
            <td>
              <RadioButton :id="'male' + i" name="gender" value="M" v-model="pkgCom.gender" />
              <label :for="'male' + i">&nbsp;남성</label>
              &nbsp;
              <RadioButton :id="'female' + i" name="gender" value="F" v-model="pkgCom.gender" />
              <label :for="'female' + i">&nbsp;여성</label>
            </td>
          </tr>
        </table>
        <br />
        <h1>할인 쿠폰 선택</h1>
        <br />
        <table>
          <tr>
            <td class="td-title">적용된 쿠폰</td>
            <td>
              <Dropdown
                v-model="selectedCpnNum"
                class="p-inputtext-sm"
                :options="coupons"
                optionLabel="name"
                placeholder="쿠폰 선택"
                empty-message="사용 가능한 쿠폰 없음"
              />
              &nbsp;
              <Button class="p-button-sm"> 쿠폰 적용 </Button>
            </td>
          </tr>
          <tr v-if="selectedCpnNum != 0">
            <td>할인금액</td>
            <td>{{ $getFormattedCurrency(discAmt) }}</td>
          </tr>
        </table>
        <br />
        <div class="box">
          <table>
            <tr>
              <td class="td-price">상품 금액</td>
              <td class="td-price">할인 금액</td>
              <td class="td-price">총&emsp;&emsp;&nbsp;액</td>
            </tr>
            <tr>
              <td class="td-price">
                {{ $getFormattedCurrency(packageDetails.adultPrice) }} x {{ $route.query.adultCnt }}
                <span v-if="$route.query.childCnt > 0">
                  +
                  {{ $getFormattedCurrency(packageDetails.childPrice) }} x {{ $route.query.childCnt }}
                </span>
                =
                {{
                  $getFormattedCurrency(
                    packageDetails.adultPrice * $route.query.adultCnt +
                      packageDetails.childPrice * $route.query.childCnt
                  )
                }}
              </td>
              <td class="td-price">{{ $getFormattedCurrency(discAmt) }}</td>
              <td class="td-price">
                {{
                  $getFormattedCurrency(
                    packageDetails.adultPrice * $route.query.adultCnt +
                      packageDetails.childPrice * $route.query.childCnt -
                      discAmt
                  )
                }}
              </td>
            </tr>
          </table>
        </div>
        <form
          id="payForm"
          action="http://localhost:8082/triplus/api/v1/pay/pcpay"
          method="POST"
          target="payFormFrame"
          hidden
        >
          <input name="brdNum" type="text" :value="$route.params.brdNum" /><br />
          <input name="goodName" type="text" :value="packageDetails.title" /><br />

          <input name="adultCnt" type="text" :value="$route.query.adultCnt" /><br />
          <input name="childCnt" type="text" :value="$route.query.childCnt" /><br />

          <input
            name="price"
            readonly
            type="text"
            :value="
              packageDetails.adultPrice * $route.query.adultCnt +
              packageDetails.childPrice * $route.query.childCnt -
              discAmt
            "
          />원<br />
          <input name="cpnNum" readonly type="text" :value="selectedCpnNum" /><br /><br />

          <input name="id" type="text" :value="bookerInfo.id" /><br />
          <input name="bookerName" type="text" :value="bookerInfo.name" /><br />
          <input name="bookerTel" type="text" :value="bookerInfo.tel" /><br />
          <input name="bookerEmail" type="text" :value="bookerEmail" /><br />

          <input v-for="(pkgCom, index) in list" :key="index" :value="pkgCom.class" name="pkgComClass" /><br />
          <input v-for="(pkgCom, index) in list" :key="index" :value="pkgCom.name" name="pkgComName" /><br />
          <input v-for="(pkgCom, index) in list" :key="index" :value="pkgCom.tel" name="pkgComTel" /><br />
          <input v-for="(pkgCom, index) in list" :key="index" :value="pkgCom.gender" name="pkgComGender" /><br />

          <button type="submit">결제하기</button>
        </form>
        <br />
        <div class="btns">
          <Button @click="$router.back()">뒤로가기</Button>&emsp;
          <Button @click="pay()" form="payForm">결제하기</Button>
        </div>
        <br />
        <iframe
          name="payFormFrame"
          :style="{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', display: iframeDisplay }"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { defaultOptions } from "@/constant/axios.js";

export default {
  data() {
    return {
      iframeDisplay: "none",
      packageDetails: {
        sDate: null,
        eDate: null
      },
      selectedEmail: "triplus.com",
      bookerInfo: {
        name: null,
        bDate: null,
        gender: null,
        emailId: null,
        tel: null
      },
      list: [],
      selectedCpnNum: 0,
      domains: [{ name: "naver.com" }, { name: "gmail.com" }, { name: "daum.net" }, { name: "nate.com" }],
      coupons: [],
      discAmt: 0,
      submitted: false
    };
  },

  computed: {
    bookerEmail() {
      if (typeof this.selectedEmail == "object") {
        return this.bookerInfo.emailId + "@" + this.selectedEmail.name;
      }
      return this.bookerInfo.emailId + "@" + this.selectedEmail;
    },

    validateEmail() {
      if (!this.bookerInfo.emailId) {
        return false;
      } else {
        return this.validateEmailDomain;
      }
    },

    validateEmailDomain() {
      if (typeof this.selectedEmail == "object") {
        return true;
      } else {
        const indexOfDot = this.selectedEmail.indexOf(".");
        if (indexOfDot == -1) {
          return false;
        } else {
          return indexOfDot != this.selectedEmail.length - 1;
        }
      }
    }
  },

  mounted() {
    for (let i = 0; i < this.$route.query.adultCnt - 1; i++) {
      this.list.push({ name: "", class: "성인", gender: "M" });
    }
    for (let i = 0; i < this.$route.query.childCnt; i++) {
      this.list.push({ name: "", class: "아동", gender: "M" });
    }
  },

  methods: {
    pay() {
      this.submitted = true;
      if (this.validateForm()) {
        this.iframeDisplay = "block";
        document.getElementById("payForm").submit();
      }
    },

    validateForm() {
      if (!this.bookerInfo.tel) {
        return false;
      }
      if (!this.validateEmail) {
        return false;
      }
      for (let i = 0; i < this.list.length; i++) {
        if (!this.list[i].name || !this.list[i].tel) return false;
      }
      return true;
    }
  },

  async created() {
    const getPkgUrl = `${process.env.VUE_APP_API_URL || ""}/section/packages/${this.$route.params.brdNum}`;

    const pkgRes = await axios.get(getPkgUrl, defaultOptions).catch(err => {
      alert("서버 연결 실패", err);
    });

    this.packageDetails = Object.assign(pkgRes.data.dto, pkgRes.data.map);

    const getMbrUrl = `${process.env.VUE_APP_API_URL || ""}/member/mypage/find/${localStorage.getItem("id")}`;

    const mbrRes = await axios.get(getMbrUrl, defaultOptions).catch(err => {
      alert("서버 연결 실패", err);
    });

    this.bookerInfo = mbrRes.data.dto;
    let bookerEmail = this.bookerInfo.email.split("@");
    this.bookerInfo.emailId = bookerEmail[0];
    this.selectedEmail = bookerEmail[1];
  }
};
</script>

<style scoped>
.box {
  border: 1px solid #dee2e6;
  padding: 30px 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

tr {
  border-top: 1px solid #dee2e6;
  border-bottom: 1px solid #dee2e6;
  height: 50px;
}

td {
  padding: 15px;
  text-align: left;
}

.td-title {
  width: 150px;
}

td:not(:last-child) {
  border-right: 1px solid #dee2e6;
}

.td-price {
  text-align: center;
}

.wrapper {
  width: 1080px;
  margin: auto;
}

.inner {
  width: 900px;
  margin: auto;
}

.btns {
  text-align: center;
}
</style>
