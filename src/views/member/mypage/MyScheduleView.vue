<template>
  <div class="wrapper">
    <div class="inner">
      <div>
        <div class="card">
          <br>
          <DataTable
              ref="dt"
              v-model:selection="selectedProducts"
              :filters="filters"
              :paginator="true"
              :rows="5"
              :rowsPerPageOptions="[5, 10, 25]"
              :value="list"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} list"
              dataKey="skdNum"
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              style="text-align: left"
          >
            <template #header>
              <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
                <h3>내 일정</h3>
              </div>
            </template>


            <Column header="이름" field="destination" :sortable="true" style="min-width: 19rem; text-align: center">
              <template #body="slotProps">
                <span class="product-category">

                  <router-link :to="`/member/myreservation/`+slotProps.data.OID">
                    {{ slotProps.data.destination }}
                  </router-link>
                </span>
              </template>
            </Column>
            <Column header="시작일" field="sDate" :sortable="true" style="min-width: 9rem; text-align: center">
              <template #body="slotProps">
                <span class="product-category">
                  {{ new Date(slotProps.data.sdate).toISOString().substring(0,10)}}
                </span>
              </template>
            </Column>

            <Column header="종료일" field="eDate" :sortable="true" style="min-width: 9rem; text-align: center">
              <template #body="slotProps">
                <span class="product-category">
                    {{ new Date(slotProps.data.edate).toISOString().substring(0,10)}}
                </span>
              </template>
            </Column>

          </DataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


import axios from "axios";

export default {
  name: "MyScheduleView",
  data(){
    return{
      id:localStorage.getItem("id"),
      list:[],


    }
  },
  mounted() {
    axios.get('http://localhost:8082/triplus/api/member/mypage/myschedule', {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      params:{
        "id":this.id
      }
    }).then(function (resp) {
      this.list = resp.data.list;

    }.bind(this));
  }

}
</script>

<style scoped>
.inner{
  width:1080px;
  margin: 0 auto;
}

</style>