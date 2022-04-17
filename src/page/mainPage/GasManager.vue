<script setup>
import { reactive, defineEmits } from 'vue';
import { useRouter } from 'vue-router';
import { gasmeterGetAll } from '../../http/api';

const router = useRouter();
const emits = defineEmits(['addTableTab']);
const meterAllList = reactive({ data: '' });

gasmeterGetAll().then((res) => {
  meterAllList.data = res;
});
const handleMeter = (id) => {
  emits('addTableTab', '抄表');
  router.push({
    path: 'MeterRead',
    query: {
      id,
    },
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
          <el-input style="width: 300px" placeholder="请输入气表ID"></el-input>
        <el-button style="width:70px;background: #87a0cf; color: #ffff; margin-left:10px;">查询</el-button>
        </el-form-item>
      </el-form>
      </div>
      <el-divider style="margin-top:0px;"></el-divider>
      <div class='gas-box' >
        <div class="gas-child-box" v-for="item in meterAllList.data" :key='item._id'>
          <svg-icon class="gas-icon" name="user"/>
        <p>气表ID: {{item.meterid}}</p>
        <p>气卡ID: {{item.cardid}}</p>
        <p>余量: {{item.surplus}} 立方</p>
        <p>累计用量: {{item.cumulative}} 立方</p>
        <el-button style="width: 100px; margin-left: 60%;margin-top: 50px;" @click ='handleMeter(item.meterid)'>抄表</el-button>
        </div>
      </div>
    </div>
  </el-card>
</template>

<style scoped>
.gas-box{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.gas-child-box{
  background-color: #8bdbba;
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
  color: rgb(216, 216, 216);
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
