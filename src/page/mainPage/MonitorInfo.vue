<script setup>
import { onMounted, reactive } from 'vue';
import { monitorPost, gasGet } from '../../http/api';

onMounted(() => {
  /* gasInfoGet(); */
  gasMockGet();
});

/* 获取mock.js的气体数据 */
const gasMockGet = () => {
  gasGet().then((res) => {
    res.json().then(({ data }) => {
      /* updateSave.splice(0, 1, { data }); */
      gasInfo[0].value = data.PH;
      gasInfo[1].value = data.Calorificvalue;
      gasInfo[2].value = data.wdp;
      gasInfo[3].value = data.hdp;
      gasInfo[4].value = data.methane;
      gasInfo[5].value = data.sulfur;
      monitorPost(data).then((ret) => {
        console.log('postres:::', ret);
      });
    });
  }).catch((err) => {
    console.log(err);
  });
};
/* 气体监测信息 */
const gasInfo = reactive([
  { name: '酸碱度', value: Number }, // 酸碱度
  { name: '发热值', value: Number }, // 发热值
  { name: '含水量', value: Number }, // 含水量
  { name: '烃露点', value: Number }, // 烃露点
  { name: '甲烷', value: Number }, //  甲烷
  { name: '总硫', value: Number }, //  总硫
]);
/* 统计指标信息 */
const equipment = reactive([
  { name: '设备总数', value: 26 }, // 设备总数
]);

/* 雪碧图name */
const iconSave = reactive([
  'fangkuai',
  'xiaohua',
  'towel',
  'jiayou',
  'gas',
  'hand',
]);
/* 获取监测信息 */

</script>

<template>
<div class="monitor-page">
  <el-card>
    <div class="monitor-box">
    <h5>燃气质量</h5>
    <el-divider style="margin-block: 10px;"></el-divider>
    <div class="cardinfo-box">
      <div class="cardinfo" v-for="(item, index) in gasInfo" :key='item.index' >
        <svg-icon class="card-icon" :name="iconSave[index]"/>
        <p>{{item.value}}</p>
        <p>{{item.name}}</p>
      </div>
    </div>
    <h5>统计指标</h5>
    <el-divider style="margin-block: 10px;"></el-divider>
    <div class="statistical-box">
      <div class="statistical" v-for="(item, index) in equipment" :key="item.index">
        <svg-icon class="card-icon" :name="iconSave[index]"/>
        <p>{{item.value}}</p>
        <p>{{item.name}}</p>
      </div>
    </div>
    </div>
  </el-card>
</div>
</template>

<style lang="scss">
.monitor-page{

}
.cardinfo-box{
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
}
.cardinfo{
  background-color: #96c24e;
  width: 200px;
  height: 80px;
  border-radius: 5px;
  margin-block: 10px;
  margin-inline: 14px;
}
.card-icon{
  padding: 7px;
  width: 40px;
  height: 40px;
  color: rgb(216, 216, 216);
}
.cardinfo>:nth-child(2){
  color: aliceblue;
  font-size: 1.7em;
  display: flex;
  justify-content: end;
  margin-block-start: -50px;
  margin-inline-end: 5px;
}
.cardinfo>:nth-child(3){
  display: flex;
  color: aliceblue;
  justify-content: end;
  margin-inline-end: 7px;
}
.statistical-box{
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
}
.statistical{
  background-color: #627df5;
  width: 200px;
  height: 80px;
  border-radius: 5px;
  margin-block: 10px;
  margin-inline: 14px;
}
.statistical>:nth-child(2){
  color: aliceblue;
  font-size: 1.7em;
  display: flex;
  justify-content: end;
  margin-block-start: -50px;
  margin-inline-end: 5px;
}
.statistical>:nth-child(3){
  display: flex;
  color: aliceblue;
  justify-content: end;
  margin-inline-end: 7px;
}
</style>
