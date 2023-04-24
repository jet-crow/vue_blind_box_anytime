<template>
    <nav>
        <van-icon name="arrow-left" />
        <span class="title">我的盲盒</span>
    </nav>

    <main>
        <!-- 系列 -->
        <article v-for="item in blindBoxData " :key="item.seriesId">
            <p class="series_title">{{ item.seriesName }}<span style="color:#a5a2a2;margin-left: .3rem;">〉</span></p>
            <div class="good_box" v-for="box in item.goods" :key="box.goodsId">
                <img :src="$getImgUrl(box.goodsImg)" width="100" />
                <p>{{ box.goodsName }}</p>
                <div class="btn_box" v-show="box.status == 0">
                    <button @click="showRecycling = true; selectedData = box">返盒{{ box.recoveryPrice }}￥</button>
                    <button @click=" showSubmit = true; selectedData = box ">确认购入</button>
                </div>
                <div class="seal" v-show=" box.status !== 0 ">{{ box.status == 1 ? "已反盒" : "已购入" }}</div>
            </div>
        </article>
        <!-- 确认是否回收么 -->
        <van-dialog v-model:show=" showRecycling " @confirm=" confirmRecycling " confirm-button-color="#5E548E"
            title="确定回收么？" show-cancel-button>
        </van-dialog>
        <!-- 确认是否购入 -->
        <van-popup class="submit_box" v-model:show=" showSubmit " round
            :style=" { padding: '1rem 1rem 4rem 1rem', width: '18rem' } ">
            <p class="title">确认收货地址</p>
            <template v-if=" addressInfo.length ">
                <p class='contact_info'>{{addressInfo[0].consignee}} {{ addressInfo[0].tel }}</p>
                <p class='address'>{{ addressInfo[0].address + addressInfo[0].detailedAddress}}</p>
            </template>
            <template v-else>
                <p @click=" $router.push('/myAddress') ">未选择收货地址，请选择收货地址</p>
            </template>
            <div class="submit_btn_box">
                <button @click=" $router.push('/myAddress') ">修改地址</button>
                <button @click=" buy ">购入</button>
            </div>
        </van-popup>
    </main>
</template>

<script setup>
import router from '@/router';
import { ref, getCurrentInstance } from 'vue';
const { proxy } = getCurrentInstance()
const blindBoxData = ref([]);

//获取我的盲盒
proxy.$api.get("/mybox/user/selectAll").then(r => {
    blindBoxData.value = r.data
    console.log(r.data);
})
//获取默认联系人
//默认地址
const addressInfo = ref([])
proxy.$api.get("/address/user/defaultContactAddress").then(r => {
    console.log(r.data)
    addressInfo.value = r.data;
})
const selectedData = ref()
//确认是否回收
const showRecycling = ref(false);
const confirmRecycling = () => {
    console.log("确认回收");
    // console.log(selectedData.value.myboxId)
    proxy.$api.get("/mybox/user/backGoods?myboxId=" + selectedData.value.myboxId).then(r => {
        proxy.$showSuccessToast("返盒成功");
        location.reload();
    })
}
//确认是否购入
const showSubmit = ref(false);
const buy = () => {
    if (addressInfo.value.length) {
        proxy.$api.get("/mybox/user/buy?myboxId=" + selectedData.value.myboxId).then(r => {
            proxy.$showSuccessToast("购入成功");
            location.reload();
        })
    } else {
        proxy.$showSuccessToast("请选择默认地址");
        router.push("/myAddress")
    }
}
</script>

<style scoped src="../assets/css/myBlindBox.css"></style>