<template>
    <nav>
        <span>PoPmart</span>
        <van-icon name="user-o" @click="router.push('/home')" />
    </nav>
    <section>
        <button @click=" changeSort(0, $event) " class="btn_selected">综合</button>
        <button @click=" changeSort(1, $event) ">新品</button>
        <button @click=" changeSort(2, $event) ">价格↑</button>
        <div class="input_box">
            <input type="text" v-model=" search " />
            <!-- <el-input v-model="search" size="small" placeholder="Type to search" /> -->
            <van-icon name="search" />
        </div>
    </section>
    <main>
        <ul class="series_box">
            <li v-for="(  item, index  ) in   filterSeriesData  " class="series_item" @click="jump(item.seriesId)">
                <img :src=" $getImgUrl(item.mainImg) " class="series_img" />
                <p class="series_describe">
                    <span class="name">{{ item.seriesName }}</span>
                    <span class="price">￥{{ item.price }}</span>
                </p>
            </li>
        </ul>
    </main>
</template>

<script setup>
import { computed, ref, getCurrentInstance } from 'vue';
import router from "@/router";
const { proxy } = getCurrentInstance();

let seriesData = ref([]);
// 获取网页数据
proxy.$api.get('/series/allSeriesData').then(res => {
    console.log(res.data);
    seriesData.value = res.data;
    // console.log(seriesData.value);
});

const search = ref('');
const filterSeriesData = computed(() => {
    return seriesData.value.filter((data) => !search.value ||
        (data.seriesName + "").includes(search.value));
});

// 切换列表
// 0综合、1新品、2价格正序/倒序
function changeSort(index, e) {
    //变换按钮选中状态
    let btn = document.querySelectorAll('button');
    for (var i = 0; i < btn.length; i++) {
        btn[i].classList.remove('btn_selected');
    }
    e.target.classList.add('btn_selected');

    // 排序
    if (index == 0) {
        // 综合
        seriesData.value.sort(sortBy('seriesId', 0));
    } else if (index == 1) {
        // 新品
        seriesData.value.sort(sortBy('seriesId', 1));
    } else if (index == 2) {
        // 排序
        if (e.target.innerText == '价格↓') {
            seriesData.value.sort(sortBy('price', 0));
            e.target.innerText = '价格↑';
        } else {
            seriesData.value.sort(sortBy('price', 1));
            e.target.innerText = '价格↓';
        }
    }
}

// 排序方法 field：字段，direction：1从大到小，0从小到大
function sortBy(field, direction) {
    return (x, y) => {
        if (direction == 0) {
            return x[field] - y[field];
        } else {
            return y[field] - x[field];
        }
    };
}

// 跳转
const jump = (seriesIdValue) => {
    console.log(seriesIdValue);
    router.push({
        path: '/shopping',
        query: {
            seriesId: seriesIdValue
        }
    })
};
</script>

<style scoped src="../assets/css/index.css"></style>