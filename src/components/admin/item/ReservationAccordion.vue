<template>
  <Accordion>
    <AccordionTab v-for="(pkg, i) in filteredPackages" :key="i">
      <template #header>
        <span style="color: black">{{ pkg.title }}</span>
        &emsp;{{ $getFormattedDate(new Date(pkg.sDate)) }}
        <span v-if="pkg.sDate != pkg.eDate">~{{ $getFormattedDate(new Date(pkg.sDate)) }})</span>
      </template>
      <div class="card">
        <DataTable
          ref="dt"
          :paginator="true"
          :rows="5"
          :rowsPerPageOptions="[5, 10, 25]"
          :value="pkg.resList"
          dataKey="brdNum"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink "
          responsiveLayout="scroll"
          style="text-align: center"
          v-if="pkg.resList.length > 0"
        >
          <Column header="주문 번호" field="oid" :sortable="true" style="min-width: 9rem; text-align: center">
            <template #body="slotProps">
              <span class="product-category">
                <router-link :to="`/member/myreservation/` + slotProps.data.oid">
                  {{ slotProps.data.oid.substring(11) }}
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
          <Column header="예약일" field="bookDate" :sortable="true" style="min-width: 9rem; text-align: center">
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
                <Button v-if="slotProps.data.resSta == '대기'" @click="openDialog('confirm', true, slotProps)"
                  >승인</Button
                >
                <Button v-if="slotProps.data.resSta == '결제전'" @click="openDialog('cancel', true, slotProps)"
                  >취소</Button
                >
              </span>
            </template>
          </Column>
        </DataTable>
        <div v-else class="none"><br />예약 내역이 없습니다. <br /><br /></div>
      </div>
    </AccordionTab>
  </Accordion>
  <ConfirmDialog
    v-model:visible="displayConfirm"
    title="승인하기"
    :msg="'정말로 승인하시겠습니까?'"
    @closeDialog="changeResStaToConfirm"
  />
  <ConfirmDialog
    v-model:visible="displayCancel"
    title="취소하기"
    :msg="'정말로 취소하시겠습니까?'"
    @closeDialog="changeResStaToCancel"
  />
  <Toast />
</template>

<script>
import axios from "axios";
import { putOptions } from "@/constant/axios";
import ConfirmDialog from "@/views/admin/place/ConfirmDialog.vue";

export default {
  components: {
    ConfirmDialog
  },

  data() {
    return {
      displayConfirm: false,
      displayCancel: false,
      selectedSlotProps: null
    };
  },

  props: {
    filteredPackages: Array
  },

  methods: {
    openDialog(dialogType, show, slotProps) {
      if (dialogType === "confirm") {
        this.displayConfirm = show;
        this.selectedSlotProps = slotProps;
      }
      if (dialogType === "cancel") {
        this.displayCancel = show;
        this.selectedSlotProps = slotProps;
      }
    },

    changeResStaToConfirm(confirm) {
      if (!confirm) {
        return false;
      }
      this.changeResSta("확정");
    },

    changeResStaToCancel(confirm) {
      if (!confirm) {
        return false;
      }
      this.changeResSta("취소");
    },

    async changeResSta(resSta) {
      const putUrl = `${process.env.VUE_APP_API_URL || ""}/reservations/${this.selectedSlotProps.data.oid}`;
      const params = { resSta: `${resSta}` };
      const res = await axios.put(putUrl, params, putOptions).catch(err => {
        this.$toast.add({
          severity: "error",
          summary: "",
          detail: err,
          life: 3000
        });
      });

      if (res.data.result === "success") {
        this.selectedSlotProps.data.resSta = resSta;
        this.$toast.add({
          severity: "success",
          summary: "",
          detail: "요청 처리 성공!",
          life: 3000
        });
      } else {
        this.$toast.add({
          severity: "error",
          summary: "",
          detail: "요청 처리 실패!",
          life: 3000
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/main.scss";

.none {
  @include c-center;
}
</style>
