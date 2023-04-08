<template>
    <nav>
        <van-icon name="arrow-left" />
        <van-icon name="question" />
    </nav>
    <aside>
        <h1>森林系列</h1>
        <div class="danmu_box">
            <ul>
                <li>
                    <span class="danmu">Febird抽中隐藏</span>
                </li>
                <li>
                    <span class="danmu">Jesong抽中隐藏</span>
                </li>
                <li>
                    <span class="danmu">隐藏款概率UP</span>
                </li>
                <li>
                    <span class="danmu">藏款概率UP</span>
                </li>
            </ul>
        </div>
    </aside>
    <main>
        <ul>
            <li v-for="(item, index) in goodsData" :class="{ 'goods_hidden_type': item.isRare }" @click="lookGood(item)">
                <img class="goods_img" :src=$getImgUrl(item.itemImg) />
                <div class="goods_content">
                    <span class="goods_title">{{ item.itemTitle }}</span>
                    <span class="goods_type">{{ item.isRare ? "隐藏款" : "普通款" }}</span>
                </div>
            </li>
        </ul>
    </main>
    <footer>
        <div class="buy_button" @click="startLuckyDraw">
            一发入魂就是现在 10¥
        </div>
    </footer>
    <!-- 抽奖弹窗 -->
    <div v-if="show">
        <!-- 是否显示，hitIndex：命中奖品的坐标，goodsData：所有奖品，@end 结束返回中奖的item -->
        <SweepstakesPopUp v-model:show="show" :hitIndex="hitIndex" :goodsData="goodsData" @end="luckyDrawEnd" />
    </div>
    <!-- 大图展示  -->
    <div class="good_item" v-show="showGoodItem">
        <p class="winning_msg" v-show="isLuckyDraw">恭喜你抽中了{{ goodItem?.itemTitle }}</p>
        <van-popup v-model:show="showGoodItem" round :style="{ width: '350px' }">
            <img :src="$getImgUrl(goodItem.itemImg)" class="good_item_img" />
        </van-popup>
        <van-icon name="close" class="close_good" @click="showGoodItem = false" />
    </div>
</template>
<script setup>
import SweepstakesPopUp from '@/components/SweepstakesPop-up.vue';
import { reactive, ref } from 'vue';

const goodsData = reactive([{
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
    itemTitle: "不知火",
    itemImg: "1_普通款_不知火.JPG"
}, {
    id: 3,
    isRare: false,//是否是隐藏款
    itemTitle: "大岳丸",
    itemImg: "1_普通款_大岳丸.JPG"
}, {
    id: 4,
    isRare: false,//是否是隐藏款
    itemTitle: "帝释天",
    itemImg: "1_普通款_帝释天.JPG"
}, {
    id: 5,
    isRare: false,//是否是隐藏款
    itemTitle: "鬼童丸",
    itemImg: "1_普通款_鬼童丸.JPG"
}, {
    id: 6,
    isRare: false,//是否是隐藏款
    itemTitle: "荒",
    itemImg: "1_普通款_荒.JPG"
}, {
    id: 7,
    isRare: false,//是否是隐藏款
    itemTitle: "紧那罗",
    itemImg: "1_普通款_紧那罗.JPG"
}, {
    id: 8,
    isRare: false,//是否是隐藏款
    itemTitle: "铃鹿御前",
    itemImg: "1_普通款_铃鹿御前.JPG"
}, {
    id: 9,
    isRare: false,//是否是隐藏款
    itemTitle: "千姬",
    itemImg: "1_普通款_千姬.JPG"
}, {
    id: 10,
    isRare: false,//是否是隐藏款
    itemTitle: "山兔",
    itemImg: "1_普通款_山兔.JPG"
}, {
    id: 11,
    isRare: false,//是否是隐藏款
    itemTitle: "缘结神",
    itemImg: "1_普通款_缘结神.JPG"
}, {
    id: 12,
    isRare: true,//是否是隐藏款
    itemTitle: "黑晴明",
    itemImg: "1_隐藏款_黑晴明.JPG"
}, {
    id: 13,
    isRare: true,//是否是隐藏款
    itemTitle: "晴明",
    itemImg: "1_隐藏款_晴明.JPG"
}]);
//抽奖弹窗是否显示
const show = ref(false);
const hitIndex = ref();
const startLuckyDraw = () => {
    setTimeout(() => {//模拟中将的编号
        hitIndex.value = 10;
    }, 1000)
    show.value = true;
}

//大图展示
const showGoodItem = ref(false);
const goodItem = ref();
const isLuckyDraw = ref(false);
const lookGood = (item) => {
    showGoodItem.value = true;
    isLuckyDraw.value = false;
    goodItem.value = item;
}
const luckyDrawEnd = (end) => {//中奖的数据
    showGoodItem.value = true;
    isLuckyDraw.value = true
    goodItem.value = end;
}
//
</script>
<style scoped src="@/assets/css/shopping.css"></style>