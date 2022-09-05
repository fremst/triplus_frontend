<template>
  <div class="wrap">
    <div class="inner">
      <Fieldset legend="여행일정 등록" class="fieldset-area">
        <div>
          <InputText style="width: 350px" readonly :value="formattedDate" />
          <h3>일정에 따른 날씨예보, 여행 정보를 알려드립니다.</h3>
        </div>
        <Calendar
          id="range"
          v-model="dates"
          dateFormat="dd-mm-yy"
          selectionMode="range"
          format="yy-mm-dd"
          :inline="true"
          style="width: 450px"
        />
        <div>
          <span class="p-input-icon-left">
            <i class="pi pi-map-marker" />
            <InputText type="text" v-model="destination" placeholder="목적지를 입력하세요" />
          </span>
        </div>
      </Fieldset>
      <div class="button-area">
        <Button label="이전" class="p-button-secondary mr-2" />
        <Button label="등록" @click="goNext" />
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
        alert("일정추가 실패", err);
      });

      if (response.data.result === "success") {
        alert("일정추가 성공");
        router.push("/section/member/schedule/main");
      } else {
        alert("일정추가 실패");
      }
    },
    getFormattedDate(date) {
      if (date) {
        console.log(date);
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      } else {
        return "";
      }
    }
  }
};
</script>

<style scoped>
.wrap {
  width: 100%;
}
.inner {
  width: 750px;
  margin: 0 auto;
}

.fieldset-area {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
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
  margin-bottom: 30px;
}
</style>
