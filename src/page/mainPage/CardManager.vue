<script setup>
import { onMounted, reactive } from 'vue';
import { gascardGet } from '../../http/api';

onMounted(() => {
  getCardinfo();
});
const cardInfo = reactive({ data: '' });
/* card的数量统计 */
const count = reactive({
  cardCount: 0,
  normalCount: 0,
  arrearsCount: 0,
  unboundCount: 0,
});
/* card的信息获取 */
const getCardinfo = () => {
  gascardGet().then((res) => {
    cardInfo.data = res;
    cardInfo.data.forEach((element) => {
      if (element.username === '未绑定') {
        count.unboundCount++;
      }
      if (element.state === 'normal') {
        count.normalCount++;
      } else {
        count.arrearsCount++;
      }
      count.cardCount++;
    });
  });
};
</script>

<template>
  <el-card>
    <div class="gascard-box">
      <div class="card-count">
          <div>
            <svg-icon name='star'></svg-icon>
            <h4>气卡总览</h4>
            </div>
            <div>
            <p>{{count.cardCount}}</p>
            <span>气卡数</span>
          </div>
          <div>
            <p>{{count.normalCount}}</p>
            <span>正常</span>
          </div>
          <div>
            <p>{{count.arrearsCount}}</p>
            <span>欠费</span>
          </div>
          <div>
            <p>{{count.unboundCount}}</p>
            <span>未绑定</span>
          </div>
      </div>
      <div class="gascardinfo">
    <h5>气卡信息预览</h5>
    <el-divider style="margin-block: 10px;"><svg-icon name='star'/></el-divider>
    <div class="info-box">
      <div class="info" v-for="(item) in cardInfo.data" :key='item.index' >
        <svg-icon class="info-icon" name="user"/>
        <p>{{item.name}}</p>
        <p>ID: {{item.cardid}}</p>
        <p>余额: {{Number(item.balance.$numberDecimal).toFixed(2)}} 元</p>
        <p>累计用量: {{item.cumulative}} 立方</p>
      </div>
    </div>
    </div>
    </div>
  </el-card>
</template>

<style lang="scss">
.gascard-box{
  display: flex;
  flex-direction: column;
  justify-content: start;
}
.card-count{
  display: flex;
  flex-wrap: wrap;
  background-color: rgb(255, 255, 255);
  width: 394px;
  height: 200px;
  border-radius: 7px;
  margin-block: 10px;
  margin-inline: 14px;
  box-shadow: 5px 5px 23px rgb(236, 236, 236), -5px -5px 23px rgb(233, 233, 233),-5px 5px 23px rgb(235, 235, 235), 5px -5px 23px rgb(236, 236, 236) ;
}
/* svg 及用户信息上半部分的盒子 */
.card-count >:nth-child(1){
  width: 394px;
  display: flex;
  justify-content: center;
  margin-block-start: 25px;
  border-bottom: solid 1px rgb(233, 233, 233);
}

/* 用户数 正常 及欠费 */
.card-count >:nth-child(2){
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 109px;
  border-inline-end: solid 1px rgb(233, 233, 233);
}
.card-count >:nth-child(3){
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 94px;
  border-inline-end: solid 1px rgb(236, 236, 236);
}
.card-count >:nth-child(4){
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: red;
  border-inline-end: solid 1px rgb(236, 236, 236);
  width: 93px;
}
.card-count >:nth-child(5){
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: red;
  width: 93px;
}
.card-count>div>p{
  font-size: 35px;
}

.card-count >:nth-child(1)>:nth-child(1){
  color: #73cfc0;
  font-size: 2.2em;
  margin-inline: 30px;
  margin-inline-start: -85px;
}
/* 用户信息h4 */
.card-count >:nth-child(1)>h4{
  font-size: 25px;
}

.gascardinfo{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: start;
}
.info-box{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.info{
  background-color: #8bdbba;
  width: 300px;
  height: 160px;
  border-radius: 5px;
  margin-block: 10px;
  margin-inline: 14px;
}
.info-icon{
  padding: 7px;
  width: 50px;
  height: 50px;
  color: rgb(216, 216, 216);
}
.info>:nth-child(2){
  font-size: 1.7em;
  margin-block-start: -50px;
  margin-inline-end: 5px;
}
.info>p{
  display: flex;
  color: aliceblue;
  justify-content: end;
  margin-inline-end: 7px;
}

.el-main::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.el-main::-webkit-scrollbar-thumb {
  border-radius: 3px;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  background-color: #c3c3c3;
}
.el-main::-webkit-scrollbar-track {
  background-color: transparent;
}
</style>
