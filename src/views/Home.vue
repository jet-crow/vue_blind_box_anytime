<template>
    <div class="bg">
        <main>
            <section class="my_info">
                <van-icon name="manager" />
                <div class="my_info_right">
                    <p class="name">{{accountData.user}}</p>
                    <div class="wallet">
                        <van-icon name="gem" />
                        <span class="balance">{{ accountData.diamond }}</span>
                        <div class="top_up">充值</div>
                    </div>
                </div>
            </section>
            <section class="my_address">
                <div class="my_address_left">
                    <p>地址</p>
                    <div class="address">
                        name<br>
                        1008610086<br>
                        广东省佛山市高明区荷城街道学府路8号
                    </div>
                </div>
                <div class="my_address_right">
                    更<br />多
                </div>
            </section>
            <section class="my_goods">
                <div class="my_goods_left">
                    <p>我抽的萌物</p>
                    <div class="goods">
                        <ul>
                            <li v-for="(item, index) in goodsData.itemData">
                            <img class="goods_img" :src=$getImgUrl(item.itemImg) />
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

// 商品数据
let accountData = ref([]);
proxy.$api.get('/account/user/queryUserInfo').then(res => {
    console.log(res.data);
    accountData.value = res.data;
});

const goodsData = {
    itemData: [{
        isRare: false,//是否是隐藏款
        itemTitle: "阿修罗",
        itemImg: "1_普通款_阿修罗.JPG"
    }, {
        isRare: false,//是否是隐藏款
        itemTitle: "八岐大蛇",
        itemImg: "1_普通款_八岐大蛇.JPG"
    }, {
        isRare: false,//是否是隐藏款
        itemTitle: "不知火",
        itemImg: "1_普通款_不知火.JPG"
    }]
};
</script>
<style scoped src="@/assets/css/home.css"></style>
<script setup></script>