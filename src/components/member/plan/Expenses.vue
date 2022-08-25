<!--
  220825 김주현
  지출 내역
-->

<template>
  <div class="main">
    <div class="header-dummy">
      <div>
        <h2>제주 여행</h2><a href="#">설정</a>
        <p>2022.08.08 ~ 08.12</p>
      </div>
      <div>
        <div class="navi-btnlist">
          <Button class="violet-btn">일행과 함께 일정 짜기</Button>
          <Button>채팅</Button>
        </div>
        <div class="navi-btnlist">
          <Button>체크리스트</Button>
          <Button>가계부</Button>
          <Button>지출 내역</Button>
          <Button>정산하기</Button>
        </div>
      </div>
    </div>
    <Divider style="border-top: 2px solid lightgray" />
    <div class="board">
      <div class="board-header">
        <Dropdown style="width: 200px;" 
          v-model="day" :options="days"></Dropdown>
      </div>
      <div class="board-main">
        <div v-for="day of (scheduleData.getDayCount() + 2)" :key="day"
          class="daycard">
          <!-- 서브 타이틀 -->
          <div>
            <h3 v-if="(day - 1) == 0">준비 단계</h3>
            <h3 v-else>day {{day - 1}}&nbsp;&nbsp;{{getDateAfter(day - 2)}}</h3>
          </div>
          
          <!-- 지출 항목들 -->
          <DataTable class="board-table" :reorderableColumns="true" :value="getExpenses(day - 1)"
            responsiveLayout="scroll" :rows="10">
            <Column :rowReorder="true" headerStyle="width: 3rem" :reorderableColumn="false" />
            <Column field="category" header="유형" style="width: 100px;"></Column>
            <Column field="contents" header="내용" alignHeader="center"></Column>
            <Column field="payment" header="금액" style="width: 100px;"></Column>
            <Column field="payType" header="수정버튼" style="width: 100px;"></Column>
            <Column field="payType" header="삭제버튼" style="width: 100px;"></Column>
          </DataTable>
          <div style="background-color: yellow;">
          </div>

          <Divider />
          <!-- 비용 추가 -->
          <Button class="violet-btn" style="width: 400px; margin: auto;">비용 추가</Button>
        </div>
      </div>
      <div class="board-footer">
      </div>
    </div>
  </div>
</template>
<script>
  import 'primeicons/primeicons.css';
  import Divider from 'primevue/divider';
  import Dropdown from 'primevue/dropdown';

  export default
  {
    name: 'QnABoard',
    components: {
      Divider, Dropdown
    },
    props: {
    },
    data() {
      return {
        days: [],
        day: '전체 보기',
        scheduleData: {
          sDate: new Date(2022, 8, 1).getTime(),
          eDate: new Date(2022, 8, 5).getTime(),
          site: '',
          getDayCount() {
            return (this.eDate - this.sDate) / 1000 / 60 / 60 / 24; // 틱 > 초 > 분 > 시
            // return start.getDay() - end.getDay() + 1;
            // return 4; // 8.1 ~ 8.4 라고 치기
          }
        },
        expenseData: [
          {
            day: 0, // 0 = 여행준비, 1~ = day n
            contents: 'test 내용',
            payment: 100000,
            payType: '카드', // 현금
            category: '기타', // 숙소 교통 식비 쇼핑 관광
            private: 0,
            consumer: ['aaa', 'bbb'],
            payer: ['aaa', 'ccc', 'eee'],
          },
          {
            day: 0, // 0 = 여행준비, 1~ = day n
            contents: 'test 내용2',
            payment: 300000,
            payType: '카드', // 현금
            category: '기타', // 숙소 교통 식비 쇼핑 관광
            private: 0,
            consumer: ['aaa', 'bbb'],
            payer: ['aaa', 'ccc', 'eee'],
          },
          {
            day: 0, // 0 = 여행준비, 1~ = day n
            contents: 'test 내용3',
            payment: 500000,
            payType: '카드', // 현금
            category: '기타', // 숙소 교통 식비 쇼핑 관광
            private: 0,
            consumer: ['aaa', 'bbb'],
            payer: ['aaa', 'ccc', 'eee'],
          }
        ],
        // 해당 일자에 맞는 지출 내역 뽑아오기
        getExpenses(dday) {
          let result = [];
          for (let expense of this.expenseData)
          {
            if (expense.day == dday)
              result.push(expense);
          }
          return result;
        },
        // 시작일로부터 d일 지난 시점의 날짜 얻어오기 ('월.일 / 요일' 의 형태)
        getDateAfter(d) {
          const dayName = ['일', '월', '화', '수', '목', '금', '토']
          let date = new Date(this.scheduleData.sDate + (d * 1000 * 60 * 60 * 24)); // 틱 > 초 > 분 > 시
          return `${date.getMonth()}.${date.getDate()} / ${dayName[date.getDay()]}`
        }
      }
    },
    created() {
      this.days = [ '전체 보기', '여행 준비' ]
      for (let i = 0; i < this.scheduleData.getDayCount(); i++)
        this.days.push('day ' + (i + 1));
    },
    mounted() {
    },
    methods: {
    }
  }
</script>
<style scoped>
  a {
    text-decoration: none;
  }
  .header-dummy {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
  }
  .header-dummy > div {
    margin: 5px;
  }
  .header-dummy div Button {
    margin-top: 5px;
  }
  .header-dummy div .navi-btnlist * {
    margin-right: 10px;
  }
  .main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 1080px;
    margin: auto;
    padding: 10px;
    background-color: white;
    border: 1px solid lightgray;
  }
  .main > div {
    margin: 10px;
    width: 1040px;
    border: 1px solid red;
  }

  .board {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 1080px;
    border: 1px solid lightgray;
  }
  .board-header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100px;
    align-items: flex-start;
    padding: 20px;
  }
  .board-header h1 {
    font-weight: bold;
    color: #222;
  }
  .board-main {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    padding: 20px;
  }
  .board-main .daycard {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    border: 1px solid gray;
    padding: 10px;
  }
  .daycard > * {
    margin: 10px;
  }
  .board-table {
    width: 100%;
    margin: 0px 0px 20px 0px;
    text-align: center;
    border-top: 1px solid gray;
    border-collapse: collapse;
  }
  .board-page .currentPage {
    color: #67AB9F;
  }
  .board-page * {
    margin: 0px 4px;
  }
  .board-footer {
    display: flex;
    flex-direction: row;
    justify-content: end;
    width: 100%;
    align-items: center;
    padding: 20px;
  }
  .board-footer * {
    margin: 0px 4px;
  }
  .violet-btn {
    background-color: white;
    color: #756AF6;
    border: 1px solid #756AF6;
    justify-content: center;
  }

</style>
