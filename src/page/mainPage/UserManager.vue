/* eslint-disable no-undef */
<script setup>
import {
  reactive, ref, computed, onBeforeMount,
} from 'vue';
import { useStore } from 'vuex';
import { userInfoGet, userUpdate, userDelete } from '../../http/api';

const store = useStore();

const userType = computed(() => store.state.currentUser);

onBeforeMount(() => {
  userGet();
  if (userType.value === '1') {
    options.splice(0, 1);
  }
});
/* 用户信息模板 */
const userInfo = reactive([
  { name: '用户总数', value: '' },
  { name: '正常用户数量', value: '' },
  { name: '欠费用户数量', value: '' },
]);

const userList = reactive({
  tableData: [
  ],
});

const rules = reactive({
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' },
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
/* 搜索 */
const search = ref('');
const filterTableData = computed(() => userList.tableData.filter(
  (data) => !search.value
      || data.username.toLowerCase().includes(search.value.toLowerCase()),
));
/* 修改会话 */
const dialogVisible = ref(false);
/* 当前选中的列表index */
const tableIndex = ref(0);

/* 修改 参数为选中的table信息 以及index */
const handleEdit = (index, row) => {
  tableIndex.value = index;// 保存index信息
  dialogVisible.value = true; // 打开会话
  value.value = row.type; // 切换value的会话默认值
};

const handleDelete = (row) => {
  // eslint-disable-next-line no-undef
  ElMessageBox.confirm('此操作将永久删除该账号，是否继续？', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    userDelete(row).then((res) => {
      if (res.status === 200) {
        // eslint-disable-next-line no-undef
        ElMessage.success('删除成功');
      }
    });
  });
};
/* 获取用户信息 */
const userGet = () => {
  userInfoGet().then((res) => {
    userInfo[0].value = res.data.count;
    userInfo[1].value = res.data.normalCount;
    userInfo[2].value = res.data.arrearsCount;
    userList.tableData = res.userlist;
  });
};
/* 选择器的值 */
const value = ref('2');

/* 账号权限可选列表 */
const options = [
  {
    value: '0',
    label: '燃气公司',
  },
  {
    value: '1',
    label: '物业',
  },
  {
    value: '2',
    label: '用户',
  },
];
/* 选择器 value值改变时 改变权限 */
const typeChange = (val) => {
  userList.tableData[tableIndex.value].type = val;
};
/* 更新用户数据 */
const updateData = () => {
  dialogVisible.value = false;
  userUpdate(userList.tableData[tableIndex.value]).then((res) => {
    if (res.status === 200) {
      // eslint-disable-next-line no-undef
      ElMessage.success('更新成功');
    }
  });
};
const handleClose = () => {
  dialogVisible.value = false;
  userGet();
};

</script>

<template>
  <div class="manager-box">
    <el-card>
      <div class="userinfo-box">
        <!-- 用户数量卡片 -->
        <div class="user-count">
          <div>
            <svg-icon name='star'></svg-icon>
            <h4>用户信息</h4>
            </div>
            <div>
            <p>{{userInfo[0].value}}</p>
            <span>用户数</span>
          </div>
          <div>
            <p>{{userInfo[1].value}}</p>
            <span>正常</span>
          </div>
          <div>
            <p>{{userInfo[2].value}}</p>
            <span>欠费</span>
          </div>
      </div>
      </div>
      <div class="user-list-box">
        <h4>账号查询</h4>
        <el-divider/>
        <el-table :data="filterTableData" style="width: 100%; background-color: rgb(248, 248, 248);">
          <el-table-column label="账号" width="250px">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <el-icon><timer /></el-icon>
                <span style="margin-inline-start: -15px">{{ scope.row.username }}</span>
                </div>
                </template>
              </el-table-column>
              <el-table-column label="账号等级" width="250px">
                  <template #default="scope">
                    <span> {{ scope.row.type }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="姓名" width="250px">
                  <template #default="scope">
                    <span> {{ scope.row.name }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="邮箱" width="250px">
                  <template #default="scope">
                    <span> {{ scope.row.email }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="电话" width="250px">
                  <template #default="scope">
                    <span> {{ scope.row.phone }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column>
                    <template #header>
        <el-input v-model="search" size="small" placeholder="Type to search" />
      </template>
                      <template #default="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                        <el-button
                        size="small"
                        type="danger"
                        @click="handleDelete( scope.row)"
                        >Delete</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog
                v-model="dialogVisible"
                title="账号信息"
                width="40%"
                :before-close="handleClose"
                >
                <el-form label-width="100px" :model='userList.tableData[tableIndex]' :rules="rules" ref="ruleFormRef" style="width: 350px;">
                  <el-form-item label="账号" prop='username'>
                    <el-input v-model="userList.tableData[tableIndex].username"  style="width:210px;"/>
                  </el-form-item>
                  <el-form-item label="密码" prop='password'>
                    <el-input v-model="userList.tableData[tableIndex].password" style="width:210px;"/>
                  </el-form-item>
                  <el-form-item label="账号权限" prop="type">
                      <el-select v-model="value" placeholder="Select" size="small" @change="typeChange">
                      <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="姓名" prop="name">
                    <el-input v-model="userList.tableData[tableIndex].name"  style="width:210px;"/>
                  </el-form-item>
                  <el-form-item  label="邮箱" prop="email">
                    <el-input v-model="userList.tableData[tableIndex].email"  style="width:210px;"/>
                  </el-form-item>
                  <el-form-item label="电话" prop="phone">
                    <el-input v-model="userList.tableData[tableIndex].phone"  style="width:210px;"/>
                  </el-form-item>
                </el-form>
                <template #footer>
                  <span class="dialog-footer">
                    <el-button @click="handleClose">取消</el-button>
                    <el-button type="primary" @click="updateData">确认</el-button>
                  </span>
              </template>
            </el-dialog>
        </div>
    </el-card>
  </div>
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
  color: #51ff01;
}
.userinfo-box{
  display: flex;
  justify-content: start;
}
.user-count{
  display: flex;
  flex-wrap: wrap;
  background-color: rgb(255, 255, 255);
  width: 300px;
  height: 200px;
  border-radius: 7px;
  margin-block: 10px;
  margin-inline: 14px;
  box-shadow: 5px 5px 23px rgb(236, 236, 236), -5px -5px 23px rgb(233, 233, 233),-5px 5px 23px rgb(235, 235, 235), 5px -5px 23px rgb(236, 236, 236) ;
}
/* svg 及用户信息上半部分的盒子 */
.user-count >:nth-child(1){
  width: 300px;
  display: flex;
  justify-content: center;
  margin-block-start: 25px;
  border-bottom: solid 1px rgb(233, 233, 233);
}

/* 用户数 正常 及欠费 */
.user-count >:nth-child(2){
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 109px;
  border-inline-end: solid 1px rgb(233, 233, 233);
}
.user-count >:nth-child(3){
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 94px;
  border-inline-end: solid 1px rgb(236, 236, 236);
}
.user-count >:nth-child(4){
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: red;
  width: 93px;
}
.user-count>div>p{
  font-size: 35px;
}
/* svg */
.user-count >:nth-child(1)>:nth-child(1){
  color: #96c24e;
  font-size: 2.2em;
  margin-inline: 30px;
  margin-inline-start: -85px;
}
/* 用户信息h4 */
.user-count >:nth-child(1)>h4{
  font-size: 25px;
}

.account-info{
  display: flex;
  flex-wrap: wrap;
  background-color: rgb(255, 255, 255);
  width: 300px;
  height: 200px;
  border-radius: 7px;
  margin-block: 10px;
  margin-inline: 14px;
  box-shadow: 5px 5px 23px rgb(236, 236, 236), -5px -5px 23px rgb(233, 233, 233),-5px 5px 23px rgb(235, 235, 235), 5px -5px 23px rgb(236, 236, 236);
}

.user-list-box{
  background-color: rgb(252, 252, 252);
  width: 100%;
  height: 390px;
  border-radius: 7px;
  margin-block: 10px;
  margin-inline: 14px;
  overflow-y: auto
}
.user-list-box::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.user-list-box::-webkit-scrollbar-thumb {
  border-radius: 3px;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  background-color: #c3c3c3;
}
.user-list-box::-webkit-scrollbar-track {
  background-color: transparent;
}

</style>
