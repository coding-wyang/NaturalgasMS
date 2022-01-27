<script setup>
import MonitorInfo from './mainPage/MonitorInfo.vue';

</script>

<template>
  <el-container>
      <el-aside width="100px">
        <div class="aside-box">
          <ul class="ul-box">
            <li>
              <div class="icon-monito">
                <svg-icon class="aside-icon" name="monitor"/>
              </div>
              <p>监测信息</p>
            </li>
            <li>
              <div class="icon-manager">
                <svg-icon class="aside-icon" name="star"/>
              </div>
              <p>用户管理</p>
            </li>
            <li>
              <div class="icon-pay">
                <svg-icon class="aside-icon" name="diamond"/>
              </div>
              <p>缴费业务</p>
            </li>
          </ul>
        </div>
      </el-aside>
      <el-container>
        <el-header>
          <h3>智慧天然气一体化业务集成系统</h3>
        </el-header>
        <el-main>
          <!-- 监测信息 -->
          <monitor-info></monitor-info>
        </el-main>
      </el-container>
    </el-container>
</template>

<style lang="scss">
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
  padding-block-start: 50px;
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
</style>
