<script setup>
import { reactive } from 'vue';
import { cardQuery } from '../../http/api';

const formInline = reactive({
  cardId: '',
  name: '',
});
const cardData = reactive({
  data: {

  },
});
const onSubmit = () => {
  cardQuery(formInline).then((res) => {
    console.log('carad', res);
    cardData.data = res.data;
    console.log(cardData);
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
  <el-descriptions
    title="气卡查询结果"
    direction="vertical"
    :column="4"
    border
  >
    <el-descriptions-item label="卡主姓名">{{cardData.data.name}}</el-descriptions-item>
    <el-descriptions-item label="联系方式" :span="3">18100000000</el-descriptions-item>
    <el-descriptions-item label="状态" >{{cardData.data.state}}</el-descriptions-item>
    <el-descriptions-item label="余额">
      <el-tag size="normal">{{cardData.data.balance}} 元</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="累计用气量">{{cardData.data.cumulative}}</el-descriptions-item>
    <el-descriptions-item label="缴费"
      >
    </el-descriptions-item>
  </el-descriptions>

</el-card>
</template>

<style lang="scss">

</style>
