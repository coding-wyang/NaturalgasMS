<script setup>
import { reactive } from 'vue';
import { cardAdd } from '../../http/api';

const addCardForm = reactive({
  name: '',
  cardId: '',
  balance: '',
  username: '',
});
const balance = (rule, value, callback) => {
  if (Number(value) < 100) {
    callback('首次充值金额不低于100');
  } else {
    callback();
  }
};

const rules = reactive({
  cardId: [{
    required: true, message: '请输入正确的卡号', trigger: 'blur',
  },
  {
    len: 8, message: '请输入8位数字', trigger: 'blur',
  }],
  balance: [{
    required: true, message: '请输入首次充值数额', trigger: 'blur',
  },
  { validator: balance, trigger: 'blur' },
  ],
});

const addCard = () => {
  cardAdd(addCardForm).then((res) => {
    console.log(res);
  });
};

</script>

<template>
  <el-card>
    <div class="add-card">
      <h4>添加气卡</h4>
      <el-form label-width="100px" :model="addCardForm" :rules="rules" style="width: 350px;">
          <el-form-item label="户主" prop="name" >
            <el-input v-model="addCardForm.name" />
          </el-form-item>
          <el-form-item label="气卡ID" prop="cardId" >
            <el-input v-model="addCardForm.cardId"/>
          </el-form-item>
          <el-form-item label="首次充值" prop="balance" >
            <el-input v-model="addCardForm.balance"/>
          </el-form-item>
          <el-form-item label="用户ID" prop="username" >
            <el-input v-model="addCardForm.username"/>
          </el-form-item>
          <div class="login-button">
            <el-button  type="primary" style="width:150px;" @click="addCard">新建并缴费</el-button>
          </div>
        </el-form>
        </div>
  </el-card>
</template>
