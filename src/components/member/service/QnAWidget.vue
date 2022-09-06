<!--
-->

<template>
  <div class="qna-chat-widget">
    <Button
      v-show="!chatWidget"
      icon="pi pi-comment"
      label="문의하기"
      class="p-button-rounded"
      @click="chatWidget = true"
    >
    </Button>
    <Dialog header="문의 채팅" position="bottomright" :draggable="false" v-model:visible="chatWidget">
      <div class="qna-chat-dialog">
        <div style="overflow: auto; height: 100%">
          <div v-for="chat of chatData" :key="chat">
            <div
              class="qna-chat-element"
              :class="{
                'flex-start': chat.type == 'admin',
                'flex-end': chat.type == 'user'
              }">
              <div
                :class="{
                  'qna-chat-admin': chat.type == 'admin',
                  'qna-chat-user': chat.type == 'user'
                }">
                {{ chat.content }}
              </div>
            </div>
            <div class="qna-chat-date"
              :class="{
                'flex-start': chat.type == 'admin',
                'flex-end': chat.type == 'user'
              }">
              {{ chat.date }}
            </div>
          </div>
        </div>
        <div style="display: flex; flex-direction: row; justify-content: space-between;">
          <InputText style="width: 100%" v-model="chatText" v-on:keyup.enter="sendMessage()"></InputText>
          <Button icon="pi pi-send" @click="sendMessage()"></Button>
        </div>
      </div>
    </Dialog>
  </div>
</template>
<script>
import store from "@/store";
import Dialog from "primevue/dialog";
import SockJS from "sockjs-client";
export default {
  name: "QnAWidget",
  components: {
    Dialog
  },
  props: {},
  data() {
    return {
      chatWidget: false,
      chatBadgeCount: 0,
      chatData: [{ type: "admin", content: "궁금한 점이 있으신가요? 상담사에게 물어보세요." }],

      chatText: "",

      // 소켓 통신 변수
      sockJS: null
    };
  },
  methods: {
    sendMessage() {
      // console.log(this.stomp);
      this.sockJS.send(
        JSON.stringify({
          type: "CHAT",
          data: JSON.stringify({
            chatNum: 0,
            id: store.state.userId == null ? "guest" : store.state.userId,
            token: store.state.userId == null ? localStorage.getItem("chatToken") : "",
            content: this.chatText,
            date: 0,
            managerChat: false
          })
        })
      );
      this.chatText = "";
    },
    sendAuthData() {
      this.sockJS.send(
        JSON.stringify({
          type: "AUTHORIZE",
          data: JSON.stringify({
            user: store.state.userId == null ? false : true,
            id: store.state.userId == null ? localStorage.getItem("chatToken") : store.state.userId
          })
        })
      );
    },
    getMessage(jsonData) {
      // console.log(jsonData);
      switch (jsonData.type) {
        case "AUTHORIZE": // 인증 요청
          // console.log("auth");
          if (localStorage.getItem("chatToken") == null) localStorage.setItem("chatToken", jsonData.data);
          this.sendAuthData();
          break;
        case "CHAT": // 채팅 수신
          // console.log("chat receive");
          this.addMessage(JSON.parse(jsonData.data));
          break;
        case "CHATLIST": // 채팅 목록 수신
          // console.log("chat list receive");
          for (let ele of JSON.parse(jsonData.data)) this.addMessage(ele);
          break;
      }
    },
    addMessage(chat) {
      this.chatData.push({
        type: chat.managerChat ? "admin" : "user",
        content: chat.content,
        date: this.parseDate(chat.date)
      });
    },
    parseDate(time) {
      let result = new Date(time + 1000 * 60 * 60 * 9);
      return `${result.getMonth() + 1}월 ${result.getUTCDate() + 1}일 ${result.getHours()}시 ${result.getUTCMinutes()}분`
    }
  },
  mounted() {},
  created() {
    // console.log(store.state);
    this.sockJS = new SockJS(`http://localhost:8082/triplus/chat`);
    this.sockJS.onmessage = message => {
      this.getMessage(JSON.parse(message.data));
    };
  }
};
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
  display: flex;
}
.qna-chat-date {
  display: flex;
  font-size: 12px;
  margin: 0px 5px;
}
.flex-start {
  justify-content: flex-start;
}
.flex-end {
  justify-content: flex-end;
}
.qna-chat-admin {
  border-radius: 15px 15px 15px 0px;
  text-align: left;
  justify-content: flex-start;
  background-color: #67ab9f;
  color: white;
  padding: 7px 13px;
  width: auto;
}
.qna-chat-user {
  border-radius: 15px 15px 0px 15px;
  text-align: right;
  justify-content: flex-end;
  background-color: #9999cc;
  color: white;
  padding: 7px 13px;
  width: auto;
}
</style>
