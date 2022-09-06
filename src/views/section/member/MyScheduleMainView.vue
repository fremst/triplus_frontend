<template>
  <div class="wrap">
    <div class="inner">
      <div class="main-table">
        <PlanNavigator />
        <PlaceMapView :events="events" />
        <table class="schedule-table">
          <AddScheduleDialog
            v-model:visible="showConfirmDialog"
            @addMarker="addMySchedule"
            @closeDialog="closePlaceDialog"
            :skdNum="this.$route.params.skdNum"
          />
          <Button
            lable="일정추가"
            class="p-button-outlined p-button-primary p-button-sm mb-3"
            @click="openDialog('addPlace', true, i)"
            >일정추가</Button
          >
          <tr v-for="(day, i) in list.days" :key="i">
            <td class="add-schedule">
              day{{ day }} / {{ dateCalc(i) }}<br />
              <div class="card">
                <Timeline :value="events">
                  <template #opposite="slotProps">
                    <small class="p-text-secondary">{{ slotProps.item.date }}</small>
                  </template>
                  <template #content="slotProps">
                    {{ slotProps.item.status }}
                  </template>
                </Timeline>
              </div>
            </td>
          </tr>
        </table>
        <Button lable="일정저장" class="p-button p-button-primary p-button-sm mb-3" @click="saveMySchedule"
          >일정저장</Button
        >
      </div>
    </div>
  </div>
</template>
<script>
//import day from "public/demo/data/day.json";
import axios from "axios";
import router from "@/router";
import PlanNavigator from "@/components/member/plan/PlanHeader.vue";
import PlaceMapView from "@/views/section/member/PlaceMapView.vue";
import AddScheduleDialog from "@/views/section/member/AddSchedulePlaceView.vue";
import { defaultOptions } from "@/constant/axios";
export default {
  data() {
    return {
      list: [{ sDate: "", eDate: "", days: "", destination: "" }],
      week: ["일", "월", "화", "수", "목", "금", "토"],
      showConfirmDialog: false,
      events: [],
      schduleDialog: false
    };
  },
  components: {
    PlanNavigator,
    PlaceMapView,
    AddScheduleDialog
  },
  created() {
    this.getDate();
    this.dateCalc();
  },
  methods: {
    async getDate() {
      const getUrl = `${process.env.VUE_APP_API_URL || ""}/section/schedules/${this.$route.params.skdNum}`;
      const resp = await axios.get(getUrl, defaultOptions).catch(err => {
        this.serverError(err);
      });

      this.list = resp.data;
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
    openDialog(dialogType, show) {
      if (dialogType === "addPlace") {
        this.showConfirmDialog = show;
      }
    },
    serverError() {
      this.$toast.add({ severity: "error", summary: "Error Message", detail: "서버에러", life: 3000 });
    },
    closePlaceDialog(value) {
      if (!value) {
        return false;
      } else {
        return true;
      }
    },
    goWeather() {
      router.push("/section/member/schedule/weather");
    },
    addMySchedule(selectedProducts, date) {
      console.log(this.events);
      this.events.push({
        status: selectedProducts.title,
        date: date.getHours() + ":" + date.getMinutes() + " / " + this.memo,
        icon: "pi pi-cog",
        color: "#673AB7",
        mapx: selectedProducts.mapx,
        mapy: selectedProducts.mapy
      });
      this.showConfirmDialog = false;
    },
    saveMySchedule() {
      const params = new URLSearchParams();
      params.append("skdNum", this.$route.params.skdNum);
      params.append("day", this.day);
      params.append("memo", this.memo);
      params.append("brdNum", this.brdNum);

      console.log(params);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/scss/main.scss";
.wrap {
  @include center;
  width: 100%;
}
.inner {
  @include c-center;
  width: 1080px;
  margin: 20px auto;
}

.schedule-table {
  @include center;
  margin-bottom: 20px;
}
.p-timeline-event-opposite {
  @include c-center;
}
.add-schedule {
  width: 300px;
  height: auto;
  padding-top: 30px;
}
Button {
  margin-top: 5px;
  margin-bottom: 10px;
}
.p-button-outlined {
  width: 220px;
  margin-left: 50px;
  display: inline;
  text-align: center;
  align-items: center;
}
</style>
