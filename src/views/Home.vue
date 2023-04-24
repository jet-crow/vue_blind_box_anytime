<template>
    <nav>
        <van-icon name="arrow-left" @click="goBack" />
        <van-icon name="share-o" @click="exit" />
    </nav>
    <div class="bg">
        <main>
            <section class="my_info">
                <van-icon name="manager" />
                <div class="my_info_right">
                    <p class="name">{{ accountData.user }}</p>
                    <div class="wallet">
                        <van-icon name="gem" />
                        <span class="balance">{{ accountData.diamond }}</span>
                        <div class="top_up" @click="$router.push('/topup')">充值</div>
                    </div>
                </div>
            </section>
            <section class="my_address" @click="$router.push('/myAddress')">
                <div class="my_address_left">
                    <p>地址</p>
                    <div class="address">
                        <template v-if="addressInfo.length">
                            {{ addressInfo[0].consignee }}<br>
                            {{ addressInfo[0].tel }}<br>
                            {{ addressInfo[0].address + addressInfo[0].detailedAddress }}
                        </template>
                    </div>
                </div>
                <div class="my_address_right">
                    更<br />多
                </div>
            </section>
            <section class="my_goods" @click="$router.push('/myBindBox')">
                <div class="my_goods_left">
                    <p>我抽的萌物</p>
                    <div class="goods">
                        <ul>
                            <li v-for="(item, index) in goodsData">
                                <img class="goods_img" :src=$getImgUrl(item) />
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="my_goods_right">
                    更<br />多
                </div>
            </section>
        </main>
    </div>
</template>
<script setup>
import { ref, getCurrentInstance } from 'vue';
const { proxy } = getCurrentInstance();
const goBack = () => {
    window.history.go(-1);
};
// 获取用户信息
const accountData = ref([]);
proxy.$api.get('/account/user/queryUserInfo').then(res => {
    console.log(res.data);
    accountData.value = res.data;
});
//获取详细地址
const goodsData = ref();
//获取我抽到的萌物
proxy.$api.get('/mybox/user/selectNew').then(r => {
    goodsData.value = r.data;
    console.log(r.data);
})
//默认地址
const addressInfo = ref([])
proxy.$api.get("/address/user/defaultContactAddress").then(r => {
    console.log(r.data)
    addressInfo.value = r.data;
})

//退出
const exit = () => {
    // 前面的为设置cookies
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("uid");
    location.reload()
}
</script>
<style scoped src="@/assets/css/home.css"></style>
<script setup></script>