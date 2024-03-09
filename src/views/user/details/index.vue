<template>
    <!-- 搜索栏 -->
    <el-card style="height: 15%;">
        <el-form :inline="true" class="form" :model="searchResult">
            <el-form-item label="User Id:" >
                <el-input placeholder="Search by User Id" v-model="searchResult.userId"></el-input>
            </el-form-item>
            <el-form-item label="Username:" >
                <el-input placeholder="Search by username" v-model="searchResult.userName"></el-input>
            </el-form-item>
            <el-form-item label="Nickname:" >
                <el-input placeholder="Search by nickname" v-model="searchResult.nickName"></el-input>
            </el-form-item>
            <el-form-item label="Email:">
                <el-input placeholder="Search by email"  v-model="searchResult.email"></el-input>
            </el-form-item>
            <el-form-item label="Mobile:"  >
                <el-input placeholder="Search by phone number" v-model="searchResult.mobile"></el-input>
            </el-form-item>
            <el-form-item label="Address:" >
                <el-input placeholder="Search by address" v-model="searchResult.address"></el-input>
            </el-form-item>
            
            <el-form-item label="Creat Time">
                <el-col :span="11">
                    <el-form-item prop="creatStartTime" >
                    <el-date-picker
                        v-model="searchResult.createStartTime"
                        type="date"
                        label="Pick a date"
                        placeholder="Pick a date"
                        style="width: 100%"
                    />
                    </el-form-item>
                </el-col>
                <el-col class="text-center" :span="2">
                    <span class="text-gray-500">-</span>
                </el-col>
                <el-col :span="11">
                    <el-form-item prop="createEndTime">
                    <el-date-picker
                        v-model="searchResult.createEndTime"
                        type="date"
                        label="Pick a date"
                        placeholder="Pick a date"
                        style="width: 100%"
                    />
                    </el-form-item>
                </el-col>
            </el-form-item>
           <el-form-item label="Uodate Time">
                <el-col :span="11">
                    <el-form-item prop="updateStartTime" >
                    <el-date-picker
                        v-model="searchResult.updateStartTime"
                        type="date"
                        label="Pick a date"
                        placeholder="Pick a date"
                        style="width: 100%"
                    />
                    </el-form-item>
                </el-col>
                <el-col class="text-center" :span="2">
                    <span class="text-gray-500">-</span>
                </el-col>
                <el-col :span="11">
                    <el-form-item prop="updateEndTime">
                    <el-date-picker
                        v-model="searchResult.updateEndTime"
                        type="date"
                        label="Pick a date"
                        placeholder="Pick a date"
                        style="width: 100%"
                    />
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="default">Search</el-button>
                <el-button type="primary" size="default">Reset</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <!-- 用户信息展示栏 -->
    <el-card style="margin: 10px 0px;">
        <!-- 添加用户 -->
        <el-button type="primary" size="default" @click="addUser">Add</el-button>
        <el-button type="primary" size="default">Delete All</el-button>
        <!-- 用户展示 -->
        <el-table style="margin: 10px 0px;" fit border :data="userArr">
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column label="#" align="center" type="index"></el-table-column>
            <el-table-column label="ID" align="center" prop="userId"></el-table-column>
            <el-table-column label="Username" align="center" prop="userName" show-overflow-tooltip></el-table-column>
            <el-table-column label="Nickname" align="center" prop="nickName" show-overflow-tooltip></el-table-column>
            <el-table-column label="Email" align="center" prop="email" show-overflow-tooltip></el-table-column>
            <el-table-column label="Address" align="center" prop="address" show-overflow-tooltip></el-table-column>
            <el-table-column label="Area Code" align="center" prop="areaCode" show-overflow-tooltip></el-table-column>
            <el-table-column label="Mobile" align="center" prop="mobile" show-overflow-tooltip></el-table-column>
            <el-table-column label="Create Time" align="center" prop="createTime" show-overflow-tooltip></el-table-column>
            <el-table-column label="Update Time" align="center" prop="updateTime" show-overflow-tooltip></el-table-column>
            <el-table-column label="Status" align="center" prop="status" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="200px" align="center">
                <!-- <template #="{ row, $index }">
                    <el-button type="primary" size="small" icon="Edit" @click="updateUser(row)">Edit</el-button>
                    <el-popconfirm :title="`Delete it anyway?${row.username}?`" width="260px">
                        <template #reference>
                            <el-button type="primary" size="small" icon="Delete">Delete</el-button>
                        </template>
                    </el-popconfirm>
                </template> -->
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[1, 2, 3, 100]"
            :background="true" layout="prev, pager, next, jumper,->,sizes,total" :total="total" @current-change="getHasUser"
            @size-change="handler" />
    </el-card>


    <!-- 添加新的用户账号/更新已有的账号信息 -->
    <el-drawer v-model="drawer">
        <!-- 头部标题:将来文字内容应该动态的 -->
        <template #header>
            <h4>Add User</h4>
        </template>
        <!-- 身体部分 -->
        <template #default>
            <el-form ref="formRef">
                <el-form-item label="用户姓名" prop="username">
                    <el-input placeholder="请您输入用户姓名"></el-input>
                </el-form-item>
                <el-form-item label="用户昵称" prop="name">
                    <el-input placeholder="请您输入用户昵称"></el-input>
                </el-form-item>
                <el-form-item label="用户密码" prop="password">
                    <el-input placeholder="请您输入用户密码"></el-input>
                </el-form-item>
            </el-form>
        </template>
        <template #footer>
            <div style="flex: auto">
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary" @click="save">确定</el-button>
            </div>
        </template>
    </el-drawer>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import type { UserInfoResponseData, Records, SearchResultData } from '@/api/userInfo/type';
import { reqUserInfo } from '@/api/userInfo/index';

let pageNo = ref<number>(1);
let pageSize = ref<number>(2);
let total = ref<number>(0);
let userArr = ref<Records>([]);
let drawer = ref<boolean>(false);
let searchResult = reactive<SearchResultData>(
    {
        userId: 0,
        userName: "",
        nickName: "",
        email: "",
        mobile: 0,
        address: "",
        createStartTime: 0,
        createEndTime: 0,
        updateStartTime: 0,
        updateEndTime: 0,
        status: ""
    }
);


onMounted(() => {
    getHasUser();
})

const getHasUser = async (pager = 1) => {
    pageNo.value = pager;
    let result: UserInfoResponseData = await reqUserInfo(searchResult, pageNo.value, pageSize.value);
    if (result.code == 200) {
        total.value = result.data.total;
        userArr.value = result.data.records;
    }
}

const handler = () => {
    getHasUser();
}

const addUser = () => {

}

const updateUser = () => {

}





</script>

<style lang="scss" scoped>
.form {

    justify-content: space-between;
    align-items: center;
}
</style>



<!-- <el-input type="selection" align="center"></el-input>
<el-input label="#" align="center" type="index"></el-input>
<el-input label="ID" align="center" prop="userId"></el-input>
<el-input label="Username" align="center" prop="userName" show-overflow-tooltip></el-input>
<el-input label="Email" align="center" prop="email" show-overflow-tooltip></el-input>
<el-input label="Address" align="center" prop="address" show-overflow-tooltip></el-input>
<el-input label="Area Code" align="center" prop="areaCode" show-overflow-tooltip></el-input>
<el-input label="MObile" align="center" prop="mobile" show-overflow-tooltip></el-input>n>
<el-input label="Update Time" align="center" prop="updateTime" show-overflow-tooltip></el-input>
<el-input label="Status" align="center" prop="status" show-overflow-tooltip></el-input> -->