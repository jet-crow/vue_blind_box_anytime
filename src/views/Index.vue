<template>
    <nav>
        <span>PoPmart</span>
        <van-icon name="user-o" />
    </nav>
    <section>
        <button class="btn_selected">综合</button>
        <button>新品</button>
        <button>价格↑</button>
        <div class="input_box">
            <input type="text" />
            <van-icon name="search" />
        </div>
    </section>
    <main>
        <ul class="series_box">
            <li v-for="i in 8" class="series_item">
                <img :src="$getImgUrl(seriesData[0].img)" class="series_img" />
                <p class="series_describe">
                    <span class="name">{{ seriesData[0].name }}</span>
                    <span class="price">￥{{ seriesData[0].price }}</span>
                </p>
            </li>
        </ul>
    </main>
</template>

<script setup>
const seriesData = [
    {
        id: 0,
        name: '森林系列',
        price: 9.9,
        img: "1_普通款_荒.JPG",
        ShelfDate: '2023-04-08'
    }
]
</script>

<style scoped src="../assets/css/index.css"></style>