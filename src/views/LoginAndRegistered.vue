<template>
    <main>
        <div class="form_box">
            <h1>随时盲盒</h1>

            <label class="form_item no_border">
                <input v-model="user" placeholder="usernames"/>
                <span v-show="checkInput.user">&nbsp</span>
                <span v-show="!checkInput.user">账号有误</span>
            </label>
            <label class="form_item no_border">
                <input v-model="password" type="password" placeholder="password" />
                <span v-show="checkInput.password">&nbsp</span>
                <span v-show="!checkInput.password">密码有误</span>
            </label>
            <!-- 注册part -->
            <label class="form_item no_border" v-show="!isLogin">
                <input v-model="againPassword" type="password" placeholder="again password" />
                <span v-show="checkInput.againPassword">&nbsp</span>
                <span v-show="!checkInput.againPassword">密码不一致</span>
            </label>

            <div class="form_box_button">
                <label class="from_item_button">
                    <!-- 这个按钮就跳转的页面 -->
                    <button class="form_btn" @click="switchForm">{{ isLogin ? '注册' : '登录' }}</button>
                </label>
                <label class="from_item_button">
                    <!-- 这个按钮是处理逻辑的 -->
                    <button class="form_btn" @click="jump">{{ isLogin ? '登录' : '注册' }}</button>
                </label>
            </div>
        </div>
    </main>
</template>
<script setup>
// 引入js
import {showSuccessToast, showFailToast} from 'vant';
import {ref, reactive, getCurrentInstance} from 'vue';
import router from "@/router";

const {proxy} = getCurrentInstance();

//data
const user = ref();
const password = ref();
const againPassword = ref();
const isLogin = ref(true);//是否为登录页面
const checkInput = reactive({
    user: true,
    password: true,
    againPassword: true
});

function switchForm() {
    isLogin.value = !isLogin.value;
}

//跳转
function jump() {
    if (isLogin.value) {
        //登录
        proxy.$api.post('/account/login', proxy.$qs.stringify({
            'user': user.value,
            'password': password.value
        })).then(res => {
            // console.log(res.data);
            if (res.data.status === 500) {
                showFailToast('登錄失敗');
                inputCheck(false);
                return;
            }
            showSuccessToast('登錄成功');
            // 前面的为设置cookies
            localStorage.setItem("token", res.data.data.token);
            localStorage.setItem("name", res.data.data.user);
            localStorage.setItem("uid", res.data.data.uid);
            //跳转主页
            router.push('/index');
        });
    } else {//注册
        //如果密码不一致直接返回
        if (password.value !== againPassword.value) {
            checkInput.againPassword = false;
            return false;
        }
        proxy.$api.post("/account/reg", proxy.$qs.stringify({
            'user': user.value,
            'password': againPassword.value
        })).then(r => {
            inputCheck(true);
            showSuccessToast("注册成功");
            isLogin.value = true;
        }).catch(_ => {
            inputCheck(false);
            showFailToast('注册失败');
        });
    }
}

//error
function inputCheck(b) {
    checkInput.user = b;
    checkInput.password = b;
    checkInput.againPassword = b;
}
</script>
<style scoped src="@/assets/css/form.css"></style>