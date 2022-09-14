<template>
  <div class="wrap">
    <div class="inner">
      <div class="title-area">
        <h3>일정에 따른 여행 정보를 알려드립니다.</h3>
        <InputText
          style="width: 700px; text-align: center"
          class="mt-2 mb-3"
          readonly
          :value="formattedDate"
          placeholder="선택하신 날짜가 나타납니다."
        />
      </div>
      <Calendar
        id="range"
        v-model="dates"
        dateFormat="dd-mm-yy"
        selectionMode="range"
        format="yy-mm-dd"
        :inline="true"
        style="width: 700px"
        class="mb-3"
      />
      <div>
        <span class="p-input-icon-left mt-2 mb-3">
          <i class="pi pi-map-marker" />
          <InputText type="text" style="width: 350px" v-model="destination" placeholder="목적지를 입력하세요" />
        </span>
      </div>
      <div class="button-area">
        <Button label="이전" class="p-button-secondary mr-4 p-button-sm" style="width: 100px" />
        <Button label="등록" class="p-button-sm" style="width: 100px" @click="goNext" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";
import { defaultOptions } from "@/constant/axios.js";

export default {
  created() {
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = month === 0 ? 11 : month - 1;
    let prevYear = prevMonth === 11 ? year - 1 : year;
    let nextMonth = month === 11 ? 0 : month + 1;
    let nextYear = nextMonth === 0 ? year + 1 : year;
    this.minDate = new Date();
    this.minDate.setMonth(prevMonth);
    this.minDate.setFullYear(prevYear);
    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
    this.maxDate.setFullYear(nextYear);

    let invalidDate = new Date();
    invalidDate.setDate(today.getDate() - 1);
    this.invalidDates = [today, invalidDate];
  },
  data() {
    return {
      dates: null,
      minDate: null,
      maxDate: null,
      invalidDates: null,
      destination: null,
      id: localStorage.getItem("id"),
      responsiveOptions: [
        {
          breakpoint: "1400px",
          numMonths: 2
        },
        {
          breakpoint: "1200px",
          numMonths: 1
        }
      ]
    };
  },
  computed: {
    formattedDate() {
      if (this.dates) {
        return this.getFormattedDate(this.dates[0]) + " ~ " + this.getFormattedDate(this.dates[1]);
      } else {
        return null;
      }
    }
  },
  methods: {
    async goNext() {
      this.submitted = true;

      const params = new URLSearchParams();
      params.append("sDate", this.dates[0].toISOString());
      params.append("eDate", this.dates[1].toISOString());
      params.append("destination", this.destination);
      params.append("id", this.id);

      const postUrl = `${process.env.VUE_APP_API_URL || ""}/section/schedules/`;
      const response = await axios.post(postUrl, params, defaultOptions).catch(err => {
        this.serverError();
        console.log(err);
      });

      if (response.data.result === "success") {
        router.push({ name: "add-schedule-main", params: { skdNum: response.data.skdNum } });
      } else {
        this.showError();
      }
    },
    getFormattedDate(date) {
      if (date) {
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      } else {
        return "";
      }
    },
    showError() {
      this.$toast.add({ severity: "error", summary: "Error Message", detail: "일정추가 실패", life: 3000 });
    },
    serverError() {
      this.$toast.add({ severity: "error", summary: "Error Message", detail: "서버에러", life: 3000 });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/main.scss";
.wrap {
  width: 100%;
  height: auto;
}
.inner {
  @include c-center;
  position: relative;
  width: 1080px;
  height: auto;
  margin: 0 auto;
}
.title-area {
  margin-top: 40px;
}

.calendar-field {
  margin-top: 30px;
  margin-bottom: 30px;
}
.calendar-input {
  margin-bottom: 20px;
}
.p-datepicker table td > span.p-highlight {
  color: white;
  background: cornflowerblue;
}
.button-area {
  margin-top: 20px;
  margin-bottom: 40px;
  position: relative;
}
</style>
