<template>
<div>
  <MegaMenu :model="items" orientation="vertical" />
</div>
</template>

<script>
export default {
  name: "MyPageSidebar",
  data(){
    return{
      id:localStorage.getItem("id"),

      items:[
        //정해진 폼이라 이미지 , 아이디 값 오버라이딩 불가.?
        { label: '개인정보 수정', icon: 'pi pi-fw pi-video'},
        { label: '내 예약보기', icon: 'pi pi-fw pi-video'},
        { label: '내 글 모아보기', icon: 'pi pi-fw pi-users'},
        { label: '내 일정', icon: 'pi pi-fw pi-users'},
        { label: '찜 내역', icon: 'pi pi-fw pi-users'},
        { label: '쿠폰', icon: 'pi pi-fw pi-users'},
        { label: '알림', icon: 'pi pi-fw pi-users'},
        { label: '탈퇴하기', icon: 'pi pi-fw pi-users'},


      ]
    }
  }
}
</script>

<style scoped>

</style>