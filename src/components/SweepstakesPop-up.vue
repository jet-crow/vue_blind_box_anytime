<!-- 抽奖弹窗 -->
<!-- 绑定isShow 传imgs数据 -->
<!-- 
    手动写定时器，200ms切换一次
    当index到item.length就反向
    当index到0就反向

 -->
<template>
    <van-popup :show="show" round class="lucky_draw_box">
        <van-swipe :duration="duration" ref="swipe" :height="220" :loop="false" class="goods_box" vertical
            :show-indicators="false" @change="changeSwipeIndex">
            <van-swipe-item>
                <van-image fit="cover" :src="$getImgUrl(goodsData[goodsData.length - 1].itemImg)" />
            </van-swipe-item>
            <!-- 内容 -->
            <van-swipe-item v-for="item in goodsData " :key="item.id">
                <van-image fit="cover" :src="$getImgUrl(item.itemImg)" />
            </van-swipe-item>

            <van-swipe-item>
                <van-image fit="cover" :src="$getImgUrl(goodsData[0].itemImg)" />
            </van-swipe-item>
        </van-swipe>
        <div class="mask"></div>
        <div class="selected_border"></div>
        <button @click="endOfLottery" class="end_button">暂停 {{ time }}s</button>
    </van-popup>
    <i class="left_arrow">⇨</i>
    <i class="right_arrow">⇦</i>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const props = defineProps({
    show: Boolean,
    goodsData: Object,
    hitIndex: Number
})
const emits = defineEmits(['update:show', 'end'])//子传父
const swipe = ref();//swipe实例
const swipeIndex = ref(0)//当前的所选中的index
const duration = ref(100)// 过度效果的速度
let autoSwipe; // 计时器
let direction = true; //下一张or上一张
//倒计时
const time = ref(3)
const changeSwipeIndex = (index) => {
    swipeIndex.value = index;
}
//↑↓轮播
onMounted(() => {
    setTimeout(shuffling, duration.value);
    autoSwipe = setInterval(shuffling, duration.value)

    let endTime = setInterval(() => {//结束
        time.value--;
        if (time.value == 0) {
            clearTimeout(endTime);
            endOfLottery();
        }
        console.log(time.value);
    }, 1000)
})
//切换滑块
const shuffling = () => {
    direction ? swipe.value.next() : swipe.value.prev();
    if (swipeIndex.value == 0) {
        direction = true;
        swipe.value.next();
    }
    if (swipeIndex.value == props.goodsData.length - 1) {
        direction = false
        swipe.value.prev()
    }
}

const endOfLottery = () => {
    if (props.hitIndex == undefined || swipe.value == null) return false;
    clearInterval(autoSwipe);
    //从0开始的
    duration.value = 1500;
    swipe.value.swipeTo(props.hitIndex);
    setTimeout(() => {
        emits('update:show', false)
        //通知父组件完成了
        emits('end', props.goodsData[props.hitIndex])
    }, duration.value + 150);
}
</script>

<style>
.lucky_draw_box {
    width: 220px;
    height: 700px;
}

.mask {
    top: 0;
    width: 220px;
    height: 660px;
    opacity: 0;
    position: absolute;
}

.goods_box {
    /* border: 1px solid; */
    height: 660px;
}

.selected_border {
    position: absolute;
    width: 100%;
    height: 220px;
    border: 5px solid #f65f5f;
    top: 220px;
}

/* 左箭头 */
.left_arrow {
    vertical-align: middle;
    font-size: var(--text-6xl);
    font-weight: bolder;
    color: #f65f5f;
    top: calc(50% - 3.375rem);
    left: calc(50% - 110px - 65px);
    z-index: 3000;
    position: absolute;
    animation: animationArrowLeft .2s infinite alternate;
}

/* 右箭头 */
.right_arrow {
    vertical-align: middle;
    font-size: var(--text-6xl);
    font-weight: bolder;
    color: #f65f5f;
    top: calc(50% - 3.375rem);
    right: calc(50% - 110px - 65px);
    /* left: 50%; */
    z-index: 3000;
    position: absolute;
    animation: animationArrowRight .2s infinite alternate;
}

@keyframes animationArrowLeft {
    from {
        margin-left: 5px;
    }

    to {
        margin-left: -5px;
    }
}

@keyframes animationArrowRight {
    from {
        margin-right: 5px;
    }

    to {
        margin-right: -5px;
    }
}

.end_button {
    width: 100%;
    background-color: var(--color-p-100);
    background-image: linear-gradient(to right, var(--color-p-300), var(--color-p-100), var(--color-p-200));
    font-size: var(--text-2xl);
    text-align: center;
    padding: .3rem;
    color: var(--color-black);
}
</style>