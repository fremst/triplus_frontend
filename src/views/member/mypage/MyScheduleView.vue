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

          <Column header="이름" field="destination" :sortable="true" style="min-width: 19rem">
            <template #body="slotProps">
              <span class="product-category">
                <router-link :to="`/section/member/schedule/main/` + slotProps.data.skdNum">
                  {{ slotProps.data.destination }}
                </router-link>
              </span>
            </template>
          </Column>

          <Column header="시작일" field="sDate" :sortable="true" style="min-width: 9rem">
            <template #body="slotProps">
              <span class="product-category">
                {{ $getFormattedDate(new Date(slotProps.data.sdate)) }}

                <!--                  {{ new Date(slotProps.data.sdate).toISOString().substring(0,10)}}-->
              </span>
            </template>
          </Column>

          <Column header="종료일" field="eDate" :sortable="true" style="min-width: 9rem">
            <template #body="slotProps">
              <span class="product-category">
                {{ $getFormattedDate(new Date(slotProps.data.edate)) }}
              </span>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import MyPageSidebar from "@/components/member/mypage/MyPageSidebar";

export default {
  name: "MyScheduleView",
  components: { MyPageSidebar },
  data() {
    return {
      id: localStorage.getItem("id"),
      list: []
    };
  },
  mounted() {
    axios
      .get("http://localhost:8082/triplus/api/member/mypage/myschedule", {
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
