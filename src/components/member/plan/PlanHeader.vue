<!--
  220829 김주현
  일정등록 페이지 헤더
-->

<template>
  <div class="navi-header">
    <div>
      <h1><a href="/section/member/schedule/main">국내여행</a></h1>
      <span>{{ list.destination }}여행, {{ $getFormattedDateOnly(new Date(list.sDate)) }} ~ {{ $getFormattedDateOnly(new Date(list.eDate)) }}</span>
      <br />
    </div>
    <div>
      <div class="navi-btnlist">
        <Button class="violet-btn" @click="goInvite()"><i class="pi pi-plus" />일행과 함께 일정 짜기</Button>
      </div>
      <div class="navi-btnlist">
        <Button
          label="체크리스트"
          class="p-button-secondary p-button-rounded p-button-sm mr-4"
          @click="goCheckList()"
        />
        <Button label="가계부" class="p-button-secondary p-button-rounded p-button-sm mr-4" @click="goExpenses()" />
        <Button label="날씨보기" class="p-button-secondary p-button-rounded p-button-sm mr-4" @click="goWeather()" />
        <Button label="채팅" class="p-button-secondary p-button-rounded p-button-sm mr-4" @click="goChat()" />
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import router from "@/router";

export default {
  name: "PlanNavigator",
  props: {},
  data() {
    return {
      list: { sDate: "", eDate: "", days: "", destination: "" },
      week: ["일", "월", "화", "수", "목", "금", "토"]
    };
  },
  mounted() {
    this.getDate();
  },
  methods: {
    goInvite() {},
    goCheckList() {
      router.push("/member/plan/checklist");
    },
    goExpenses() {
      // TODO 일정번호 임시값
      router.push({ name: "member-expenses", params: { skdNum: 1 } });
      // router.push("/member/plan/expenses");
    },
    goWeather() {
      router.push("/section/member/schedule/weather");
    },
    goChat() {
      alert("미구현");
    },
     getDate() {
      const getUrl = `${process.env.VUE_APP_API_URL || ""}/section/schedules/${this.$route.params.skdNum}`;
      axios.get(getUrl).then(
        function (resp) {
          // console.log(resp.data);
          this.list = resp.data;
        }.bind(this)
      );
    }
  }
};
</script>

<style scoped>
.navi-header {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
}
.navi-header > div {
  margin: 5px;
}
.navi-header div Button {
  margin-top: 5px;
}
.navi-header div .navi-btnlist > * {
  margin: 10px 0px 0px 0px;
}

.violet-btn {
  background-color: white;
  color: #756af6;
  border: 1px solid #756af6;
  justify-content: center;
}
</style>
