<script setup>
import { onMounted, ref } from 'vue';
/* import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons-vue'; */
import { gastypeGetAll, gasUpdate } from '../../http/api';

const tableData = ref();
onMounted(() => {
  gastypeGetAll().then((res) => {
    tableData.value = res.slice(0, 6);
  });
});
const gasid = ref();
const fliterData = () => {
  tableData.value.forEach((e) => {
    if (e.gasid === gasid.value) {
      tableData.value.splice(0, tableData.value.length, e);
    }
  });
};

const handleOk = (e) => {
  gasUpdate({ gasid: e, price: newPrice.value }).then((res) => {
    console.log('res', res);
  });
  visible.value = false;
};

const visible = ref(false);
const newPrice = ref();
const editPrice = () => {
  visible.value = true;
};
const deletePrice = () => {

};
</script>

<template>
<el-card>
  <h5>燃气管理</h5>
  <el-form style="margin-left:80px; margin-top:-30px;">
        <el-form-item>
          <el-input v-model='gasid' style="width: 300px" placeholder="请输入气表ID"></el-input>
        <el-button @click="fliterData" style="width:70px;background: #87a0cf; color: #ffff; margin-left:10px;">查询</el-button>
        </el-form-item>
      </el-form>
  <el-divider/>
  <div class='gas-ma-box'>
    <div v-for='item in tableData' :key='item.gasid' style="background: #ececec; padding: 20px; width:400px;margin-inline:50px;margin-block: 20px;">
      <a-row class='row-box' :gutter="16">
        <a-col :span="18">
          <a-card>
            <a-statistic
              :title='`${item.gastype}-${item.gasid}`'
              :value="item.price.$numberDecimal"
              :precision="2"
              suffix="元/立方"
              :value-style="{ color: '#3f8600' }"
              style="margin-right: 50px"
            >
              <template #prefix>
                <arrow-up-outlined />
              </template>
            </a-statistic>
          </a-card>
        </a-col>
        <a-modal v-model:visible="visible" title="Basic Modal" @ok="handleOk(item.gasid)">
          <el-form label-width="100px">
            <el-form-item label="现价">
              <el-input v-model='item.price.$numberDecimal'></el-input>
            </el-form-item>
            <el-form-item label="调整后价格">
              <el-input v-model='newPrice'></el-input>
            </el-form-item>
          </el-form>
        </a-modal>
          <a-button @click='editPrice'  type="dashed" >调整价格</a-button>
          <a-button @click='deletePrice' style='position:relative;left:293px;bottom:70px;' type="dashed" >删除</a-button>
    </a-row>
  </div>
  </div>
</el-card>
</template>

.<style scoped>
.gas-ma-box{
  display: flex;
  flex:1;
  flex-wrap: wrap;
}
</style>
