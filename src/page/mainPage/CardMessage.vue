<script setup>
import {
  ref, onMounted, computed, reactive,
} from 'vue';
import { useStore } from 'vuex';
import * as echarts from 'echarts';
import { cardGetById } from '../../http/api';

const store = useStore();

const cardList = ref();
const username = computed(() => store.state.userName);
const name = computed(() => store.state.name);
const data = reactive([]);
onMounted(() => {
  cardGetById(username.value).then((res) => {
    cardList.value = res;
    res.forEach((element) => {
      data.push({ value: Number(element.balance.$numberDecimal), name: `卡号:${element.cardid}` });
    });
  });
  setTimeout(() => {
    pie();
  }, 100);
});

const pie = () => {
  const myChart = echarts.init(document.getElementById('fenbuBing'));
  myChart.setOption({
    title: {
      text: '个人用户气卡余额(实时)',
      subtext: '单位/元',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: '缴费信息',
        type: 'pie',
        radius: '50%',
        data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  });
  window.onresize = function () {
    // 自适应大小, 不用的话不会自适应大小。
    myChart.resize();
  };
};

</script>

<template>
  <el-card>
    <h5>用户：{{name}}</h5>
    <div class="card-top-box">
        <div id='fenbuBing' :style="{ width: '100%', height: '300px' }"></div>
      </div>
      <h5>气卡预览</h5>
      <el-divider/>
    <div class="card-message-box">
      <div class="card-info-box">
        <div class="message-info" v-for="(item) in cardList" :key='item.index' >
          <svg-icon class="message-info-icon" name="user"/>
          <p>{{item.name}}</p>
          <p>ID: {{item.cardid}}</p>
          <p>余额: {{Number(item.balance.$numberDecimal).toFixed(2)}} 元</p>
          <p>累计用量: {{item.cumulative}} 立方</p>
        </div>
      </div>
    </div>
  </el-card>
</template>

<style scoped>
.card-info-box{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.message-info{
  background-color: #FE6470;
  width: 300px;
  height: 160px;
  border-radius: 5px;
  margin-block: 10px;
  margin-inline: 14px;
}
.message-info-icon{
  padding: 7px;
  width: 50px;
  height: 50px;
  color: rgb(231, 233, 94);
}
.message-info>:nth-child(2){
  font-size: 1.7em;
  margin-block-start: -60px;
  margin-inline-end: 5px;
}
.message-info>p{
  display: flex;
  color: aliceblue;
  justify-content: end;
  margin-inline-end: 7px;
}
</style>
