<script setup>
import { reactive, ref } from 'vue';
import { ElMessageBox } from 'element-plus';
import { useRouter } from 'vue-router';
import { cardQuery, cardDelete, cardUserUpdate } from '../../http/api';

const router = useRouter();
const payValue = ref();
const formInline = reactive({
  cardId: '',
  name: '',
});
const cardData = reactive({
  data: [],
});
const editInfo = reactive({
  newId: '',
  newName: '',
});
const isDialog = ref(false);
const formIndex = ref('');
/* 根据表单信息查询 */
const onSubmit = () => {
  if (formInline.cardId !== '' || formInline.name !== '') {
    cardQuery(formInline).then((res) => {
      console.log('asdasd', res);
      cardData.data = res.data;
      console.log(cardData.data);
    });
  }
};
/* 删除card */
const deleteCard = (index) => {
  ElMessageBox.confirm('此操作将永久删除该账号，是否继续？', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    cardDelete(cardData.data[index]).then((rel) => {
      console.log('delete', rel);
    });
  });
};
/* 修改信息 */
const editCard = (index) => {
  formIndex.value = index;
  isDialog.value = true;
};
/* 更改绑定用户 */
const changeUser = () => {
  if (cardData.data[formIndex.value].username !== editInfo.newId) {
    cardData.data[formIndex.value].name = editInfo.newName;
    cardData.data[formIndex.value].username = editInfo.newId;
    cardUserUpdate(cardData.data[formIndex.value]).then((res) => {
      console.log('res', res);
      if (res.state === 200) {
        isDialog.value = false;
      }
    });
  } else {
    ElMessageBox.confirm('修改后的户主不得与原户主一致');
  }
};
const dialogvisible = ref(false);
const handlePay = () => {
  router.push({
    path: 'PayIndex',
    query: {
      value: payValue.value,
      cardid: cardData.data[formIndex.value].cardid,
    },
  });
};
</script>

<template>
<el-card>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="气卡ID">
      <el-input v-model="formInline.cardId"></el-input>
    </el-form-item>
    <el-form-item label="卡主姓名">
      <el-input v-model="formInline.name"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Query</el-button>
    </el-form-item>
  </el-form>
  <el-divider></el-divider>
  <h4 style="padding-block-end: 15px;">气卡查询结果</h4>
  <div class="search-card">
    <div v-show="cardData.data[0].name !== undefined" v-for="(item, index) in cardData.data" :key=item.cardid>
  <el-descriptions
    direction="vertical"
    :column="4"
    border
    style="padding-block-end: 15px;
            padding-inline: 10px"
  >
    <el-descriptions-item label="卡主姓名">{{item.name}}</el-descriptions-item>
    <el-descriptions-item label="ID">{{item.cardid}}</el-descriptions-item>
    <el-descriptions-item label="联系方式" :span="3"></el-descriptions-item>
    <el-descriptions-item label="状态" >{{item.state}}</el-descriptions-item>
    <el-descriptions-item label="余额">
      <el-tag size="normal">{{Number(item.balance.$numberDecimal).toFixed(2)}} 元</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="累计用气量">{{item.cumulative}}</el-descriptions-item>
    <el-descriptions-item label="操作">
        <el-button type="primary" @click='editCard(index)'>更换户主</el-button>
        <el-button type="success" @click='dialogvisible = true; formIndex = index;'>缴费</el-button>
        <el-button type="error" @click='deleteCard(index)' style="color: white">删除</el-button>
    </el-descriptions-item>
  </el-descriptions>
  </div>
  <el-dialog
  v-model="dialogvisible"
  width='15%'>
  <el-input  v-model="payValue" placeholder="请输入金额"></el-input>
  <el-button round="true" type="success" style='margin-left:75px;margin-top:6px;' @click="handlePay">确定</el-button>
  </el-dialog>
  <el-dialog
  v-model="isDialog">
  <el-form  :model="cardData.data[formIndex]" class="demo-form-inline">
    <el-form-item label="气卡ID">
      <el-input disabled v-model="cardData.data[formIndex].cardid"></el-input>
    </el-form-item>
    <el-form-item label="卡主">
      <el-input disabled v-model="cardData.data[formIndex].name"></el-input>
    </el-form-item>
    <el-form-item label="新卡主">
      <el-input v-model="editInfo.newName"></el-input>
    </el-form-item>
    <el-form-item label="新卡主ID">
      <el-input v-model="editInfo.newId"></el-input>
    </el-form-item>
  </el-form>
  <el-button type="success" @click="changeUser">确定</el-button></el-dialog>
  </div>
</el-card>
</template>

<style lang="scss">
.search-card{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
