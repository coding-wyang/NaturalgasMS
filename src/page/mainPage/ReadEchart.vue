<script setup>
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { readRecordGet } from '../../http/api';

const route = useRoute();
const id = ref();
const value = ref('2022');
onMounted(() => {
  id.value = route.query.id;
  if (id.value) {
    getReadRecord();
  }
  // 这里是由于图表渲染快于父元素导致图表比例溢出，做的一个延缓操作
  setTimeout(() => {
    line();
  }, 1000);
});

const getReadRecord = () => {
  readRecordGet({
    data: {
      meterid: id.value,
      year: value.value,
    },
  }).then((res) => {
    console.log('res:::', res);
  });
};
const line = () => {
  const myChart = echarts.init(document.getElementById('readEcharts'));
  myChart.setOption({
    xAxis: {
      type: 'category',
      data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [1, 150, 230, 224, 218, 135, 147, 260],
        type: 'line',
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
      <h5>气表ID: {{id}}</h5>
      <div class="block">
        <el-date-picker
          v-model="value"
          type="year"
          placeholder="选择年份"
        />
      </div>
    <div class="echarts-box">
      <div id='readEcharts' :style="{ width: '100%', height: '300px' }">
      </div>
    </div>
  </el-card>
</template>

<style>
.block{
  margin-top:15px;
}
.el-input__prefix-inner{
  display: flex;
  align-items: center;
}
.el-input__suffix-inner{
  display: flex;
  align-items: center;
}
</style>
