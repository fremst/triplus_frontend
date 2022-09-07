<template>
  <div class="wrap">
    <div class="inner">
      <div class="main-table">
        <PlanNavigator />
        <PlaceMapView :events="events" />
        <div>
          <AddScheduleDialog
            v-model:visible="showConfirmDialog"
            @addMarker="addMySchedule"
            @closeDialog="closePlaceDialog"
            :skdNum="parseInt(this.$route.params.skdNum)"
          />
          <div>
            <Dropdown
              v-model="selectedDay"
              :options="days"
              optionLabel="name"
              optionValue="value"
              placeholder="-- 일정일 선택 --"
              style="width: 200px"
            >
            </Dropdown>
            <Button lable="일정추가" class="p-button-outlined p-button-primary" @click="openDialog('addPlace', true)"
              >일정추가</Button
            >
            <div v-for="(event, i) in events" :key="i" class="timeline">
              <div v-if="event.length > 0">
                {{
                  this.$getFormattedDate(
                    new Date(new Date(this.list.sDate).setDate(new Date(this.list.sDate).getDate() + i))
                  )
                }}
                <Timeline :value="event">
                  <template #opposite="slotProps">
                    <small class="p-text-secondary">{{ slotProps.item.date }}</small>
                  </template>
                  <template #content="slotProps">
                    {{ slotProps.item.status }}
                  </template>
                </Timeline>
                <Toast />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import router from "@/router";
import PlanNavigator from "@/components/member/plan/PlanHeader.vue";
import PlaceMapView from "@/views/section/member/PlaceMapView.vue";
import AddScheduleDialog from "@/views/section/member/AddSchedulePlaceView.vue";
import { defaultOptions } from "@/constant/axios";
export default {
  data() {
    return {
      list: [{ sDate: null, eDate: "", days: "", destination: "" }],
      week: ["일", "월", "화", "수", "목", "금", "토"],
      showConfirmDialog: false,
      events: [],
      schduleDialog: false,
      selectedDay: null
    };
  },
  computed: {
    days() {
      let result = [];
      if (this.list.sDate) {
        let sDate = this.list.sDate;
        for (let day = 0; day < this.list.days; day++) {
          result.push({
            name: this.$getFormattedDate(new Date(new Date(sDate).setDate(new Date(sDate).getDate() + day))),
            value: day
          });
        }
      }
      return result;
    }
  },
  components: {
    PlanNavigator,
    PlaceMapView,
    AddScheduleDialog
  },
  created() {
    this.getDate();
    this.getDateList();
  },
  methods: {
    async getDate() {
      const getUrl = `${process.env.VUE_APP_API_URL || ""}/section/schedules/${this.$route.params.skdNum}`;
      const resp = await axios.get(getUrl, defaultOptions).catch(err => {
        this.$toast.add({
          severity: "error",
          summary: "",
          detail: err,
          life: 3000
        });
      });

      this.list = resp.data;

      for (let i = 0; i < this.list.days; i++) {
        this.events.push([]);
      }
    },
    async getDateList() {
      const getUrl = `${process.env.VUE_APP_API_URL || ""}/section/schedules/spots/${this.$route.params.skdNum}`;
      const resp = await axios.get(getUrl, defaultOptions).catch(err => {
        this.$toast.add({
          severity: "error",
          summary: "",
          detail: err,
          life: 3000
        });
      });

      console.log(resp);
      // console.log("aa", resp.data.data);

      // this.list = resp.data.data;
    },
    getFormattedDate(date) {
      if (date) {
        return date.getMonth() + 1 + "-" + date.getDate() + " ( " + this.week[date.getDay()] + " )";
      } else {
        return "";
      }
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
    async addMySchedule(selectedPlaceInfo, date, memo) {
      // console.log(this.events);
      // console.log("추가될 때 선택된 day", this.selectedDay);
      console.log("sp", selectedPlaceInfo);

      const event = {
        status: selectedPlaceInfo.title,
        date: "일정시간 : " + date.getHours() + ":" + date.getMinutes() + " / 메모 : " + memo,
        icon: "pi pi-cog",
        color: "#673AB7",
        mapx: selectedPlaceInfo.mapx,
        mapy: selectedPlaceInfo.mapy
      };
      // if (!this.event[this.selectedDay]) {
      // this.events[this.selectedDay] = event;
      // } else {
      console.log(this.events);
      this.events[this.selectedDay].push(event);
      // }

      const params = new URLSearchParams();
      params.append("skdNum", this.$route.params.skdNum);
      params.append("day", this.selectedDay);
      params.append("memo", event.date);
      params.append("brdNum", selectedPlaceInfo.brdNum);

      const postUrl = `${process.env.VUE_APP_API_URL || ""}/section/schedules/spot/`;

      const res = await axios.post(postUrl, params, defaultOptions).catch(err => {
        this.$toast.add({
          severity: "error",
          summary: "",
          detail: err,
          life: 3000
        });
      });

      if (res.data.result === "success") {
        this.$toast.add({
          severity: "success",
          summary: "",
          detail: "일정 등록 성공",
          life: 3000
        });
      } else {
        this.$toast.add({
          severity: "error",
          summary: "",
          detail: "일정 등록 실패",
          life: 3000
        });
      }

      this.showConfirmDialog = false;
    },
    saveMySchedule() {
      const params = new URLSearchParams();
      params.append("skdNum", this.$route.params.skdNum);
      params.append("day", this.day);
      params.append("memo", this.memo);
      params.append("brdNum", this.brdNum);

      console.log(this.$route.params.skdNum);
      console.log(this.day);
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
.timeline {
  min-height: 100px;
}
.save-button {
  float: right;
}
</style>
