<template>
  <div class="home">
    <Expenses />
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
    };
  }
}
</script>
