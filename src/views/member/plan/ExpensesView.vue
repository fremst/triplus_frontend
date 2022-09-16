<template>
  <div class="home">
    <Expenses :apiURL="apiURL" />
  </div>
</template>

<script>
import Expenses from "@/components/member/plan/Expenses.vue";

export default {
  name: "ExpensesView",
  components: {
    Expenses
  },
  data() {
    return {
      apiURL: `${process.env.VUE_APP_API_URL || ""}/member/plan`
    };
  }
};
</script>
