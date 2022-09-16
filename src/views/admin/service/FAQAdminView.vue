<template>
  <div class="home">
    <FaqList :title="title" :listLink="listLink" :modifyLink="modifyLink" :addLink="addLink" />
  </div>
</template>

<script>
import FaqList from "@/components/admin/service/FaqList";

export default {
  components: {
    FaqList
  },
  data() {
    return {
      listLink: "http://localhost:8082/triplus/api/service/faqs",
      addLink: "/service/faqs/add",
      modifyLink: "/service/faqs/:faqNum",
      title: "FAQ",
      pageCur: 1,
      pageEnd: 70
    };
  }
};
</script>

<style scoped></style>
