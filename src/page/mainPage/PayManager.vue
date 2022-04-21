<script setup>
import * as echarts from 'echarts';
import { onMounted, computed, reactive } from 'vue';
import { useStore } from 'vuex';
import { payRecordQuery } from '../../http/api';

const store = useStore();

const name = computed(() => store.state.name);
const data = reactive([]);
const monthData = reactive([]);
const valueData = reactive([]);
onMounted(() => {
  if (name.value) {
    payRecordQuery({ name: name.value }).then((res) => {
      const arr = [];
      const valueArr = [];
      res.forEach((element) => {
        const rel = element.timer.split('-');
        if (rel[0] === '2022' && !monthData.includes(rel[1])) {
          const save = res.reduce((p, q) => {
            const month = q.timer.split('-');
            console.log('month', month);
            // eslint-disable-next-line no-param-reassign
            if (month[1] === rel[1]) { p += q.payment; }
            return p;
          }, 0);
          valueData.push(save);
          monthData.push(rel[1]);
        }
        if (!arr.includes(element.cardid)) {
          const save = res.reduce((p, q) => {
            // eslint-disable-next-line no-param-reassign
            if (q.cardid === element.cardid) { p += q.payment; }
            return p;
          }, 0);
          valueArr.push(save);
          arr.push(element.cardid);
        }
      });
      arr.forEach((e, index) => {
        data.push({ value: valueArr[index], name: `卡号 ${e}` });
      });
    });
  }
  // 这里是由于图表渲染快于父元素导致图表比例溢出，做的一个延缓操作
  setTimeout(() => {
    line();
    pie();
  }, 100);
});

const line = () => {
  const myChart = echarts.init(document.getElementById('qushiLine'));
  myChart.setOption({
    title: {
      text: '今年个人天然气缴费趋势(实时)',
      x: 'center',
      textStyle: {
        fontSize: 18,
        fontWeight: 'bolder',
        color: '#333', // 主标题文字颜色
      },
    },
    xAxis: {
      type: 'category',
      data: monthData,
      name: '时间(月)',
    },
    yAxis: {
      type: 'value',
      name: '当月累计缴费(元)',
    },
    series: [
      {
        data: valueData,
        type: 'line',
        smooth: true,
      },
    ],
  });
};
const pie = () => {
  const myChart = echarts.init(document.getElementById('fenbuBing'));
  myChart.setOption({
    title: {
      text: '个人用户缴费情况(实时)',
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
    <h5>个人信息</h5>
    <el-divider/>
    <div class="pay-box">
      <div class="left-top-box">
        <h6>缴费分布</h6>
        <div id='fenbuBing' :style="{ width: '100%', height: '300px' }"></div>
      </div>
      <div class='bottom-box'>
        <h6>缴费趋势</h6>
        <el-divider/>
        <div id='qushiLine' :style="{ width: '100%', height: '300px' }"></div>
      </div>
    </div>
  </el-card>
</template>
