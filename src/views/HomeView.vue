<template>
  <div class="home">
    <div class="app-container">
      <!-- 사용예제 1 -->
      <!-- main.js에서 전역으로 등록해 놓은 컴포넌트 InputText, Button 을 사용한 예제 -->
      <form @submit.prevent="greet">
        <InputText type="text" v-model="text"/>
        <Button type="submit" label="Submit"/>
        <h3>{{message}}</h3>
      </form>
    </div>
    
    <!-- 사용예제 2 -->
    <!-- 전역으로 등록한게 아니라 HomeView.vue에서 지역적으로 등록해놓은 Calendar 컴포넌트를 사용한 예제 -->
    <Calendar v-model="modelCalendar"/>
    <my-calender v-model="modelCalendar"/>
    
  </div>
</template>

<script>
// main.js 에서 전역으로 설정해 놓고 사용할수도 있지만 
// 사용하는 컴포넌트에서도 import하여 컴포넌트로 등록하여 사용할수 있음 
import Calendar from 'primevue/calendar';
export default {
  name: "HomeView",
  components: {
    Calendar,
    // 원하는 컴포넌트명으로도 등록가능
    "my-calender":Calendar
  },
  data(){
    return{
      modelCalendar:null
    }
  }
};
</script>
