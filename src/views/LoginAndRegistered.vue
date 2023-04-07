<template>
    <main>
        <div class="form_box">
            <label class="form_item no_border">
                <input v-model="user" placeholder="usernames" />
                <!-- <span>&nbsp</span> -->
                <span>账号有误</span>
            </label>
            <label class="form_item no_border">
                <input v-model="password" placeholder="password" />
                <!-- <span>&nbsp</span> -->
                <span>密码有误</span>
            </label>
            <!-- 注册part -->
            <label class="form_item no_border" v-show="!isLogin">
                <input v-model="againPassword" placeholder="again password" />
                <!-- <span>&nbsp</span> -->
                <span>密码不一致</span>
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

import { ref } from 'vue'
import { useRouter } from 'vue-router'

//data
const user = ref();
const password = ref();
const againPassword = ref();
const isLogin = ref(true);//是否为登录页面
//路由
const route = useRouter()

function switchForm() {
    isLogin.value = !isLogin.value;
}

//跳转
function jump() {
    if (isLogin) {
        route.push("/index")
    }
}
</script>
<style scoped src="@/assets/css/form.css"></style>