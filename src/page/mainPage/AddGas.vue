<script setup>

import { reactive, ref } from 'vue';
import { gasTypeAdd } from '../../http/api';

const addCardForm = reactive({
  gastype: '',
  gasId: '',
  price: '',
});

const rules = reactive({
  gastype: [{
    required: true, message: '请输入燃气名称', trigger: 'blur',
  }],
  gasId: [{
    required: true, message: '请输入ID', trigger: 'blur',
  },
  {
    len: 7, message: '请输入7位数字', trigger: 'blur',
  }],
  price: [{
    required: true, message: '请设置价格', trigger: 'blur',
  }],
});
const ruleFormRef = ref();
const addGas = (val) => {
  if (!val) return;
  val.validate((valid) => {
    if (valid) {
      gasTypeAdd(addCardForm).then((res) => {
        console.log('11', res);
        if (res.status === 200) {
          // eslint-disable-next-line no-undef
          ElMessage.success('添加成功');
        }
      });
    } else {
      // eslint-disable-next-line no-undef
      ElMessage.error('数据有误');
    }
  });
};

</script>

<template>
  <el-card>
    <div class="add-card">
      <h4>添加燃气</h4>
      <el-divider/>
      <el-form label-width="100px" :model="addCardForm" :rules="rules" ref="ruleFormRef" style="width: 350px;">
          <el-form-item label="燃气种类" prop="gastype" >
            <el-input v-model="addCardForm.gastype" />
          </el-form-item>
          <el-form-item label="燃气ID" prop="gasId" >
            <el-input v-model="addCardForm.gasId" placeholder="请输入7位数字"/>
          </el-form-item>
          <el-form-item label="价格" prop="price">
            <el-input v-model="addCardForm.price" placeholder="元/立方"/>
          </el-form-item>
          <div class="addgas-button" >
            <el-button  type="primary" style="width:150px;" @click="addGas(ruleFormRef)">新建</el-button>
          </div>
        </el-form>
        </div>
  </el-card>
</template>

<style lang="scss">

</style>
