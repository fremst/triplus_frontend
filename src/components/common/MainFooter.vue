<template>
  <div class="wrap">
    <div class="footer">
      <div class="foote-logo">
        <img :src="require('@/assets/logo_b.png')" class="logo" />
      </div>
      <div class="footer-msg">
        <h3>트리플러스</h3>
        <br />
        <h4>이용 약관 및 면책 조항 트리플러스 이용약관 개인정보 처리방침 취소 및 환불 정책</h4>
        <p>
          주소 : 우편번호 (00000) 서울 종로구 율곡로10길 105 디아망 4층<br />
          (주) 트리플러스 이메일 : admin@triplus.co.kr 개인정보관리책임자 : 김트리플러스 TEL : 02-000-0000 FAX :
          02-000-0000 <br />
          고객만족실 : 1588-0000 멤버십 문의 : 1588-1111 <br />
          Copyright (c) 2022 TRIPLUS. All Rights Reserved.
        </p>
      </div>
    </div>
    <QnAWidget></QnAWidget>
  </div>
</template>

<script>
import QnAWidget from "@/components/member/service/QnAWidget.vue";

export default {
  name: "MainFooter",
  components: {
    QnAWidget
  }
};
</script>

<style scoped>
.logo {
  height: 150px;
  width: 170px;
  margin-top: 30px;
}
.footer {
  height: 200px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  border-top: 1px solid #bdbdbd;
}
.footer-msg {
  margin: 30px;
}
h4 {
  color: #bdbdbd;
}
h3 {
  color: #bdbdbd;
}
p {
  font-size: 12px;
  color: #bdbdbd;
}
a {
  text-decoration: none;
}
.loginLink {
  color: #333333;
}
</style>
