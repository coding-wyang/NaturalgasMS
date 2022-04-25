<script setup>
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { readRecordGet, payRecordQuery } from '../../http/api';

const route = useRoute();
const id = ref();
const value = ref('2022');
const curDate = new Date();
const showType = ref('');
onMounted(() => {
  if (route.query.id) {
    showType.value = 'meter';
    id.value = route.query.id;
    getReadRecord(value.value);
  } else if (route.query.name) {
    showType.value = 'pay';
    id.value = route.query.name;
    getPayRecord(String(curDate.getFullYear()));
  }
  // 这里是由于图表渲染快于父元素导致图表比例溢出，做的一个延缓操作
  setTimeout(() => {
    line();
  }, 100);
});

const chartData = ref();
const getPayRecord = (val) => {
  console.log('val', val);
  payRecordQuery({ name: id.value }).then((res) => {
    console.log('res', res);
    const save = res.reduce((p, q) => {
      if (q.timer.slice(0, 4) === val) {
        const arr = q.timer.split('-');
        const index = arr[1];
        let newvalue = 0;
        newvalue = p.has(index) ? p.get(index) + q.payment : q.payment;
        p.set(index, newvalue);
      }
      return p;
    }, new Map());
    console.log(save);
    // eslint-disable-next-line no-shadow
    const obj = Array.from(save).reduce((obj, [key, value]) => Object.assign(obj, { [key]: value }), {});
    chartData.value = obj;
    console.log('chartData.value', chartData.value, save);
  });
};
const getReadRecord = (val) => {
  readRecordGet({
    data: {
      meterid: id.value,
      year: val,
    },
  }).then((res) => {
    chartData.value = res;
  });
};
const line = () => {
  const data = new Array(12).fill(0);
  const indexArr = Object.keys(chartData.value);
  indexArr.forEach((element) => {
    const index = Number(element) - 1;
    data[index] = chartData.value[element];
  });
  const myChart = echarts.init(document.getElementById('readEcharts'));
  myChart.setOption({
    title: {
      text: '统计/月',
      textStyle: {
        fontSize: 14,
        fontWeight: 'bolder',
        color: '#333', // 主标题文字颜色
      },
    },
    tooltip: {
      trigger: 'axis',
      confine: true,

    },
    xAxis: {
      type: 'category',
      name: '时间(月)',
      data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    },
    yAxis: {
      type: 'value',
      name: '月用量(立方)',
    },
    series: [
      {
        data,
        type: 'line',
      },
    ],
  });
  window.onresize = function () {
    // 自适应大小, 不用的话不会自适应大小。
    myChart.resize();
  };
};

const changeYear = (val) => {
  if (route.query.id) {
    getReadRecord(String(val.getFullYear()));
  } else if (route.query.name) {
    console.log('str', String(val.getFullYear()));
    getPayRecord(String(val.getFullYear()));
  }
  setTimeout(() => {
    line();
  }, 100);
};

</script>

<template>
  <el-card>
      <h5 v-if="showType==='meter'">气表使用记录 ID: {{id}}</h5>
      <h5 v-if="showType==='pay'">个人气卡缴费: {{id}}</h5>
      <el-divider><svg-icon name='star'/></el-divider>
      <div class="block">
        <el-date-picker
          v-model="value"
          type="year"
          placeholder="选择年份"
          @change='changeYear'
          format='YYYY'
        />
      </div>
    <div class="echarts-box">
      <div id='readEcharts' :style="{ width: '100%', height: '300px' }" style="margin-top:25px; height:500px;">
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
