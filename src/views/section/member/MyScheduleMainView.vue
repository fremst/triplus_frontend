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
            <Dropdown v-model="selectedDay" :options="days" optionLabel="name" optionValue="value" style="width: 200px">
            </Dropdown>
            <Button lable="일정추가" class="p-button-outlined p-button-primary" @click="openDialog('addPlace', true)"
              >일정추가</Button
            >
            <div v-for="(event, i) in events" :key="i" class="timeline" style="margin-top: 30px">
              <div style="padding-left: 200px">
                {{
                  this.$getFormattedDate(
                    new Date(new Date(this.list.sDate).setDate(new Date(this.list.sDate).getDate() + i))
                  )
                }}
                <hr style="width: 700px" />
              </div>
              <div style="margin-top: 30px">
                <Timeline :value="event" v-if="event.length > 0">
                  <template #opposite="slotProps">
                    <Text class="p-text-secondary">{{ slotProps.item.date }}</Text>
                  </template>
                  <template #content="slotProps">
                    {{ slotProps.item.status }}
                    <Button
                      class="p-button-sm p-button-rounded ml-4"
                      label="삭제"
                      @click="openConfirmDialog('delete', true, slotProps.item.spotNum)"
                      >삭제</Button
                    >
                    <ConfirmDialog
                      v-model:visible="showDeleteConfirmDialog"
                      :msg="'선택하신 일정을 삭제하시겠습니까?'"
                      @closeDialog="deleteMySchedule"
                    />
                  </template>
                </Timeline>
                <p v-else style="display: flex; justify-content: center">등록된 일정이 없습니다.</p>
              </div>
              <Toast />
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
import ConfirmDialog from "@/views/admin/place/ConfirmDialog.vue";
import { defaultOptions } from "@/constant/axios";
export default {
  data() {
    return {
      list: [{ sDate: null, eDate: "", days: "", destination: "" }],
      week: ["일", "월", "화", "수", "목", "금", "토"],
      showConfirmDialog: false,
      showDeleteConfirmDialog: false,
      events: [],
      schduleDialog: false,
      selectedDay: 0,
      selectedSpotNum: null
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
    AddScheduleDialog,
    ConfirmDialog
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
      // this.selectedDay = this.list.sDate;

      for (let i = 0; i < this.list.days; i++) {
        this.events.push([]);
      }
    },
    openConfirmDialog(dialogType, show, spotNum) {
      if (dialogType === "delete") {
        this.showDeleteConfirmDialog = show;
        this.selectedSpotNum = spotNum;
      }
    },
    async deleteMySchedule(value) {
      if (!value) {
        return false;
      } else {
        console.log(this.$route.params.spotNum);
        const deleteUrl = `${process.env.VUE_APP_API_URL || ""}/section/schedules/spots/${this.selectedSpotNum}`;
        const resp = await axios.delete(deleteUrl, defaultOptions).catch(err => {
          this.$toast.add({
            severity: "error",
            summary: "",
            detail: err,
            life: 3000
          });
        });
        if (resp.data.result === "success") {
          this.$toast.add({
            severity: "success",
            summary: "",
            detail: "일정 삭제 성공",
            life: 3000
          });
          this.$router.go();
        }
        // this.list = resp.data.data;
        // console.log("list", this.list);
        // this.$router.push({ name: "add-schedule-main", params: { brdNum: this.brdNum } });
      }
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
      let event = {
        status: selectedPlaceInfo.title,
        date: date.toLocaleTimeString().substring(0, 7) + " / 메모 : " + memo,
        icon: "pi pi-cog",
        color: "#673AB7",
        mapx: selectedPlaceInfo.mapx,
        mapy: selectedPlaceInfo.mapy
      };

      // this.events[this.selectedDay].push(event);

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
        event.spotNum = res.data.spotNum;
        this.events[this.selectedDay].push(event);

        this.events[this.selectedDay].sort(function (a, b) {
          return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
        });

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

      for (let i = 0; i < this.days.length; i++) {
        const ithData = resp.data.data.filter(e => e.day == i);
        ithData.forEach(e => {
          this.events[i].push({
            color: "#673AB7",
            date: e.memo,
            icon: "pi pi-cog",
            mapx: e.mapx,
            mapy: e.mapy,
            status: e.title,
            spotNum: e.spotNum
          });
        });
      }
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
