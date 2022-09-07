<template>
  <div class="wrap">
    <div class="inner">
      <h1 class="add-form-title">FAQ 질문 등록</h1>
      <div class="form">
        <div class="faq-form">
          <div class="form-group">
            <h3>제목</h3>
            <span class="p-label">
              <Dropdown
                v-model="selectedOptions"
                :options="category"
                optionLabel="name"
                optionValue="code"
                placeholder="카테고리"
              />
              <small v-if="submitted && !this.name" class="p-error">카테고리를 선택해 주세요.</small>
            </span>
            <InputText
              v-model="faqTitle"
              :class="{ 'p-invalid': submitted && !this.faqTitle }"
              class="form-control field md:col-4"
              placeholder="제목을 입력해 주세요."
              style="witdh: 350px"
            /><br />
            <small v-if="submitted && !this.faqTitle" class="p-error">제목을 입력해 주세요.</small>

            <div class="content">
              <h3>답변 등록</h3>
              <Textarea v-model="faqContent" class="form-control field md:col-4" cols="50" rows="5" />
              <br />
              <small v-if="submitted && !this.faqContent" class="p-error">내용을 입력해 주세요.</small>
            </div>
          </div>
          <!-- modal -->
          <Dialog v-model:visible="faqAdd">
            <h3>글이 정상적으로 등록되었습니다.</h3>
            <Button class="confirm" @click="confirm">확인</Button>
          </Dialog>
          <Dialog v-model:visible="faqAddFail">
            <h3>글을 등록하는데 오류가 발생하였습니다.</h3>
            <Button class="confirm" @click="confirm">확인</Button>
          </Dialog>
          <div class="button-group">
            <Button class="p-button-primary mr-2" label="Save" @click="onSave" />
            <Button class="p-button-secondary mr-2" label="Cancel" @click="onCancel" />
            <Button class="p-button-secondary mr-2" label="목록으로" @click="goList()" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";
import { defaultOptions } from "@/constant/axios.js";

export default {
  name: "AddFaqForm",
  data() {
    return {
      selectedOptions: null,
      category: [
        { name: "여행상품", code: "여행상품" },
        { name: "예약", code: "예약" },
        { name: "결제", code: "결제" },
        { name: "회원", code: "회원" }
      ],
      faqTitle: "",
      faqContent: "",
      submitted: false,

      faqAdd: false,
      faqAddFail: false
    };
  },
  methods: {
    async onSave() {
      this.submitted = true;

      const addFaqParam = new URLSearchParams();
      addFaqParam.append("id", "admin");
      addFaqParam.append("category", this.selectedOptions);
      addFaqParam.append("faqTitle", this.faqTitle);
      addFaqParam.append("faqContent", this.faqContent);

      const postUrl = `${process.env.VUE_APP_API_URL || ""}/service/faqs/${this.categoryToEng(
        addFaqParam.get("category")
      )}/`;
      const response = await axios.post(postUrl, addFaqParam, defaultOptions).catch(err => {
        (this.faqAddFail = !this.faqAddFail), err;
      });
      if (response.data.result === "success") {
        this.faqAdd = !this.faqAdd;
      } else {
        this.faqAddFail = !this.faqAddFail;
      }
    },
    onCancel() {
      this.faqTitle = "";
      this.faqContent = "";

      return this.submitted;
    },
    categoryToEng(category) {
      if (category == "여행상품") {
        return "package";
      } else if (category == "결제") {
        return "payment";
      } else if (category == "예약") {
        return "reservation";
      } else {
        return "user";
      }
    },
    confirm() {
      this.faqAdd = false;
      return router.push(`/admin/service/faq`);
    },
    goList() {
      return router.push(`/admin/service/faq`);
    }
  }
};
</script>
<style scoped>
.wrap {
  width: 100%;
}

.inner {
  width: 1080px;
  margin: 0 auto;
}

.button-group {
  margin-bottom: 20px;
  text-align: center;
}

.form {
  border: 1px solid lightgray;
  margin-top: 30px;
  margin-bottom: 100px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-group {
  margin: 20px;
}

input {
  margin-left: 10px;
  width: 650px;
}

h1 {
  margin-top: 20px;
}

h3 {
  margin-top: 20px;
  margin-bottom: 10px;
  text-align: left;
}

textarea {
  resize: none;
  width: 800px;
  height: 200px;
}

.confirm {
  display: inline-block;
}
</style>
