<template>
  <div class="wrap">
    <div class="inner">
      <div class="main-table">
        <h1>국내여행</h1>
        <span>{{ this.list.destination }}여행, {{ this.list.sDate }} ~ {{ this.list.eDate }}</span
        ><br />
        <Button label="일행과 함께 일정짜기" icon="pi pi-plus" class="p-button-primary mr-3" /><br />
        <Button label="숙소" icon="pi pi-plus" class="p-button-secondary p-button-rounded p-button-sm mr-4" /><Button
          label="체크리스트"
          class="p-button-secondary p-button-rounded p-button-sm mr-4"
        /><Button label="가계부" class="p-button-secondary p-button-rounded p-button-sm mr-4" />
        <table class="schedule-table">
          <tr v-for="(day, i) in list.day" :key="i">
            <td>
              day{{ day }} / {{ dateCalc(i) }}<br />
              <Button lable="장소추가" class="p-button-outlined p-button-success p-button-sm mr-6" @click="palceModal()"
                >장소추가</Button
              >
              <Button lable="메모추가" class="p-button-outlined p-button-success p-button-sm" @click="addMemo()"
                >메모추가</Button
              >
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
//import day from "public/demo/data/day.json";
import axios from "axios";
import router from "@/router";
export default {
  data() {
    return {
      list: [{ sDate: "", eDate: "", day: "", destination: "" }],
      week: ["일", "월", "화", "수", "목", "금", "토"]
    };
  },
  created() {
    this.getDate();
    this.dateCalc();
  },
  methods: {
    // getDate() {
    //   const getUrl = `${process.env.VUE_APP_API_URL || ""}/section/member/`;
    //   axios.get(getUrl, this.data);
    // },
    getDate() {
      axios.get("/demo/data/day.json").then(
        function (resp) {
          this.list = resp.data;
        }.bind(this)
      );
    },
    getFormattedDate(date) {
      if (date) {
        return date.getMonth() + 1 + "-" + date.getDate() + " ( " + this.week[date.getDay()] + " )";
      } else {
        return "";
      }
    },
    dateCalc(i) {
      let calcDate = new Date(this.list.sDate);
      calcDate.setDate(calcDate.getDate() + i);
      return this.getFormattedDate(calcDate);
    },
    addPlace() {
      router.push("/section/member/schedule/add-place");
    },
    addMemo() {
      router.push("/section/member/schedule/add-memo");
    },
    palceModal() {}
  }
};
</script>
<style scoped>
.wrap {
  width: 100%;
}
.inner {
  width: 1080px;
  margin: 10px auto;
}
.main-table {
  width: 650px;
  margin: 0 auto;
}
.schedule-table {
  margin-left: 150px;
  margin-bottom: 20px;
}
Button {
  margin-top: 5px;
  margin-bottom: 10px;
}
.p-button-outlined {
  width: 200px;
  display: inline;
  text-align: center;
}
</style>
