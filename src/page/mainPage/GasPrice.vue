<script setup>

import { onMounted, ref } from 'vue';
/* import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons-vue'; */
import { gastypeGetAll, gasUpdate, gastypeDelete } from '../../http/api';

const tableData = ref();
onMounted(() => {
  getGastype();
});

const getGastype = () => {
  gastypeGetAll().then((res) => {
    tableData.value = res.slice(0, 6);
  });
};
const gasid = ref();
const fliterData = () => {
  tableData.value.forEach((e) => {
    if (e.gasid === gasid.value) {
      tableData.value.splice(0, tableData.value.length, e);
    }
  });
};

const handleOk = () => {
  visible.value = false;
  gasUpdate({ gasid: currGasId.value, price: newPrice.value }).then((res) => {
    if (res.status === 200) {
      // eslint-disable-next-line no-undef
      ElMessage.success('更新成功');
      getGastype();
    } else {
      // eslint-disable-next-line no-undef
      ElMessage.error('更新失败');
    }
  });
};

const visible = ref(false);
const currGasId = ref();
const oldPrice = ref();
const newPrice = ref();
const editPrice = (id, price) => {
  visible.value = true;
  oldPrice.value = price;
  currGasId.value = id;
};
const deletePrice = (id) => {
  // eslint-disable-next-line no-undef
  ElMessageBox.confirm('此操作将永久删除该燃气，是否继续？', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    gastypeDelete({ gasid: id }).then((res) => {
      console.log('res', res);
      if (res.status === 200) {
        // eslint-disable-next-line no-undef
        ElMessage.success('删除成功');
      } else if (res.status === 400) {
        // eslint-disable-next-line no-undef
        ElMessage.error('删除失败，请先解绑所有使用该燃气的气表');
      }
    });
  });
};
</script>

<template>
  <el-card>
    <h5>燃气管理</h5>
    <el-form style="margin-left: 80px; margin-top: -23px">
      <el-form-item>
        <el-input
          v-model="gasid"
          style="width: 300px"
          placeholder="请输入气表ID"
        ></el-input>
        <el-button
          @click="fliterData"
          style="
            width: 70px;
            background: #87a0cf;
            color: #ffff;
            margin-left: 10px;
          "
          >查询</el-button
        >
      </el-form-item>
    </el-form>
    <el-divider><svg-icon name='star'/></el-divider>
    <div class="gas-ma-box">
      <div
        v-for="item in tableData"
        :key="item.gasid"
        class='card-out-box'>
            <el-card style='width:250px'>
              <div class='card-info-in'>
                <p>{{`${item.gastype}--${item.gasid}`}}</p>
                <div class='price-box'>
                  <span>{{item.price.$numberDecimal}}</span>
                  <span>元/立方</span>
                </div>
              </div>
            </el-card>
          <el-dialog
            v-model="visible"
            title="Basic Modal"
            width='30%'
            @closed="newPrice =''"
          >
            <el-form label-width="100px">
              <el-form-item label="现价">
                <el-input v-model="oldPrice"></el-input>
              </el-form-item>
              <el-form-item label="调整后价格">
                <el-input v-model="newPrice"></el-input>
              </el-form-item>
              <el-button type='success' style='margin-left:45%'  @click="handleOk">确定</el-button>
            </el-form>
          </el-dialog>
          <div class='el-button-boxx'>
            <el-button @click="editPrice(item.gasid,item.price.$numberDecimal)"  type="dashed">调整价格</el-button>
            <el-button
              @click="deletePrice(item.gasid)"
              type="error"
              style='color:#ffff'
              >删除</el-button>
          </div>
      </div>
    </div>
  </el-card>
</template>

<style lang='scss'>
.gas-ma-box {
  display: flex;
  flex: 1;
  flex-wrap: wrap;
}
.card-out-box{
  display: flex;
  flex-flow: row nowrap;
  background: #ececec;
  padding: 20px;
  width: 350px;
  height: 130px;
  margin-inline: 50px;
  margin-block: 20px;
}
.card-info-in{
  display: flex;
  flex-flow: column nowrap;
}

.card-info-in>:nth-child(1){
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-size: 18px;
  color: rgb(68, 68, 68);
}
.price-box{
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin-top: 10px;
}

.price-box>:nth-child(1){
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-size: 36px;
  color: #3f8600;
}
.price-box>:nth-child(2){
  color: #3f8600;
  font-weight: 800;
  font-size: 14px;
  margin-left: 7px;
}
.el-button-boxx{
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  align-items: center;
}
.el-button-boxx>:nth-child(1){
  background: #52af01;
  color: #ffff;
  margin-left: 10px;
}
</style>
