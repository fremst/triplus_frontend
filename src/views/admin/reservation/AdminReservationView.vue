<template>
  <div class="wrap">
    <div class="sidebar">
      <AdminPageSidebar />
    </div>
    <div class="inner">
      <div class="title">
        <h2 style="color: #009688">예약 관리</h2>
      </div>
      <hr />
      <div>
        <h3 v-if="endingPackages" class="product-badge status-ending">마감임박</h3>
        <ReservationAccordion :filteredPackages="endingPackages" />
        <br />
        <h3 v-if="proceedingPackages" class="product-badge status-proceeding">모집중</h3>
        <ReservationAccordion :filteredPackages="proceedingPackages" />
        <br />
        <h3 v-if="completedPackages" class="product-badge status-completed">모집완료</h3>
        <ReservationAccordion :filteredPackages="completedPackages" />
      </div>
    </div>
    <Toast></Toast>
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
        this.$toast.add({
          severity: "error",
          summary: "",
          detail: err,
          life: 3000
        });
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
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.inner {
  width: 1080px;
}

.sidebar {
  margin-left: -220px;
  margin-right: 20px;
}

.title {
  margin-bottom: 10px;
}

hr {
  border: 0;
  height: 1px;
  margin-bottom: 15px;
  background: #aaa;
}

// ::v-deep(.p-accordion .p-accordion-header .p-accordion-header-link) {
//   background-color: rgb(184, 215, 252);
// }

::v-deep(.p-accordion .p-accordion-content) {
  padding: 0;
}

::v-deep(.p-datatable .p-column-header-content) {
  justify-content: center;
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

.product-badge {
  text-align: center;
  border-radius: 2px;
  padding: 0.25em 0.5rem;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12pt;
  letter-spacing: 0.3px;
  border-radius: 7px;
}

.product-badge.status-proceeding {
  background: #c8e6c9;
  color: #256029;
}

.product-badge.status-completed {
  background: #ffcdd2;
  color: #c63737;
}

.product-badge.status-ending {
  background: #feedaf;
  color: #8a5340;
}
</style>
