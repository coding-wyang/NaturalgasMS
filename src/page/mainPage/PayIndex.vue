<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted, computed } from 'vue';
/* import QRCode from 'qrcode'; */
import QrcodeVue from 'qrcode.vue';
import { ElMessage } from 'element-plus';
import { baseURL } from '../../utils/baseUrl';
import { cardQuery } from '../../http/api';

const route = useRoute();
const router = useRouter();
const payData = computed(() => route.query);
const state = ref('unFirst');
const firstInfo = ref('null');
if (payData.value.state === 'first') {
  state.value = payData.value.state;
  firstInfo.value = payData.value.firstInfo;
}
console.log('sda', state.value, firstInfo.value);
const balance = ref(0);
/* const value = ref(`http://${baseURL}:8900/PayPhone?payment=${payData.value.payment}&cardid=${payData.value.cardid}`); */
const value = ref(`http://${baseURL}:8900/PayPhone?payment=${payData.value.payment}&cardid=${payData.value.cardid}&state=${payData.value.state}&firstInfo=${payData.value.firstInfo}`);
onMounted(() => {
  if (payData.value.state !== 'first') {
    cardQuery({ cardId: payData.value.cardid, name: '' }).then((res) => {
      balance.value = Number(res.data[0].balance.$numberDecimal);
    });
  }
});
const diableShow = ref(false);

const intTimer = ref();
const payNow = () => {
  diableShow.value = true;
  if (payData.value.state !== 'first') {
    intTimer.value = setInterval(() => {
      cardQuery({ cardId: payData.value.cardid, name: '' }).then((res) => {
        if (balance.value !== Number(res.data[0].balance.$numberDecimal)) {
          closeDia();
        }
      });
    }, 5000);
  } else {
    intTimer.value = setInterval(() => {
      cardQuery({ cardId: payData.value.cardid, name: '' }).then((res) => {
        if (res) {
          closeDia();
        }
      });
    }, 5000);
  }
};

const closeDia = () => {
  diableShow.value = false;
  clearInterval(intTimer.value);
  ElMessage.success('缴费成功');
  setTimeout(() => {
    router.go(-1);
  }, 3000);
};

</script>

<template>
  <el-card>
    <div class="pay-index-box">
      <div class='computer-body'>
        <div class='right-topay'>
          <div class='icon-fa'>
            <svg-icon class="right-icon" name="rightgreen"/>
          </div>
          <div class='text-info'>
            <span>您的订单已提交成功！请尽快付款</span>
            <div style="height: 10px"></div>
            <div class='info-children'>
              <span>金额：</span>
              <span>{{`￥${payData.payment}`}}</span>
            </div>
          </div>
        </div>
        <div class='pay-method'>
          <span>请选择支付方式</span>
          <div class='method'>
            <div class='method-box'>
            <input type="radio" id="huey" name="contact" value="huey" checked>
            <img src="../../assets/zhifubao.png">
            <img class='tuijian' src='../../assets/tuijian.png'>
          </div>
          <div class='method-box'>
            <input type="radio" id="huey" name="contact" value="huey" checked>
            <img class='weixin' src="../../assets/weixin.png">
          </div>
          </div>
        </div>
        <el-button @click="payNow" style="margin-left: 5%; margin-top:20px; width: 160px;" type="primary" size='large'>立即支付</el-button>
        <el-button style="margin-left: 5%; margin-top:20px; width: 160px;" type="primary" size='large'>我再想想</el-button>
        <el-dialog v-model="diableShow" width="20%">
          <div class='dia-box'>
            <span>扫下方二维码付钱</span>
            <qrcode-vue class='qrcode' :value="value" :size="size" level="H" />
          </div>
        </el-dialog>
      </div>
      <div class='computer-role'></div>
      <div class='computer-foot'></div>
    </div>
  </el-card>
</template>

<style>
.el-message{
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 50%;
  left: 50%;
  width: 120px;
  height: 35px;
  border-radius: 5px;
  background: #ffff;
  color: #51ff01;
}
.computer-body{
  width: 80%;
  margin: 0 auto;
  height: 570px;
  border: 20px solid;
  border-color: rgb(109, 106, 106);
  border-radius: 13px;
}
.computer-role{
  width: 20%;
  height: 80px;
  background-color: rgb(109, 106, 106);
  margin: 0 auto;
  margin-top:-6px;
  border-radius: 10px;
}
.computer-foot{
  width: 45%;
  height: 25px;
  background-color: rgb(109, 106, 106);
  margin: 0 auto;
  border-radius: 14px;
}
.right-topay{
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  width: 90%;
  height: 150px;
  margin: 0 auto;
  margin-top: 15px;
  background-color: rgb(224, 224, 224);
  border-radius: 8px;
}
.icon-fa{
  margin-left: 20px;
  width: 47px;
  height: 47px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(70, 140, 245);
  border-radius: 50px;
}
.right-icon{
  font-size: 27px;
  color: aliceblue;
  border-radius: 40px;
}
.text-info{
  display: flex;
  flex-flow: column nowrap;
  margin-left: 14px;
}
.text-info >span{
  font-size: 15px;
  font-weight: 550;
}
.info-children >:nth-child(1){
  font-size: 15px;
  font-weight: 550;
}
.info-children :nth-child(2){
  font-size: 17px;
  color: rgb(238, 62, 62);
}
.pay-method{
  display: flex;
  flex-flow: column nowrap;
  margin-left: 5%;
  margin-top: 10px;
}
.pay-method >span{
  font-size: 15px;
  font-weight: 550;
}
.method{
  display: flex;
  flex-flow: row wrap;
  margin-top: 10px;
}
.method-box{
  display: flex;
  align-items: center;
  width: 350px;
  height: 90px;
  border: 2px solid #ccc;
  border-radius: 5px;
  margin-inline-end: 40px;
  margin-block: 10px;
}
.method-box >input{
  zoom:120%;
  margin-left: 15px;
  margin-right: 22px;
}
.weixin{
  margin-left: 10px;
}
.tuijian{
  margin-left: 10px;
  transform:scale(0.4);
}
.dia-box{
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}
.dia-box>span{
  font-weight: 650;
  margin-bottom: 15px;
}
</style>
