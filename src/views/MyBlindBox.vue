<template>
    <nav>
        <van-icon name="arrow-left" />
        <span class="title">我的盲盒</span>
    </nav>

    <main>
        <!-- 系列 -->
        <article v-for="item in blindBoxData" :key="item.id">
            <p class="series_title">{{ item.seriesTitle }}<span style="color:#a5a2a2;margin-left: .3rem;">〉</span></p>
            <div class="good_box" v-for="box in item.boxs" :key="box.id">
                <img :src="$getImgUrl(box.itemImg)" width="100" />
                <p>{{ box.itemTitle }}</p>
                <div class="btn_box">
                    <button @click="showRecycling = true">返盒20￥</button>
                    <button @click="showSubmit = true">确认购入</button>
                </div>
            </div>
        </article>
        <!-- 确认是否回收么 -->
        <van-dialog v-model:show="showRecycling" @confirm="confirmRecycling" confirm-button-color="#5E548E" title="确定回收么？"
            show-cancel-button>
        </van-dialog>
        <!-- 确认是否购入 -->
        <van-popup class="submit_box" v-model:show="showSubmit" round :style="{ padding: '1rem 1rem 4rem 1rem', width: '18rem' }">
            <p class="title">确认收货地址</p>
            <p class='contact_info'>张三 12345678912</p>
            <p class='address'>浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室</p>
            <div class="submit_btn_box">
                <button>修改地址</button>
                <button>购入</button>
            </div>
        </van-popup>
    </main>
</template>

<script setup>
import { ref } from 'vue';
const blindBoxData = [{
    id: 0,
    seriesTitle: "森林系列",
    boxs: [{
        id: 0,
        isRare: false,//是否是隐藏款
        itemTitle: "阿修罗",
        itemImg: "1_普通款_阿修罗.JPG"
    }]
}, {
    id: 1,
    seriesTitle: "宝藏系列",
    boxs: [{
        id: 0,
        isRare: false,//是否是隐藏款
        itemTitle: "阿修罗",
        itemImg: "1_普通款_阿修罗.JPG"
    }, {
        id: 1,
        isRare: false,//是否是隐藏款
        itemTitle: "八岐大蛇",
        itemImg: "1_普通款_八岐大蛇.JPG"
    }, {
        id: 2,
        isRare: false,//是否是隐藏款
        itemTitle: "八岐大蛇",
        itemImg: "1_普通款_八岐大蛇.JPG"
    }]
}];

//确认是否回收
const showRecycling = ref(false);
const confirmRecycling = () => {
    console.log("确认回收");
}
//确认是否购入
const showSubmit = ref(false);

</script>

<style scoped src="../assets/css/myBlindBox.css"></style>