<script setup>
import { onMounted, reactive, ref } from 'vue';
import * as echarts from 'echarts';
import { userInfoGetById, userUpdate } from '../../http/api';

const username = sessionStorage.getItem('userName');
const sessionType = sessionStorage.getItem('userType');

const isEdit = ref(false);
const imgUrl = reactive(['https://avatars.githubusercontent.com/u/63920399?s=200&v=4', 'https://avatars.githubusercontent.com/u/29560987?v=4', 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png']);
const userData = reactive({ data: '' });

const meterData = ref();
const payData = ref();
onMounted(() => {
  userInfoGetById({ username }).then((res) => {
    console.log('res', res);
    userData.data = res.userData;
    meterData.value = res.meterRead;
    payData.value = res.payRecord;
  });
  setTimeout(() => {
    line();
  }, 100);
});

const userUpda = () => {
  userUpdate(userData.data).then((res) => {
    console.log('res', res);
    if (res.status === 200) {
      // eslint-disable-next-line no-undef
      ElMessage.success('修改成功');
      isEdit.value = false;
    } else {
      // eslint-disable-next-line no-undef
      ElMessage.error('修改失败');
    }
  });
};

const colors = ['#5470C6', '#91CC75', '#EE6666'];
const line = () => {
  const dataMeter = new Array(12).fill(0);
  const dataPay = new Array(12).fill(0);
  const indexArr = Object.keys(meterData.value);
  indexArr.forEach((element) => {
    const index = Number(element) - 1;
    dataMeter[index] = meterData.value[element];
  });
  const indexPay = Object.keys(payData.value);
  indexPay.forEach((element) => {
    const index = Number(element) - 1;
    dataPay[index] = payData.value[element];
  });
  const myChart = echarts.init(document.getElementById('userInfoEchart'));
  myChart.setOption({
    color: colors,
    title: {
      text: '本年度燃气缴费 / 燃气用量',
      subtext: `ID ${username}`,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    grid: {
      right: '20%',
    },
    toolbox: {
      feature: {
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    legend: {
      data: ['缴费', '燃气用量'],
    },
    xAxis: [
      {
        type: 'category',
        axisTick: {
          alignWithLabel: true,
        },
        // prettier-ignore
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: '缴费',
        position: 'right',
        alignTicks: true,
        axisLine: {
          show: true,
          lineStyle: {
            color: colors[0],
          },
        },
        axisLabel: {
          formatter: '{value} 元',
        },
      },
      {
        type: 'value',
        name: '燃气用量',
        position: 'left',
        alignTicks: true,
        axisLine: {
          show: true,
          lineStyle: {
            color: colors[1],
          },
        },
        axisLabel: {
          formatter: '{value} 立方',
        },
      },
    ],
    series: [
      {
        name: '缴费',
        type: 'bar',
        data: dataPay,
      },
      {
        name: '燃气用量',
        type: 'bar',
        yAxisIndex: 1,
        data: dataMeter,
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
    <div class='user-messaage-box'>
      <el-card style="width:600px">
      <div class='avator-box-ss'>
        <div class='img-box-ss'>
          <el-avatar
          size="large"
              :src=imgUrl[Number(sessionType)]
              />
        </div>
        <div class='info-box-style' v-show='!isEdit'>
          <el-divider style='margin:0'/>
          <p>姓名: {{userData.data.name}}</p>
          <el-divider style='margin:0'/>
          <p>ID: {{userData.data.username}}</p>
          <el-divider style='margin:0'/>
          <p>电话: {{userData.data.phone}}</p>
          <el-divider style='margin:0'/>
          <p>邮箱: {{userData.data.email}}</p>
          <el-divider style='margin:0'/>
          <el-tooltip
            class="box-item"
            effect="dark"
            content="点击编辑"
            placement="right-start"
          >
          <div class='icon-svg-star' @click="isEdit = true"><svg-icon name='star'/></div>
          </el-tooltip>
        </div>
        <div class='info-box-style' v-show='isEdit'>
          <el-divider style='margin:0'/>
          <p>姓名: <el-input v-model='userData.data.name' style='width:180px;'></el-input></p>
          <el-divider style='margin:0'/>
          <p>ID: <el-input v-model='userData.data.username' style='width:180px'></el-input></p>
          <el-divider style='margin:0'/>
          <p>电话: <el-input v-model='userData.data.phone' style='width:180px'></el-input></p>
          <el-divider style='margin:0'/>
          <p>邮箱: <el-input v-model='userData.data.email' style='width:180px'></el-input></p>
          <el-divider style='margin:0'/>
          <el-tooltip
            class="box-item"
            effect="dark"
            content="点击确认"
            placement="right-start"
          >
          <div class='icon-svg-star' @click="userUpda"><svg-icon name='star'/></div>
          </el-tooltip>
        </div>
    </div>
    </el-card>
    <h5>燃气用量统计</h5>
    <el-divider><svg-icon name='star'/></el-divider>
    <div id='userInfoEchart' :style="{ width: '100%', height: '400px' }"></div>
    </div>
  </el-card>
</template>

<style>
h5{
  margin-top: 20px;
}

.el-input__inner{
  height: 23px;
}
.user-messaage-box{
  height: 720px;
}
.avator-box-ss{
  display: flex;
  flex-flow:row nowrap;
  height: 250px;
}
.img-box-ss{
  width: 80px;
  height: 80px;
}
.img-box-ss>:nth-child(1){
  position: relative;
  left: 20px;
  top: 20px;
  width: 80px;
  height: 80px;
}
.info-box-style{
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  left: 70px;
  top: 30px;
}
.info-box-style>p{
  padding-inline: 10px;
  margin-block: 10px;
  border-inline: solid 1px #ccc;
  height:23px;
  width:250px;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
.icon-svg-star{
  position: absolute;
  left: 320px;
  top: -30px;
  cursor:pointer;
}
.icon-svg-star:hover{
  transform: scale(1.5);
}

</style>
