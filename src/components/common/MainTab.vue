<template>
    <div>
        <div class="card">
            <TabMenu :model="items" class="tabs"/>
        </div>
    </div>
</template>

<script>
import TabMenu from 'primevue/tabmenu';
export default {
    name: 'MainTab',
    components :{
        TabMenu
    },
    data() {
        return {
            active: 3,
            items: [
                {
                    label: '홈',
                    icon: 'pi pi-fw pi-home',
                    to: '/'
                },
                {
                    label: '패키지',
                    icon: 'pi pi-fw pi-briefcase',
                    to: '/section/Pakage'
                },
                {
                    label: '매거진',
                    icon: 'pi pi-fw pi-book',
                    to: '/section/magazine'
                },
                {
                    label: '관광명소',
                    icon: 'pi pi-fw pi-camera',
                    to: '/section/place/attraction'
                },
                {
                    label: '맛집',
                    icon: 'pi pi-fw pi-cloud',
                    to: '/section/place/restaurant'
                },
                {
                    label: '숙소',
                    icon: 'pi pi-fw pi-building',
                    to: '/section/place/accommodation'
                },
                {
                    label: '커뮤니티',
                    icon: 'pi pi-fw pi-users',
                    to: '/section/community'
                },
                {
                    label: '일정등록',
                    icon: 'pi pi-fw pi-calendar',
                    to: '/section/calendar'
                },
            ]
        }
    }
}
</script>

<style scoped lang="scss">
.card ::v-deep .tabmenudemo-content {
    text-align: center;
    padding: 2rem 1rem;
    background-color: #91D9CC;
}
</style>