<template>
    <div class="wrap">
        <div class="inner">
            <h1 class="add-form-title">FAQ 질문 수정</h1>
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
                <Button class="p-button-secondary mr-2" label="목록으로" @click="goList()" />
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import router from '@/router';


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
    mounted(){
        this.getDetail();
    },
    methods: {
        getDetail(){
            axios
                .get(`http://localhost:8082/triplus/api/service/faqs/${this.$route.params.faqNum}`, this.data, {
            headers: {
              "Access-Control-Allow-Origin": "*"
            }
          })
          .then(res => {
            this.data = res.data;
            this.faqTitle = this.data.faqTitle;
            this.faqContent = this.data.faqContent;
            console.log(res);
            
          })
          .catch(err => {
            console.log(err.resp);
          });
        },
        onSave(){
            this.submitted = true;
            console.log('faqTitle:' + this.faqTitle)
            const updateParam = {
                "id" :"admin",
                "category" : this.selectedOptions,
                "faqTitle" : this.faqTitle,
                "faqContent" : this.faqContent
            };

            axios
                .put(`http://localhost:8082/triplus/api/service/faqs/${this.$route.params.faqNum}`, updateParam, {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json'
                    }
                })
                .then(
                    function (resp) {
                    
                    console.log("resp", resp);
                    if (resp.data.result === "success") {
                    alert("글 수정 성공");
                    } else {
                    alert("글 수정 실패");
                    console.log(resp);
                    }
                }.bind(this),
                );
        },
        onCancel() {
            this.faqTitle = "";
            this.faqContent = "";

            return this.submitted;
        },
        goList(){
        let category = this.selectedOptions;
        console.log(category);
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

    .form-control {
    width: 500px;
    }

    .button-group {
    margin-bottom: 20px;
    }
    </style>
