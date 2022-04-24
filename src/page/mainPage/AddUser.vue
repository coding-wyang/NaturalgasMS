<script setup>
import {
  reactive, ref, onMounted, computed,
} from 'vue';
import { useStore } from 'vuex';
import { userAdd } from '../../http/api';

const store = useStore();
const userType = computed(() => store.state.currentUser);

onMounted(() => {
  if (userType.value === '1') {
    options.splice(0, 1);
    console.log('ss', options);
  }
});
/* 添加表单 */
const addForm = reactive({
  user: '',
  pass: '',
  type: '', // 权限
  name: '',
  email: '',
  phone: '',
});

/* 校验规则 */
const rules = reactive({
  user: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  pass: [{ required: true, message: '请输入密码', trigger: 'blur' },
    {
      min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur',
    }],
  type: [{ required: true, message: '请选择身份', trigger: 'blur' }],
  name: [{ required: true, message: '请输入您的姓名', trigger: 'blur' }],
  email: [{ required: true, message: '请输入邮箱', trigger: 'blur' },
    {
      type: 'email',
      message: '请输入正确的邮箱地址',
      trigger: ['blur', 'change'],
    }],
  phone: [{ required: true, message: '请输入电话', trigger: 'blur' },
    {
      pattern: /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/,
      message: '请输入正确的手机号码或者座机号',
    }],
});

/* el-select 的参数 */
const value = ref('');
const options = reactive([
  {
    value: '0',
    label: '燃气公司',
  },
  {
    value: '1',
    label: '物业管理员',
  },
  {
    value: '2',
    label: '用户',
  },
]);

const ruleFormRef = ref();
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
          // eslint-disable-next-line no-undef
          ElMessage.success('添加成功');
        }
      });
    } else {
      // eslint-disable-next-line no-undef
      ElMessage.error('添加失败');
    }
  });
};
</script>

<template>
  <el-card>
    <div class="add-user">
      <h4>添加用户</h4>
      <el-divider><svg-icon name='star'/></el-divider>
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
          <el-form-item label="姓名" prop="name" >
            <el-input v-model="addForm.name"/>
          </el-form-item>
          <el-form-item label="邮箱" prop="email" >
            <el-input v-model="addForm.email"/>
          </el-form-item>
          <el-form-item label="电话" prop="phone" >
            <el-input v-model="addForm.phone"/>
          </el-form-item>
          <div class="login-button">
            <el-button  type="primary" style="width:150px;margin-left:90px;" @click="addUser(ruleFormRef)">确认添加</el-button>
          </div>
        </el-form>
    </div>
  </el-card>
</template>

<style lang="">

</style>
