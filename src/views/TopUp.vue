<template>
    <div class="bg">
        <main>
            <aside>
                <van-icon name="arrow-left" @click="goBack" />
                <van-icon name="question" />
            </aside>
            <section class="balance_box">
                <span>余额</span>
                <span class="balance">{{ accountData.diamond }}</span>
            </section>
            <section class="top_up_button_box">
                <ul @click="btnSelected($event)">
                    <li class="btn_selected">20元</li>
                    <li>30元</li>
                    <li>50元</li>
                    <li>100元</li>
                    <li>300元</li>
                </ul>
            </section>
            <div class="submit" @click="topUp()">立即支付</div>
        </main>
    </div>
</template>
<script setup>
import { showSuccessToast, showFailToast } from 'vant';
import { ref, getCurrentInstance } from 'vue';
const { proxy } = getCurrentInstance();

// 商品数据
let accountData = ref([]);
proxy.$api.get('/account/user/queryUserInfo').then(res => {
    console.log(res.data);
    accountData.value = res.data;
});
let money;
const btnSelected = (e) => {
    let lis = document.querySelectorAll('li');
    if (e.target.tagName == 'LI') {
        for (let i = 0; i < lis.length; i++) {
            lis[i].classList.remove('btn_selected');
        }
        e.target.classList.add('btn_selected');
        money = e.target.innerText.replace('元', '');
    }
};

const topUp = () => {
    console.log(money);
    proxy.$api.put("/account/user/topUp", proxy.$qs.stringify({
        diamond: money,
    })).then(res => {
        console.log(res);
        if (res) {
            showSuccessToast("充值成功");
            proxy.$api.get('/account/user/queryUserInfo').then(res => {
                console.log(res.data);
                accountData.value = res.data;
            });
        }
    });
};


const goBack = () => {
    console.log('go back');
    window.history.go(-1);
};
</script>
<style scoped src="@/assets/css/topup.css"></style>
<script setup></script>