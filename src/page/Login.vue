<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus';
import { loginGet } from '../http/api';

const store = useStore();
const router = useRouter();

const loginForm = reactive({
  user: '04183177',
  pass: 'xu04183177',
});

const getLogin = () => {
  loginGet({
    userName: loginForm.user,
    passWord: loginForm.pass,
  }).then((res) => {
    console.log(res);
    if (res.status === 200) {
      store.commit('setCurrentUser', res.type);
      router.push('/Home');
      sessionStorage.setItem('userName', loginForm.user);
      sessionStorage.setItem('userToken', res.token);
    } else {
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
});
</script>

<template>
<!-- 登录页 -->
  <div class="login-page">
    <div class="login-title">
      <h2>智慧天然气一体化业务集成系统</h2>
    </div>
    <div class="login-card">
      <el-card style="width: 600px;height: 400px; margin: 10% auto;">
        <div class="login-image" >
          <img src="../assets/login-left.jpg"  alt="">
        </div>
        <el-divider direction="vertical" style="height:300px;"></el-divider>
        <el-form label-width="55px" :model="loginForm" :rules="rules" ref="ruleFormRef"  style="width: 250px;">
          <el-form-item label="账号" prop="user" >
            <el-input v-model="loginForm.user" />
          </el-form-item>
          <el-form-item label="密码" prop="pass" >
            <el-input v-model="loginForm.pass"/>
          </el-form-item>
          <div class="login-button">
            <el-button  type="primary" style="width:150px" @click="getLogin">登录</el-button>
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
  text-align: center;
  padding-block-start: 10px;
}

</style>
