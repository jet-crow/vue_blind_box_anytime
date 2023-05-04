<template>
    <nav>
        <van-icon name="arrow-left" @click="goBack" />
        <van-icon name="question" />
    </nav>
    <aside>
        <h1>{{ seriesData.seriesName }}</h1>
        <div class="danmu_box">
            <ul>
                <li v-for="(item, index) in danmuData">
                    <span class="danmu">{{ item.danmuText }}</span>
                </li>
            </ul>
        </div>
    </aside>
    <main>
        <ul>
            <li v-for="(item, index) in goodsData" :class="{ 'goods_hidden_type': (item.rare == 1 ? true : false) }"
                @click="lookGood(item)">
                <img class="goods_img" :src=$getImgUrl(item.goodsImg) />
                <div class="goods_content">
                    <span class="goods_title">{{ item.goodsName }}</span>
                    <span class="goods_type">{{ item.rare == 1 ? "隐藏款" : "普通款" }}</span>
                </div>
            </li>
        </ul>
        <div class="comments_box">
            <h1 style="margin-bottom: .5rem;">留言</h1>
            <el-input v-model="comments" placeholder="请输入的评论" clearable>
                <template #append>
                    <el-text style="color: var(--color-black); font-weight: bold;" @click="send">留言</el-text>
                </template>
            </el-input>
            <div class="comments_msg">
                <ul>
                    <li v-for="i in  commentsData">
                        {{ i.user }}：{{ i.msg }}
                    </li>
                </ul>
            </div>
        </div>
    </main>
    <footer>
        <div class="buy_button" @click="startLuckyDraw">
            一发入魂就是现在 {{ seriesData.price }}¥
        </div>
    </footer>
    <!-- 抽奖弹窗 -->
    <div v-if="show">
        <!-- 是否显示，hitIndex：命中奖品的坐标，goodsData：所有奖品，@end 结束返回中奖的item -->
        <SweepstakesPopUp v-model:show="show" :hitIndex="hitIndex" :goodsData="goodsData" @end="luckyDrawEnd" />
    </div>
    <!-- 大图展示  -->
    <div class="good_item" v-show="showGoodItem">
        <p class="winning_msg" v-show="isLuckyDraw">恭喜您抽中了{{ goodItem?.goodsName }}</p>
        <van-popup v-model:show="showGoodItem" round :style="{ width: '350px' }">
            <img :src="$getImgUrl(goodItem.goodsImg)" class="good_item_img" />
        </van-popup>
        <van-icon name="close" class="close_good" @click="showGoodItem = false" />
    </div>
</template>
<script setup>
import { showSuccessToast, showFailToast } from 'vant';
import SweepstakesPopUp from '@/components/SweepstakesPop-up.vue';
import { computed, ref, getCurrentInstance } from 'vue';
import router from "@/router";
const { proxy } = getCurrentInstance();
const comments = ref("");
// 获取过来的seriesId
const seriesId = router.currentRoute.value.query.seriesId;

// 商品数据
let goodsData = ref([]);
proxy.$api.get('/goods/goodsData?seriesId=' + seriesId).then(res => {
    // console.log(res.data);
    goodsData.value = res.data;
});

// 系列数据
let seriesData = ref([]);
// 获取网页数据
proxy.$api.get('/series/selectOne?seriesId=' + seriesId).then(res => {
    // console.log(res.data);
    seriesData.value = res.data;
});

// 弹幕数据
let danmuData = ref([]);
proxy.$api.get('/danmu/danmuData?seriesId=' + seriesId).then(res => {
    // console.log(res.data);
    danmuData.value = res.data;
});

//评论数据
let commentsData = ref([]);
proxy.$api.get('/comments/queryCommentsBySeries?seriesId=' + seriesId).then(r => {
    commentsData.value = r.data;
    console.log(r.data);
})
//抽奖弹窗是否显示
const show = ref(false);
const hitIndex = ref();
const startLuckyDraw = () => {
    proxy.$api.post('/account/user/luckyDraw', proxy.$qs.stringify({
        'seriesId': seriesId,
    })).then(res => {
        if (res.data == '') {
            console.log('老哥没钱！');
            showFailToast('钻石不足');
            // 跳转
            router.push('/topup');
            return;
        }
        console.log("你抽到了：");
        console.log(res.data);
        // 抽中的小li序号
        let winNum = 0;
        for (let i = 0; i < goodsData.value.length; i++) {
            if (goodsData.value[i].goodsId == res.data.goodsId) {
                winNum = i;
            }
        }
        hitIndex.value = winNum;
        show.value = true;

        // 刷新弹幕
        proxy.$api.get('/danmu/danmuData?seriesId=' + seriesId).then(res => {
            // console.log(res.data);
            danmuData.value = res.data;
        });
    });

};

//大图展示
const showGoodItem = ref(false);
const goodItem = ref();
const isLuckyDraw = ref(false);
const lookGood = (item) => {
    showGoodItem.value = true;
    isLuckyDraw.value = false;
    goodItem.value = item;
};
const luckyDrawEnd = (end) => {//中奖的数据
    showGoodItem.value = true;
    isLuckyDraw.value = true;
    goodItem.value = end;
};

const goBack = () => {
    console.log('go back');
    window.history.go(-1);
};
//发送留言
const send = () => {
    if (comments.value.length == 0) {
        proxy.$showFailToast("留言内容不能为空")
        return false;
    }
    proxy.$api.post("/comments/user/addComments", proxy.$qs.stringify({
        msg: comments.value,
        seriesId: seriesId
    })).then(r => {
        if (r.data == "") {
            proxy.$showFailToast("需要抽取过该系列才能留言喔~");
            return false;
        }
        comments.value = "";
        proxy.$showSuccessToast("留言成功√");
        commentsData.value.push({
            "msg": r.data.msg,
            "user": localStorage.getItem("name"),
            "commentId": r.data.commentId
        })
    })
}
</script>
<style scoped src="@/assets/css/shopping.css"></style>

<style>
.comments_box .el-input-group__append {
    background-color: var(--color-p-100);
    background-image: linear-gradient(to right, var(--color-p-300), var(--color-p-100), var(--color-p-200));
    color: var(--color-black);

}
</style>