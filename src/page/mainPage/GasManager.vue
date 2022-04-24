<script setup>
import {
  reactive, ref, defineEmits, computed, onMounted,
} from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { gasmeterGetAll, meterDelete, cardGetById } from '../../http/api';

const store = useStore();
const userType = computed(() => store.state.currentUser);
const username = computed(() => store.state.userName);
const cardids = reactive([]);
const router = useRouter();
const emits = defineEmits(['addTableTab']);
const meterAllList = reactive({ data: '' });

gasmeterGetAll().then((res) => {
  meterAllList.data = res;
});
onMounted(() => {
  if (userType.value === '2') {
    cardGetById(username.value).then((res) => {
      res.forEach((e) => {
        cardids.push(e.cardid);
      });
    });
    setTimeout(() => {
      fliterUser();
    }, 30);
  }
});

const fliterUser = () => {
  console.log('res:::', cardids);
  for (let i = 0; i < meterAllList.data.length; i++) {
    if (!cardids.includes(meterAllList.data[i].cardid)) {
      meterAllList.data.splice(i, 1);
      i--;
    }
  }
  /* meterAllList.data.forEach((e, index) => {
    if (!cardids.includes(e.cardid)) {
      meterAllList.data.splice(index, 1);
    }
  }); */
};

const meterid = ref();

const fliterData = () => {
  console.log(meterAllList.data);
  meterAllList.data.forEach((e) => {
    if (e.meterid === meterid.value) {
      meterAllList.data.splice(0, meterAllList.data.length, e);
    }
  });
};
const handleMeter = (id) => {
  emits('addTableTab', '抄表');
  router.push({
    path: 'MeterRead',
    query: {
      id,
    },
  });
};

const deleteMeter = (id) => {
  // eslint-disable-next-line no-undef
  ElMessageBox.confirm('此操作将永久删除该气表，是否继续？', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    meterDelete({ meterid: id }).then((res) => {
      if (res.status === 200) {
        // eslint-disable-next-line no-undef
        ElMessage.success('删除成功');
      }
    });
  });
};

</script>

<template>
  <el-card>
    <div class="gas-colco">
      <div class="meter-header-box">
      <h5>设备总览</h5>
      <el-form style="margin-left:20px; margin-top:-5px;">
        <el-form-item>
          <el-input v-model='meterid' style="width: 300px" placeholder="请输入气表ID"></el-input>
        <el-button @click="fliterData" style="width:70px;background: #87a0cf; color: #ffff; margin-left:10px;">查询</el-button>
        </el-form-item>
      </el-form>
      </div>
      <el-divider style="margin-top:0px;"></el-divider>
      <div class='gas-box' >
        <div class="gas-child-box" v-for="item in meterAllList.data" :key='item._id'>
          <svg-icon class="gas-icon" name="user"/>
        <p>气表ID: {{item.meterid}}</p>
        <p>气卡ID: {{item.cardid}}</p>
        <p>累计用量: {{item.cumulative}} 立方</p>
        <el-button style="width: 100px; margin-left: 60%;margin-top: 40px;" @click ='handleMeter(item.meterid)'>抄表</el-button>
        <el-button style="width: 100px; margin-left: 60%;margin-top: 6px;" @click ='deleteMeter(item.meterid)' v-if="userType !=='2'">删除</el-button>
        </div>
      </div>
    </div>
  </el-card>
</template>

<style lang='scss'>
.gas-box{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.gas-child-box{
  background-color: #FFA600;
  width: 300px;
  height: 200px;
  border-radius: 5px;
  margin-block: 10px;
  margin-inline: 14px;
}
.gas-icon{
  padding: 7px;
  width: 50px;
  height: 50px;
  color: rgb(238, 62, 62);
}
.gas-child-box>:nth-child(2){
  font-size: 1.7em;
  margin-block-start: -60px;
  margin-inline-end: 5px;
}
.gas-child-box>p{
  display: flex;
  color: aliceblue;
  justify-content: end;
  margin-inline-end: 7px;
}
.meter-header-box{
  display:flex;
  flex-flow: row nowrap;
}

</style>
