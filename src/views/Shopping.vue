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
            <li v-for="(item, index) in goodsData.itemData">
                <img class="goods_img" :src = $getImgUrl(item.itemImg) />
                <div class="goods_content">
                    <span class="goods_title">{{ item.itemTitle }}</span>
                    <span class="goods_type">{{ item.isRare ? "隐藏款" : "普通款" }}</span>
                </div>
            </li>
        </ul>
    </main>
    <footer>
        <div class="buy_button">
            一发入魂就是现在 10¥
        </div>
    </footer>
</template>
<script setup>
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
    }, {
        isRare: false,//是否是隐藏款
        itemTitle: "大岳丸",
        itemImg: "1_普通款_大岳丸.JPG"
    }, {
        isRare: false,//是否是隐藏款
        itemTitle: "帝释天",
        itemImg: "1_普通款_帝释天.JPG"
    }, {
        isRare: false,//是否是隐藏款
        itemTitle: "鬼童丸",
        itemImg: "1_普通款_鬼童丸.JPG"
    }, {
        isRare: false,//是否是隐藏款
        itemTitle: "荒",
        itemImg: "1_普通款_荒.JPG"
    }, {
        isRare: false,//是否是隐藏款
        itemTitle: "紧那罗",
        itemImg: "1_普通款_紧那罗.JPG"
    }, {
        isRare: false,//是否是隐藏款
        itemTitle: "铃鹿御前",
        itemImg: "1_普通款_铃鹿御前.JPG"
    }, {
        isRare: false,//是否是隐藏款
        itemTitle: "千姬",
        itemImg: "1_普通款_千姬.JPG"
    }, {
        isRare: false,//是否是隐藏款
        itemTitle: "山兔",
        itemImg: "1_普通款_山兔.JPG"
    }, {
        isRare: false,//是否是隐藏款
        itemTitle: "缘结神",
        itemImg: "1_普通款_缘结神.JPG"
    }, {
        isRare: true,//是否是隐藏款
        itemTitle: "黑晴明",
        itemImg: "1_隐藏款_黑晴明.JPG"
    }, {
        isRare: true,//是否是隐藏款
        itemTitle: "晴明",
        itemImg: "1_隐藏款_晴明.JPG"
    }]
};
</script>
<style scoped src="@/assets/css/shopping.css"></style>
<script setup></script>