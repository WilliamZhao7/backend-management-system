<template>
    <template v-for="(item, index) in  menuList " :key="item.path">
        <!-- 没有子路由 -->
        <el-menu-item v-if="!item.children && !item.meta.hidden" :index="item.path" @click="goRoute">
            <el-icon>
                <component :is="item.meta.icon"></component>
            </el-icon>
            <template #title>
                <span>{{ item.meta.title }}</span>
            </template>
        </el-menu-item>
        <!-- 有且只有一个子路由 -->
        <el-menu-item v-if="item.children && item.children.length === 1 && item.meta.title === '' && !item.meta.hidden"
            :index="item.children[0].path" @click="goRoute">

            <el-icon>
                <component :is="item.children[0].meta.icon"></component>
            </el-icon>
            <template #title>
                <span>{{ item.children[0].meta.title }}</span>
            </template>
        </el-menu-item>
        <!-- 有大于一个子路由 -->
        <el-sub-menu v-if="item.children && item.children.length >= 1 && !item.meta.hidden && item.meta.title !== ''"
            :index="item.path">
            <template #title>
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span>{{ item.meta.title }}</span>
            </template>
            <Menu :menuList="item.children"></Menu>
        </el-sub-menu>
    </template>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
defineProps(['menuList'])
// 侧边栏点击事件

let $router = useRouter();
const goRoute = (vc: any) => {
    // 路由跳转
    $router.push(vc.index);
}


</script>
<script lang="ts">
export default {
    name: 'Menu'
}
</script>



<style scoped></style>