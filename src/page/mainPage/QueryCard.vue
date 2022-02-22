<script setup>
import { reactive } from 'vue';
import { ElMessageBox } from 'element-plus';
import { cardQuery, cardDelete } from '../../http/api';

const formInline = reactive({
  cardId: '',
  name: '',
});
const cardData = reactive({
  data: [],
});

/* const isShowResult = ref(false); */
const onSubmit = () => {
  cardQuery(formInline).then((res) => {
    console.log('asdasd', res);
    cardData.data = res.data;
    console.log(cardData.data);
  });
};

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
      <el-tag size="normal">{{item.balance}} 元</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="累计用气量">{{item.cumulative}}</el-descriptions-item>
    <el-descriptions-item label="操作">
        <el-button type="success"  style="color: white;">缴费</el-button>
        <el-button type="error" @click='deleteCard(index)' style="color: white;">删除</el-button>
    </el-descriptions-item>
  </el-descriptions>
  </div>
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
