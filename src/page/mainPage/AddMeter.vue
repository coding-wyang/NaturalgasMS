<script setup>
import { ElMessage } from 'element-plus';
import { reactive, ref, onMounted } from 'vue';
import { gastypeGetAll, gasmeterAdd } from '../../http/api';

onMounted(() => {
  gastypeGetAll().then((res) => {
    res.forEach((e) => {
      ruleForm.push({ value: e.gastype });
    });
  });
});

const addMeterForm = reactive({
  meterId: '',
  cardId: '',
  gastype: '',
});

const rules = reactive({
  cardId: [{
    required: true, message: '请输入燃气名称', trigger: 'blur',
  }],
  meterId: [{
    required: true, message: '请输入ID', trigger: 'blur',
  },
  {
    len: 5, message: '请输入5位数字', trigger: 'blur',
  }],
});
const ruleFormRef = ref();
const ruleForm = reactive([]);
const addMeter = (val) => {
  if (!val) return;
  val.validate((valid) => {
    if (valid) {
      gasmeterAdd(addMeterForm).then((res) => {
        if (res.status === 200) {
          ElMessage.success('添加成功');
        }
      });
    } else {
      ElMessage.error('数据有误');
    }
  });
};

</script>

<template>
  <el-card>
    <div class="add-card">
      <h4>添加气表</h4>
      <el-divider/>
      <el-form label-width="100px" :model="addMeterForm" :rules="rules" ref="ruleFormRef" style="width: 350px;">
          <el-form-item label="绑定卡号" prop="cardId" >
            <el-input v-model="addMeterForm.cardId" />
          </el-form-item>
          <el-form-item label="气表ID" prop="meterId" >
            <el-input v-model="addMeterForm.meterId"/>
          </el-form-item>
          <el-form-item label="燃气种类" prop="meterId" >
            <el-select v-model="addMeterForm.gastype" placeholder="请选择">
              <el-option
                v-for="item in ruleForm"
                :key="item.value"
                :label="item.value"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <div class="login-button">
            <el-button  type="primary" style="width:150px;" @click="addMeter(ruleFormRef)">新建</el-button>
          </div>
        </el-form>
        </div>
  </el-card>
</template>

<style lang="scss">
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
</style>
