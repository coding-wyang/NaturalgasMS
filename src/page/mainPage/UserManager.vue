<script setup>
import {
  onMounted, reactive, ref, computed,
} from 'vue';
import { ElMessageBox } from 'element-plus';
import { userInfoGet, userUpdate, userDelete } from '../../http/api';

onMounted(() => {
  userGet();
});
/* 用户信息模板 */
const userInfo = reactive([
  { name: '用户总数', value: Number },
  { name: '正常用户数量', value: Number },
  { name: '欠费用户数量', value: Number },
]);

const userList = reactive({
  tableData: [
  ],
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
  ElMessageBox.confirm('此操作将永久删除该账号，是否继续？', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    userDelete(row).then((res) => {
      console.log('delete::', res);
    });
  });
  console.log(row);
};
/* 获取用户信息 */
const userGet = () => {
  userInfoGet().then((res) => {
    userInfo[0].value = res.data.count;
    userInfo[1].value = res.data.normalCount;
    userInfo[2].value = res.data.arrearsCount;
    userList.tableData = res.userlist;
    console.log('ss', userList.tableData);
  });
};
/* 选择器的值 */
const value = ref('');

/* 账号权限可选列表 */
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
/* 选择器 value值改变时 改变权限 */
const typeChange = (val) => {
  userList.tableData[tableIndex.value].type = val;
};
/* 更新用户数据 */
const updateData = () => {
  dialogVisible.value = false;
  userUpdate(userList.tableData[tableIndex.value]).then((res) => {
    console.log('updata::', res);
  });
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
      <div class="account-info">
        <div>
          <svg-icon name='diamond'></svg-icon>
          <h4>账户信息</h4>
        </div>
        <div>
          <p>元</p>
          <span>累计扣款</span>
        </div>
        <div>
          <p>元</p>
          <span>累计缴费</span>
        </div>
        <div>
          <p>元</p>
          <span>余额</span>
        </div>
      </div>
      </div>
      <div class="user-list-box">
        <h4>账号查询</h4>
        <el-table :data="filterTableData" style="width: 100%; background-color: rgb(248, 248, 248);">
          <el-table-column label="账号" width="180">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <el-icon><timer /></el-icon>
                <span style="margin-inline-start: -15px">{{ scope.row.username }}</span>
                </div>
                </template>
              </el-table-column>
              <el-table-column label="账号等级" width="180px">
                  <template #default="scope">
                    <span> {{ scope.row.type }}</span>
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
                <span>账号</span>
                <el-input v-model="userList.tableData[tableIndex].username" type="text" style="width:210px;"/>
                <span>账号权限</span>
                <el-select v-model="value" placeholder="Select" size="small" @change="typeChange">
                  <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  >
                </el-option>
              </el-select>
                <template #footer>
              <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="updateData">确认</el-button>
      </span>
    </template>
  </el-dialog>
        </div>
    </el-card>
  </div>
</template>

<style lang="scss">
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
.el-overlay{
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-icon{
  height: 1.4em;
  padding-inline: 5px;
}
.el-message-box{
  width: 300px;
  height: 130px;
  border-radius: 5px;
  background: #ffff;
  color: #db984c;
}
.el-message-box__headerbtn{
  display: none;
}
.el-message-box__container{
  display: flex;
  padding-block: 30px;
}
.el-message-box__btns{
  position: relative;
  left: 90px;
}
.el-message-box__message{
  margin: 0 auto;
}

</style>
