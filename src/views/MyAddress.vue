<template>
    <nav>
        <van-icon name="arrow-left" />
        <span class="title">我的地址</span>
    </nav>
    <div class="address_box">
        <van-address-list v-model="chosenAddressId" :list="list" default-tag-text="默认" @add="onAdd" @edit="onEdit" />
    </div>
    <van-popup v-model:show="showAddress" round closeable style="padding: 1rem; padding-bottom: 0;" class="address_edit">
        <van-address-edit :area-list="areaList" :show-delete="isEdit" show-set-default show-search-result
            :search-result="searchResult" :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave"
            @delete="onDelete" @change-detail="onChangeDetail" />
    </van-popup>
</template>
<script setup>
import { ref, reactive } from 'vue';
import { areaList } from '@vant/area-data';
/* 联系人 */
const chosenAddressId = ref('1');
const list = reactive([
    {
        id: '1',
        name: '张三',
        tel: '13000000000',
        address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
        isDefault: true,
    },
    {
        id: '2',
        name: '李四',
        tel: '1310000000',
        address: '浙江省杭州市拱墅区莫干山路 50 号',
    },
]);
//弹出层
const showAddress = ref(false);
const isEdit = ref(false);
const onAdd = () => {
    showAddress.value = true;
    isEdit.value = false;
};
const onEdit = (item, index) => {
    showAddress.value = true;
    isEdit.value = true;
    console.log('编辑地址:' + index)
};

/* 编辑地址 */
const searchResult = ref([]);
const onSave = () => {
    console.log("save");
}
const onDelete = () => console.log('delete');
const onChangeDetail = (val) => {
    if (val) {
        searchResult.value = [
            {
                name: '黄龙万科中心',
                address: '杭州市西湖区',
            },
        ];
    } else {
        searchResult.value = [];
    }
};


</script>
<style scoped src="@/assets/css/myAddress.css"></style>
<style>
:root {
    /* 按钮选中的颜色 */
    --van-address-list-radio-color: var(--color-p-100);
}

.address_box {
    min-height: calc(100vh - 4rem);
    background-color: var(--color-p-500);
}

.address_box .van-cell {
    background-color: var(--color-white);
}

/* 单选框样式 */
.address_box .van-address-item {
    background-color: var(--color-white);
}

/* 默认tag样式 */
.address_box .van-tag--primary {
    background: var(--color-p-100);
}

.address_box .van-address-list__bottom {
    background-color: var(--color-p-500);
}

/* 按钮样式 */
.address_box .van-button--primary,
.address_edit .van-button--primary {
    background-color: var(--color-p-100);
    border-color: var(--color-p-100);
}

/* 编辑地址样式 */
.address_edit .van-address-edit__buttons {
    padding-bottom: 0;
}

.address_edit .van-switch--on {
    background: var(--color-p-100);
}
</style>