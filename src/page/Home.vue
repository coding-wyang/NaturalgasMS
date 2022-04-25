<script setup>
import {
  ref, reactive, computed, onMounted,
} from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

import U from '../utils/index';

const store = useStore();
const router = useRouter();
const editableTabsValue = ref('0');// 控制tab高亮显示
const editableTabs = ref([
  { title: '个人信息', name: '0' },
]);// tab列表 初始默认值为监测信息
let tabIndex = 0;
const showTab = ref('个人信息'); // 控制main页面显示tab对应的内容
const userType = computed(() => store.state.currentUser);
const name = computed(() => store.state.name);
const sessionType = sessionStorage.getItem('userType');
/* if (userType.value === '2' || sessionType === '2') {
  console.log('res', 1);
  editableTabs.value = [{ title: '个人信息', name: '0' }];
  showTab.value = '个人信息';
} */

const users = reactive(['燃气公司', '物业', '用户']);
const imgUrl = reactive(['https://avatars.githubusercontent.com/u/63920399?s=200&v=4', 'https://avatars.githubusercontent.com/u/29560987?v=4', 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png']);
const routerList = ref({
  managerList: {
    监测信息: 'Monitor',
    用户管理: 'User',
    添加用户: 'AddUser',
    气表管理: 'Gas',
    抄表: 'MeterRead',
    抄表记录: 'ReadRecord',
    添加气表: 'AddMeter',
    缴费管理: 'Pay',
    气卡管理: 'Card',
    气卡信息: 'CardMessage',
    查询气卡: 'QueryCard',
    添加气卡: 'AddCard',
    缴费业务: 'Pay',
    个人信息: 'UserInfo',
    燃气管理: 'GasPrice',
    添加燃气: 'AddGas',
    气表信息: 'Gas',
    缴费记录: 'PayRecord',
  },

});

onMounted(() => {
  U.sessionSave(store);
  router.push('/Home');
});

const asideList = ref(
  {
    /* 管理员 */
    managerList:
  [
    '个人信息',
    '用户管理',
    '气表管理',
    '缴费管理',
    '气卡管理',
    '燃气管理',
  ],
    /* 用户 */
    userList:
    [
      '个人信息',
      '缴费业务',
      '气卡信息',
      '气表信息',
    ],
  },
);
/* 增加tab */
function addTableTab(e) {
  const rLink = routerList.value.managerList[e];
  router.push(`/Home/${rLink}`);
  showTab.value = e;
  const isExsit = editableTabs.value.find((value) => value.title === e);
  /* 通过Array.find 确认该标签是否存在 */
  if (isExsit === undefined) {
    /* 若不存在 添加并创建新的name */
    const newTab = `${++tabIndex}`;
    editableTabs.value.push({
      title: e,
      name: newTab,
    });
    /* 点击侧边栏改变tabs的绑定高亮 */
    editableTabsValue.value = newTab;
  } else {
    /* 找到当前选中的侧边栏title 切换高亮显示 */
    const save = (editableTabs.value.find((value) => value.title === e));
    editableTabsValue.value = save.name;
  }
}
/* 删除标签 */
const removeTab = (targetName) => {
  /* 至少保留一个tab标签 */
  if (editableTabs.value.length !== 1) {
    const tabs = editableTabs.value;
    let activeName = editableTabsValue.value;
    /* 删除选中的tab时 传递下一个tab */
    if (activeName === targetName) {
      tabs.forEach((tab, index) => {
        if (tab.name === targetName) {
          const nextTab = tabs[index + 1] || tabs[index - 1];
          if (nextTab) {
            activeName = nextTab.name;
          }
        }
      });
    }
    /* 更新高亮显示控制器 */
    editableTabsValue.value = activeName;
    /* 在tabs.name删除选中的targetName */
    editableTabs.value = tabs.filter((tab) => tab.name !== targetName);
    /* Array.find()方法找到当前name的title赋给main页面控制器 */
    const saveName = editableTabs.value.find((value) => value.name === activeName);
    console.log(saveName);
    const rLink = routerList.value.managerList[saveName.title];
    router.push(`/Home/${rLink}`);
  }
};

/* 处理el—dropdown-item */
const handleCommand = (val) => {
  addTableTab(val);
};

const changeTab = (eve) => {
  /* 通过tab标签 控制main页面切换 */
  const rLink = routerList.value.managerList[eve.target.innerText];
  router.push(`/Home/${rLink}`);
};

const outLogin = () => {
  // eslint-disable-next-line no-undef
  ElMessageBox.confirm('是否退出登录？', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    sessionStorage.clear();
    router.push({ path: 'Login' });
  });
};
</script>

<template>
  <el-container>
      <el-aside width="200px">
        <div class="aside-box">
          <!-- 管理员侧边栏 -->
          <ul class="ul-box" v-if="userType ==='0' || userType === '1'">
            <li>
              <el-dropdown @command="handleCommand($event)" placement="bottom-end" size="small">
              <div class="icon-monito" @click='addTableTab(asideList.managerList[0])'>
                <svg-icon class="aside-icon" name="monitor"/>
              </div>
              <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command='个人信息'>个人信息</el-dropdown-item>
                    <el-dropdown-item command='监测信息'>监测信息</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
              <p>个人信息</p>
            </li>
            <li>
              <el-dropdown @command="handleCommand($event)" placement="bottom-end" size="small">
              <div class="icon-manager" @click='addTableTab(asideList.managerList[1])'>
                <svg-icon class="aside-icon" name="star"/>
              </div>
              <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command='用户管理'>用户管理</el-dropdown-item>
                    <el-dropdown-item command='添加用户'>添加用户</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
              <p>用户管理</p>
            </li>
            <li>
              <el-dropdown  @command="handleCommand($event)" placement="bottom-end" size="small">
              <div class="icon-fire" @click='addTableTab(asideList.managerList[2])'>
                <svg-icon class="aside-icon" name="gas"/>
              </div >
              <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command='气表管理'>气表管理</el-dropdown-item>
                    <el-dropdown-item command='抄表'>抄表</el-dropdown-item>
                    <el-dropdown-item command='抄表记录'>抄表记录</el-dropdown-item>
                    <el-dropdown-item command='添加气表'>添加气表</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
                </el-dropdown>
              <p>气表管理</p>
            </li>
            <li>
              <el-dropdown @command="handleCommand($event)" placement="bottom-end" size="small">
              <div class="icon-pay" @click='addTableTab(asideList.managerList[3])'>
                <svg-icon class="aside-icon" name="diamond"/>
              </div>
              <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command='缴费管理'>缴费管理</el-dropdown-item>
                    <el-dropdown-item command='缴费记录'>缴费记录</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
              <p>缴费管理</p>
            </li>
            <li>
              <el-dropdown  @command="handleCommand($event)" placement="bottom-end" size="small">
              <div class="icon-slid" @click='addTableTab(asideList.managerList[4])'>
                <svg-icon class="aside-icon" name="sliders"/>
              </div >
              <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command='气卡管理'>气卡管理</el-dropdown-item>
                    <el-dropdown-item command='气卡信息'>气卡信息</el-dropdown-item>
                    <el-dropdown-item command='查询气卡'>查询气卡</el-dropdown-item>
                    <el-dropdown-item command='添加气卡'>添加气卡</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
              <p>气卡管理</p>
            </li>
            <li v-if="userType ==='0'">
              <el-dropdown @command="handleCommand($event)" placement="bottom-end" size="small">
              <div class="icon-manager" @click='addTableTab(asideList.managerList[5])'>
                <svg-icon class="aside-icon" name="star"/>
              </div>
              <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command='燃气管理'>燃气管理</el-dropdown-item>
                    <el-dropdown-item command='添加燃气'>添加燃气</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
              <p>燃气管理</p>
            </li>
          </ul>
          <ul class="ul-box" v-if="userType ==='2'">
            <li>
                <div class="icon-manager" @click='addTableTab(asideList.userList[0])'>
                  <svg-icon class="aside-icon" name="cloud"/>
                </div >
              <p>个人信息</p>
            </li>
            <li>
              <el-dropdown @command="handleCommand($event)" placement="bottom-end" size="small">
              <div class="icon-pay" @click='addTableTab(userList.managerList[1])'>
                <svg-icon class="aside-icon" name="diamond"/>
              </div>
              <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command='缴费业务'>缴费业务</el-dropdown-item>
                    <el-dropdown-item command='缴费记录'>缴费记录</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
              <p>缴费业务</p>
            </li>
            <li>
              <el-dropdown @command="handleCommand($event)" placement="bottom-end" size="small">
              <div class="icon-slid" @click='addTableTab(asideList.userList[2])'>
                <svg-icon class="aside-icon" name="chain_link"/>
              </div>
              <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command='气卡信息'>气卡信息</el-dropdown-item>
                    <el-dropdown-item command='查询气卡'>查询气卡</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
              <p>气卡信息</p>
            </li>
            <li>
              <el-dropdown @command="handleCommand($event)" placement="bottom-end" size="small">
              <div class="icon-fire" @click='addTableTab(asideList.userList[3])'>
                <svg-icon class="aside-icon" name="cog_12"/>
              </div>
              <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command='气表信息'>气表信息</el-dropdown-item>
                    <el-dropdown-item command='抄表'>抄表</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
              <p>气表信息</p>
            </li>
          </ul>
        </div>
      </el-aside>
      <el-container>
        <el-header height="90px">
          <div class="header-title">
            <h3>智慧燃气一体化业务集成系统</h3>
            <div class='avatar-box-style'>
              <span>{{users[Number(sessionType)]}}</span>
              <el-avatar
              :src=imgUrl[Number(sessionType)]
              />
              <span>{{name}}</span>
              <div>
                <svg-icon @click='outLogin' name="out-login"/>
              </div>
          </div>
          </div>
        </el-header>
        <el-divider style="height:0px; margin:0;"></el-divider>
        <el-main>
          <div class='tab-header-box'>
            <el-tabs
          v-model="editableTabsValue"
          type="card"
          editable
          @tab-remove="removeTab"
          @click="changeTab($event)"
          >
            <el-tab-pane
            v-for="item in editableTabs"
            :key="item"
            :label="item.title"
            :name="item.name"
            >
            </el-tab-pane>
          </el-tabs >
          </div>
          <div class='child'>
            <keep-alive>
              <router-view  @addTableTab='addTableTab'/>
            </keep-alive>
          </div>
        </el-main>
      </el-container>
    </el-container>
</template>

<style lang="scss">
body{
  height: 935px;
}
#app{
  height: 100%;
}
#app .el-container{
  height: 100%;
}
.el-dropdown__popper{
  left: 200px !important;
  margin: -60px !important;
}
.el-popper__arrow{
  left: -5px !important;
  top: 10px !important;
  transform: rotate(90deg) !important;
}

.el-aside{
  background: #2d2e36;
}
.aside-icon{
  height: 50px;
  width: 50px;
  margin: 10px;
  color: #ffffff;
}
.ul-box{
  padding-block-start: 50px;
  height: 800px;
}
.ul-box >li{
  padding-block-start: 33px;
  height: 100px;
  text-align: center;
}
.icon-monito{
  margin: 0 auto;
  height: 70px;
  width: 70px;
  border-radius:20px;
  background: #5b63d6;
}
.icon-manager{
  margin: 0 auto;
  height: 70px;
  width: 70px;
  border-radius:20px;
  background: #c6e6e8;
}
.icon-fire{
  margin: 0 auto;
  height: 70px;
  width: 70px;
  border-radius:20px;
  background: #87a0cf;
}
.icon-pay{
  margin: 0 auto;
  height: 70px;
  width: 70px;
  border-radius:20px;
  background: #b2cf87;
}

.icon-slid{
  margin: 0 auto;
  height: 70px;
  width: 70px;
  border-radius:20px;
  background: #cf87bf;
}

.ul-box >li>p{
  padding-block-start: 10px;
  color: aliceblue;
  height: 20px;
  font-size: 14px;
}
.header-title{
  margin: 20px auto;
  width: 400px;
  height: 40px;
  background: #f7cfba;
  text-align: center;
  border-radius: 20px;
  box-shadow: 5px 5px 6px #ccc ;
}
.header-title>h3{
  position: relative;
  padding-top: 6px;
  z-index: 2;
}
.avatar-box-style{
  display: flex;
  flex: row nowrap;
  position: absolute;
  align-items: center;
  right: 4%;
  top: 10px;
  z-index: 1;
}
.avatar-box-style>:nth-child(1){
  font-size: 15px;
  margin-inline-end: 20px;

}
.avatar-box-style>:nth-child(2){
  transform: scale(0.5);
  margin-inline-end: 20px;
}
.avatar-box-style>:nth-child(3){
  font-size: 15px;
  font-weight: 600;
  margin-inline-end: 15px;
}
.avatar-box-style>div{
  font-size: 20px;
  margin-top: -5px;
  cursor:pointer;
}
.avatar-box-style>:nth-child(4) :hover{
  transform: scale(1.2);
}

#app .el-container .el-header{
  background: #f5f5f5;
}
.el-tabs__new-tab{
  display: none;
}
</style>
