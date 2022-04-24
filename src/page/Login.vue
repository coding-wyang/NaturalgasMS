<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { loginGet, userRe } from '../http/api';

const store = useStore();
const router = useRouter();

const loginForm = reactive({
  user: '04183177',
  pass: 'xu04183177',
});

const registerForm = reactive({
  username: '',
  password: '',
  name: '',
  email: '',
  phone: '',
});
const getLogin = () => {
  loginGet({
    userName: loginForm.user,
    passWord: loginForm.pass,
  }).then((res) => {
    console.log(res);
    if (res.status === 200) {
      store.commit('setCurrentUser', res.type);
      store.commit('setUsername', loginForm.user);
      store.commit('setName', res.name);
      router.push('/Home');
      sessionStorage.setItem('userName', loginForm.user);
      sessionStorage.setItem('userToken', res.token);
      sessionStorage.setItem('userType', res.type);
    } else {
      // eslint-disable-next-line no-undef
      ElMessage.error('登录失败');
    }
  });
};

const rules = reactive({
  user: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  pass: [{ required: true, message: '请输入密码', trigger: 'blur' },
    {
      min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur',
    }],
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' },
    {
      min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur',
    }],
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

const isShow = ref(true);
const reGister = () => {
  isShow.value = false;
};

const agreeRe = () => {
  userRe(registerForm).then((res) => {
    if (res.status === 200) {
      isShow.value = true;
      // eslint-disable-next-line no-undef
      ElMessage.success('注册成功，现返回登陆页');
    }
  });
};
</script>

<template>
<!-- 登录页 -->
  <div class="login-page">
    <div class="login-title">
      <h2>智慧燃气一体化业务集成系统</h2>
    </div>
    <div class="login-card">
      <el-card style="width: 600px;height: 400px; margin: 10% auto;">
        <div class="login-image" >
          <img src="../assets/login-left.jpg"  alt="">
        </div>
        <el-divider direction="vertical" style="height:300px;"></el-divider>
        <el-form label-width="55px" :model="loginForm" :rules="rules" ref="ruleFormRef"  style="width: 250px;" v-if='isShow'>
          <el-form-item label="账号" prop="user" >
            <el-input v-model="loginForm.user" />
          </el-form-item>
          <el-form-item label="密码" prop="pass" >
            <el-input v-model="loginForm.pass"/>
          </el-form-item>
          <div class="login-button">
            <el-button  type="primary" style="width:120px" @click="getLogin">登录</el-button>
            <el-button  type="primary" style="width:120px" @click="reGister">注册</el-button>
          </div>
        </el-form>
        <el-form label-width="55px" :model="registerForm" :rules="rules" ref="ruleFormRef"  style="width: 250px;" v-if='!isShow'>
          <el-form-item label="账号" prop="username" >
            <el-input v-model="registerForm.username" />
          </el-form-item>
          <el-form-item label="密码" prop="password" >
            <el-input v-model="registerForm.password"/>
          </el-form-item>
          <el-form-item label="姓名" prop="name" >
            <el-input v-model="registerForm.name"/>
          </el-form-item>
          <el-form-item label="邮箱" prop="email" >
            <el-input v-model="registerForm.email"/>
          </el-form-item>
          <el-form-item label="电话" prop="phone" >
            <el-input v-model="registerForm.phone"/>
          </el-form-item>
          <div class="login-button">
            <el-button  type="primary" style="width:120px" @click="agreeRe">注册</el-button>
            <el-button  type="primary" style="width:120px" @click="isShow =true">取消</el-button>
          </div>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<style lang="scss">
.login-title{
  position: relative;
  text-align: center;
  top: 105px;
}
.login-card .el-card{
  position: relative;
  top: 50px;
}
.login-card .el-card>:nth-child(1){
  display: flex;
  height: 350px;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;

}
.login-image{
  width: 250px;

}
.login-image> img{
  width: 280px;
  height: 200px;
}
.login-button{
  display: flex;
  text-align: center;
  padding-block-start: 10px;
}

</style>
