<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { payRead, cardAdd } from '../http/api';

const route = useRoute();
const router = useRouter();
const payment = computed(() => route.query.payment);
const cardid = computed(() => route.query.cardid);
const state = computed(() => route.query.state);
const firstInfo = computed(() => JSON.parse(route.query.firstInfo));

const successPay = () => {
  if (state.value === 'first') {
    const addForm = {
      name: firstInfo.value.name,
      cardId: cardid.value,
      balance: payment.value,
      username: firstInfo.value.username,
    };
    cardAdd(addForm).then((res) => {
      if (res.status !== 200) {
        // eslint-disable-next-line no-undef
        ElMessage.error('添加失败');
      }
    });
  }
  const currDate = getDate();
  payRead({
    payment: payment.value,
    cardid: cardid.value,
    timer: currDate,
  }).then((res) => {
    if (res.status === 200 || res.status === 210) {
      router.push({ path: '/PaySucess' });
    }
  });
};

const getDate = () => {
  const myDate = new Date();
  const res = {
    year: myDate.getFullYear(),
    month: myDate.getMonth() + 1,
    date: myDate.getDate(),
    hours: myDate.getHours(),
    min: myDate.getMinutes(),
  };
  return res;
};
</script>

<template>
  <div class='pay-container'>
    <div class='pay-header'>
      <svg-icon class='arrow-icon' name='arrow'/>
      <span>付款</span>
    </div>
    <div class='pay-business'>
      <div class='busi-left'>
        <span>付款给商家</span>
        <span>智慧燃气(**洋)</span>
      </div>
      <svg-icon class='head-icon' name='cloud'></svg-icon>
    </div>
    <div class='pay-rmb'>
    <span>付款金额</span>
    <span>￥{{payment}}.00</span>
    <el-button @click="successPay" type='success' style="position: absolute; bottom: 30px;left:50%;transform:translate(-50%); width:140px;">付款</el-button>
  </div>
  </div>
</template>

<style scoped>
.pay-container{
   background: rgb(238, 238, 238);
}
.pay-header{
  display: flex;
  flex-flow: row nowrap;
  background: rgb(238, 238, 238);
}
.arrow-icon{
  font-size: 18px;
  margin-top: 8px;
  margin-left: 8px;
  font-weight: 300;
}
.pay-header>span{
  font-size: 15px;
  margin: 6px;
  margin-left:43%;
  transform: translate(-50%);
}
.pay-business{
  display: flex;
  height: 85px;
  flex-flow: row nowrap;
  background: rgb(238, 238, 238);
  align-items: center;
}
.busi-left{
  display: flex;
  flex-flow: column nowrap;
  margin-left: 15px;
}
.busi-left>:nth-child(1){
  font-size: 16px;
  font-weight: 550;
}
.busi-left>:nth-child(2){
  margin-top: 4px;
  font-size: 12px;
  font-weight: 400;
  color: rgb(65, 65, 65);
}
.head-icon{
  position: absolute;
  font-size: 40px;
  right: 30px;
}
.pay-rmb{
  display: flex;
  flex-flow: column nowrap;
  border-radius: 10px;
  background-color: #fff;
}
.pay-rmb >:nth-child(1){
  margin-left: 20px;
  margin-top: 25px;
  font-size: 14px;
}
.pay-rmb>:nth-child(2){
  margin-left: 20px;
  margin-top: 10px;
  font-size: 40px;
  font-weight: 550;
}
</style>
