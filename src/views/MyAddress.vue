<template>
    <nav>
        <van-icon name="arrow-left" @click="$router.back()" />
        <span class="title">我的地址</span>
    </nav>
    <div class="address_box">

        <van-address-list v-model="chosenAddressId" :list="list" default-tag-text="默认" @select="onSelect" @add="onAdd"
            @edit="onEdit" />
    </div>
    <van-popup v-model:show="showAddress" round closeable style="padding: 1rem; padding-bottom: 0;" class="address_edit">
        <van-address-edit :area-list="areaList" :show-delete="isEdit" show-set-default show-search-result
            :address-info="addressInfo" :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave"
            @delete="onDelete" />
    </van-popup>
</template>
<script setup>
import { ref, reactive, getCurrentInstance } from 'vue';
import { areaList } from '@vant/area-data';
const { proxy } = getCurrentInstance()

/* 联系人 */
const chosenAddressId = ref('1');
const list = ref([
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
//获取该用户的全部地址
proxy.$api.get("/address/user/myAddress").then(r => {
    list.value = r.data.map(i => {
        if (!!i.defaultContact) {
            chosenAddressId.value = i.addressId;
        }
        return {
            id: i.addressId,
            name: i.consignee,
            tel: i.tel,
            address: i.address + i.detailedAddress,
            addressHead: i.address,
            detailedAddress: i.detailedAddress,
            isDefault: !!i.defaultContact,
        };
    })
    // console.log(r.data);
})
//清空默认联系人
const emptyDefault = () => {
    for (const listItem of list.value) {
        listItem.isDefault = false;
    }
}
//切换默认联系人
const onSelect = (item, index) => {
    proxy.$api.put("/address/user/updateDefaultContact", proxy.$qs.stringify({
        addressId: item.id,
    })).then(r => {
        emptyDefault();
        list.value[index].isDefault = true;
    });
};
//弹出层
const showAddress = ref(false);
const isEdit = ref(false);
/* 编辑地址 */
const addressInfo = ref([]);
const onAdd = () => {
    showAddress.value = true;
    isEdit.value = false;
    addressInfo.value = {};
};
const onEdit = (item, index) => {
    showAddress.value = isEdit.value = true;
    let i = list.value[index];
    addressInfo.value = {
        addressId: i.id,
        addressDetail: i.detailedAddress,
        city: i.addressHead,
        isDefault: i.isDefault,
        name: i.name,
        tel: i.tel,
    };
};

const onSave = (item) => {
    if (isEdit.value) {//编辑更改数据
        proxy.$api.put("/address/user/updateMyAddress", proxy.$qs.stringify({
            addressId: item.addressId,
            consignee: item.name,
            tel: item.tel,
            address: item.province + item.city + item.county,
            detailedAddress: item.addressDetail,
            defaultContact: item.isDefault ? 1 : 0
        })).then(r => {
            for (const listItem of list.value) {
                if (listItem.id === item.addressId) {
                    listItem.name = item.name;
                    listItem.tel = item.tel;
                    listItem.address = item.province + item.city + item.county + item.addressDetail;
                    if (item.isDefault) {
                        //设置默认联系人
                        emptyDefault();
                        chosenAddressId.value = item.addressId;
                        listItem.isDefault = true;
                    }
                    showAddress.value = false;
                    proxy.$showSuccessToast("保存成功");
                    return;
                }
            }
        })
        return;
    }
    //添加数据
    proxy.$api.put("/address/user/insertMyAddress", proxy.$qs.stringify({
        consignee: item.name,
        tel: item.tel,
        address: item.province + item.city + item.county,
        detailedAddress: item.addressDetail,
        defaultContact: item.isDefault ? 1 : 0
    })).then(r => {
        let i = r.data;
        list.value.push({
            id: i.addressId,
            name: i.consignee,
            tel: i.tel,
            address: i.address + i.detailedAddress,
            addressHead: i.address,
            detailedAddress: i.detailedAddress,
            isDefault: !!i.defaultContact,
        });
        if (i.defaultContact) {
            //设置默认联系人
            // onSelect(list.value[list.value.length - 1], list.value.length - 1);
            emptyDefault();
            list.value[list.value.length - 1].isDefault = true;
            chosenAddressId.value = i.addressId;
        }
        showAddress.value = false;
        proxy.$showSuccessToast("保存成功");
    });
};
const onDelete = (item, index) => {
    proxy.$api.put("/address/user/deleteMyAddress", proxy.$qs.stringify({
        addressId: item.addressId,
    })).then(r => {
        // console.log(r.data)
        proxy.$showSuccessToast("删除成功");
        list.value = list.value.filter(listItem => listItem.id !== item.addressId);
        showAddress.value = false;
    })
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