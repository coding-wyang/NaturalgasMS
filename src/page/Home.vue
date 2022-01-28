<script setup>
import { ref } from 'vue';
import MonitorInfo from './mainPage/MonitorInfo.vue';

const editableTabsValue = ref('0');// 控制tab高亮显示
const editableTabs = ref([
  { title: '监测信息', name: '0' },
]);// tab列表 初始默认值为监测信息
let tabIndex = 0;
const showTab = ref('监测信息'); // 控制main页面显示tab对应的内容

const asideList = ref([
  '监测信息',
  '用户管理',
  '缴费业务',
]);
/* 增加tab */
function addTableTab(e) {
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

const changeTab = (eve) => {
  /* 通过tab标签 控制main页面切换 */
  showTab.value = eve.target.innerText;
};
</script>

<template>
  <el-container>
      <el-aside width="100px">
        <div class="aside-box">
          <ul class="ul-box">
            <li>
              <div class="icon-monito" @click='addTableTab(asideList[0])'>
                <svg-icon class="aside-icon" name="monitor"/>
              </div>
                <p>监测信息</p>
            </li>
            <li>
              <div class="icon-manager" @click='addTableTab(asideList[1])'>
                <svg-icon class="aside-icon" name="star"/>
              </div>
              <p>用户管理</p>
            </li>
            <li>
              <div class="icon-pay" @click='addTableTab(asideList[2])'>
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
          <monitor-info v-show="showTab === asideList[0]"></monitor-info>
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
  background: #10aec2;
}
.icon-manager{
  margin: 0 auto;
  height: 50px;
  width: 50px;
  border-radius: 7px;
  background: #c6e6e8;
}
.icon-pay{
  margin: 0 auto;
  height: 50px;
  width: 50px;
  border-radius: 5px;
  background: #b2cf87;
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
