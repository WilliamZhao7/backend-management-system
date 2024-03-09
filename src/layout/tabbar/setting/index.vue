<template>
  <!-- 右侧按钮图标 -->
  <el-button icon="Refresh" size="small" circle @click="updateRefresh" />
  <el-button icon="FullScreen" size="small" circle @click="fullScreen" />
  <el-button icon="Setting" size="small" circle />
  <img
    :src="userStore.avatar"
    style="width: 20px; height: 20px; margin: 0px 10px; border-radius: 50%"
  />

  <!-- 下拉菜单 -->
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        <el-dropdown-item>Action 2</el-dropdown-item>
        <el-dropdown-item>Action 3</el-dropdown-item>
        <el-dropdown-item disabled>Action 4</el-dropdown-item>
        <el-dropdown-item divided>Action 5</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
// 获取骨架的小仓库
import useLayoutSettingStore from '@/store/modules/setting'
// 获取用户相关的小仓库
import useUserStore from '@/store/modules/user'
// 引入router
import { useRouter, useRoute } from 'vue-router'

let layoutSettingStore = useLayoutSettingStore()
let userStore = useUserStore()
const $router = useRouter()
const $route = useRoute()

// 刷新按钮点击回调
const updateRefresh = () => {
  layoutSettingStore.refresh = !layoutSettingStore.refresh
}
// 全屏按钮点击回调
const fullScreen = () => {
  // DOM对象的属性，可以用来判断是是不是全屏模式 【全屏：true，不是全屏：false】
  let full = document.fullscreenElement
  // 切换为全屏模式
  if (!full) {
    // 利用文档的根节点的方法实现全屏模式
    document.documentElement.requestFullscreen()
  } else {
    // 退出全屏模式
    document.exitFullscreen()
  }
}

const logout = async () => {
  // 第一件事情： 向服务器发出请求【退出登录接口】
  // 第二件事情： 仓库当中关于用户相关的数据清空【tokenn|username|avatar】
  // 第三件事情：跳转登录界面

  await userStore.userLogout()
  $router.push({ path: '/login', query: { redirect: $route.path } })
}
</script>
<script lang="ts">
export default {
  name: 'Setting',
}
</script>

<style scoped></style>
