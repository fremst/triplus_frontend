<template>
  <div class="wrap">
    <div class="sidebar">
      <AdminPageSidebar />
    </div>
    <div class="inner">
      <div class="title">
        <h2 style="color: #009688">대시보드</h2>
      </div>
      <hr />
      <div class="cards">
        <div>
          <h2>패키지 예약자 현황</h2>
          <Card style="width: 300px; margin-bottom: 2em">
            <template #title>
              <div class="reservations-title">대기&emsp;확정&emsp;취소</div>
            </template>
            <template #content>
              <div class="reservations-content">
                <Avatar :label="`${waitCnt}`" shape="circle" size="large" id="waiting" />&emsp;
                <Avatar label="5" shape="circle" size="large" id="confirmed" />&emsp;
                <Avatar label="2" shape="circle" size="large" id="canceled" />
              </div>
            </template>
          </Card>
        </div>
        <div>
          <h2>매출 BEST 3</h2>
          <Card style="width: 750px; margin-bottom: 2em">
            <template #content>
              <table>
                <tr v-for="(item, i) in bestItems" :key="i">
                  <td>
                    <img
                      :src="`data:image/jpeg;base64,${item.timg}`"
                      :alt="item.title"
                      style="width: 60px; height: 42px; display: block"
                    />
                  </td>
                  <td style="text-align: left">{{ item.title }}</td>
                  <td>{{ $getFormattedCurrency(item.totSales) }}</td>
                </tr>
              </table>
            </template>
          </Card>
        </div>
      </div>
      <div class="cards">
        <div>
          <div class="card">
            <h2>월별 매출</h2>
            <Card>
              <template #content>
                <Chart type="bar" :data="basicData" :width="650" :height="300" />
              </template>
            </Card>
          </div>
        </div>
        <div>
          <h2>성별에 따른 매출</h2>
          <Card>
            <template #content>
              <Chart type="doughnut" :data="chartData" :width="300" :height="300" :options="lightOptions" />
            </template>
          </Card>
        </div>
      </div>
    </div>
    <Toast></Toast>
  </div>
</template>

<script>
import axios from "axios";
import { defaultOptions } from "@/constant/axios";
import AdminPageSidebar from "@/components/admin/AdminPageSidebar";

export default {
  components: { AdminPageSidebar },

  data() {
    return {
      waitCnt: 0,
      confirmedCnt: 0,
      canceledCnt: 0,
      basicData: {
        labels: [],
        datasets: [
          {
            label: "월별 매출액",
            backgroundColor: "#FFA726",
            data: []
          }
        ]
      },
      chartData: {
        labels: ["남성", "여성"],
        datasets: [
          {
            data: [],
            backgroundColor: ["#36A2EB", "#FF6384"],
            hoverBackgroundColor: ["#36A2EB", "#FF6384"]
          }
        ]
      },
      lightOptions: {
        plugins: {
          legend: {
            labels: {
              color: "#495057"
            }
          }
        }
      },
      bestItems: null
    };
  },

  async mounted() {
    this.waitCnt = await this.getCountByResSta("대기");
    this.confirmedCnt = await this.getCountByResSta("확정");
    this.canceledCnt = await this.getCountByResSta("취소");
    this.bestItems = await this.getBestItems(3);
    await this.getSalesPerGender();
    await this.getSalesPerMonth();
  },

  methods: {
    async getCountByResSta(cond) {
      const getUrl = `${process.env.VUE_APP_API_URL || ""}/reservation/status/${cond}`;

      const res = await axios.get(getUrl, defaultOptions).catch(err => {
        this.$toast.add({
          severity: "error",
          summary: "",
          detail: err,
          life: 3000
        });
      });

      return res.data.n;
    },

    async getBestItems(rank) {
      const getUrl = `${process.env.VUE_APP_API_URL || ""}/sales/bestitems/${rank}`;

      const res = await axios.get(getUrl, defaultOptions).catch(err => {
        this.$toast.add({
          severity: "error",
          summary: "",
          detail: err,
          life: 3000
        });
      });

      return res.data;
    },

    async getSalesPerGender() {
      const getUrl = `${process.env.VUE_APP_API_URL || ""}/sales/gender`;

      const res = await axios.get(getUrl, defaultOptions).catch(err => {
        this.$toast.add({
          severity: "error",
          summary: "",
          detail: err,
          life: 3000
        });
      });

      this.chartData.datasets[0].data = [res.data.mTotSales, res.data.fTotSales];
    },

    async getSalesPerMonth() {
      const getUrl = `${process.env.VUE_APP_API_URL || ""}/sales/month`;

      const res = await axios.get(getUrl, defaultOptions).catch(err => {
        this.$toast.add({
          severity: "error",
          summary: "",
          detail: err,
          life: 3000
        });
      });

      let totSalesList = [];

      for (let i = 0; i < res.data.length; i++) {
        this.basicData.labels.push(res.data[i].applMonth);
        totSalesList.push(res.data[i].totSales);
      }
      this.basicData.datasets[0].data = totSalesList;
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

h2 {
  margin-bottom: 10px;
}

table {
  border-collapse: collapse;
}

tr:not(:last-child) {
  border-bottom: 1px solid #dee2e6;
  height: 50px;
}

td {
  text-align: center;
  padding: 10px;
}

.reservations-title {
  margin-top: 32px;
}

.reservations-content {
  margin-top: 25px;
  margin-bottom: 52px;
}

.cards {
  display: flex;
  justify-content: space-between;
}

::v-deep(.p-card-title) {
  text-align: center;
}

::v-deep(.p-card .p-card-content) {
  text-align: center;
  padding: 0px;
}

::v-deep(.p-accordion .p-accordion-content) {
  padding: 0;
}

::v-deep(.p-datatable .p-column-header-content) {
  justify-content: center;
}

#waiting {
  background: #feedaf;
  color: #8a5340;
}

#confirmed {
  background: #c8e6c9;
  color: #256029;
}

#canceled {
  background: #ffcdd2;
  color: #c63737;
}
</style>
