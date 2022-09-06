<template>
    <div class="wrap">
        <AdminPageSidebar style="margin-top: 20px" />
        <div class="inner">
            <div >
                <MagazineWrite />
            </div>
        </div>
    </div>
</template>

<script>
    import AdminPageSidebar from "@/components/admin/AdminPageSidebar";
    import MagazineWrite from "@/components/admin/magazine/MagazineWrite";

    export default{
        components: {
            AdminPageSidebar,
            MagazineWrite,
        }
    }
</script>

<style scoped>

</style>