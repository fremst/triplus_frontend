<template>
  <div class="home">
    <Expenses :apiURL="apiURL" />
  </div>
</template>

<script>
import Expenses from '@/components/member/plan/Expenses.vue'

export default {
  name: 'ExpensesView',
  components: {
    Expenses
  },
  data() {
    return {
      apiURL: "http://localhost:8082/triplus/api/member/plan/expense"
    };
  }
}
</script>
