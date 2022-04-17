<script setup>
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { userAdd } from '../../http/api';

/* 添加表单 */
const addForm = reactive({
  user: '',
  pass: '',
  type: '', // 权限
});

/* 校验规则 */
const rules = reactive({
  user: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  pass: [{ required: true, message: '请输入密码', trigger: 'blur' },
    {
      min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur',
    }],
});

/* el-select 的参数 */
const value = ref('');
const options = [
  {
    value: '0',
    label: '0',
  },
  {
    value: '1',
    label: '1',
  },
  {
    value: '2',
    label: '2',
  },
];

/* select value改变时更改选中权限 */
const typeChange = (val) => {
  addForm.type = val;
};
/* 添加用户 */
const addUser = (val) => {
  if (!val) return;
  val.validate((valid) => {
    if (valid) {
      userAdd(addForm).then((res) => {
        if (res.status === 200) {
          ElMessage.success('添加成功');
        }
      });
    } else {
      console.log('error submit!');
    }
  });
};
</script>

<template>
  <el-card>
    <div class="add-user">
      <h4>添加用户</h4>
      <el-form label-width="90px" :model="addForm" :rules="rules" ref="ruleFormRef"  style="width: 250px;">
          <el-form-item label="账号" prop="user" >
            <el-input v-model="addForm.user" />
          </el-form-item>
          <el-form-item label="密码" prop="pass" >
            <el-input v-model="addForm.pass"/>
          </el-form-item>
          <el-form-item label="账号权限" prop="type" >
            <el-select v-model="value" placeholder="请选择账号类型" size="normal" @change="typeChange">
                  <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  >
                </el-option>
              </el-select>
          </el-form-item>
          <div class="login-button">
            <el-button  type="primary" style="width:150px;" @click="addUser(ruleFormRef)">确认添加</el-button>
          </div>
        </el-form>
    </div>
  </el-card>
</template>
