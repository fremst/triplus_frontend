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
            dataKey="brdNum"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            style="text-align: left"
          >
            <template #header>
              <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
                <h3 style="color: #009688" >내 예약</h3>
              </div>
            </template>

            <Column header="패키지이름" field="title" :sortable="true" style="min-width: 19rem">
              <template #body="slotProps">
                <span class="product-category">
                  <!-- http://localhost:8081/member/myreservation/INIpayTest_1661735541879 -->
                  <router-link :to="`/member/myreservation/` + slotProps.data.OID">
                    {{ slotProps.data.TITLE }}
                  </router-link>
                </span>
              </template>
            </Column>
            <Column header="출발일" field="SDATE" :sortable="true" style="min-width: 9rem">
              <template #body="slotProps">
                <span class="product-category">
                  {{ new Date(slotProps.data.SDATE).toISOString().substring(0, 10) }}
                </span>
              </template>
            </Column>

            <Column header="상태" field="resSta" :sortable="true" style="min-width: 9rem">
              <template #body="slotProps">
                <span class="product-category">
                  {{ slotProps.data.RESSTA }}
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
  name: "MyReservationView",
  data() {
    return {
      id: localStorage.getItem("id"),
      list: [],

      startDate: null
    };
  },
  mounted() {
    axios
      .get("http://localhost:8082/triplus/api/member/mypage/reservation", {
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
  components:{
    MyPageSidebar
  }
};
</script>

<style scoped>


.wrapper{
  display: flex;
  margin: 40px auto;
  margin-bottom: 100px;
}

.inner{
  width: 830px;
  display: inline-block;
  margin-left: 40px;

}

.side{
  width: 250px;
  display: inline-block;

  margin-left: 300px;
}






</style>
