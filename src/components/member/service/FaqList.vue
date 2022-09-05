<template>
    <div class="main">
        <div class="faq-main">
            <div class="faq-header">
                <h1>{{title}}</h1>
            </div>
            <div>
                <div class="card">
                    <TabMenu :model="items" class="tabs" v-model:activeIndex="selectedIndex"/>
                </div>
            </div>
            <div class="faq-accordian">
            <Accordion :activeIndex="0" v-for="(list,index) in faqList" :key="index">
                <AccordionTab :header="list.faqTitle" v-if="list.category==items[selectedIndex].label">
                   <p> {{list.faqContent}} </p>
                </AccordionTab>
            </Accordion>
            </div>
        </div>
    </div>
</template>

<script>
import TabMenu from 'primevue/tabmenu';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';

export default {
    name: 'FaqListTab',
    components :{
        TabMenu,
        Accordion,
        AccordionTab
    },
    props:{
        title: String,
        faqList: Object
    },
    data() {
        return {
            active: 3,
            items: [
                {
                    label: '여행상품',
                },
                {
                    label: '예약',
                },
                {
                    label: '결제',
                },
                {
                    label: '회원',
                },
            
            ],
            selectedIndex: 0,
        };
    },
    
}
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
}
.faq-main {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1080px;
  border: 1px solid lightgray;
}
.p-tabmenu .p-tabmenu-nav {
  width: 100%;
  justify-content: center;
}
.tabmenudemo-content {
    padding: 2rem 1rem;
    background-color: #91D9CC;
}
.faq-header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100px;
  align-items: flex-start;
  padding: 20px;
}
.faq-header h1 {
  font-size: 50px;
  font-weight: bold;
  color: #222;
}
.accordion-custom {
    i, span {
        vertical-align: middle;
    }

    span {
        margin: 0 .5rem;
    }
}
.faq-accordian{
    width: 1040px;
    margin-top: 50px;
    margin-bottom: 50px;
}

.p-accordion p {
    line-height: 1.5;
    margin: 0;
    margin-top: 50px;
    margin-bottom: 5px;
}
.card{
    width: 1040px;
}
</style>