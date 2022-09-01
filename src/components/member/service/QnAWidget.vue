<!--
-->

<template>
  <div class="qna-chat-widget">
    <Button
      v-show="!chatWidget"
      icon="pi pi-comment"
      label="문의하기"
      class="p-button-rounded"
      :badge="chatBadgeCount" badgeClass="p-badge-danger"
      @click="chatWidget = true">
    </Button>
    <Dialog
      header="문의 채팅"
      position="bottomright"
      :draggable="false"
      v-model:visible="chatWidget">
      <div class="qna-chat-dialog">
        <div style="height: 100%">
          <div v-for="chat of chatData" :key="chat">
            <div class="qna-chat-element"
              :class="{
                'qna-chat-admin': (chat.type == 'admin'),
                'qna-chat-user': (chat.type == 'user'),
                }">
                {{chat.content}}
            </div>
          </div>
        </div>
        <InputText style="width: 100%"></InputText>
      </div>
    </Dialog>
  </div>
</template>
<script>
  import Dialog from 'primevue/dialog';
  export default
  {
    name: 'QnAWidget',
    components: {
      Dialog
    },
    props: {
    },
    data() {
      return {
        chatWidget: false,
        chatBadgeCount: 0,
        chatData: [
          { type: "admin", content: "궁금한 점이 있으신가요? 상담사에게 물어보세요." },
          { type: "user", content: "어 없어~" },
          { type: "user", content: "레이아웃 테스트" }
        ]
      }
    },
    methods: {
    },
    created() {
    }
  }
</script>
<style scoped>
  .qna-chat-widget {
    position: fixed;
    right: 50px;
    bottom: 50px;
    z-index: 10000;
  }
  .qna-chat-dialog {
    width: 300px;
    height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .qna-chat-element {
    margin: 5px;
    padding: 5px 10px;
    display: flex;
  }
  .qna-chat-admin {
    border-radius: 15px 15px 15px 0px;
    text-align: left;
    justify-content: flex-start;
    background-color: #67AB9F;
    color: white;
  }
  .qna-chat-user {
    border-radius: 15px 15px 0px 15px;
    text-align: right;
    justify-content: flex-end;
    background-color: #9999cc;
    color: white;
  }
</style>