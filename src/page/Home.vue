<script setup>
import {
  ref, computed, onMounted,
} from 'vue';
import { useStore } from 'vuex';
import MonitorInfo from './mainPage/MonitorInfo.vue';
import UserManager from './mainPage/UserManager.vue';
import AddUser from './mainPage/AddUser.vue';
import GasManager from './mainPage/GasManager.vue';
import CardManager from './mainPage/CardManager.vue';
import U from '../utils/index';

const store = useStore();
const editableTabsValue = ref('0');// 控制tab高亮显示
const editableTabs = ref([
  { title: '监测信息', name: '0' },
]);// tab列表 初始默认值为监测信息
let tabIndex = 0;
const showTab = ref('监测信息'); // 控制main页面显示tab对应的内容

onMounted(() => {
  U.sessionSave(store);
  console.log(showTab);
});
const userType = computed(() => store.state.currentUser);

const asideList = ref(
  {
    /* 管理员 */
    managerList:
  [
    '监测信息',
    '用户管理',
    '燃气管理',
    '缴费管理',
    '气卡管理',
  ],
  },
  {
    /* 用户 */
    userList:
    [
      '缴费业务',
    ],
  },
);
/* 增加tab */
function addTableTab(e) {
  console.log(e);
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
    showTab.value = saveName.title;
    /* showTab.value = editableTabs.value[activeName].title; */
  }
};

/* 处理el—dropdown-item */
const handleCommand = (val) => {
  console.log('ifssLL:::', val);
  addTableTab(val);
};

const changeTab = (eve) => {
  /* 通过tab标签 控制main页面切换 */
  showTab.value = eve.target.innerText;
};
</script>

<template>
  <el-container>
      <el-aside width="100px">
        <div class="aside-box">
          <!-- 管理员侧边栏 -->
          <ul class="ul-box" v-if="userType ==='0'">
            <li>
              <div class="icon-monito" @click='addTableTab(asideList.managerList[0])'>
                <svg-icon class="aside-icon" name="monitor"/>
              </div>
                <p>监测信息</p>
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
              <div class="icon-fire" @click='addTableTab(asideList.managerList[2])'>
                <svg-icon class="aside-icon" name="gas"/>
              </div >
              <p>燃气管理</p>
            </li>
            <li>
              <div class="icon-pay" @click='addTableTab(asideList.managerList[3])'>
                <svg-icon class="aside-icon" name="diamond"/>
              </div >
              <p>缴费管理</p>
            </li>
            <li>
              <div class="icon-slid" @click='addTableTab(asideList.managerList[4])'>
                <svg-icon class="aside-icon" name="sliders"/>
              </div >
              <p>气卡管理</p>
            </li>
          </ul>
          <ul class="ul-box" v-if="userType ==='1'">
            <li>
                <div class="icon-pay" @click='addTableTab(asideList.userList[0])'>
                  <svg-icon class="aside-icon" name="diamond"/>
                </div >
              <p>缴费业务</p>
            </li>
          </ul>
        </div>
      </el-aside>
      <el-container>
        <el-header>
          <div class="header-title">
            <h3>智慧天然气一体化业务集成系统</h3>
          </div>
        </el-header>
        <el-divider style="height:0px; margin:0;"></el-divider>
        <el-main>
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
          </el-tabs>
          <!-- 监测信息 -->
          <monitor-info v-show="showTab === asideList.managerList[0]"></monitor-info>
          <!-- 用户管理 -->
          <user-manager v-show="showTab === asideList.managerList[1]"></user-manager>
          <!-- 添加用户 -->
          <add-user v-show="showTab ==='添加用户'"></add-user>
          <!-- 燃气管理 -->
          <gas-manager v-show ="showTab===asideList.managerList[2]"></gas-manager>
          <!-- 气卡管理 -->
          <card-manager v-show ="showTab===asideList.managerList[4]"> </card-manager>
        </el-main>
      </el-container>
    </el-container>
</template>

<style lang="scss">
body{
  height: 927px;
}
#app{
  height: 100%;
}
#app .el-container{
  height: 100%;
}
.el-dropdown__popper{
  left: 90px !important;
  top: 176px !important;
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
  height: 35px;
  width: 35px;
  margin: 8px;
  color: #ffffff;
}
.ul-box{
  padding-block-start: 68px;
  height: 800px;
}
.ul-box >li{
  padding-block-start: 5px;
  height: 100px;
  text-align: center;
}
.icon-monito{
  margin: 0 auto;
  height: 50px;
  width: 50px;
  border-radius:8px;
  background: #5b63d6;
}
.icon-manager{
  margin: 0 auto;
  height: 50px;
  width: 50px;
  border-radius: 7px;
  background: #c6e6e8;
}
.icon-fire{
  margin: 0 auto;
  height: 50px;
  width: 50px;
  border-radius: 5px;
  background: #87a0cf;
}
.icon-pay{
  margin: 0 auto;
  height: 50px;
  width: 50px;
  border-radius: 5px;
  background: #b2cf87;
}

.icon-slid{
  margin: 0 auto;
  height: 50px;
  width: 50px;
  border-radius: 5px;
  background: #cf87bf;
}

.ul-box >li>p{
  padding-block-start: 7px;
  color: aliceblue;
  height: 20px;
  font-size: 13px;
}
.header-title{
  margin: 10px auto;
  width: 400px;
  height: 30px;
  background: #f7cfba;
  text-align: center;
  border-radius: 7px;
  box-shadow: 5px 5px 6px #ccc ;
}

#app .el-container .el-header{
  background: #f5f5f5;
}
</style>
