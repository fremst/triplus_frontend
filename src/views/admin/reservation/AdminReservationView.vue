<template>
  <div class="wrap">
    <AdminPageSidebar />
    <div class="inner">
      <div>
        <h1>마감임박</h1>
        <ReservationAccordion :filteredPackages="endingPackages" />
        <h1>모집중</h1>
        <ReservationAccordion :filteredPackages="proceedingPackages" />
        <h1>모집완료</h1>
        <ReservationAccordion :filteredPackages="completedPackages" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { defaultOptions } from "@/constant/axios";
import AdminPageSidebar from "@/components/admin/AdminPageSidebar";
import ReservationAccordion from "@/components/admin/item/ReservationAccordion.vue";

export default {
  components: { AdminPageSidebar, ReservationAccordion },

  data() {
    return {
      proceedingPackages: null,
      endingPackages: null,
      completedPackages: null
    };
  },

  async mounted() {
    this.endingPackages = await this.getList("ending");
    this.proceedingPackages = await this.getList("proceeding");
    this.completedPackages = await this.getList("completed");
  },

  methods: {
    async getList(cond) {
      const getUrl = `${process.env.VUE_APP_API_URL || ""}/section/packages/cond/${cond}`;

      const res = await axios.get(getUrl, this.data, defaultOptions).catch(err => {
        alert("서버 연결 실패", err);
      });

      return res.data;
    }
  }
};
</script>

<style lang="scss" scoped>
tr {
  align-content: center;
  justify-content: center;
}

.wrap {
  width: 100%;
  min-height: 750px;
}

.inner {
  width: 1080px;
  margin: 0 auto;
}

.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 960px) {
    align-items: start;
  }
}

.p-input-icon-left > .p-inputtext {
  width: 300px;
}

.p-datatable .p-datatable-thead > tr > th {
  text-align: center;
  align-content: center;
  justify-content: center;
  padding: 15px 15px;
  border-width: 0 0 1px 0;
  font-weight: 700;
  font-size: 16px;
  color: #343a40;
  background: #f8f9fa;
  transition: box-shadow 0.2s;
}

.p-datatable .p-datatable-tbody > tr > td {
  text-align: center;
  justify-content: center;
  vertical-align: middle;
  font-size: 14px;
  border-width: 0 0 1px 0;
  padding: 15px 15px;
}

.product-image {
  width: 100px;
  //height: 100px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.p-dialog .product-image {
  width: 300px;
  height: 200px;
  margin: 0 auto 2rem auto;
  display: block;
}

.confirmation-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.p-column-header-content {
  display: flex;
  justify-content: center;
}

@media screen and (max-width: 960px) {
  ::v-deep(.p-toolbar) {
    flex-wrap: wrap;

    .p-button {
      margin-bottom: 0.25rem;
    }
  }
}

.addlist-title {
  margin: 15px 0 10px 0;
}
</style>
