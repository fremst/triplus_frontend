<template>
  <Accordion>
    <AccordionTab
      v-for="(pkg, i) in filteredPackages"
      :key="i"
      :header="`${pkg.title}&emsp;(${$getFormattedDate(new Date(pkg.sDate))} - ${$getFormattedDate(
        new Date(pkg.sDate)
      )})&emsp;[${pkg.rcrtCnt - pkg.vacancy}/${pkg.rcrtCnt}]`"
    >
      <div class="card">
        <DataTable
          ref="dt"
          :paginator="true"
          :rows="5"
          :rowsPerPageOptions="[5, 10, 25]"
          :value="pkg.resList"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} packages"
          dataKey="brdNum"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          responsiveLayout="scroll"
          style="text-align: center"
        >
          <Column header="주문 번호" field="oid" :sortable="true" style="min-width: 9rem; text-align: center">
            <template #body="slotProps">
              <span class="product-category">
                <router-link :to="`/member/myreservation/` + slotProps.data.oid">
                  {{ slotProps.data.oid }}
                </router-link>
              </span>
            </template>
          </Column>
          <Column header="아이디" field="id" :sortable="true" style="min-width: 9rem; text-align: center">
            <template #body="slotProps">
              <span class="product-category">
                {{ slotProps.data.id }}
              </span>
            </template>
          </Column>
          <Column header="이름" field="bookerName" :sortable="true" style="min-width: 9rem; text-align: center">
            <template #body="slotProps">
              <span class="product-category">
                {{ slotProps.data.bookerName }}
              </span>
            </template>
          </Column>
          <Column header="전화 번호" field="bookerTel" :sortable="true" style="min-width: 9rem; text-align: center">
            <template #body="slotProps">
              <span class="product-category">
                {{ slotProps.data.bookerTel }}
              </span>
            </template>
          </Column>
          <Column header="예약일" field="resSta" :sortable="true" style="min-width: 9rem; text-align: center">
            <template #body="slotProps">
              <span class="product-category">
                {{ $getFormattedDateOnly(new Date(slotProps.data.bookDate)) }}
              </span>
            </template>
          </Column>
          <Column header="상태" field="resSta" :sortable="true" style="min-width: 9rem; text-align: center">
            <template #body="slotProps">
              <span class="product-category">
                {{ slotProps.data.resSta }}
              </span>
            </template>
          </Column>
          <Column header="관리" style="min-width: 9rem; text-align: center">
            <template #body="slotProps">
              <span class="product-category">
                <Button
                  v-if="slotProps.data.resSta == '대기'"
                  @click="changeResSta(slotProps.data.oid, '확정', slotProps)"
                  >승인</Button
                >
                <Button
                  v-if="slotProps.data.resSta == '결제전'"
                  @click="changeResSta(slotProps.data.oid, '취소', slotProps)"
                  >취소</Button
                >
              </span>
            </template>
          </Column>
        </DataTable>
      </div>
    </AccordionTab>
  </Accordion>
</template>

<script>
import axios from "axios";
import { putOptions } from "@/constant/axios";

export default {
  props: {
    filteredPackages: Array
  },

  methods: {
    async changeResSta(oid, resSta, slotProps) {
      const putUrl = `${process.env.VUE_APP_API_URL || ""}/reservations/${oid}`;
      const params = { resSta: `${resSta}` };
      const res = await axios.put(putUrl, params, putOptions).catch(err => {
        alert("서버 연결 실패", err);
      });

      if (res.data.result === "success") {
        slotProps.data.resSta = resSta;
        alert("처리 완료");
      } else {
        alert("처리 실패");
      }
    }
  }
};
</script>