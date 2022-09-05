<template>
  <AdminPageSidebar/>
  <div class="home">
    <QnACounsel
      :title="title"
      :listLink="listLink"
      :URL="URL"/>
  </div>
</template>

<script>
import AdminPageSidebar from "@/components/admin/AdminPageSidebar";
import QnACounsel from '@/components/admin/service/QnACounsel.vue';

export default {
  name: 'AdminQnACounselView',
  components: {
    AdminPageSidebar, QnACounsel
  },
  data() {
    return {
    };
  },
  methods: {
  }
}
</script>
