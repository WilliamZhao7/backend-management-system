<template>
    <div class="layout-container">

        <!--  侧边栏 -->
        <div class="layout-slider">
            <Logo></Logo>
            <!-- 展示菜单 -->
            <!-- 滚动组件 -->
            <el-scrollbar class=" scrollbar">

                <!-- 菜单组件 -->
                <el-menu :default-active='$route.path' background-color="#001529" text-color="white"
                    :collapse="LayoutSettingStore.fold ? true : false">
                    <Menu :menuList="useStore.menuRoutes"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <!-- 顶部导航栏 -->
        <div class="layout-tabbar" :class="{ fold: LayoutSettingStore.fold ? true : false }">
            <!-- Layout 组件的顶部导航Tabbar -->
            <Tabbar></Tabbar>
        </div>
        <!-- 主页面 -->
        <div class="layout-main" :class="{ fold: LayoutSettingStore.fold ? true : false }">
            <Main></Main>
        </div>

    </div>
</template>

<script setup lang="ts">
// 获取路由对象
import { useRoute } from 'vue-router';
// 引入左侧菜单logo子组件
import Logo from './logo/index.vue';
// 引入菜单组件
import Menu from './menu/index.vue';
// 右侧内容展示区域
import Main from './main/index.vue';
// 引入顶部tabbar组件
import Tabbar from './tabbar/index.vue';
//引入User相关的小仓库
import useUserStore from '@/store/modules/user';
import useLayoutSettingStore from '@/store/modules/setting';


let useStore = useUserStore();
let LayoutSettingStore = useLayoutSettingStore();
let $route = useRoute();
</script>


<script lang="ts">
export default {
    name: 'Layout'
}
</script>


<style scoped lang="scss">
.layout-container {
    width: 100%;
    height: 100vh;

    .layout-slider {
        width: $base-menu-width;
        height: 100vh;
        background: $base-menu-background;
        transition: all 0.3s;


        .scrollbar {
            width: 100%;
            height: calc(100vh - $base-menu-logo-height);

            .el-menu {
                border-right: none;
            }


        }




    }

    .layout-tabbar {
        position: fixed;
        top: 0;
        left: $base-menu-width;
        width: calc(100% - $base-menu-width);
        height: $base-tabbar-height;
        //background: cyan;
        transition: all 0.3s;

        &.fold {
            width: calc(100vw - $base-menu-min-width);
            left: $base-menu-min-width;
        }
    }

    .layout-main {
        position: absolute;
        width: calc(100% - $base-menu-width);
        height: calc(100% - $base-tabbar-height);
        left: $base-menu-width;
        top: $base-tabbar-height;
        //background: yellowgreen; 
        padding: 20px;
        overflow: auto;
        transition: all 0.3s;

        &.fold {
            width: calc(100vw - $base-menu-min-width);
            left: $base-menu-min-width;
            z-index: 100;
            background-color: white;
        }

    }



}
</style>

