<!--
  220825 김주현
  지출 내역
-->

<template>
  <div class="main">
    <PlanHeader />
    <Divider style="border-top: 2px solid lightgray" />
    <div class="board">
      <div class="board-header">
        <Dropdown style="width: 200px;" optionLabel="name"
          v-model="selectedDay" :options="days" placeholder="전체 보기"></Dropdown>
        <br>
        <div>
          <Button class="p-button-secondary p-button-rounded p-button-sm mr-4" @click="displaySummary = true">지출 통계</Button>
          &nbsp;
          <Button class="p-button-secondary p-button-rounded p-button-sm mr-4" @click="displayCalculate = true">정산하기</Button>
        </div>
      </div>
      <div class="board-main">
        <div v-for="day of (scheduleData.getDayCount() + 1)" :key="day"
          class="daycard"
          v-show="selectedDay == -1 || selectedDay.code == -1 || (day - 1) == selectedDay.code">
          <!-- 서브 타이틀 -->
          <div>
            <h3 v-if="(day - 1) == 0">여행 준비</h3>
            <h3 v-else>day {{day - 1}}&nbsp;&nbsp;{{getDateAfter(day - 2)}}</h3>
          </div>

          <Divider />
          
          <!-- 지출 항목들 -->
          <DataTable class="board-table" :value="expenseData[day - 1]"
            responsiveLayout="scroll" :rows="10">
            <Column field="category" header="유형" style="width: 120px;">
              <template #body="slotProps">
                <i class="pi" style="font-size: 3rem; color: #009688;" :class="getIcon(slotProps.data.category)"></i>
              </template>
            </Column>
            <Column field="contents" header="내용" alignHeader="center">
              <template #body="slotProps">
                <p style="font-size: 20px; font-weight: 500;">{{slotProps.data.contents}}</p>
              </template>
            </Column>
            <Column field="payment" header="금액" style="width: 150px;">
              <template #body="slotProps">
                <p style="font-size: 20px; font-weight: 500;">{{new Intl.NumberFormat('en-US').format(slotProps.data.payment)}}원</p>
              </template>
            </Column>
            <Column field="payType" header="수정버튼" style="width: 120px;">
              <template #body="slotProps">
                <Button @click="openEditExpense(slotProps.data)" >수정</Button>
              </template>
            </Column>
            <Column field="payType" header="삭제버튼" style="width: 120px;">
              <template #body="slotProps">
                <Button @click="deleteExpense(slotProps.data)">삭제</Button>
              </template>
            </Column>
          </DataTable>
          <div style="background-color: yellow;">
          </div>

          <Divider />

          <!-- 비용 추가 -->
          <Button class="violet-btn"
            style="width: 400px; margin: auto;"
            @click="displayAddExpense = true">비용 추가</Button>
        </div>

        <!-- 비용 추가 다이얼로그 -->
        <Dialog class="dialog-addexpense" header="비용 추가하기" v-model:visible="displayAddExpense" :modal="true"
          style="width: 510px;">
          <div>
            <Divider />
            <div>
              <h3>날짜 선택</h3>
              <Dropdown style="width: 200px;" :options="getDays()" optionLabel="name" v-model="expDay" />
            </div>
            <Divider />
            <div>
              <h3>결제 수단 & 비용</h3>
              <Dropdown style="width: 140px;" :options="['현금', '카드']" v-model="expPayType" />
              <InputNumber style="width: auto;" v-model="expPayment"></InputNumber>원
            </div>
            <Divider />
            <div>
              <h3>내용</h3>
              <InputText style="width: 100%" placeholder="이곳에 내용 입력" v-model="expContent"></InputText>
            </div>
            <Divider />
            <div>
              <h3>카테고리</h3>
              <SelectButton v-model="expCategory" :options="categoryIconOptions">
                <template #option="slotProps">
                  <div style="display: flex; flex-direction: column;">
                    <i :class="slotProps.option.icon" style="font-size: 2rem"></i>
                    <br>
                    {{slotProps.option.value}}
                  </div>
                </template>
              </SelectButton>
            </div>
            <Divider />
            <div>
              <DataTable class="add-table" :value="scheduleData.users"
                responsiveLayout="scroll" :rows="10">
                <Column field="contents" header="함께한 사람" alignHeader="center">
                  <template #body="slotProps">
                    <p style="font-size: 20px; font-weight: 500;">{{slotProps.data}}</p>
                  </template>
                </Column>
                <Column field="pay" header="결제" style="width: 70px;">
                  <template #body="slotProps">
                    <Checkbox name="consumers" :value="slotProps.data" v-model="expPayers" />
                  </template>
                </Column>
                <Column field="consume" header="함께" style="width: 70px;">
                  <template #body="slotProps">
                    <Checkbox name="payers" :value="slotProps.data" v-model="expConsumers" />
                  </template>
                </Column>
              </DataTable>
            </div>
            <Divider />
            <div style="display: flex; width: 100%; font-size: 20px; align-items: center; justify-content: flex-end;">
              <Checkbox v-model="expPrivate" :binary="true"></Checkbox>&nbsp;이 비용 나만 보기
            </div>
            <div style="display: flex; width: 100%; align-items: flex-end; justify-content: flex-end;">
              <Button class="p-button-warning" @click="displayAddExpense = false">취소</Button>
              &nbsp;
              <Button @click="addExpense()">등록</Button>
            </div>
          </div>
        </Dialog>
        
        <!-- 비용 수정 다이얼로그 -->
        <Dialog class="dialog-editexpense" header="비용 수정하기" v-model:visible="displayEditExpense" :modal="true"
          style="width: 510px;">
          <div>
            <Divider />
            <div>
              <h3>날짜 선택</h3>
              <Dropdown style="width: 200px;" :options="getDays()" optionLabel="name" v-model="expDay" />
            </div>
            <Divider />
            <div>
              <h3>결제 수단 & 비용</h3>
              <Dropdown style="width: 140px;" :options="['현금', '카드']" v-model="expPayType" />
              <InputNumber style="width: auto;" v-model="expPayment"></InputNumber>원
            </div>
            <Divider />
            <div>
              <h3>내용</h3>
              <InputText style="width: 100%" placeholder="이곳에 내용 입력" v-model="expContent"></InputText>
            </div>
            <Divider />
            <div>
              <h3>카테고리</h3>
              <SelectButton v-model="expCategory" :options="categoryIconOptions">
                <template #option="slotProps">
                  <div style="display: flex; flex-direction: column;">
                    <i :class="slotProps.option.icon" style="font-size: 2rem"></i>
                    <br>
                    {{slotProps.option.value}}
                  </div>
                </template>
              </SelectButton>
            </div>
            <Divider />
            <div>
              <DataTable class="add-table" :value="scheduleData.users"
                responsiveLayout="scroll" :rows="10">
                <Column field="contents" header="함께한 사람" alignHeader="center">
                  <template #body="slotProps">
                    <p style="font-size: 20px; font-weight: 500;">{{slotProps.data}}</p>
                  </template>
                </Column>
                <Column field="pay" header="결제" style="width: 70px;">
                  <template #body="slotProps">
                    <Checkbox name="consumers" :value="slotProps.data" v-model="expPayers" />
                  </template>
                </Column>
                <Column field="consume" header="함께" style="width: 70px;">
                  <template #body="slotProps">
                    <Checkbox name="payers" :value="slotProps.data" v-model="expConsumers" />
                  </template>
                </Column>
              </DataTable>
            </div>
            <Divider />
            <div style="display: flex; width: 100%; font-size: 20px; align-items: center; justify-content: flex-end;">
              <Checkbox v-model="expPrivate" :binary="true"></Checkbox>&nbsp;이 비용 나만 보기
            </div>
            <div style="display: flex; width: 100%; align-items: flex-end; justify-content: flex-end;">
              <Button class="p-button-warning" @click="displayAddExpense = false">취소</Button>
              &nbsp;
              <Button @click="editExpense()">수정</Button>
            </div>
          </div>
        </Dialog>
        
        <!-- 지출 통계 다이얼로그 -->
        <Dialog class="dialog-summary" header="지출 통계" v-model:visible="displaySummary" :modal="true"
          style="width: 800px;">
          <div>
            <Divider />
            <div>
              <h3>총 지출 금액</h3>
              <h1><span style="color: #009688">{{new Intl.NumberFormat('en-US').format(summaryData.getSummary())}}</span>원</h1>
              <p>{{summaryData.getTop()}}에 가장 많이 썼어요.</p>
            </div>
            <Divider />
            <h3></h3>
            <div style="display: flex; flex-direction: row; justify-content: space-between; align-items: center;">
              <div style="width: 50%">
                <div v-for="cat of summaryData.data.labels" :key="cat">
                  <h3>{{cat}}</h3>
                  <h1 class="summary-h1">
                    <span style="color: #aaaaaa; font-size: 12px;">{{summaryData.getPercentage(cat)}}</span>
                    <span style="color: #009688">{{new Intl.NumberFormat('en-US').format(summaryData.getCategory(cat))}}</span>
                    원
                  </h1>
                </div>
              </div>
              <div style="width: 50%">
                <Chart type="pie" :data="summaryData.data" />
              </div>
            </div>
            <div>
            </div>
            <Divider />

            <div>
              <Dropdown style="width: 200px;"
                v-model="selectedCategory" :options="getCategories()" placeholder="전체 보기"
                @change="filteredExpenseData = getFilteredExpenseData(selectedCategory)"/>
            </div>
            <Divider />
            <!-- 지출 항목들 -->
            <div v-for="day of (scheduleData.getDayCount() + 1)" :key="day">
              <h3 v-if="(day - 1) == 0">여행 준비</h3>
              <h3 v-else>day {{day - 1}}&nbsp;&nbsp;{{getDateAfter(day - 2)}}</h3>
              <br>
              <DataTable class="board-table" :value="filteredExpenseData[day - 1]"
                responsiveLayout="scroll" :rows="10">
                <Column field="category" header="유형" style="width: 120px;">
                  <template #body="slotProps">
                    <i class="pi" style="font-size: 3rem; color: #009688;" :class="getIcon(slotProps.data.category)"></i>
                  </template>
                </Column>
                <Column field="contents" header="내용" alignHeader="center">
                  <template #body="slotProps">
                    <p style="font-size: 20px; font-weight: 500;">{{slotProps.data.contents}}</p>
                  </template>
                </Column>
                <Column field="payment" header="금액" style="width: 150px;">
                  <template #body="slotProps">
                    <p style="font-size: 20px; font-weight: 500;">{{new Intl.NumberFormat('en-US').format(slotProps.data.payment)}}원</p>
                  </template>
                </Column>
              </DataTable>
              <Divider />
            </div>
            <Divider />
            <div style="display: flex; width: 100%; align-items: center; justify-content: center;">
              <Button @click="displaySummary = false">닫기</Button>
            </div>
          </div>
        </Dialog>

        <!-- 정산 다이얼로그 -->
        <Dialog class="dialog-calculate" header="정산" v-model:visible="displayCalculate" :modal="true"
          style="width: 510px;">
          <div>
            <Divider />
            <div>
              <h3>총 지출 금액</h3>
              <h1><span style="color: #009688">{{new Intl.NumberFormat('en-US').format(summaryData.getSummary())}}</span>원</h1>
            </div>
            <Divider />
            <div>
              <div class="calculate-subtitle" style="display: flex; justify-content: space-between">
                <h3>누가 누구에게</h3>
                <h3>얼마를</h3>
              </div>
              <div v-for="user in scheduleData.users" :key="user">
                <div v-show="user != 'aaa' && calculateData['aaa'][user] != 0" style="display: flex; justify-content: space-between">
                  <h3 v-show="calculateData['aaa'][user] > 0">당신 → {{user}}</h3>
                  <h3 v-show="calculateData['aaa'][user] < 0">{{user}} → 당신</h3>
                  <h3>
                    <span style="color: #009688">{{new Intl.NumberFormat('en-US').format(Math.abs(calculateData['aaa'][user].toFixed(0)))}}</span>
                    원
                  </h3>
                </div>
              </div>
            </div>
            <Divider />
            <div>
              <div class="calculate-subtitle">
                <h3>개인별 지출금액</h3>
              </div>
              <div v-for="user in scheduleData.users" :key="user" style="display: flex; justify-content: space-between">
                <h3>{{user}}</h3>
                <h3>
                  <span style="color: #009688">{{new Intl.NumberFormat('en-US').format(calculateData[user][user].toFixed(0))}}</span>
                  원
                </h3>
              </div>
            </div>
            <Divider />
            <div style="display: flex; width: 100%; align-items: center; justify-content: center;">
              <Button @click="displayCalculate = false">닫기</Button>
            </div>
          </div>
        </Dialog>
      </div>
      <div class="board-footer">
      </div>
    </div>
  </div>
</template>
<script>
  import 'primeicons/primeicons.css';
  import axios from 'axios';
  import Dialog from 'primevue/dialog';
  import Divider from 'primevue/divider';
  import Dropdown from 'primevue/dropdown';
  import Chart from 'primevue/chart';
  import PlanHeader from './PlanHeader.vue';

  const iconMap = {
          '기타': 'pi-map-marker',
          '숙소': 'pi-home',
          '교통': 'pi-car',
          '식비': 'pi-cloud',
          '쇼핑': 'pi-shopping-bag',
          '관광': 'pi-map',
        };

  export default
  {
    name: 'QnABoard',
    components: {
    Divider,
    Dropdown,
    Dialog,
    Chart,
    PlanHeader
    },
    props: {
      apiURL: String
    },
    data() {
      return {
        categoryIconOptions: [
          { icon: 'pi pi-map-marker', value: '기타' },
          { icon: 'pi pi-home', value: '숙소' },
          { icon: 'pi pi-car', value: '교통' },
          { icon: 'pi pi-cloud', value: '식비' },
          { icon: 'pi pi-shopping-bag', value: '쇼핑' },
          { icon: 'pi pi-map', value: '관광' },
        ],
        displayAddExpense: false,
        displayEditExpense: false,
        displaySummary: false,
        displayCalculate: false,
        days: [],
        selectedDay: -1,
        selectedCategory: '전체 보기',
        // 일정 데이터
        scheduleData: {
          skdNum: 1,
          sDate: new Date(2022, 8, 1).getTime(),
          eDate: new Date(2022, 8, 5).getTime(),
          site: '',
          users: ['aaa', 'bbb', 'ccc', 'ddd', 'eee'],
          getDayCount() {
            return (this.eDate - this.sDate) / 1000 / 60 / 60 / 24 + 1; // 틱 > 초 > 분 > 시 순으로 나눔 (+1은 오늘도 포함시키기 위해서)
          }
        },
        // 지출 데이터 (그냥 DB에서 끌어온 것)
        expenseRawData: [
          {
            day: 0, // 0 = 여행준비, 1~ = day n
            contents: 'test 내용',
            payment: 90000,
            payType: '카드', // 현금
            category: '기타', // 숙소 교통 식비 쇼핑 관광
            private: 0,
            consumer: ['aaa', 'bbb'],
            payer: ['aaa', 'ccc', 'eee'],
          },
          {
            day: 1, // 0 = 여행준비, 1~ = day n
            contents: 'test 내용2',
            payment: 300000,
            payType: '카드', // 현금
            category: '숙소', // 숙소 교통 식비 쇼핑 관광
            private: 0,
            consumer: ['aaa', 'bbb'],
            payer: ['aaa', 'ccc', 'eee'],
          },
          {
            day: 0, // 0 = 여행준비, 1~ = day n
            contents: 'test 내용3',
            payment: 500000,
            payType: '현금', // 현금
            category: '교통', // 숙소 교통 식비 쇼핑 관광
            private: 0,
            consumer: ['aaa', 'bbb'],
            payer: ['aaa', 'ccc', 'eee'],
          },
          {
            day: 2, // 0 = 여행준비, 1~ = day n
            contents: 'test 내용3',
            payment: 500000,
            payType: '카드', // 현금
            category: '기타', // 숙소 교통 식비 쇼핑 관광
            private: 0,
            consumer: ['aaa', 'bbb'],
            payer: ['aaa', 'ccc', 'eee'],
          }
        ],
        // 지출 데이터 (적절히 정돈해놓은 것)
        expenseData: [[]],
        // 지출 데이터 (카테고리 필터링)
        filteredExpenseData: [[]],
        // 통계 데이터
        summaryData: {
          data: {
            labels: ['기타', '숙소', '교통', '식비', '쇼핑', '관광'],
            datasets: [
              {
                data: [0, ],
                backgroundColor: ['gray', 'green', 'yellow', 'red', 'blue', 'purple'],
                hoverBackgroundColor: ['gray', 'green', 'yellow', 'red', 'blue', 'purple']
              }
            ]
          },
          getSummary() {
            let sum = 0;
            for (let amount of this.data.datasets[0].data)
              sum += amount;
            return sum;
          },
          getCategory(category) {
            let index = this.data.labels.indexOf(category);
            return this.data.datasets[0].data[index];
          },
          getPercentage(category) {
            let index = this.data.labels.indexOf(category);
            let sum = 0;
            for (let amount of this.data.datasets[0].data)
              sum += amount;
            let compare = this.data.datasets[0].data[index];
            return `${(compare / sum * 100.0).toFixed(1)}%`;
          },
          getTop() {
            let topLabel = this.data.labels[0];
            let topAmount = this.data.datasets[0].data[0];
            for (let i = 1; i < this.data.labels.length; i++)
            {
              if (this.data.datasets[0].data[i] > topAmount)
              {
                topLabel = this.data.labels[i];
                topAmount = this.data.datasets[0].data[i];
              }
            }
            return topLabel;
          }
        },
        // 정산 데이터
        calculateData: [],
        expDay: 0,
        expPayType: '',
        expPayment: 0,
        expContent: '',
        expCategory: '',
        expPrivate: false,
        expConsumers: [],
        expPayers: [],

        // 기타
        tempEditExpense: {},
        expNum: 0,
      }
    },
    created() {
      // TODO 일정 따오기

      // 일정 따와서 날짜 정리
      this.days.push({name: `전체 보기`, code: -1});
      this.days.push({name: `여행 준비`, code: 0});
      for (let i = 0; i < this.scheduleData.getDayCount(); i++)
      {
        this.days.push({name: `day ${i + 1}`, code: i + 1});
      }

      // 지출 내역 따오기
      axios.get(`${this.apiURL}/${this.scheduleData.skdNum}`, {
          headers: {
            'Access-Control-Allow-Origin': '*'
          },
          params: { }
        }).then(function(resp) {
          this.expenseData = resp.data;
        }.bind(this));

      // 지출 내역 정리
      this.expNum = 0;
      this.expenseData = [];
      for (let i = 0; i < this.scheduleData.getDayCount() + 1; i++)
        this.expenseData.push([]);
      for (let arr of this.expenseData)
      {
        for (let expense of arr)
        {
          if (expense.expNum > this.expNum)
            this.expNum = expense.expNum + 1;
          this.expenseData[expense.day].push(expense);
        }
      }
      this.filteredExpenseData = this.getFilteredExpenseData(this.selectedCategory);

      // 통계 정리
      this.summaryData.data = this.getChartData();

      // 정산 정리
      this.calculateData = this.calculate();
    },
    mounted() {
    },
    methods: {
      // 시작일로부터 d일 지난 시점의 날짜 얻어오기 ('월.일 / 요일' 의 형태)
      getDateAfter(d) {
        const dayName = ['일', '월', '화', '수', '목', '금', '토']
        let date = new Date(this.scheduleData.sDate + (d * 1000 * 60 * 60 * 24)); // 틱 > 초 > 분 > 시
        return `${date.getMonth()}.${date.getDate()} / ${dayName[date.getDay()]}`
      },
      // 카테고리 아이콘 취득
      getIcon(name) {
        return [iconMap[name]];
      },
      getDays() {
        let result = [];
        result.push({name: `여행 준비`, code: 0});
        for (let i = 0; i < this.scheduleData.getDayCount(); i++)
        {
          result.push({name: `day ${i + 1}`, code: i + 1});
        }
        return result;
      },
      getCategories() {
        return ['전체 보기', '기타', '숙소', '교통', '식비', '쇼핑', '관광'];
      },
      openEditExpense(exp) {
        console.log(this.getDays().filter(val => val.code == exp.day)[0]);
        this.expDay = this.getDays().filter(val => val.code == exp.day)[0];
        this.expContent = exp.contents;
        this.expPayment = exp.payment;
        this.expPayType = exp.payType;
        this.expCategory = this.categoryIconOptions.filter(val => val.value == exp.category)[0];
        this.expPrivate = exp.private;
        this.expConsumers = exp.consumer;
        this.expPayers = exp.payer;
        this.tempEditExpense = exp;
        this.displayEditExpense = true;
      },
      editExpense() {
        let available = this.checkAvailable();
        if (available.result == false)
          return alert(available.reason);
        let expense = this.expenseData[this.tempEditExpense.day].filter(a => a.expNum == this.tempEditExpense.expNum)[0];
        if (expense.day != this.expDay) // 날짜 다른 경우 옮겨야 함
        {
          let index = this.expenseData[this.tempEditExpense.day].findIndex(e => e.expNum == this.tempEditExpense.expNum);
          this.expenseData[expense.day].splice(index, 1);
          this.expenseData[this.expDay.code].push(expense);
        }
        expense.day = this.expDay.code;
        expense.contents = this.expContent;
        expense.payment = this.expPayment;
        expense.payType = this.expPayType;
        expense.category = this.expCategory.value;
        expense.private = this.expPrivate;
        expense.consumer = this.expConsumers;
        expense.payer = this.expPayers;
        this.displayEditExpense = false;
        
        // 업데이트
        axios.put(`${this.apiURL}/${this.scheduleData.skdNum}`,
          JSON.stringify(this.expenseData), {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          }
        }).then(function(resp) {
          console.log(resp);
        }.bind(this));
      },
      deleteExpense(exp) {
        for (let expArr of this.expenseData)
        {
          let index = expArr.findIndex(item => item.expNum == exp.expNum);
          if (index > -1)
            expArr.splice(index, 1);
        }
      },
      addExpense() {
        let available = this.checkAvailable();
        if (available.result == false)
          return alert(available.reason);
        this.expenseData[this.expDay.code].push({
          expNum: this.expNum++,
          day: this.expDay.code,
          contents: this.expContent,
          payment: this.expPayment,
          payType: this.expPayType,
          category: this.expCategory.value,
          private: this.expPrivate,
          consumer: this.expConsumers,
          payer: this.expPayers
        });
        this.displayAddExpense = false;
        this.summaryData.data = this.getChartData();
        this.calculateData = this.calculate();
        this.expDay = null;
        this.expContent = "";
        this.expPayment = 0;
        this.expPayType = "";
        this.expCategory = null;
        this.expPrivate = false;
        this.expConsumers = [];
        this.expPayers = [];
        // 업데이트
        axios.put(`${this.apiURL}/${this.scheduleData.skdNum}`,
          JSON.stringify(this.expenseData), {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          }
        }).then(function(resp) {
          console.log(resp);
        }.bind(this));
      },
      checkAvailable() {
        if (this.expDay == null || this.expDay.code == undefined)
          return { result: false, reason: "날짜를 선택하세요." };
        if (this.expContent == "")
          return { result: false, reason: "내용을 입력하세요." };
        if (this.expPayment == "" || this.expPayment == 0)
          return { result: false, reason: "금액을 입력하세요." };
        if (this.expPayType == "")
          return { result: false, reason: "현금/카드 여부를 선택하세요." };
        if (this.expCategory == null || this.expCategory.value == undefined)
          return { result: false, reason: "소비 카테고리를 선택하세요." };
        if (this.expConsumers.length == 0)
          return { result: false, reason: "함께한 사람을 최소 한 명 이상 선택하세요." };
        if (this.expPayers.length == 0)
          return { result: false, reason: "결제한 사람을 최소 한 명 이상 선택하세요." };
        return { result: true };
      },
      getChartData() {
        let result = {
          labels: ['기타', '숙소', '교통', '식비', '쇼핑', '관광'],
          datasets: [
            {
              data: [0, 0, 0, 0, 0, 0],
              backgroundColor: ['gray', 'green', 'yellow', 'red', 'blue', 'purple'],
              hoverBackgroundColor: ['gray', 'green', 'yellow', 'red', 'blue', 'purple']
            }
          ]
        };
        for (let arr of this.expenseData)
        {
          for (let element of arr)
          {
            let index = result.labels.indexOf(element.category);
            console.log(index);
            result.datasets[0].data[index] += element.payment;
          }
        }
        console.log(result);
        return result;
      },
      getFilteredExpenseData(category) {
        console.log(category);
        if (category == '전체 보기')
          return this.expenseData;
        let result = JSON.parse(JSON.stringify(this.expenseData));
        for (let i = 0; i < result.length; i++)
        {
          result[i] = result[i].filter(element => element.category == category);
        }
        console.log(result);
        return result;
      },
      // 계산
      // 놀기만 한 사람 -> 1/[같이 논 사람들] 의 금액을 돈 낸 사람에게 지불
      // 돈만 낸 사람 -> 1/[같이 논 사람들] 의 금액을 놀기만 한 사람에게 받기
      // 아무것도 아님 -> 아무것도 아님 (정산 열외)
      calculate() {
        let result = [];
        for (let user of this.scheduleData.users)
        {
          result[user] = [];
          for (let user2 of this.scheduleData.users)
            result[user][user2] = 0; // user가 user2에게 n원을 줘야한다는 뜻, 스스로가 스스로에게 주는 경우[user][user] 지출을 뜻함
        }
        for (let arr of this.expenseData)
        {
          for (let element of arr)
          {
            // 2안
            let consumeMoney = element.payment / element.consumer.length; // 금액 분할 (9000원을 2명이서 놀면 4500원)
            let payMoney = element.payment / element.payer.length; // 금액 분할 (9000원을 3명이서 냈으면 3000원)
            for (let user of element.payer) // 쓴 사람 검색
            {
              // 자신의 지출에 추가
              result[user][user] += payMoney;
              // 논 사람들에게서 돈 걷기
              for (let user2 of element.consumer) // 논 사람 검색
              {
                  if (user == user2) continue;
                result[user][user2] -= payMoney / element.consumer.length;
              }
              // 지출과 걷는 양에 차이가 있는 경우
              // 나머지에게 분배해주기 (4500원 - 3000원 = 1500원을 다른 지출자들에게 분배)
              let gap = consumeMoney - payMoney;
              if (gap > 0)
              {
                for (let user3 of element.payer) // 또! 쓴 사람 검색
                {
                  if (user == user3) continue;
                  result[user][user3] += gap / (element.payer.length - 1);
                }
              }
            }
          }
        }
        console.log(result);
        return result;
      },
    }
  }
</script>
<style scoped>
  .board-table::v-deep(thead) {
    display: none;
  }
  .p-datatable::v-deep(.p-datatable-tbody > tr > td) {
    border: none;
  }
  a {
    text-decoration: none;
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
  }

  .board {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 1080px;
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
    padding: 10px;
  }
  .daycard > * {
    margin: 10px;
  }
  .board-table {
    width: 90%;
    margin: auto;
    text-align: center;
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
    justify-content: flex-end;
    width: 100%;
    align-items: center;
    padding: 20px;
  }
  .board-footer * {
    margin: 0px 4px;
  }

  .dialog-addexpense div {
    margin: 10px 0px;
  }

  .violet-btn {
    background-color: white;
    color: #756AF6;
    border: 1px solid #756AF6;
    justify-content: center;
  }

  .summary-h1 {
    text-align: end;
  }

  .calculate-subtitle {
    padding: 5px 0px;
    margin: 5px 0px;
    border-top: 1px dashed gray;
    border-bottom: 1px dashed gray;
  }

</style>
