<template>
  <div>
    <Dialog v-model:visible="display" class="box">
      <template #header>
        <h3>일행 초대</h3>
      </template>
      <h5>아이디 검색</h5>
      <br />
      <div class="search">
        <span class="p-input-icon-left">
          <i class="pi pi-search" @click="searchId" />
          <InputText type="text" v-model="inviteId" placeholder="search" />
        </span>
      </div>
      <br />
      <hr />
      <br />
      <div class="result">
        <table>
          <tr v-for="(list, index) in newarr" :key="index">
            <th>
              <span>{{ list.id }}</span>
            </th>
            <td>
              <Button label="삭제" icon="pi pi-times" class="p-button-text" @click="del(index)" />
              <Button label="초대" icon="pi pi-user" class="p-button-text" @click="add(list.id)" />
            </td>
          </tr>
        </table>
        <span class="msg">{{ msg }}</span>
      </div>

      <template #footer>
        <Button label="취소" icon="pi pi-times" class="p-button-text" />
        <Button label="확인" icon="pi pi-check" autofocus />
      </template>
    </Dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "InviteView",
  data() {
    return {
      display: true,
      inviteId: "", //txt 검색
      resultId: [], // 테이블 조회 ID 배열

      msg: "",
      a: "테스트"
    };
  },
  computed: {
    //중복제거 배열
    newarr() {
      return this.resultId.filter((item, i) => {
        return (
          this.resultId.findIndex(item2 => {
            return item.id === item2.id;
          }) === i
        );
      });
    }
  },
  methods: {
    searchId() {
      // User IdentifyController

      axios
        .get(`http://localhost:8082/triplus/api/member/plan/invite/findid`, {
          headers: {
            "Access-Control-Allow-Origin": "*"
          },
          params: {
            inviteId: this.inviteId
          }
        })
        .then(
          function (resp) {
            if (resp.data.result === "success") {
              this.resultId.push({ id: resp.data.searchId });
              this.msg = "";
            } else {
              this.msg = "회원이 존재하지 않습니다";
            }
          }.bind(this)
        );
    },

    // 일행 초대
    add(addId) {
      //일행 테이블에 존재여부 확인먼저
      axios
        .get(`http://localhost:8082/triplus/api/member/plan/companion/identify`, {
          headers: {
            "Access-Control-Allow-Origin": "*"
          },
          params: {
            id: addId,
            skdNum: 1 //일정번호 넘겨줘야함
          }
        })
        .then(
          function (resp) {
            if (resp.data.result === "success") {
              //존재하면
              this.msg = "이미 초대한 회원입니다";
            } else {
              // 초대(테이블 insert)

              const joinparam = new URLSearchParams();
              joinparam.append("skdNum", 1); // 일정번호 넘겨줘야함 임시로 1
              joinparam.append("id", addId);

              axios
                .post(`http://localhost:8082/triplus/api/member/plan/companion`, joinparam, {
                  headers: {
                    "Access-Control-Allow-Origin": "*"
                  }
                })
                .then(
                  function (resp) {
                    if (resp.data.result === "success") {
                      alert("초대성공");
                    }
                  }.bind(this)
                );
            }
          }.bind(this)
        );
    },

    //삭제
    del(index) {
      this.a = index;
      this.resultId.splice(index, 1);
    }
  }
};
</script>

<style scoped>
.result .msg {
  color: red;
}
</style>
