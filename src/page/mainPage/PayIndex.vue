<script setup>
import { useRoute } from 'vue-router';
import { /* ref, onMounted, */ computed } from 'vue';

const route = useRoute();
const payData = computed(() => route.query);
/* onMounted(() => {
  payData.value = route.query;
}); */

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
              <span>{{`￥${payData.value}`}}</span>
            </div>
          </div>
        </div>
        <div class='pay-method'>
          <span>请选择支付方式</span>
          <div class='method'>
            <div class='method-box'>
            <input type="radio" id="huey" name="contact" value="huey" checked>
            <img src="../../assets/zhifubao.png">
          </div>
          <div class='method-box'>
            <input type="radio" id="huey" name="contact" value="huey" checked>
            <img src="../../assets/weixin.png">
          </div>
          </div>
        </div>
      </div>
      <div class='computer-role'></div>
      <div class='computer-foot'></div>
    </div>
  </el-card>
</template>

<style scope>
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
.method{
  display: flex;
  flex-flow: row wrap;
  margin-top: 10px;
}
.method-box{
  display: flex;
  align-items: center;
  width: 230px;
  height: 90px;
  border: 2px solid #ccc;
  border-radius: 5px;
  margin-inline: 25px;
  margin-block: 10px;
}
.method-box >input{
  margin-left: 15px;
  margin-right: 22px;
}
</style>
