<template>
    <div class="wrap">
        <div class="inner">
            <h1 class="add-form-title">FAQ 질문 등록</h1>
            <div class="form-group">
                <h3>제목</h3>
                <span class="p-label">
                    <Dropdown v-model="selectedOptions" :options="category" optionLabel="name" optionValue="code" placeholder="카테고리" />
                     <small v-if="submitted && !this.name" class="p-error">카테고리를 선택해 주세요.</small>
                </span>
                <InputText
                 v-model="faqTitle"
                 :class="{ 'p-invalid': submitted && !this.faqTitle }"
                 class="form-control field md:col-4"
                 placeholder="제목을 입력해 주세요."
                 style="witdh: 350px"
                />
                 <small v-if="submitted && !this.faqTitle" class="p-error">제목을 입력해 주세요.</small>
            </div>
            <div>
                <h3>답변 등록</h3>
                <Textarea
                 v-model="faqContent"
                 class="form-control field md:col-4" cols="50" rows="5"
                />
                 <small v-if="submitted && !this.faqContent" class="p-error">내용을 입력해 주세요.</small>
            </div>
            <div class="button-group">
                <Button class="p-button-primary mr-2" label="Save" @click="onSave" />
                <Button class="p-button-secondary mr-2" label="Cancel" @click="onCancel" />
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { defaultOptions } from "@/constant/axios.js";


export default {
    name: "AddFaqForm",
    data() {
	return {
		selectedOptions: null,
		category: [
			{name: '여행상품', code: '여행상품'},
			{name: '예약', code: '예약'},
			{name: '결제', code: '결제'},
			{name: '회원', code: '회원'},
            ],
            faqTitle: "",
            faqContent: "",
            submitted: false
        };
    },
    methods: {

        async onSave() {
            this.submitted = true;
           
            const addFaqParam = new URLSearchParams();
            addFaqParam.append("id","admin");
            addFaqParam.append("category", this.selectedOptions);
            addFaqParam.append("faqTitle",this.faqTitle);
            addFaqParam.append("faqContent", this.faqContent);

            const postUrl = `${process.env.VUE_APP_API_URL || ""}/service/faqs/${this.categoryToEng(addFaqParam.get("category"))}/`;
            const response = await axios.post(postUrl, addFaqParam, defaultOptions).catch(err => {
                alert("글등록 실패", err);
            });
            if (response.data.result === "success"){
                alert("글등록 성공");

            }else {
                alert("글등록 실패");
            }
        },
        onCancel() {
            this.faqTitle = "";
            this.faqContent = "";

            return this.submitted;
        },
        categoryToEng(category){
            if(category == "여행상품"){
                return "package";
            }else if(category == "결제") {
                return "payment";
            }else if(category == "예약") {
                return "reservation";
            }else {
                return "user";
            }
        }
    }
}
    </script>
    <style scoped>
    .wrap {
    width: 100%;
    }

    .inner {
    width: 1080px;
    margin: 0 auto;
    }

    .form-control {
    width: 500px;
    }

    .button-group {
    margin-bottom: 20px;
    }
    </style>
