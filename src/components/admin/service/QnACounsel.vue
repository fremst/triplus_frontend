<!--
  QNA 문의 채팅 처리
-->

<template>
  <div class="qna-chat-board">
    <DataTable class="qna-chat-table"
      :value="userList" responsiveLayout="scroll" :scrollable="true" scrollHeight="800px">
      <Column field="title" header="회원" alignHeader="center">
        <template #body="slotProps">
          <a href="#" @click="sendJoin(true, slotProps.data.id)" v-text="slotProps.data.id" />
          &nbsp;
          <Badge v-show="slotProps.data.gap > 0" :value="slotProps.data.gap"></Badge>
        </template>
      </Column>
    </DataTable>
    <DataTable class="qna-chat-table"
      :value="tokenList" responsiveLayout="scroll" :scrollable="true" scrollHeight="800px">
      <Column field="title" header="비회원" alignHeader="center">
        <template #body="slotProps">
          <a href="#" @click="sendJoin(false, slotProps.data.token)" v-text="slotProps.data.token" />
          &nbsp;
          <Badge v-show="slotProps.data.gap > 0" :value="slotProps.data.gap"></Badge>
        </template>
      </Column>
    </DataTable>
    <div class="qna-chat-ground">
      <div style="overflow: auto; height: 100%">
        <div v-for="chat of chatData" :key="chat">
          <div class="qna-chat-element" :class="{
                'flex-end': (chat.type == 'admin'),
                'flex-start': (chat.type == 'user'),
                }">
            <div :class="{
                'qna-chat-admin': (chat.type == 'admin'),
                'qna-chat-user': (chat.type == 'user'),
                }">
                {{chat.content}}
            </div>
          </div>
        </div>
      </div>
      <InputText style="width: 100%" v-model="chatText"></InputText>
      <Button @click="sendMessage()">보내기 테스트</Button>
    </div>
  </div>
</template>
<script>
  import store from "@/store"
  import Badge from 'primevue/badge';
  import SockJS from 'sockjs-client';
  export default
  {
    name: 'QnAWidget',
    components: {
      Badge
    },
    props: {
    },
    data() {
      return {
        userList: {},
        tokenList: {},
        chatWidget: false,
        chatBadgeCount: 0,
        chatData: [],

        chatText: "",

        // 소켓 통신 변수
        sockJS: null,
      }
    },
    methods: {
      sendMessage() {
        this.sockJS.send(JSON.stringify({
          type: "CHAT",
          data: JSON.stringify({
            chatNum: 0,
            id: store.state.userId == null ? "guest" : store.state.userId,
            token: store.state.userId == null ? localStorage.getItem("chatToken") : "",
            content: this.chatText,
            date: 0,
            managerChat: true
          })
        }));
      },
      sendJoin(isUser, rowID) {
        this.sockJS.send(JSON.stringify({
          type: "JOIN",
          data: JSON.stringify({
            user: isUser,
            id: rowID
          })
        }));
      },
      sendAuthData() {
        this.sockJS.send(JSON.stringify({
          type: "AUTHORIZE",
          data: JSON.stringify({
            user: store.state.userId == null ? false : true,
            id: store.state.userId == null ? localStorage.getItem("chatToken") : store.state.userId
          })
        }));
        this.sockJS.send(JSON.stringify({
          type: "USERLIST",
          data: ""
        }));
      },
      getMessage(jsonData) {
        console.log(jsonData);
        switch(jsonData.type)
        {
          case "AUTHORIZE": // 인증 요청
            // console.log("auth");
            if (localStorage.getItem("chatToken") == null)
              localStorage.setItem("chatToken", jsonData.data);
            this.sendAuthData();
            break;
          case "CHAT": // 채팅 수신
            // console.log("chat receive");
            this.addMessage(JSON.parse(jsonData.data));
            break;
          case "CHATLIST": // 채팅 목록 수신
            // console.log("chat list receive");
            this.chatData = [];
            for (let ele of JSON.parse(jsonData.data))
              this.addMessage(ele);
            break;
          case "USERLIST": // 유저 목록 수신
            this.changeList(false, JSON.parse(jsonData.data));
            break;
          case "TOKENLIST": // 유저 목록 수신
            this.changeList(true, JSON.parse(jsonData.data));
            break;
        }
      },
      addMessage(chat) {
        this.chatData.push({
          type: chat.managerChat ? "admin" : "user",
          content: chat.content
        })
      },
      changeList(isToken, data) {
        console.log(`${isToken} -- ${data}`);
        let arr = isToken ? this.tokenList : this.userList;
        for (let key of data)
        {
          let comp = isToken ? key.token : key.id;
          console.log(`${comp}`);
          if (arr[comp] == null) {
            arr[comp] = key;
          } else {
            if (arr[comp].chatCnt != key.chatCnt) {
              arr[comp].gap = key.chatCnt - arr[comp].chatCnt;
            }
            arr[comp] = key;
          }
        }
        console.log(arr);
      },
    },
    mounted() {
    },
    created() { 
      // console.log(store.state);
      this.sockJS = new SockJS(`http://localhost:8082/triplus/chat`);
      this.sockJS.onmessage = message => {
        this.getMessage(JSON.parse(message.data));
      };
  },
}
</script>
<style scoped>
  .qna-chat-board {
    display: flex;
    flex-direction: row;
    width: 1080px;
    height: 800px;
    margin: auto;
  }
  .qna-chat-table {
    width: 200px;
    height: 100%;
  }
  .qna-chat-ground {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 880px;
  }
  .qna-chat-element {
    margin: 5px;
    display: flex;
  }
  .flex-start {
    justify-content: flex-start;
  }
  .flex-end {
    justify-content: flex-end;
  }
  .qna-chat-user {
    border-radius: 15px 15px 15px 0px;
    text-align: left;
    justify-content: flex-start;
    background-color: #9999cc;
    color: white;
    padding: 7px 13px;
    width: auto;
  }
  .qna-chat-admin {
    border-radius: 15px 15px 0px 15px;
    text-align: right;
    justify-content: flex-end;
    background-color: #67AB9F;
    color: white;
    padding: 5px 13px;
    width: auto;
  }
</style>