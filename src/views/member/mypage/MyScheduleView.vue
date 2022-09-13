<template>
  <div class="wrapper">
    <div class="side">
      <MyPageSidebar />
    </div>

    <div class="inner">
      <div class="card">
        <DataTable
          ref="dt"
          v-model:selection="selectedProducts"
          :filters="filters"
          :paginator="true"
          :rows="5"
          :rowsPerPageOptions="[5, 10, 25]"
          :value="list"
          currentPageReportTemplate=""
          dataKey="skdNum"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          style=""
        >
          <template #header>
            <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
              <h3 style="color: #009688">내 일정</h3>
            </div>
          </template>

          <Column header="여행장소" field="destination" :sortable="true" style="min-width: 12rem">
            <template #body="slotProps">
              <span class="product-category">
                <router-link :to="`/section/member/schedule/main/` + slotProps.data.skdNum">
                  {{ slotProps.data.destination }}
                </router-link>
              </span>
            </template>
          </Column>

          <Column header="시작일" field="sDate" :sortable="true" style="min-width: 10rem">
            <template #body="slotProps">
              <span class="product-category">
                {{ $getFormattedDate(new Date(slotProps.data.sdate)) }}

                <!--                  {{ new Date(slotProps.data.sdate).toISOString().substring(0,10)}}-->
              </span>
            </template>
          </Column>
          <Column header="종료일" field="eDate" :sortable="true" style="min-width: 10rem">
            <template #body="slotProps">
              <span class="product-category">
                {{ $getFormattedDate(new Date(slotProps.data.edate)) }}
              </span>
            </template>
          </Column>
          <Column header="삭제" field="delete" :sortable="false" style="min-width: 6rem">
            <template #body="slotProps">
              <Button
                class="p-button-sm p-button-rounded p-button-danger ml-4"
                label="삭제"
                @click="openConfirmDialog('delete', true, slotProps.data.skdNum)"
                >삭제</Button
              >
            </template>
          </Column>
        </DataTable>
        <ConfirmDialog
          v-model:visible="showDeleteConfirmDialog"
          :msg="'선택하신 일정을 삭제하시겠습니까?'"
          @closeDialog="deleteSchedule"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import MyPageSidebar from "@/components/member/mypage/MyPageSidebar";
import ConfirmDialog from "@/views/admin/place/ConfirmDialog.vue";
import { defaultOptions } from "@/constant/axios.js";

export default {
  name: "MyScheduleView",
  components: { MyPageSidebar, ConfirmDialog },
  data() {
    return {
      selectedProducts: null,
      filters: null,
      id: localStorage.getItem("id"),
      list: [],
      showConfirmDialog: false,
      showDeleteConfirmDialog: false,
      skdNum: null
    };
  },
  mounted() {
    axios
      .get(`${process.env.VUE_APP_API_URL || ""}/member/mypage/myschedule`, {
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        params: {
          id: this.id
        }
      })
      .then(
        function (resp) {
          this.list = resp.data.list;
        }.bind(this)
      );
  },
  methods: {
    openConfirmDialog(dialogType, show, skdNum) {
      if (dialogType === "delete") {
        this.showDeleteConfirmDialog = show;
        this.skdNum = skdNum;
      }
    },
    async deleteSchedule(value) {
      if (!value) {
        return false;
      } else {
        const deleteUrl = `${process.env.VUE_APP_API_URL || ""}/section/schedules/${this.skdNum}`;
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

<style scoped>
.wrapper {
  display: flex;
  margin: 40px auto;
  margin-bottom: 100px;
}

.inner {
  width: 830px;
  display: inline-block;
  margin-left: 40px;
}

.side {
  width: 250px;
  display: inline-block;

  margin-left: 300px;
}
</style>
