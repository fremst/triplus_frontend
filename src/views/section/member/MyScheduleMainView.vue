<template>
  <div class="wrap">
    <div class="inner">
      <div class="main-table">
        <PlanNavigator />
        <PlaceMapView />
        <table class="schedule-table">
          <tr v-for="(day, i) in list.day" :key="i">
            <td class="add-schedule">
              day{{ day }} / {{ dateCalc(i) }}<br />
              <Button
                lable="일정추가"
                class="p-button-outlined p-button-primary p-button-sm mb-3"
                @click="openDialog('addPlace', true)"
                >일정추가</Button
              >
              <AddScheduleDialog v-model:visible="showConfirmDialog" @closeDialog="closePlaceDialog" />
              <div class="card">
                <Timeline :value="events1">
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
export default {
  data() {
    return {
      list: [{ sDate: "", eDate: "", day: "", destination: "" }],
      week: ["일", "월", "화", "수", "목", "금", "토"],
      showConfirmDialog: false,
      events1: [
        { status: "Processing", date: "15/10/2020 14:00", icon: "pi pi-cog", color: "#673AB7" },
        { status: "Processing", date: "15/10/2020 14:00", icon: "pi pi-cog", color: "#673AB7" },
        { status: "Shipped", date: "2022/10/10 16:15", icon: "pi pi-shopping-cart", color: "#FF9800" },
        { status: "Delivered", date: "16/10/2020 10:00", icon: "pi pi-check", color: "#607D8B" }
      ],
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
    // getDate() {
    //   const getUrl = `${process.env.VUE_APP_API_URL || ""} api/section/schedules/{skdNum}`;
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
    openDialog(dialogType, show) {
      if (dialogType === "addPlace") {
        this.showConfirmDialog = show;
      }
    },
    closePlaceDialog(value) {
      if (!value) {
        return false;
      } else {
        this.goList(-1);
      }
    },
    goWeather() {
      router.push("/section/member/schedule/weather");
    }
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
.add-schedule {
  padding-top: 30px;
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
