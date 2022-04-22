<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
import { gasGet, gasmeterGet, meterRead } from '../../http/api';

const route = useRoute();
const id = ref('');
const queryVisible = ref(false);
const lastCumulative = ref('');
const diff = ref();
const currentDate = ref();
const lastDate = ref();
onMounted(() => {
  getId();
  currentDate.value = getDate();
  if (id.value) {
    queryVisible.value = true;
    gasmeterGet(id.value).then((res) => {
      lastCumulative.value = res.cumulative;
      dateFormite(res.timer);
    });
    gasGet().then((res) => {
      res.json().then(({ meterData }) => {
        diff.value = meterData.diff;
      });
    });
  }
});

const dateFormite = (val) => {
  let arr = [];
  arr = val.split('-');
  console.log('asdasd', arr);
  const day = {
    year: arr[0],
    month: arr[1],
    date: arr[2],
  };
  lastDate.value = day;
};

const getDate = () => {
  const myDate = new Date();
  let day = '';
  switch (myDate.getDay()) {
    case 1:
      day = '星期一';
      break;
    case 2:
      day = '星期二';
      break;
    case 3:
      day = '星期三';
      break;
    case 4:
      day = '星期四';
      break;
    case 5:
      day = '星期五';
      break;
    case 6:
      day = '星期六';
      break;
    case 0:
      day = '星期天';
      break;
    default:
      day = '';
      break;
  }
  const res = {
    year: myDate.getFullYear(),
    month: myDate.getMonth() + 1,
    day,
    date: myDate.getDate(),
  };
  return res;
};

const getId = () => {
  id.value = route.query.id;
};

const handleRead = () => {
  meterRead({
    diff: diff.value,
    timer: currentDate.value,
    meterid: id.value,
    cumulative: lastCumulative.value + diff.value,
  }).then((res) => {
    if (res.status === 200) {
      ElMessage.success('抄表成功');
    } else if (res.status === 304) {
      ElMessage.warning('请勿重复抄表');
    }
  });
};
</script>

<template>
  <el-card>
    <div>
      <h5>抄表</h5>
      <el-divider/>
      <div v-if='!queryVisible'>暂无数据！请先在管理页面选择需要抄录的表</div>
      <div class='meter-box' v-if='queryVisible'>
        <p>气表ID: {{id}}</p>
        <div class="progress-box">
          <div class='last-box'>
            <div class='center-span-box'>
              <el-progress type="circle" :percentage="24">{{lastCumulative}}</el-progress>
              <div>{{`${lastDate.year}-${lastDate.month}-${lastDate.date}`}}</div>
            </div>
          </div>
            <div class="arrow"></div>
            <div class="arrow"></div>
            <div class="arrow"></div>
          <div class='curr-box'>
            <div class='center-span-box'>
              <el-progress type="circle" :percentage="30">{{lastCumulative + diff}}</el-progress>
              <div>{{`${currentDate.year}-${currentDate.month}-${currentDate.date}  ${currentDate.day}`}}</div>
            </div>
          </div>
        </div>
        <el-button type='success' style="margin-left:50%; transform: translate(-50%);" @click='handleRead'>抄表</el-button>
      </div>
    </div>
  </el-card>
</template>

<style >
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
  color: #b2cf87;
}
.meter-box>p{
  font-weight: 550;
  margin-block: 10px;
  margin-inline-start: 13px;
}
.progress-box{
  display: flex;
  height: 300px;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
}
.last-box{
  display: flex;
  justify-content: center;
  flex-grow: 1;
}
.center-span-box{
  display: flex;
  flex-flow: column nowrap;
}
.center-span-box>div{
  margin-top: 20px;
  text-align: center;
}
.curr-box{
  display: flex;
  justify-content: center;
  flex-grow:1
}
.arrow {
  flex-shrink: 0;
  box-sizing: border-box;
  width: 40px;
  height: 40px;
  border: solid red;
  border-width: 0 4px 4px 0;
  transform: rotate(-45deg);
}

</style>
