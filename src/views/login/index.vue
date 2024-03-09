
<template>
    <div class="login-container">
        <el-row>
            <el-col :span="15" :xs="0"></el-col>
            <el-col :span="9" :xs="24" id="login-wrap">
                <!-- 登录表单 -->
                    <el-form class="forms" id="login-form" :model="loginForm" :rules="loginRules" ref="loginForms" v-if="isShow">
                    <div class="logo">
                        <img src="@/assets/image/logo.png">
                    </div>
                    <div class="seperator-25px"></div>
                    <h1><b>Login</b></h1>
                    <!-- <div class="seperator-25px"></div> -->
                    <el-form-item prop="username">
                        <label>Email</label>
                        <el-input type=“email” :prefix-icon="User" v-model="loginForm.username"></el-input>
                    </el-form-item>
                    
                    <el-form-item prop="password">
                        <label>Password</label>
                        <el-input :prefix-icon="Lock" type="password" show-password v-model="loginForm.password"></el-input>
                    </el-form-item>
                    <div class="seperator-15px"></div>
                    <el-form-item id="btn_line">
                        <el-button class="buttons" id="login_btn" type="primary" size="default" @click="login">登录</el-button>
                        <el-button class="buttons" id="sign_up_btn" type="primary" size="default" @click="formChange">注册</el-button>
                    </el-form-item>
                </el-form>

                <!-- 注册表单 -->
                <el-form class="forms" id="register-form" :model="loginForm" ref="registerForms" v-else>
                    <div class="logo">
                        <img src="@/assets/image/logo.png">
                    </div>
                    <div class="seperator-25px"></div>
                    <h1><b>Join Us</b></h1>
                    <el-form-item prop="username">
                        <label>Email</label>
                        <el-input type=“email” :prefix-icon="User" v-model="registerForm.username"></el-input>
                    </el-form-item>

                    <el-form-item prop="verCode">
                        <label>Verification Code</label>
                        
                         <el-row>
                            <el-col :span="13">
                                <el-input :prefix-icon="CreditCard" type="text" v-model="registerForm.verCode"></el-input> 
                            </el-col>
                            <el-col :span="1"></el-col>
                            <el-col :span="10">
                                <!-- TODO: 添加按钮点击事件 -->
                                <el-button class="buttons" type="primary" style="width:100%; text-align:center;"  v-if="timeTrue" @click="acquire" >
                                    Send Code
                                </el-button>
                                <el-button class="buttons" type="primary" style="width:100%; text-align:center;" v-else>
                                    
                                    Retry after {{ time }}s
                                </el-button>
                            </el-col>
                         </el-row>
                    </el-form-item>
                    
                    <el-form-item prop="password">
                        <label>Password</label>
                        <el-input :prefix-icon="Lock" type="password" show-password v-model="registerForm.password"></el-input>
                    </el-form-item>
                    <div class="seperator-15px"></div>
                    <el-form-item id="btn_line">
                        <el-button class="buttons" id="login_btn" type="primary" size="default" @click="formChange">Login</el-button>
                        <!-- TODO: 添加注册按钮点击事件 -->
                        <el-button class="buttons" id="sign_up_btn" type="primary" size="default">Register</el-button>
                    </el-form-item>
                </el-form>


            </el-col>
        </el-row>

    </div>
</template>

<script setup lang="ts">
import { User, Lock, CreditCard } from '@element-plus/icons-vue';
import { ref, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ElNotification } from 'element-plus';
import { getTime } from '@/utils/time';
import useUserStore from "@/store/modules/user";

let useStore = useUserStore();
let loginForms = ref();
let $router = useRouter();
let $route = useRoute();
let loading = ref(false);
let loginForm = reactive({ username: "admin", password: "111111" });
let isShow = ref(true);
let registerForm = reactive({username:"", verCode:"", password:""});
let formRef = ref();
let registerForms = ref();
var time = ref(0);
let timeTrue = ref(true);
// Login 
// TODO: Login 

// 表单切换的按钮回调
const formChange = () => {
    isShow.value = !isShow.value;
}

// 发送验证码按钮的回调
const acquire = () => {   
    timeTrue.value = false;
    time.value = 60;
    var setTimeoutS = setInterval(() => {  
        time.value--;   
        if (time.value <= 0) {     
        clearInterval(setTimeoutS);  
            timeTrue.value = true;   
             
        } 
    }, 1000); 
}

//登录按钮回调
const login = async () => {
    //Waiting for form validation
    await loginForms.value.validate();
    //loading
    loading.value = true;
    //点击登录按钮以后干什么?
    //Use store to send out request
    //   - suceess: into the landpage
    //   - fail: Notification
    try {
        await useStore.userLogin(loginForm);
        // redirect to the query webbage if exists
        let redirect: any = $route.query.redirect;
        $router.push({ path: redirect || '/' });
        // Sucess Notification
        ElNotification({
            type: 'success',
            message: '欢迎回来',
            title: `HI,${getTime()}`
        });
        loading.value = false;
    } catch (error) {
        // Failure Notification 
        loading.value = false;
        ElNotification({
            type: 'error',
            message: (error as Error).message
        })
    }
}
//自定义校验规则函数
const validatorUserName = (rule: any, value: any, callback: any) => {
    //rule:即为校验规则对象
    //value:即为表单元素文本内容
    //函数:如果符合条件callBack放行通过即为
    //如果不符合条件callBack方法,注入错误提示信息
    if (value.length >= 5) {
        callback();
    } else {
        callback(new Error('账号长度至少五位'));
    }
}

const validatorPassword = (rule: any, value: any, callback: any) => {
    if (value.length >= 6) {
        callback();
    } else {
        callback(new Error('密码长度至少六位'));
    }
}

//定义表单校验需要配置对象
const loginRules = {
    //规则对象属性:
    //required,代表这个字段务必要校验的
    //min:文本长度至少多少位
    //max:文本长度最多多少位
    //message:错误的提示信息
    //trigger:触发校验表单的时机 change->文本发生变化触发校验,blur:失去焦点的时候触发校验规则
    username: [
        // { required: true, min: 6, max: 10, message: '账号长度至少六位', trigger: 'change' }
        { trigger: 'change', validator: validatorUserName }
    ],
    password: [
        // { required: true, min: 6, max: 15, message: '密码长度至少6位', trigger: 'change' }
        { trigger: 'change', validator: validatorPassword }
    ]
}



</script>

<style scoped lang="scss">
.login-container {
    min-width: 100%;
    width: 100%;
    height: 100vh;
    background: url('@/assets/image/background.jpg') no-repeat;
    background-size: cover;
    margin: 0 auto;

    .logo {
        text-align: center;
        img {
            width: 60%;
        }
    }

    #login-wrap {

        background-color: rgba(255, 255, 255, .4);
        backdrop-filter: blur(10px);
        max-height: 100vh;
        height: 100vh;


        .forms {
            position: relative;
            width: 60%;
            margin: 0 auto;
            top: 50%;
            transform: translate(0, -50%);
            justify-content: space-between;
            //border-radius: 10px; 
            padding: 5%;


            h1 {
                font-size: 1.8em;
                text-align: center;
                color: $color-primary-4;
            }
            h2 {
                font-size: 1.6em;
                text-align: center;
                color: $color-primary-4;
            }

            .seperator-25px {
                height: 25px;
            }
            .seperator-15px {
                height: 15px;
            }
            .seperator-10px {
                height: 10px;
            }
            .seperator-32px{
                height: 32px;
            }

            .buttons {
                flex-grow: 1;
                background-color: $color-primary-4;
                color: $color-primary-1;
                font-weight: bold;
                border: 0px;

            }
            .buttons:hover {
                background-color: $color-primary-3;
                color: $color-primary-4;
            }






        }
    }


}
</style>