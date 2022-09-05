<template>
  <div class="wrapper">
    <div class="inner">
      <Dialog v-model:visible="display" class="box">
        <template #header>
          <h3>체크리스트</h3>
        </template>
        <div class="list">
          <div class="li" v-for="(row, index) in rows" :key="index">
            <Checkbox v-model="row.checked" :binary="true" />{{ row.name }}&nbsp;<span @click="del(index)"
              ><i class="pi pi-minus-circle" style="font-size: 1rem"></i
            ></span>
          </div>

          <div class="add">
            <div class="input" style="display: inline-block">
              <InputText type="text" v-model="txt" class="txt" />
            </div>
            <span @click="addItem"><i class="pi pi-plus-circle"></i>추가</span><span class="msg">{{ msg }}</span>
          </div>
        </div>

        <template #footer>
          <Button label="취소" icon="pi pi-times" class="p-button-text" />
          <Button label="확인" icon="pi pi-check" autofocus />
        </template>
      </Dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "CheckListView",

  data() {
    return {
      rows: [
        { name: "주민등록증", checked: false },
        { name: "운전면허증", checked: false },
        { name: "칫솔/치약", checked: false },
        { name: "상비약", checked: false },
        { name: "현금/카드", checked: false },
        { name: "보조배터리", checked: false },
        { name: "선크림", checked: false },
        { name: "화장품", checked: false },
        { name: "옷", checked: false },
        { name: "속옷", checked: false },
        { name: "양말", checked: false }
      ],
      txt: "",
      chk: "",
      msg: "",
      display: true
    };
  },
  methods: {
    addItem() {
      if (this.txt !== null && this.txt !== "") {
        this.rows.push({ name: this.txt, checked: false });
        this.txt = "";
        this.msg = "";
      } else {
        this.msg = "항목을 입력해주세요";
      }
    },
    del(index) {
      this.rows.splice(index, 1);
    }
  }
};
</script>

<style scoped>
.inner {
  width: 1080px;
  margin: 0 auto;
  height: 1500px;
}

.title {
  margin-bottom: 30px;
}

.list {
  width: 1080px;
  display: flex;
  flex-wrap: wrap;
}
.li {
  width: 500px;
  height: 30px;
  font-size: 25px;
  margin-bottom: 5px;
}

.add {
  display: inline-block;
  width: 600px;
  padding-top: 20px;
}

.add span {
  cursor: pointer;
}
.add .txt {
  width: 200px;
  height: 40px;
}

.msg {
  color: red;
  margin-left: 20px;
}

.add #ok,
.add #cancel {
  width: 50px;
  height: 30px;
  font-size: 7px;
  text-align: center;
  padding: 0px;
}

.save {
  margin-top: 100px;
  text-align: right;
}
</style>
